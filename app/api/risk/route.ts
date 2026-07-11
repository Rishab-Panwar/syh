import { NextResponse } from "next/server";
import tls from "node:tls";
import { promises as dns } from "node:dns";
import { assessRisk } from "@/lib/risk";

// Uses node:tls and node:dns, so force the Node.js runtime (not edge).
export const runtime = "nodejs";
export const maxDuration = 60;

type Questionnaire = {
  industry?: string;
  dataSensitivity?: string; // "financial" | "pii" | "health" | "none"
  certifications?: string[];
  notes?: string;
};

const SECURITY_HEADERS = [
  "strict-transport-security",
  "content-security-policy",
  "x-frame-options",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
];

const DISCLOSURE_HEADERS = ["server", "x-powered-by", "via", "x-aspnet-version"];

// Normalize a user-entered target into a hostname + https URL.
function normalizeTarget(input: string): { host: string; url: string } | null {
  let s = input.trim().toLowerCase();
  if (!s) return null;
  s = s.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/:\d+$/, "");
  // Basic hostname sanity check + block obvious internal targets (SSRF hygiene).
  if (!/^[a-z0-9.-]+\.[a-z]{2,}$/.test(s)) return null;
  if (
    s === "localhost" ||
    s.endsWith(".local") ||
    s.endsWith(".internal") ||
    /^(127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(s)
  ) {
    return null;
  }
  return { host: s, url: `https://${s}` };
}

// Real TLS/certificate inspection: connect on 443, read the negotiated protocol
// and the peer certificate (issuer, validity window, trust). rejectUnauthorized
// is false so we can still READ an invalid cert and report why it's invalid.
function gatherTls(host: string): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    let done = false;
    const finish = (v: Record<string, unknown>) => {
      if (done) return;
      done = true;
      resolve(v);
    };
    try {
      const socket = tls.connect(
        { host, port: 443, servername: host, timeout: 8000, rejectUnauthorized: false },
        () => {
          const cert = socket.getPeerCertificate();
          const protocol = socket.getProtocol();
          const trusted = socket.authorized;
          const authError = socket.authorizationError
            ? String(socket.authorizationError)
            : null;

          let daysToExpiry: number | null = null;
          if (cert?.valid_to) {
            const ms = new Date(cert.valid_to).getTime() - Date.now();
            daysToExpiry = Math.floor(ms / 86_400_000);
          }
          const issuer =
            (cert?.issuer && (cert.issuer.O || cert.issuer.CN)) || null;

          socket.end();
          finish({
            reachable: true,
            protocol, // e.g. "TLSv1.3" / "TLSv1.2"
            trusted_chain: trusted,
            trust_error: authError,
            issuer,
            valid_from: cert?.valid_from ?? null,
            valid_to: cert?.valid_to ?? null,
            days_to_expiry: daysToExpiry,
            expired: daysToExpiry !== null ? daysToExpiry < 0 : null,
          });
        },
      );
      socket.on("error", () => finish({ reachable: false }));
      socket.on("timeout", () => {
        socket.destroy();
        finish({ reachable: false });
      });
    } catch {
      finish({ reachable: false });
    }
  });
}

// Real email-security posture via DNS TXT lookups: SPF (on the domain) and
// DMARC (on _dmarc.<domain>), plus the DMARC enforcement policy.
async function gatherEmailSecurity(host: string): Promise<Record<string, unknown>> {
  const out: Record<string, unknown> = {
    spf_present: false,
    spf_record: null,
    dmarc_present: false,
    dmarc_policy: null,
  };
  try {
    const txt = await dns.resolveTxt(host);
    const flat = txt.map((r) => r.join(""));
    const spf = flat.find((r) => r.toLowerCase().startsWith("v=spf1"));
    if (spf) {
      out.spf_present = true;
      out.spf_record = spf;
    }
  } catch {
    /* no TXT / lookup failed */
  }
  try {
    const dmarcTxt = await dns.resolveTxt(`_dmarc.${host}`);
    const flat = dmarcTxt.map((r) => r.join(""));
    const dmarc = flat.find((r) => r.toLowerCase().startsWith("v=dmarc1"));
    if (dmarc) {
      out.dmarc_present = true;
      out.dmarc_policy = /p=(\w+)/i.exec(dmarc)?.[1]?.toLowerCase() ?? "none";
    }
  } catch {
    /* no _dmarc record */
  }
  return out;
}

async function gatherSignals(host: string, url: string) {
  const signals: Record<string, unknown> = { target: host };

  // Probe HTTPS root with a short timeout.
  let res: Response | null = null;
  try {
    res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      headers: { "User-Agent": "SecureYourHacks-RiskAgent/1.0" },
      signal: AbortSignal.timeout(9000),
    });
  } catch {
    res = null;
  }

  signals.reachable_https = !!res;
  if (!res) {
    signals.note = "The site did not respond over HTTPS within the timeout.";
    return signals;
  }

  signals.status_code = res.status;
  signals.final_url = res.url;
  signals.http_to_https_redirect = res.url.startsWith("https://");

  const present: Record<string, string | null> = {};
  for (const h of SECURITY_HEADERS) present[h] = res.headers.get(h);
  signals.security_headers = present;
  signals.security_headers_present = SECURITY_HEADERS.filter((h) => present[h]);
  signals.security_headers_missing = SECURITY_HEADERS.filter((h) => !present[h]);

  const disclosure: Record<string, string | null> = {};
  for (const h of DISCLOSURE_HEADERS) {
    const v = res.headers.get(h);
    if (v) disclosure[h] = v;
  }
  signals.information_disclosure = disclosure;

  // Cookie flags (from Set-Cookie on the root response).
  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    signals.cookies = {
      present: true,
      secure_flag: /;\s*secure/i.test(setCookie),
      httponly_flag: /;\s*httponly/i.test(setCookie),
      samesite: /;\s*samesite=(\w+)/i.exec(setCookie)?.[1] ?? null,
    };
  } else {
    signals.cookies = { present: false };
  }

  return signals;
}

export async function POST(req: Request) {
  let body: { target?: string; questionnaire?: Questionnaire };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const normalized = normalizeTarget(body.target ?? "");
  if (!normalized) {
    return NextResponse.json(
      { error: "Enter a valid public domain, e.g. acme.com" },
      { status: 400 },
    );
  }

  // 1) Gather real, verifiable security signals from the domain (in parallel:
  //    HTTP headers, TLS certificate, and email DNS records).
  const [signals, tlsInfo, emailSecurity] = await Promise.all([
    gatherSignals(normalized.host, normalized.url),
    gatherTls(normalized.host),
    gatherEmailSecurity(normalized.host),
  ]);

  // 2) Attach the self-reported questionnaire (treated as unverified evidence).
  const evidence = {
    ...signals,
    tls_certificate: tlsInfo,
    email_security: emailSecurity,
    questionnaire: {
      industry: body.questionnaire?.industry ?? "",
      data_sensitivity: body.questionnaire?.dataSensitivity ?? "",
      certifications: body.questionnaire?.certifications ?? [],
      notes: body.questionnaire?.notes ?? "",
    },
  };

  // 3) Hand the evidence to the in-app Gemini analyst for an explainable decision.
  try {
    const decision = await assessRisk(normalized.host, evidence);
    // Return the decision plus the raw evidence (for the transparency panel).
    return NextResponse.json({ ...decision, evidence });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `The risk analyst is temporarily unavailable. (${msg})` },
      { status: 502 },
    );
  }
}
