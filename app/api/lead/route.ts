import { NextResponse } from "next/server";

// Where captured leads should be delivered. For the demo this logs to the
// server console and, if configured, forwards to a webhook or email service.
// Wire real delivery by setting ONE of:
//   - LEAD_WEBHOOK_URL   (any endpoint that accepts a JSON POST, e.g. Zapier/Make/Slack)
//   - RESEND_API_KEY + LEAD_TO_EMAIL   (email via Resend)
const FOUNDER_EMAIL = process.env.LEAD_TO_EMAIL ?? "care@secureyourhacks.com";

type LeadPayload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  transcript?: { role: string; content: string }[];
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  if (!name || !email || !isEmail(email)) {
    return NextResponse.json(
      { error: "A valid name and email are required." },
      { status: 400 },
    );
  }

  const lead = {
    name,
    email,
    company: (body.company ?? "").trim(),
    message: (body.message ?? "").trim(),
    transcript: body.transcript ?? [],
    source: "Ask SecureBot",
    receivedAt: new Date().toISOString(),
  };

  // Always leave a trace the founder can see in the dev/server logs.
  console.log("[Ask SecureBot] New lead:", JSON.stringify(lead, null, 2));

  // Optional: forward to a webhook (Slack/Zapier/Make/CRM).
  try {
    if (process.env.LEAD_WEBHOOK_URL) {
      await fetch(process.env.LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    }

    // Optional: send an email via Resend (no SDK needed, plain REST call).
    if (process.env.RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Ask SecureBot <onboarding@resend.dev>",
          to: [FOUNDER_EMAIL],
          subject: `New lead from Ask SecureBot: ${name}`,
          text:
            `Name: ${name}\nEmail: ${email}\nCompany: ${lead.company}\n\n` +
            `Message: ${lead.message}\n\n` +
            `Received: ${lead.receivedAt}`,
        }),
      });
    }
  } catch (err) {
    // Delivery is best-effort; never fail the user's submission because a
    // downstream integration hiccuped, we've already logged the lead.
    console.error("[Ask SecureBot] Lead forwarding failed:", err);
  }

  return NextResponse.json({ ok: true });
}
