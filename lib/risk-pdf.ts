import { jsPDF } from "jspdf";

// Shape mirrors the /risk/assess response used by the report UI.
export type RiskPdfData = {
  target: string;
  overall_score: number;
  risk_tier: string;
  decision: string;
  summary: string;
  categories: { name: string; score: number; rationale: string }[];
  findings: { severity: "good" | "low" | "medium" | "high"; title: string; detail: string }[];
  recommended_actions: string[];
};

type RGB = [number, number, number];

const NAVY: RGB = [10, 17, 43];
const BLUE: RGB = [1, 103, 247];
const INK: RGB = [28, 30, 38];
const GRAY: RGB = [110, 115, 125];
const LIGHT: RGB = [232, 234, 240];

function scoreRGB(score: number): RGB {
  if (score >= 80) return [16, 185, 129];
  if (score >= 60) return [1, 103, 247];
  if (score >= 40) return [245, 158, 11];
  return [239, 68, 68];
}
function severityRGB(sev: string): RGB {
  switch (sev) {
    case "high": return [239, 68, 68];
    case "medium": return [245, 158, 11];
    case "good": return [16, 185, 129];
    default: return [1, 103, 247]; // low
  }
}

export function downloadRiskPdf(d: RiskPdfData) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const M = 16; // margin
  const CW = W - M * 2; // content width
  let y = 0;

  const setFill = (c: RGB) => doc.setFillColor(c[0], c[1], c[2]);
  const setText = (c: RGB) => doc.setTextColor(c[0], c[1], c[2]);
  const setDraw = (c: RGB) => doc.setDrawColor(c[0], c[1], c[2]);

  const footer = () => {
    setDraw(LIGHT);
    doc.setLineWidth(0.2);
    doc.line(M, 285, W - M, 285);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setText(GRAY);
    doc.text("Secure Your Hacks  ·  Confidential  ·  Automated first-pass assessment", M, 290);
    doc.text("secureyourhacks.com", W - M, 290, { align: "right" });
  };

  const newPage = () => {
    footer();
    doc.addPage();
    y = M + 4;
  };
  const need = (h: number) => {
    if (y + h > 280) newPage();
  };

  const sectionHeading = (label: string) => {
    need(14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setText(INK);
    doc.text(label.toUpperCase(), M, y);
    setDraw(BLUE);
    doc.setLineWidth(0.6);
    doc.line(M, y + 1.6, M + 22, y + 1.6);
    y += 8;
  };

  // ---- Header band ----
  setFill(NAVY);
  doc.rect(0, 0, W, 30, "F");
  doc.setFont("courier", "normal");
  doc.setFontSize(7);
  setText([150, 160, 180]);
  doc.text("SECURE YOUR HACKS  ·  AI RISK AGENT", M, 12);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  setText([255, 255, 255]);
  doc.text("Third-Party Risk Assessment", M, 21);
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  doc.setFont("courier", "normal");
  doc.setFontSize(7);
  setText([150, 160, 180]);
  doc.text(date.toUpperCase(), W - M, 21, { align: "right" });

  y = 42;

  // ---- Target ----
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  setText(INK);
  doc.text(d.target, M, y);
  y += 9;

  // ---- Score summary card ----
  const cardH = 30;
  setFill([248, 249, 251]);
  doc.roundedRect(M, y, CW, cardH, 2, 2, "F");
  const cy = y + cardH / 2;

  // Score
  const sc = scoreRGB(d.overall_score);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  setText(sc);
  doc.text(String(d.overall_score), M + 10, cy + 2);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setText(GRAY);
  doc.text("/ 100", M + 10, cy + 9);
  doc.text("SECURITY SCORE", M + 10, cy - 8);

  // Divider
  setDraw(LIGHT);
  doc.setLineWidth(0.3);
  doc.line(M + 45, y + 5, M + 45, y + cardH - 5);

  // Tier
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setText(GRAY);
  doc.text("RISK TIER", M + 54, cy - 8);
  const tier = scoreRGB(d.overall_score);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  setText(tier);
  doc.text(d.risk_tier, M + 54, cy + 1);

  // Decision
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  setText(GRAY);
  doc.text("DECISION", M + 110, cy - 8);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  setText(INK);
  const decLines = doc.splitTextToSize(d.decision, CW - 108);
  doc.text(decLines, M + 110, cy + 1);

  y += cardH + 10;

  // ---- Executive summary ----
  if (d.summary) {
    sectionHeading("Executive Summary");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setText([60, 63, 72]);
    const lines = doc.splitTextToSize(d.summary, CW);
    lines.forEach((ln: string) => {
      need(6);
      doc.text(ln, M, y);
      y += 5.2;
    });
    y += 6;
  }

  // ---- Risk factors ----
  if (d.categories.length) {
    sectionHeading("Risk Factors");
    d.categories.forEach((c) => {
      const rationale = c.rationale
        ? doc.splitTextToSize(c.rationale, CW)
        : [];
      need(10 + rationale.length * 4.2);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      setText(INK);
      doc.text(c.name, M, y);
      const cc = scoreRGB(c.score);
      setText(cc);
      doc.text(String(c.score), W - M, y, { align: "right" });

      // bar
      y += 2.5;
      setFill(LIGHT);
      doc.roundedRect(M, y, CW, 2.4, 1, 1, "F");
      setFill(cc);
      doc.roundedRect(M, y, (CW * Math.max(0, Math.min(100, c.score))) / 100, 2.4, 1, 1, "F");
      y += 6;

      if (rationale.length) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        setText(GRAY);
        rationale.forEach((ln: string) => {
          need(4.2);
          doc.text(ln, M, y);
          y += 4;
        });
      }
      y += 4;
    });
    y += 2;
  }

  // ---- Findings ----
  if (d.findings.length) {
    sectionHeading("Findings");
    d.findings.forEach((f) => {
      const detail = f.detail ? doc.splitTextToSize(f.detail, CW - 20) : [];
      need(9 + detail.length * 4);

      const col = severityRGB(f.severity);
      // severity chip
      setFill(col);
      doc.roundedRect(M, y - 3.4, 16, 5, 1, 1, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(6.5);
      setText([255, 255, 255]);
      doc.text(f.severity.toUpperCase(), M + 8, y, { align: "center" });

      doc.setFont("helvetica", "bold");
      doc.setFontSize(9.5);
      setText(INK);
      const titleLines = doc.splitTextToSize(f.title, CW - 20);
      doc.text(titleLines, M + 20, y);
      y += titleLines.length * 4.6 + 1;

      if (detail.length) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(8.5);
        setText(GRAY);
        detail.forEach((ln: string) => {
          need(4);
          doc.text(ln, M + 20, y);
          y += 4;
        });
      }
      y += 4;
    });
    y += 2;
  }

  // ---- Recommended actions ----
  if (d.recommended_actions.length) {
    sectionHeading("Recommended Actions");
    d.recommended_actions.forEach((a, i) => {
      const lines = doc.splitTextToSize(a, CW - 8);
      need(lines.length * 5 + 2);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      setText(BLUE);
      doc.text(`${i + 1}.`, M, y);
      doc.setFont("helvetica", "normal");
      setText([60, 63, 72]);
      doc.text(lines, M + 6, y);
      y += lines.length * 5 + 2;
    });
  }

  footer();

  const safe = d.target.replace(/[^a-z0-9.-]/gi, "_");
  doc.save(`risk-assessment-${safe}-${Date.now()}.pdf`);
}
