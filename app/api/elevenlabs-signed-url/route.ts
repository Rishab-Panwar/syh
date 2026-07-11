import { NextResponse } from "next/server";

// Mints a short-lived signed URL for the ElevenLabs Conversational AI agent so
// the API key never reaches the browser. Set ELEVENLABS_AGENT_ID and
// ELEVENLABS_API_KEY in .env.local (see docs/elevenlabs-vishing-agent.md).
export async function GET() {
  const agentId = process.env.ELEVENLABS_AGENT_ID;
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!agentId || !apiKey) {
    return NextResponse.json(
      {
        error:
          "Voice agent not configured. Add ELEVENLABS_AGENT_ID and " +
          "ELEVENLABS_API_KEY to .env.local.",
      },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      { headers: { "xi-api-key": apiKey } },
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to get signed URL from ElevenLabs." },
        { status: 502 },
      );
    }

    const { signed_url } = (await res.json()) as { signed_url: string };
    return NextResponse.json({ signedUrl: signed_url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: `Could not reach ElevenLabs. (${msg})` },
      { status: 502 },
    );
  }
}
