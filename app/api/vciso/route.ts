import { NextResponse } from "next/server";
import { generateJson, type ChatTurn } from "@/lib/gemini";
import { KNOWLEDGE_BASE, SERVICE_CATALOG } from "@/lib/knowledge-base";

// Ask SecureBot runs entirely in-app now: the whole knowledge base is fed to
// Gemini (Vertex AI) per query, so there is no separate backend to depend on.
export const runtime = "nodejs";
export const maxDuration = 60;

type ChatMessage = { role: string; content: string };

const CATALOG_BY_SLUG = new Map(SERVICE_CATALOG.map((s) => [s.slug, s]));
const CATALOG_STR = SERVICE_CATALOG.map((s) => `- ${s.slug}: ${s.title}`).join("\n");

const SYSTEM = `You are the AI Virtual CISO (vCISO) advisor for Secure Your Hacks, a cybersecurity company. You help website visitors understand cybersecurity topics and Secure Your Hacks' services, and you guide serious inquiries toward talking to a human expert.

Use ONLY the KNOWLEDGE BASE below to answer. If it does not contain the answer, say you don't have that detail and recommend contacting the team. Never invent facts, pricing, guarantees, or legal/compliance determinations. For anything involving contracts, pricing, timelines, or a binding compliance/legal decision, defer to a human expert. Do not use em dashes.

You can recommend ONLY from this exact service catalog (use the slug):
${CATALOG_STR}

Respond with STRICT, VALID JSON matching this schema:
{
  "answer": string,                 // concise, friendly Markdown answer (2-6 sentences). May use short bullet lists.
  "citations": string[],            // the section names you used, e.g. ["GDPR Basics"]. [] if none.
  "recommended_services": [ { "slug": string, "title": string, "reason": string } ],  // 0-3 items from the catalog, most relevant first; reason is one short sentence.
  "capture_lead": boolean           // true ONLY when the user shows real buying intent (asks about pricing, wants a quote/consult/audit, says they need help now, or asks to be contacted). false for general/informational questions.
}

KNOWLEDGE BASE:
${KNOWLEDGE_BASE}`;

function normalize(data: Record<string, unknown> | null) {
  const d = data ?? {};
  const answer =
    (typeof d.answer === "string" && d.answer.trim()) ||
    "I'm not sure about that one. I'd recommend talking to a Secure Your Hacks expert via the Contact page.";

  const citations = Array.isArray(d.citations)
    ? d.citations.map((c) => String(c).trim()).filter(Boolean)
    : [];

  const recs: { slug: string; title: string; reason: string }[] = [];
  const seen = new Set<string>();
  if (Array.isArray(d.recommended_services)) {
    for (const item of d.recommended_services) {
      if (!item || typeof item !== "object") continue;
      const slug = String((item as Record<string, unknown>).slug ?? "").trim();
      const cat = CATALOG_BY_SLUG.get(slug); // drop hallucinated slugs
      if (!cat || seen.has(slug)) continue;
      seen.add(slug);
      recs.push({
        slug,
        title: cat.title, // canonical title
        reason: String((item as Record<string, unknown>).reason ?? "").trim(),
      });
      if (recs.length >= 3) break;
    }
  }

  return {
    answer,
    citations,
    recommended_services: recs,
    capture_lead: Boolean(d.capture_lead),
  };
}

export async function POST(req: Request) {
  let body: { question?: string; chat_history?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const question = (body.question ?? "").trim();
  if (!question) {
    return NextResponse.json({ error: "question is required" }, { status: 400 });
  }

  // Build the conversation: prior turns + the new question.
  const contents: ChatTurn[] = [];
  for (const m of (body.chat_history ?? []).slice(-12)) {
    const text = (m.content ?? "").trim();
    if (!text) continue;
    contents.push({ role: m.role === "assistant" || m.role === "ai" ? "model" : "user", text });
  }
  contents.push({ role: "user", text: question });

  try {
    const raw = await generateJson({ system: SYSTEM, contents });
    return NextResponse.json(normalize(raw));
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `SecureBot is temporarily unavailable. (${msg})` },
      { status: 502 },
    );
  }
}
