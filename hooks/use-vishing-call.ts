"use client";

import { useEffect, useState } from "react";
import { useConversation } from "@elevenlabs/react";

// Call lifecycle, mirroring a real phone call.
export type CallState = "idle" | "connecting" | "on_call" | "ended";

export type Scorecard = {
  score: number; // 0-100 security-awareness score
  verdict: string; // one-line summary
  missed: string[]; // manipulation tactics the user fell for / missed
  tips: string[]; // how to do better next time
};

// The agent passes a list as one string. Be tolerant of whatever separator it
// uses: ";;", a single ";", newlines, or a bullet/pipe.
function splitList(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split(/\s*;{1,2}\s*|\n+|\s*\|\s*|\s*•\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function useVishingCall() {
  const [callState, setCallState] = useState<CallState>("idle");
  const [connecting, setConnecting] = useState(false);
  const [redFlags, setRedFlags] = useState<string[]>([]);
  const [scorecard, setScorecard] = useState<Scorecard | null>(null);
  const [error, setError] = useState<string | null>(null);

  const conversation = useConversation({
    clientTools: {
      // Agent drives the on-screen call state (e.g. "on_call", "ended").
      set_call_state: ({ state }: { state: string }) => {
        if (state === "on_call" || state === "ringing") setCallState("on_call");
        else if (state === "ended") setCallState("ended");
        return "ok";
      },
      // Agent flags each manipulation tactic it deploys, so the red flag lights
      // up on screen in real time. Deduped.
      flag_red_flag: ({ indicator }: { indicator: string }) => {
        const flag = (indicator ?? "").trim();
        if (flag) {
          setRedFlags((prev) => (prev.includes(flag) ? prev : [...prev, flag]));
        }
        return "ok";
      },
      // Agent ends the drill with a scorecard.
      show_scorecard: (args: {
        score?: number | string;
        verdict?: string;
        missed?: string;
        tips?: string;
      }) => {
        const score = Math.max(0, Math.min(100, Number(args.score) || 0));
        setScorecard({
          score,
          verdict: (args.verdict ?? "").trim(),
          missed: splitList(args.missed),
          tips: splitList(args.tips),
        });
        setCallState("ended");
        return "ok";
      },
    },
    onModeChange: () => {
      // mode is "speaking" | "listening"; kept for future speaker UI.
    },
    onStatusChange: ({ status }: { status: string }) => {
      if (status === "connected") setCallState("on_call");
      if (status === "disconnected") {
        // If the agent didn't send a scorecard (user hung up early), just end.
        setCallState((s) => (s === "on_call" || s === "connecting" ? "ended" : s));
      }
    },
    onError: (err: unknown) => {
      setError(String(err));
      setCallState("ended");
    },
  });

  // The score has been delivered, so the drill is over: end the live call.
  useEffect(() => {
    if (scorecard) {
      conversation.endSession().catch(() => {});
    }
    // Only react to a new scorecard; `conversation` is a fresh object each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scorecard]);

  const startCall = async (details?: { userName?: string; companyName?: string }) => {
    setError(null);
    setRedFlags([]);
    setScorecard(null);
    setConnecting(true);
    setCallState("connecting");
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });

      const res = await fetch("/api/elevenlabs-signed-url");
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error ?? "Failed to start the call.");
      }
      const { signedUrl } = (await res.json()) as { signedUrl: string };

      // Passed to the agent as {{user_name}} / {{company_name}} so the scammer
      // can address the target by name and reference their company.
      const dynamicVariables = {
        user_name: (details?.userName ?? "").trim() || "there",
        company_name: (details?.companyName ?? "").trim() || "your company",
      };

      await conversation.startSession({
        signedUrl,
        connectionType: "websocket",
        dynamicVariables,
      });
      setCallState("on_call");
      return true;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.toLowerCase().includes("permission") || msg.toLowerCase().includes("denied")) {
        setError("Microphone access denied. Please allow mic access and try again.");
      } else {
        setError(msg || "Failed to connect. Please try again.");
      }
      setCallState("idle");
      return false;
    } finally {
      setConnecting(false);
    }
  };

  const endCall = async () => {
    try {
      await conversation.endSession();
    } catch {
      /* ignore */
    }
    setCallState("ended");
  };

  const reset = () => {
    setCallState("idle");
    setRedFlags([]);
    setScorecard(null);
    setError(null);
  };

  return {
    callState,
    connecting,
    redFlags,
    scorecard,
    error,
    startCall,
    endCall,
    reset,
    isSpeaking: conversation.isSpeaking,
  };
}
