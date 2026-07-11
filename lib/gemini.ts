import { GoogleGenAI } from "@google/genai";

// Vertex AI (Gemini) client — same project/model DocMind used, so behaviour
// matches. Auth is via the service account in GOOGLE_APPLICATION_CREDENTIALS.
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

let client: GoogleGenAI | null = null;
function getClient(): GoogleGenAI {
  if (!client) {
    client = new GoogleGenAI({
      vertexai: true,
      project: process.env.GOOGLE_CLOUD_PROJECT || "mlops-487010",
      location: process.env.GOOGLE_CLOUD_LOCATION || "us-central1",
    });
  }
  return client;
}

export type ChatTurn = { role: "user" | "model"; text: string };

function stripFences(text: string): string {
  let t = text.trim();
  if (t.startsWith("```")) {
    t = t.replace(/^```[a-zA-Z]*\s*/, "").replace(/\s*```$/, "");
  }
  return t.trim();
}

function extractJson(text: string): unknown {
  const cleaned = stripFences(text);
  try {
    return JSON.parse(cleaned);
  } catch {
    /* fall through */
  }
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    try {
      return JSON.parse(cleaned.slice(start, end + 1));
    } catch {
      return null;
    }
  }
  return null;
}

// One Gemini call that returns parsed JSON. Uses JSON response mode + thinking
// off (low latency), mirroring DocMind's temperature 0 / thinking_budget 0.
export async function generateJson(opts: {
  system: string;
  contents: ChatTurn[] | string;
  maxOutputTokens?: number;
}): Promise<Record<string, unknown> | null> {
  const ai = getClient();
  const contents =
    typeof opts.contents === "string"
      ? [{ role: "user", parts: [{ text: opts.contents }] }]
      : opts.contents.map((t) => ({ role: t.role, parts: [{ text: t.text }] }));

  const resp = await ai.models.generateContent({
    model: MODEL,
    contents,
    config: {
      temperature: 0,
      maxOutputTokens: opts.maxOutputTokens ?? 2048,
      responseMimeType: "application/json",
      systemInstruction: opts.system,
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  const text = resp.text ?? "";
  const parsed = extractJson(text);
  return (parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : null);
}
