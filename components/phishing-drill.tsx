"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PhoneOff,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  Mic,
  Loader2,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  ArrowRight,
  Info,
  X,
  Radio,
  User,
  Building2,
  GraduationCap,
} from "lucide-react";
import { useVishingCall } from "@/hooks/use-vishing-call";

const FEATURES = [
  {
    icon: Radio,
    title: "A realistic AI scam call",
    body: "An AI plays a scammer and talks with you by voice, adapting to whatever you say.",
  },
  {
    icon: User,
    title: "Personalized to you",
    body: "The caller uses your name and company to sound authentic, just like a real targeted attack.",
  },
  {
    icon: AlertTriangle,
    title: "Live red flags",
    body: "Each manipulation tactic lights up on screen the moment the scammer uses it.",
  },
  {
    icon: CheckCircle2,
    title: "Scorecard and tips",
    body: "At the end you get a 0-100 awareness score, what got you, and how to do better.",
  },
];

const HOW_IT_WORKS = [
  "Allow your microphone and press Start. The 'scammer' will call you.",
  "Talk back out loud, just like a real call. Try not to give anything away.",
  "Watch the red flags light up as the caller uses each manipulation tactic.",
  "Hang up when you're done, then read your scorecard and tips.",
];

function scoreColor(score: number) {
  if (score >= 75) return "#10b981"; // emerald
  if (score >= 45) return "#c084fc"; // teal
  return "#f97316"; // orange
}

// Onboarding popup: explains the feature and collects name + company, which are
// passed to the agent so the scammer can address the target personally.
function IntroModal({
  userName,
  companyName,
  setUserName,
  setCompanyName,
  onStart,
  onClose,
}: {
  userName: string;
  companyName: string;
  setUserName: (v: string) => void;
  setCompanyName: (v: string) => void;
  onStart: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#0b0a24] shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3 border-b border-white/10 bg-gradient-to-r from-[#8b5cf6]/[0.14] to-transparent p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6]/30 to-[#c084fc]/10 ring-1 ring-[#8b5cf6]/40 shadow-[0_0_18px_rgba(139,92,246,0.3)]">
            <PhoneCall className="h-6 w-6 text-[#c084fc]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">Phishing Drill</h2>
            <p className="text-xs text-white/55">
              Can you resist a real-sounding scam call? Here&apos;s how it works.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="ml-auto rounded-lg p-1 text-white/40 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Features */}
        <div className="grid gap-3 p-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#8b5cf6]/15">
                <f.icon className="h-4 w-4 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-white">{f.title}</p>
                <p className="mt-0.5 text-[10.5px] leading-snug text-white/45">{f.body}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onStart();
          }}
          className="border-t border-white/10 p-5"
        >
          <p className="mb-3 text-xs text-white/50">
            Tell the caller who you are. This makes the simulation realistic (your details
            are only used for this call and never stored).
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2">
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Your name"
                maxLength={40}
                className="w-full rounded-lg border border-white/10 bg-white/[0.06] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
              />
            </div>
            <div className="relative">
              <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company (optional)"
                maxLength={40}
                className="w-full rounded-lg border border-white/10 bg-white/[0.06] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#8b5cf6] focus:ring-1 focus:ring-[#8b5cf6]"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#8b5cf6] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#7c3aed] hover:shadow-[0_0_18px_rgba(139,92,246,0.55)]"
          >
            <PhoneCall className="h-4 w-4" />
            Start the drill
          </button>
          <p className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] text-white/30">
            <Mic className="h-3 w-3" /> Requires microphone access. Nothing is recorded.
          </p>
        </form>
      </motion.div>
    </div>
  );
}

export default function PhishingDrill() {
  const {
    callState,
    connecting,
    redFlags,
    scorecard,
    error,
    startCall,
    endCall,
    reset,
    isSpeaking,
  } = useVishingCall();

  const [showIntro, setShowIntro] = React.useState(true);
  const [userName, setUserName] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [showTrainingPopup, setShowTrainingPopup] = React.useState(false);

  const begin = () => {
    setShowIntro(false);
    startCall({ userName, companyName });
  };

  const onCall = callState === "on_call";
  const ended = callState === "ended";

  // After the call ends, nudge toward the Training service (a moment later so
  // the user reads their scorecard first).
  React.useEffect(() => {
    if (callState === "ended") {
      const t = setTimeout(() => setShowTrainingPopup(true), 1600);
      return () => clearTimeout(t);
    }
    setShowTrainingPopup(false);
  }, [callState]);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-4 pb-10">
      {/* Header (centered) */}
      <div className="relative mb-12 flex flex-col items-center text-center">
        <button
          onClick={() => setShowIntro(true)}
          className="absolute right-0 top-0 inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-[#8b5cf6]/40 hover:text-white"
        >
          <Info className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">About</span>
        </button>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/30 to-[#c084fc]/10 ring-1 ring-[#8b5cf6]/40 shadow-[0_0_28px_rgba(139,92,246,0.3)]">
          <PhoneCall className="h-7 w-7 text-[#c084fc]" />
        </div>
        <h1 className="bg-gradient-to-r from-white to-[#e9d5ff] bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-[28px]">
          Phishing Drill
        </h1>
        <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-white/45">
          A safe, voice-based simulation. An AI plays a scammer calling you. Can you resist
          the manipulation?
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        {/* Left: the call */}
        <div className="rounded-2xl border border-[#8b5cf6]/20 bg-gradient-to-b from-[#8b5cf6]/[0.06] to-white/[0.02] p-6 md:p-8 shadow-[0_0_40px_rgba(139,92,246,0.08)]">
          <AnimatePresence mode="wait">
            {/* IDLE: start screen */}
            {callState === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#8b5cf6]/15 ring-1 ring-[#8b5cf6]/30">
                  <Phone className="h-10 w-10 text-[#8b5cf6]" />
                </div>
                <h2 className="text-xl font-semibold text-white">Can you survive a scam call?</h2>
                <p className="mt-2 max-w-md text-sm text-white/55">
                  You are about to receive a simulated vishing (voice phishing) call.
                  Handle it like the real thing. Nothing you say leaves your browser.
                </p>
                <button
                  onClick={() => startCall({ userName, companyName })}
                  disabled={connecting}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#8b5cf6] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#7c3aed] hover:shadow-[0_0_18px_rgba(139,92,246,0.55)] disabled:opacity-60"
                >
                  {connecting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PhoneCall className="h-4 w-4" />
                  )}
                  {connecting ? "Connecting…" : "Start the call"}
                </button>
                <p className="mt-3 flex items-center gap-1.5 text-xs text-white/35">
                  <Mic className="h-3.5 w-3.5" /> Requires microphone access
                </p>
              </motion.div>
            )}

            {/* CONNECTING / ON CALL */}
            {(callState === "connecting" || onCall) && (
              <motion.div
                key="call"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center text-center"
              >
                {/* Avatar with pulse */}
                <div className="relative mb-6 flex h-28 w-28 items-center justify-center">
                  <span
                    className={`absolute inset-0 rounded-full bg-[#8b5cf6]/30 ${
                      onCall ? "animate-ping" : "animate-pulse"
                    }`}
                  />
                  <span className="absolute inset-2 rounded-full bg-[#8b5cf6]/20" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#1e1638] ring-2 ring-[#8b5cf6]/50">
                    <PhoneCall className="h-8 w-8 text-[#c084fc]" />
                  </div>
                </div>

                <p className="text-xs uppercase tracking-widest text-white/40">
                  {callState === "connecting" ? "Connecting" : "Live call"}
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  &quot;IT Security Desk&quot;
                </h2>
                <p className="mt-1 h-5 text-sm text-[#c084fc]">
                  {callState === "connecting"
                    ? "Ringing…"
                    : isSpeaking
                    ? "Caller is speaking…"
                    : "Listening to you…"}
                </p>

                <button
                  onClick={endCall}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-500/90 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-500"
                >
                  <PhoneOff className="h-4 w-4" />
                  Hang up
                </button>
                <p className="mt-3 text-xs text-white/35">
                  Tip: never share passwords, OTPs, or payment details on a call.
                </p>
              </motion.div>
            )}

            {/* ENDED: scorecard */}
            {ended && (
              <motion.div
                key="ended"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {scorecard ? (
                  <div className="flex flex-col items-center text-center">
                    <p className="text-xs uppercase tracking-widest text-white/40">Your result</p>
                    <div
                      className="my-4 flex h-28 w-28 flex-col items-center justify-center rounded-full ring-4"
                      style={{
                        color: scoreColor(scorecard.score),
                        // @ts-expect-error CSS var for ring color
                        "--tw-ring-color": scoreColor(scorecard.score),
                      }}
                    >
                      <span className="text-4xl font-bold">{scorecard.score}</span>
                      <span className="text-[10px] uppercase tracking-wider text-white/40">
                        / 100
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-white">Awareness score</h2>
                    {scorecard.verdict && (
                      <p className="mt-2 max-w-md text-sm text-white/60">{scorecard.verdict}</p>
                    )}
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                      <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Try again
                      </button>
                      <Link
                        href="/services/training"
                        className="inline-flex items-center gap-2 rounded-lg bg-[#8b5cf6] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#7c3aed]"
                      >
                        Train your team
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                      <PhoneOff className="h-8 w-8 text-white/50" />
                    </div>
                    <h2 className="text-lg font-semibold text-white">Call ended</h2>
                    <p className="mt-2 max-w-md text-sm text-white/55">
                      {error
                        ? error
                        : "You hung up before the scorecard. Want to run the drill again?"}
                    </p>
                    <button
                      onClick={reset}
                      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#8b5cf6] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#7c3aed]"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Run it again
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {error && callState === "idle" && (
            <div className="mt-5 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right: live red flags + how it works / tips */}
        <div className="space-y-6">
          {/* Red flags */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
            <div className="mb-3 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              <h3 className="text-sm font-semibold text-white">Red flags spotted</h3>
              {redFlags.length > 0 && (
                <span className="ml-auto rounded-full bg-orange-500/20 px-2 py-0.5 text-xs font-medium text-orange-300">
                  {redFlags.length}
                </span>
              )}
            </div>
            {redFlags.length === 0 ? (
              <p className="text-xs text-white/40">
                {onCall
                  ? "Listening for manipulation tactics…"
                  : "Manipulation tactics will appear here during the call."}
              </p>
            ) : (
              <ul className="space-y-2">
                <AnimatePresence initial={false}>
                  {redFlags.map((flag) => (
                    <motion.li
                      key={flag}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-2 rounded-lg border border-orange-500/25 bg-orange-500/10 px-3 py-2"
                    >
                      <ShieldAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-400" />
                      <span className="text-xs leading-snug text-orange-100">{flag}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </div>

          {/* Scorecard details (missed + tips) when ended */}
          {ended && scorecard && (scorecard.missed.length > 0 || scorecard.tips.length > 0) ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              {scorecard.missed.length > 0 && (
                <div className="mb-4">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <AlertTriangle className="h-4 w-4 text-orange-400" /> What got you
                  </h3>
                  <ul className="space-y-1.5">
                    {scorecard.missed.map((m) => (
                      <li key={m} className="flex items-start gap-2 text-xs text-white/65">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-400" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {scorecard.tips.length > 0 && (
                <div>
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
                    <Lightbulb className="h-4 w-4 text-[#c084fc]" /> How to do better
                  </h3>
                  <ul className="space-y-1.5">
                    {scorecard.tips.map((t) => (
                      <li key={t} className="flex items-start gap-2 text-xs text-white/65">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#c084fc]" />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            /* How it works (shown until a scorecard replaces it) */
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <h3 className="mb-3 text-sm font-semibold text-white">How it works</h3>
              <ol className="space-y-2.5">
                {HOW_IT_WORKS.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8b5cf6]/15 text-[11px] font-bold text-[#8b5cf6]">
                      {i + 1}
                    </span>
                    <span className="text-xs leading-relaxed text-white/60">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-[11px] text-white/30">
        Simulation only. No real call is placed and audio is not stored. For real
        employee training, talk to a Secure Your Hacks expert.
      </p>

      <AnimatePresence>
        {showIntro && (
          <IntroModal
            userName={userName}
            companyName={companyName}
            setUserName={setUserName}
            setCompanyName={setCompanyName}
            onStart={begin}
            onClose={() => setShowIntro(false)}
          />
        )}
      </AnimatePresence>

      {/* Post-call: nudge toward the Training service team */}
      <AnimatePresence>
        {showTrainingPopup && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#8b5cf6]/30 bg-[#0b0a24] p-6 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowTrainingPopup(false)}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-lg p-1 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#8b5cf6]/30 to-[#c084fc]/10 ring-1 ring-[#8b5cf6]/40">
                <GraduationCap className="h-6 w-6 text-[#c084fc]" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-white">
                Train your whole team
              </h3>
              <p className="mx-auto mt-2 max-w-sm text-[13px] leading-relaxed text-white/55">
                One person just practiced, but your whole team faces these calls. Our Security
                Awareness Training runs realistic phishing and vishing simulations across your
                organization.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#8b5cf6] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#7c3aed]"
                >
                  Talk to our team <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/training"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
                >
                  Explore Training
                </Link>
              </div>
              <button
                onClick={() => setShowTrainingPopup(false)}
                className="mt-4 text-xs text-white/40 transition hover:text-white/70"
              >
                Maybe later
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
