"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Bot,
  Send,
  Sparkles,
  FileText,
  ArrowRight,
  CheckCircle2,
  Loader2,
  AlertTriangle,
} from "lucide-react";

// ---- Types matching the /vciso/chat contract -------------------------------
type Service = { slug: string; title: string; reason: string };

type AssistantMeta = {
  citations?: string[];
  services?: Service[];
  captureLead?: boolean;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  meta?: AssistantMeta;
  error?: boolean;
};

const SUGGESTIONS = [
  "Do I need to be GDPR compliant?",
  "What's VAPT and do I need it?",
  "Do I need a vCISO?",
  "What's the difference between EDR, MDR and XDR?",
];

// Map service slugs to their dedicated service page. Slugs match the backend
// catalog and lib/services-data.ts.
function serviceHref(slug: string) {
  return `/services/${slug}`;
}

// crypto.randomUUID only exists in secure contexts (HTTPS/localhost); over plain
// HTTP it's undefined, so use a fallback so message IDs never throw.
function uid(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    try {
      return crypto.randomUUID();
    } catch {
      /* fall through */
    }
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

// ---- Tiny, safe Markdown-ish renderer (bold + bullets + paragraphs) --------
function renderInline(text: string, keyBase: string) {
  // Split on **bold** while keeping the delimiters' content.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return (
        <strong key={`${keyBase}-b${i}`} className="font-semibold text-white">
          {p.slice(2, -2)}
        </strong>
      );
    }
    return <React.Fragment key={`${keyBase}-t${i}`}>{p}</React.Fragment>;
  });
}

function RichText({ text }: { text: string }) {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = (key: string) => {
    if (bullets.length === 0) return;
    blocks.push(
      <ul key={key} className="my-2 space-y-1.5 list-none">
        {bullets.map((b, i) => (
          <li key={`${key}-${i}`} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0167f7]" />
            <span>{renderInline(b, `${key}-${i}`)}</span>
          </li>
        ))}
      </ul>,
    );
    bullets = [];
  };

  lines.forEach((raw, idx) => {
    const line = raw.trim();
    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    if (bulletMatch) {
      bullets.push(bulletMatch[1]);
      return;
    }
    flushBullets(`ul-${idx}`);
    if (line) {
      blocks.push(
        <p key={`p-${idx}`} className="my-1.5 leading-relaxed">
          {renderInline(line, `p-${idx}`)}
        </p>,
      );
    }
  });
  flushBullets("ul-last");
  return <div className="text-[15px] text-white/85">{blocks}</div>;
}

// ---- Lead capture form (appears when the advisor detects buying intent) -----
function LeadForm({ transcript }: { transcript: ChatMessage[] }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "sending" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          company,
          transcript: transcript.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
        <p className="text-sm text-white/90">
          Thanks, {name.split(" ")[0]}! A Secure Your Hacks expert will reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="rounded-xl border border-[#0167f7]/30 bg-[#0167f7]/[0.07] p-4"
    >
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#0167f7]" />
        <p className="text-sm font-medium text-white">
          Want a human expert to follow up? Leave your details.
        </p>
      </div>
      <div className="grid gap-2.5 sm:grid-cols-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="rounded-lg border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#0167f7] focus:ring-1 focus:ring-[#0167f7]"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Work email"
          required
          className="rounded-lg border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#0167f7] focus:ring-1 focus:ring-[#0167f7]"
        />
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Company (optional)"
          className="rounded-lg border border-white/10 bg-white/10 px-3.5 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#0167f7] focus:ring-1 focus:ring-[#0167f7]"
        />
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0167f7] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0156d4] disabled:opacity-60"
        >
          {status === "sending" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          Request a callback
        </button>
        {status === "error" && (
          <span className="text-xs text-red-300">Something went wrong. Try again.</span>
        )}
      </div>
    </motion.form>
  );
}

// ---- Cycling "thinking" status ---------------------------------------------
const THINKING_PHRASES = [
  "Consulting the knowledge base",
  "Analyzing your question",
  "Retrieving relevant services",
  "Checking compliance frameworks",
  "Matching the right services",
  "Generating a response",
  "Finalizing",
];

function ThinkingIndicator() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    // Advance through the phrases, then hold on the last one until the
    // response arrives (this component unmounts when loading ends).
    const id = setInterval(() => {
      setIndex((i) => Math.min(i + 1, THINKING_PHRASES.length - 1));
    }, 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3">
        <Loader2 className="h-4 w-4 animate-spin text-[#0167f7]" />
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-white/50"
          >
            {THINKING_PHRASES[index]}
            <span className="ml-0.5 inline-flex">
              <span className="animate-pulse">.</span>
              <span className="animate-pulse [animation-delay:200ms]">.</span>
              <span className="animate-pulse [animation-delay:400ms]">.</span>
            </span>
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---- Main chat --------------------------------------------------------------
export default function VcisoChat() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    const history = messages.map((m) => ({ role: m.role, content: m.content }));
    const userMsg: ChatMessage = { id: uid(), role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/vciso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, chat_history: history }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: data?.error ?? "Sorry, something went wrong.",
            error: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content: data.answer ?? "",
            meta: {
              citations: data.citations ?? [],
              services: data.recommended_services ?? [],
              captureLead: !!data.capture_lead,
            },
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: "I couldn't reach the advisor. Please try again in a moment.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // "Want to hire us?" is a fixed intent, not a question — respond deterministically
  // with the get-started message + lead form (no LLM, so it never goes off-script).
  const sendHire = () => {
    if (loading) return;
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", content: "Want to hire us?" },
      {
        id: uid(),
        role: "assistant",
        content:
          'That\'s great to hear! To get started, you can initiate a conversation through the "Talk to an Expert" button or our Contact page. A typical engagement begins with a short discovery call to understand your specific needs, followed by a tailored proposal.',
        meta: {
          citations: ["How to Get Started and Contact"],
          services: [],
          captureLead: true,
        },
      },
    ]);
  };

  const empty = messages.length === 0;

  return (
    <div className="mx-auto flex h-[calc(100vh-72px)] w-full max-w-3xl flex-col px-4">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0167f7]/15 ring-1 ring-[#0167f7]/30">
          <Bot className="h-6 w-6 text-[#0167f7]" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-white">Ask SecureBot</h1>
          <p className="text-[11px] tracking-wide text-white/45">
            AI security advisor · trained on Secure Your Hacks services &amp; compliance
          </p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="chat-scroll flex-1 space-y-5 overflow-y-auto py-6">
        {empty && (
          <div className="flex flex-col items-center justify-center gap-6 pt-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0167f7]/15 ring-1 ring-[#0167f7]/30">
              <Sparkles className="h-8 w-8 text-[#0167f7]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white md:text-2xl">
                How can I help secure your business?
              </h2>
              <p className="mt-1.5 text-[13px] text-white/45">
                Ask about compliance, penetration testing, security leadership, and more.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <div className="grid gap-2.5 sm:grid-cols-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="group rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm text-white/80 transition hover:border-[#0167f7]/40 hover:bg-[#0167f7]/[0.07]"
                  >
                    <span className="flex items-center justify-between gap-2">
                      {s}
                      <ArrowRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[#0167f7]" />
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-2.5 flex justify-center">
                <button
                  onClick={sendHire}
                  className="group inline-flex items-center gap-2 rounded-xl border border-[#0167f7]/30 bg-[#0167f7]/[0.08] px-5 py-3 text-sm font-medium text-white transition hover:border-[#0167f7]/60 hover:bg-[#0167f7]/[0.16]"
                >
                  Want to hire us?
                  <ArrowRight className="h-4 w-4 shrink-0 text-[#0167f7] transition group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
            {m.role === "user" ? (
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-[#0167f7] px-4 py-2.5 text-[15px] text-white">
                {m.content}
              </div>
            ) : (
              <div className="w-full max-w-[92%] space-y-3">
                <div
                  className={`rounded-2xl rounded-bl-md border px-4 py-3 ${
                    m.error
                      ? "border-red-500/30 bg-red-500/10"
                      : "border-white/10 bg-white/[0.04]"
                  }`}
                >
                  {m.error ? (
                    <div className="flex items-start gap-2 text-sm text-red-200">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{m.content}</span>
                    </div>
                  ) : (
                    <RichText text={m.content} />
                  )}

                  {/* Citations */}
                  {m.meta?.citations && m.meta.citations.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-white/10 pt-2.5">
                      <FileText className="h-3.5 w-3.5 text-white/40" />
                      {m.meta.citations.map((c) => (
                        <span
                          key={c}
                          className="rounded-full bg-white/[0.06] px-2 py-0.5 text-[11px] text-white/50"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recommended services */}
                {m.meta?.services && m.meta.services.length > 0 && (
                  <div className="space-y-2">
                    <p className="px-1 text-xs font-medium uppercase tracking-wider text-white/40">
                      Recommended for you
                    </p>
                    <div className="grid gap-2">
                      {m.meta.services.map((s) => (
                        <Link
                          key={s.slug}
                          href={serviceHref(s.slug)}
                          className="group flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition hover:border-[#0167f7]/40 hover:bg-[#0167f7]/[0.06]"
                        >
                          <span className="flex items-start gap-3">
                            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0167f7]/15">
                              <ShieldCheck className="h-4 w-4 text-[#0167f7]" />
                            </span>
                            <span>
                              <span className="block text-sm font-semibold text-white">
                                {s.title}
                              </span>
                              {s.reason && (
                                <span className="mt-0.5 block text-xs text-white/55">
                                  {s.reason}
                                </span>
                              )}
                            </span>
                          </span>
                          <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-white/30 transition group-hover:translate-x-0.5 group-hover:text-[#0167f7]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lead capture */}
                {m.meta?.captureLead && <LeadForm transcript={messages} />}
              </div>
            )}
          </div>
        ))}

        {loading && <ThinkingIndicator />}
      </div>

      {/* Composer */}
      <div className="border-t border-white/10 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about VAPT, GDPR, vCISO, SOC…"
            className="flex-1 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#0167f7] focus:ring-1 focus:ring-[#0167f7]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0167f7] text-white transition hover:bg-[#0156d4] disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="h-4.5 w-4.5" />
          </button>
        </form>
        <p className="mt-2 text-center text-[11px] text-white/30">
          AI advisor, informational only. For binding advice, talk to a Secure Your Hacks expert.
        </p>
      </div>
    </div>
  );
}
