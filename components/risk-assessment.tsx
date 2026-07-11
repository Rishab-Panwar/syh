"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Info,
  ArrowRight,
  Gauge,
  ChevronDown,
  Building2,
  Lock,
  Download,
  X,
} from "lucide-react";
import { downloadRiskPdf } from "@/lib/risk-pdf";

// ---- Types (mirror /risk/assess response) ---------------------------------
type Category = { name: string; score: number; rationale: string };
type Finding = { severity: "good" | "low" | "medium" | "high"; title: string; detail: string };
type RiskResult = {
  target: string;
  overall_score: number;
  risk_tier: "Low" | "Moderate" | "Elevated" | "High";
  decision: string;
  summary: string;
  categories: Category[];
  findings: Finding[];
  recommended_actions: string[];
  evidence?: Record<string, unknown>;
};

const DATA_OPTIONS = [
  { value: "none", label: "No sensitive data" },
  { value: "pii", label: "Personal data (PII)" },
  { value: "financial", label: "Financial / payment data" },
  { value: "health", label: "Health / medical data" },
  { value: "credentials", label: "Login credentials / passwords" },
  { value: "government_id", label: "Government IDs (Aadhaar, PAN, SSN, passport)" },
  { value: "biometric", label: "Biometric data (face, fingerprint)" },
  { value: "customer_records", label: "Customer / CRM records" },
  { value: "source_code", label: "Source code / intellectual property" },
  { value: "internal_docs", label: "Internal business documents" },
];
const CERTS = ["SOC 2", "ISO 27001", "PCI DSS", "GDPR", "HIPAA"];

const PROBE_STEPS = [
  "Resolving domain",
  "Probing HTTPS endpoint",
  "Inspecting TLS certificate",
  "Checking security headers",
  "Looking up email records (SPF, DMARC)",
  "Checking cookie flags",
  "Evaluating information disclosure",
  "Scoring risk factors",
  "Generating the decision",
];

// ---- Color helpers ----------------------------------------------------------
function tierColor(tier: string) {
  switch (tier) {
    case "Low": return "#10b981"; // emerald
    case "Moderate": return "#0167f7"; // blue
    case "Elevated": return "#f59e0b"; // amber
    default: return "#ef4444"; // red (High)
  }
}
function scoreColor(score: number) {
  if (score >= 80) return "#10b981";
  if (score >= 60) return "#0167f7";
  if (score >= 40) return "#f59e0b";
  return "#ef4444";
}
const SEVERITY: Record<Finding["severity"], { color: string; bg: string; label: string }> = {
  high: { color: "#f87171", bg: "rgba(239,68,68,0.12)", label: "High" },
  medium: { color: "#fbbf24", bg: "rgba(245,158,11,0.12)", label: "Medium" },
  low: { color: "#93c5fd", bg: "rgba(1,103,247,0.12)", label: "Low" },
  good: { color: "#6ee7b7", bg: "rgba(16,185,129,0.12)", label: "Good" },
};
function decisionStyle(decision: string) {
  if (decision.startsWith("Approve with")) return { icon: AlertTriangle, color: "#f59e0b" };
  if (decision.startsWith("Approve")) return { icon: CheckCircle2, color: "#10b981" };
  if (decision.startsWith("Do not")) return { icon: XCircle, color: "#ef4444" };
  return { icon: Info, color: "#0167f7" }; // Further review
}

// ---- Circular score gauge ---------------------------------------------------
function Gauge100({ score }: { score: number }) {
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const [shown, setShown] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => setShown(score), 100);
    return () => clearTimeout(t);
  }, [score]);
  const color = scoreColor(score);
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * shown) / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${color}66)` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-white">{score}</span>
        <span className="text-[10px] uppercase tracking-widest text-white/40">Security score</span>
      </div>
    </div>
  );
}

// ---- Main -------------------------------------------------------------------
export default function RiskAssessment() {
  const [target, setTarget] = React.useState("");
  const [industry, setIndustry] = React.useState("");
  const [dataSensitivity, setDataSensitivity] = React.useState("pii");
  const [certs, setCerts] = React.useState<string[]>([]);
  const [notes, setNotes] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [result, setResult] = React.useState<RiskResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [showEvidence, setShowEvidence] = React.useState(false);
  const [showGrcPopup, setShowGrcPopup] = React.useState(false);

  // Surface the GRC upsell popup shortly after a result lands (so the user sees
  // their score first). Cleared whenever the result is reset.
  React.useEffect(() => {
    if (!result) {
      setShowGrcPopup(false);
      return;
    }
    const t = setTimeout(() => setShowGrcPopup(true), 1400);
    return () => clearTimeout(t);
  }, [result]);

  // Cycle the probe steps while loading.
  React.useEffect(() => {
    if (!loading) return;
    setStep(0);
    const id = setInterval(() => setStep((s) => Math.min(s + 1, PROBE_STEPS.length - 1)), 1200);
    return () => clearInterval(id);
  }, [loading]);

  const toggleCert = (c: string) =>
    setCerts((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));

  const run = async () => {
    if (!target.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/risk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          target,
          questionnaire: { industry, dataSensitivity, certifications: certs, notes },
        }),
      });
      const data = await res.json();
      if (!res.ok) setError(data?.error ?? "Assessment failed.");
      else setResult(data as RiskResult);
    } catch {
      setError("Could not run the assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10">
      {/* Header (centered, aligns with the form below) */}
      <div className="mb-10 flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0167f7]/30 to-[#22d3ee]/10 ring-1 ring-[#0167f7]/40 shadow-[0_0_28px_rgba(1,103,247,0.3)]">
          <Gauge className="h-7 w-7 text-[#22d3ee]" />
        </div>
        <span className="mb-2.5 rounded-full border border-[#0167f7]/30 bg-[#0167f7]/10 px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7db1ff]">
          AI Agent
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-white md:text-[28px]">
          Third-Party Risk Assessment
        </h1>
        <p className="mt-2.5 max-w-md text-[13px] leading-relaxed text-white/45">
          Enter a vendor domain. Our AI agent gathers live security signals and returns an
          explainable risk score and onboarding decision.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {/* STEP 2: Analyzing */}
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-8"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#0167f7]/15 ring-1 ring-[#0167f7]/30">
              <Loader2 className="h-7 w-7 animate-spin text-[#0167f7]" />
            </div>
            <p className="mb-5 text-center text-sm text-white/60">
              Assessing <span className="font-medium text-white">{target}</span>
            </p>
            <ul className="mx-auto w-fit space-y-2">
              {PROBE_STEPS.map((s, i) => (
                <li key={s} className="flex items-center gap-2.5 text-sm">
                  {i < step ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                  ) : i === step ? (
                    <Loader2 className="h-4 w-4 shrink-0 animate-spin text-[#0167f7]" />
                  ) : (
                    <span className="h-4 w-4 shrink-0 rounded-full border border-white/15" />
                  )}
                  <span className={i <= step ? "text-white/80" : "text-white/35"}>{s}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : result ? (
          /* STEP 3: Result */
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <button
              onClick={() => setResult(null)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/60 transition hover:border-[#0167f7]/40 hover:text-white"
            >
              <ArrowRight className="h-3.5 w-3.5 rotate-180" />
              New assessment
            </button>
            <ResultView result={result} showEvidence={showEvidence} setShowEvidence={setShowEvidence} />
          </motion.div>
        ) : (
          /* STEP 1: Form only */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mx-auto max-w-xl"
          >
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6 md:p-8">
              <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                Vendor domain
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && run()}
                  placeholder="acme.com"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.06] py-2.5 pl-9 pr-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#0167f7] focus:ring-1 focus:ring-[#0167f7]"
                />
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    <Building2 className="mr-1 inline h-3 w-3" /> Industry
                  </label>
                  <input
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Fintech"
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#0167f7] focus:ring-1 focus:ring-[#0167f7]"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                    <Lock className="mr-1 inline h-3 w-3" /> Data they handle
                  </label>
                  <select
                    value={dataSensitivity}
                    onChange={(e) => setDataSensitivity(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.06] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#0167f7] focus:ring-1 focus:ring-[#0167f7]"
                  >
                    {DATA_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value} className="bg-[#0b0a24]">
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  Claimed certifications
                </label>
                <div className="flex flex-wrap gap-2">
                  {CERTS.map((c) => {
                    const on = certs.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCert(c)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                          on
                            ? "bg-[#0167f7] text-white"
                            : "border border-white/15 text-white/60 hover:text-white"
                        }`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={run}
                disabled={!target.trim()}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#0167f7] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#0156d4] hover:shadow-[0_0_18px_rgba(1,103,247,0.55)] disabled:opacity-50"
              >
                <Gauge className="h-4 w-4" />
                Run risk assessment
              </button>
              <p className="mt-2 text-center text-[11px] text-white/30">
                Uses only public, non-intrusive signals. No login or scanning of private systems.
              </p>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* GRC upsell popup, shown just after the score appears */}
      <AnimatePresence>
        {showGrcPopup && result && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-[#0167f7]/30 bg-[#0b0a24] p-6 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowGrcPopup(false)}
                aria-label="Close"
                className="absolute right-3 top-3 rounded-lg p-1 text-white/40 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#0167f7]/30 to-[#22d3ee]/10 ring-1 ring-[#0167f7]/40">
                <ShieldCheckIcon />
              </div>
              <h3 className="text-lg font-bold text-white">Want the full picture?</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-white/60">
                This is an automated first-pass assessment. For a full third-party risk review,
                our GRC team can dig deeper into {result.target}.
              </p>
              <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0167f7] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#0156d4]"
                >
                  Book a GRC review <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services/grc"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
                >
                  Explore GRC service
                </Link>
              </div>
              <button
                onClick={() => setShowGrcPopup(false)}
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

// Small inline icon to avoid re-importing ShieldCheck just for the popup.
function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6 text-[#22d3ee]" stroke="currentColor" strokeWidth={1.8}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
      <path d="m9 12 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ResultView({
  result,
  showEvidence,
  setShowEvidence,
}: {
  result: RiskResult;
  showEvidence: boolean;
  setShowEvidence: (v: boolean) => void;
}) {
  const tColor = tierColor(result.risk_tier);
  const dec = decisionStyle(result.decision);
  const DecIcon = dec.icon;

  return (
    <>
      {/* Toolbar */}
      <div className="flex justify-end">
        <button
          onClick={() => downloadRiskPdf(result)}
          className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.04] px-3.5 py-2 text-xs font-medium text-white/80 transition hover:border-[#0167f7]/40 hover:text-white"
        >
          <Download className="h-3.5 w-3.5" />
          Download PDF
        </button>
      </div>

      {/* Score + decision header */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:gap-8">
          <Gauge100 score={result.overall_score} />
          <div className="flex-1 text-center sm:text-left">
            <p className="text-xs uppercase tracking-widest text-white/40">{result.target}</p>
            <div className="mt-1.5 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <span
                className="rounded-full px-3 py-1 text-sm font-semibold"
                style={{ color: tColor, backgroundColor: `${tColor}22` }}
              >
                {result.risk_tier} Risk
              </span>
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium"
                style={{ color: dec.color, backgroundColor: `${dec.color}18` }}
              >
                <DecIcon className="h-4 w-4" />
                {result.decision}
              </span>
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">{result.summary}</p>
          </div>
        </div>
      </div>

      {/* Category factor breakdown */}
      {result.categories.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">Risk factors</h3>
          <div className="space-y-4">
            {result.categories.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-white/80">{c.name}</span>
                  <span className="font-semibold" style={{ color: scoreColor(c.score) }}>
                    {c.score}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: scoreColor(c.score) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${c.score}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                </div>
                {c.rationale && <p className="mt-1 text-xs leading-snug text-white/45">{c.rationale}</p>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Findings */}
      {result.findings.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">Findings</h3>
          <ul className="space-y-2.5">
            {result.findings.map((f, i) => {
              const s = SEVERITY[f.severity];
              return (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                  <span
                    className="mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase"
                    style={{ color: s.color, backgroundColor: s.bg }}
                  >
                    {s.label}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-white">{f.title}</p>
                    {f.detail && <p className="mt-0.5 text-xs leading-snug text-white/50">{f.detail}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Recommended actions */}
      {result.recommended_actions.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/50">Recommended actions</h3>
          <ol className="space-y-2">
            {result.recommended_actions.map((a, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0167f7]/15 text-[11px] font-bold text-[#0167f7]">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-white/70">{a}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Evidence (transparency) */}
      {result.evidence && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
          <button
            onClick={() => setShowEvidence(!showEvidence)}
            className="flex w-full items-center justify-between p-4 text-sm font-medium text-white/70 transition hover:text-white"
          >
            <span className="flex items-center gap-2">
              <Info className="h-4 w-4" /> Evidence gathered (transparency)
            </span>
            <ChevronDown className={`h-4 w-4 transition ${showEvidence ? "rotate-180" : ""}`} />
          </button>
          {showEvidence && (
            <pre className="max-h-72 overflow-auto border-t border-white/10 p-4 text-[11px] leading-relaxed text-white/50">
              {JSON.stringify(result.evidence, null, 2)}
            </pre>
          )}
        </div>
      )}

      {/* CTA */}
      <div className="rounded-2xl border border-[#0167f7]/30 bg-gradient-to-r from-[#0167f7]/15 to-transparent p-6 text-center">
        <p className="text-sm text-white/70">
          This is an automated first-pass assessment. For a full third-party risk review,
          our GRC team can dig deeper.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0167f7] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#0156d4]"
          >
            Book a GRC review <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/services/grc"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/5"
          >
            Explore GRC service
          </Link>
        </div>
      </div>
    </>
  );
}
