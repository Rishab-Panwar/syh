import { generateJson } from "@/lib/gemini";

// AI Third-Party Risk analyst — ported from DocMind's RiskAnalyst. Turns the
// gathered evidence into an explainable, underwriting-style risk decision.

const TIERS = new Set(["Low", "Moderate", "Elevated", "High"]);
const DECISIONS = new Set([
  "Approve",
  "Approve with conditions",
  "Further review required",
  "Do not onboard",
]);
const SEVERITIES = new Set(["good", "low", "medium", "high"]);

const SYSTEM = `You are an AI Third-Party (Vendor) Security Risk Analyst for Secure Your Hacks. You assess a vendor's security posture from gathered EVIDENCE and produce an explainable, underwriting-style risk decision, the way a credit analyst turns applicant data into a lending decision.

Judge ONLY from the EVIDENCE provided (automated security signals plus a self-reported questionnaire). Treat questionnaire claims as self-reported and unverified. Be specific, fair, and concrete. Do not invent findings that the evidence does not support. Do not use em dashes.

Scoring: 100 = excellent posture / low risk, 0 = severe risk. Weigh these evidence areas:
- Transport security: HTTPS enforced, HTTP-to-HTTPS redirect, and the HSTS header.
- TLS certificate (tls_certificate): a trusted chain is expected; an untrusted, expired, or soon-to-expire cert (days_to_expiry under ~20) is a serious finding. Modern protocol (TLSv1.2 or TLSv1.3) is expected; TLSv1.0/1.1 is a weakness.
- Security headers: CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- Email security (email_security): SPF present, and DMARC present with an enforcing policy. Missing SPF or DMARC, or DMARC policy of 'none', raises spoofing/phishing risk.
- Information disclosure: Server / X-Powered-By leakage.
- Cookie flags: Secure, HttpOnly, SameSite.
- Data & compliance context from the questionnaire (self-reported): handling financial or PII data with no certifications is higher risk.

Respond with STRICT, VALID JSON matching this schema:
{
  "overall_score": integer 0-100,
  "risk_tier": "Low" | "Moderate" | "Elevated" | "High",
  "decision": "Approve" | "Approve with conditions" | "Further review required" | "Do not onboard",
  "summary": string,  // 2-3 sentence executive summary of the vendor risk
  "categories": [ { "name": string, "score": integer 0-100, "rationale": string } ],  // 5-7 factors: Transport Security, TLS Certificate, Security Headers, Email Security, Information Disclosure, Cookie Security, Data & Compliance
  "findings": [ { "severity": "good" | "low" | "medium" | "high", "title": string, "detail": string } ],  // concrete observations, most severe first
  "recommended_actions": [ string ]  // 3-5 prioritized, specific remediation steps
}`;

function clampScore(v: unknown): number {
  const n = Math.round(Number(v));
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(100, n));
}

function tierFromScore(score: number): string {
  if (score >= 80) return "Low";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Elevated";
  return "High";
}

function decisionFromScore(score: number): string {
  if (score >= 80) return "Approve";
  if (score >= 60) return "Approve with conditions";
  if (score >= 40) return "Further review required";
  return "Do not onboard";
}

function normalize(data: Record<string, unknown> | null, target: string) {
  const d = data ?? {};
  const score = clampScore(d.overall_score);

  let tier = String(d.risk_tier ?? "").trim();
  if (!TIERS.has(tier)) tier = tierFromScore(score);

  let decision = String(d.decision ?? "").trim();
  if (!DECISIONS.has(decision)) decision = decisionFromScore(score);

  const categories: { name: string; score: number; rationale: string }[] = [];
  if (Array.isArray(d.categories)) {
    for (const c of d.categories) {
      if (!c || typeof c !== "object") continue;
      const name = String((c as Record<string, unknown>).name ?? "").trim();
      if (!name) continue;
      categories.push({
        name,
        score: clampScore((c as Record<string, unknown>).score),
        rationale: String((c as Record<string, unknown>).rationale ?? "").trim(),
      });
    }
  }

  const findings: { severity: string; title: string; detail: string }[] = [];
  if (Array.isArray(d.findings)) {
    for (const f of d.findings) {
      if (!f || typeof f !== "object") continue;
      let sev = String((f as Record<string, unknown>).severity ?? "").trim().toLowerCase();
      if (!SEVERITIES.has(sev)) sev = "low";
      const title = String((f as Record<string, unknown>).title ?? "").trim();
      if (!title) continue;
      findings.push({
        severity: sev,
        title,
        detail: String((f as Record<string, unknown>).detail ?? "").trim(),
      });
    }
  }
  const order: Record<string, number> = { high: 0, medium: 1, low: 2, good: 3 };
  findings.sort((a, b) => (order[a.severity] ?? 9) - (order[b.severity] ?? 9));

  const actions = Array.isArray(d.recommended_actions)
    ? d.recommended_actions.map((a) => String(a).trim()).filter(Boolean).slice(0, 6)
    : [];

  const summary =
    (typeof d.summary === "string" && d.summary.trim()) ||
    `Automated third-party risk assessment for ${target}.`;

  return {
    target,
    overall_score: score,
    risk_tier: tier,
    decision,
    summary,
    categories,
    findings,
    recommended_actions: actions,
  };
}

export async function assessRisk(target: string, evidence: Record<string, unknown>) {
  const raw = await generateJson({
    system: SYSTEM,
    contents: `Assess the third-party security risk for: ${target}\n\nEVIDENCE:\n${JSON.stringify(evidence, null, 2)}`,
    maxOutputTokens: 2048,
  });
  return normalize(raw, target);
}
