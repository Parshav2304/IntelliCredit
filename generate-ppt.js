// ============================================================
// Intelli-Credit — Hackathon Presentation Generator
// Run: node generate-ppt.js
// Deps: npm install pptxgenjs react react-dom react-icons sharp
// ============================================================

const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "IntelliCredit — AI Credit Appraisal Engine";

// ── PALETTE ──────────────────────────────────────────────────
const BG       = "0A0C10";   // near-black
const SURFACE  = "10141C";   // dark navy
const CARD     = "151A25";   // card bg
const BORDER   = "1E2535";   // subtle border
const ACCENT   = "00D4AA";   // teal green
const WARN     = "F59E0B";   // amber
const DANGER   = "EF4444";   // red
const TEXT     = "E8EDF5";   // light text
const MUTED    = "6B7A99";   // muted text
const BLUE     = "3B82F6";   // blue

// ── SLIDE MASTER ─────────────────────────────────────────────
const addBase = (slide) => {
  slide.background = { color: BG };
  // Subtle top accent strip
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04, fill: { color: ACCENT }, line: { color: ACCENT }
  });
  // Bottom bar
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.55, w: 10, h: 0.075, fill: { color: SURFACE }, line: { color: SURFACE }
  });
  slide.addText("IntelliCredit — AI Credit Appraisal Engine  |  National Hackathon 2025", {
    x: 0.4, y: 5.56, w: 9.2, h: 0.07, fontSize: 7, color: MUTED, align: "left", margin: 0
  });
};

const card = (slide, x, y, w, h, fillColor = CARD, accentColor = null) => {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: fillColor },
    line: { color: BORDER, width: 0.75 },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.25 }
  });
  if (accentColor) {
    slide.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 0.05, h,
      fill: { color: accentColor },
      line: { color: accentColor }
    });
  }
};

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };
  // Top strip
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: ACCENT }, line: { color: ACCENT } });

  // Large glow circle BG element (decorative)
  s.addShape(pres.shapes.OVAL, {
    x: 5.8, y: -1.5, w: 5.5, h: 5.5,
    fill: { color: "00D4AA", transparency: 92 },
    line: { color: "00D4AA", width: 0.5, transparency: 80 }
  });

  // Hackathon badge
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.55, w: 2.8, h: 0.35,
    fill: { color: "00D4AA22" }, line: { color: ACCENT, width: 0.75 }
  });
  s.addText("🏆  NATIONAL HACKATHON 2025  —  TOP 10 / 500", {
    x: 0.5, y: 0.55, w: 2.8, h: 0.35, fontSize: 7.5, color: ACCENT,
    bold: true, align: "center", charSpacing: 0.5, margin: 0
  });

  // Main title
  s.addText([
    { text: "Intelli", options: { color: TEXT, bold: true } },
    { text: "Credit", options: { color: ACCENT, bold: true } }
  ], { x: 0.5, y: 1.15, w: 6.5, h: 1.1, fontSize: 64, fontFace: "Arial Black", margin: 0 });

  // Subtitle
  s.addText("AI-Powered Corporate Credit Appraisal Engine", {
    x: 0.5, y: 2.3, w: 6.5, h: 0.45, fontSize: 20, color: MUTED, fontFace: "Calibri", margin: 0
  });

  // Tagline
  s.addText("From weeks to minutes. From guesswork to explainable AI.", {
    x: 0.5, y: 2.85, w: 6.5, h: 0.35, fontSize: 13, color: TEXT, italic: true, margin: 0
  });

  // Three pill badges
  const pills = ["Data Ingestor", "Research Agent", "CAM Engine"];
  const pillColors = [BLUE, ACCENT, WARN];
  pills.forEach((p, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5 + i * 1.75, y: 3.45, w: 1.55, h: 0.36,
      fill: { color: pillColors[i], transparency: 82 },
      line: { color: pillColors[i], width: 0.75 }
    });
    s.addText(`${i + 1}. ${p}`, {
      x: 0.5 + i * 1.75, y: 3.45, w: 1.55, h: 0.36,
      fontSize: 9, color: pillColors[i], bold: true, align: "center", margin: 0
    });
  });

  // Right side — stat callouts
  const stats = [
    { num: "500+", label: "Teams Competed" },
    { num: "TOP 10", label: "National Ranking" },
    { num: "3", label: "AI Pillars Built" },
  ];
  stats.forEach((st, i) => {
    card(s, 7.0, 1.0 + i * 1.42, 2.65, 1.2, CARD, i === 1 ? ACCENT : BORDER);
    s.addText(st.num, {
      x: 7.1, y: 1.08 + i * 1.42, w: 2.45, h: 0.62,
      fontSize: 30, color: i === 1 ? ACCENT : TEXT, bold: true, align: "center", fontFace: "Arial Black", margin: 0
    });
    s.addText(st.label, {
      x: 7.1, y: 1.68 + i * 1.42, w: 2.45, h: 0.28,
      fontSize: 10, color: MUTED, align: "center", margin: 0
    });
  });

  // Bottom bar
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.55, w: 10, h: 0.075, fill: { color: SURFACE }, line: { color: SURFACE } });
  s.addText("Theme: Next-Gen Corporate Credit Appraisal — Bridging the Intelligence Gap", {
    x: 0.4, y: 5.56, w: 9.2, h: 0.07, fontSize: 7, color: MUTED, align: "left", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 — THE PROBLEM (Data Paradox)
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("THE PROBLEM", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: ACCENT, bold: true, charSpacing: 3, margin: 0 });
  s.addText("India's Corporate Credit — The Data Paradox", {
    x: 0.5, y: 0.5, w: 9, h: 0.65, fontSize: 30, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Big pain stat
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 4.2, h: 1.5,
    fill: { color: DANGER, transparency: 88 }, line: { color: DANGER, width: 0.75 }
  });
  s.addText("3–6", { x: 0.5, y: 1.32, w: 4.2, h: 0.85, fontSize: 62, color: DANGER, bold: true, align: "center", fontFace: "Arial Black", margin: 0 });
  s.addText("WEEKS to process one loan application", { x: 0.5, y: 2.1, w: 4.2, h: 0.55, fontSize: 11, color: TEXT, align: "center", margin: 0 });

  // Problem points
  const problems = [
    { icon: "📄", title: "Fragmented Data", desc: "GST filings, ITRs, bank statements, PDFs — all siloed and unlinked" },
    { icon: "🔍", title: "Missed Early Warnings", desc: "Buried signals in 200-page annual reports go unnoticed until default" },
    { icon: "🧠", title: "Human Bias", desc: "Subjective analyst judgement with no audit trail or explainability" },
    { icon: "🌐", title: "No External Intelligence", desc: "Litigation, MCA flags & sector news manually googled — or skipped" },
  ];
  problems.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 5.1 + col * 2.4;
    const y = 1.3 + row * 1.55;
    card(s, x, y, 2.25, 1.38, CARD, col === 0 ? WARN : BLUE);
    s.addText(p.icon, { x: x + 0.12, y: y + 0.1, w: 0.4, h: 0.4, fontSize: 18, margin: 0 });
    s.addText(p.title, { x: x + 0.12, y: y + 0.52, w: 2.05, h: 0.28, fontSize: 11, color: TEXT, bold: true, margin: 0 });
    s.addText(p.desc, { x: x + 0.12, y: y + 0.78, w: 2.05, h: 0.5, fontSize: 8.5, color: MUTED, margin: 0 });
  });

  // Quote callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.0, w: 4.2, h: 0.72,
    fill: { color: SURFACE }, line: { color: BORDER }
  });
  s.addText('"More data than ever — yet approvals still take weeks. The intelligence gap is costing banks and borrowers alike."', {
    x: 0.65, y: 3.06, w: 3.9, h: 0.6, fontSize: 9, color: MUTED, italic: true, margin: 0
  });

  // Arrow pointing to solution
  s.addText("→  Our solution bridges this gap with AI", {
    x: 0.5, y: 3.88, w: 4.2, h: 0.35, fontSize: 11, color: ACCENT, bold: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 3 — SOLUTION OVERVIEW
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("OUR SOLUTION", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: ACCENT, bold: true, charSpacing: 3, margin: 0 });
  s.addText("IntelliCredit — End-to-End AI Credit Decisioning", {
    x: 0.5, y: 0.5, w: 9, h: 0.65, fontSize: 26, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Central flow diagram — 3 pillars + output
  const pillars = [
    { num: "01", title: "Data Ingestor", sub: "Multi-Format Parsing", color: BLUE, icon: "📥",
      points: ["PDF / XLSX / scanned OCR", "GST ↔ Bank reconciliation", "Circular trading detection"] },
    { num: "02", title: "Research Agent", sub: "Digital Credit Manager", color: ACCENT, icon: "🔍",
      points: ["Web crawl: promoters, sector", "eCourts + MCA + SFIO", "Qualitative notes portal"] },
    { num: "03", title: "CAM Engine", sub: "Recommendation & Report", color: WARN, icon: "📋",
      points: ["Five Cs scoring model", "SHAP explainability", "PDF / DOCX CAM output"] },
  ];

  pillars.forEach((p, i) => {
    const x = 0.28 + i * 3.15;
    card(s, x, 1.35, 2.9, 3.5, CARD, p.color);
    // Number badge
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.15, y: 1.48, w: 0.5, h: 0.5,
      fill: { color: p.color, transparency: 75 }, line: { color: p.color }
    });
    s.addText(p.num, { x: x + 0.15, y: 1.48, w: 0.5, h: 0.5, fontSize: 11, color: p.color, bold: true, align: "center", margin: 0 });
    s.addText(p.icon, { x: x + 0.72, y: 1.47, w: 0.5, h: 0.5, fontSize: 20, margin: 0 });
    s.addText(p.title, { x: x + 0.12, y: 2.06, w: 2.65, h: 0.38, fontSize: 15, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0 });
    s.addText(p.sub, { x: x + 0.12, y: 2.42, w: 2.65, h: 0.28, fontSize: 9, color: p.color, bold: true, margin: 0 });
    p.points.forEach((pt, j) => {
      s.addText([{ text: "›  " + pt }], {
        x: x + 0.15, y: 2.82 + j * 0.48, w: 2.65, h: 0.42,
        fontSize: 9.5, color: MUTED, margin: 0
      });
    });
  });

  // Arrows between pillars
  [0, 1].forEach(i => {
    s.addShape(pres.shapes.LINE, {
      x: 3.18 + i * 3.15, y: 3.1, w: 0.26, h: 0,
      line: { color: ACCENT, width: 2 }
    });
    s.addText("→", { x: 3.15 + i * 3.15, y: 2.95, w: 0.35, h: 0.35, fontSize: 16, color: ACCENT, align: "center", margin: 0 });
  });

  // Output box
  card(s, 0.28, 5.0, 9.2, 0.42, "00D4AA18", ACCENT);
  s.addText("OUTPUT:  Comprehensive Credit Appraisal Memo (CAM)  •  Loan Amount  •  Risk-Adjusted Interest Rate  •  Explainable Decision Logic", {
    x: 0.38, y: 5.04, w: 9.0, h: 0.34, fontSize: 9.5, color: ACCENT, bold: true, align: "center", margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 — PILLAR 1: DATA INGESTOR
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("PILLAR 1", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: BLUE, bold: true, charSpacing: 3, margin: 0 });
  s.addText("Data Ingestor — Multi-Format Intelligence", {
    x: 0.5, y: 0.5, w: 9, h: 0.55, fontSize: 26, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Left: doc types
  const docs = [
    { icon: "📄", label: "Annual Reports (PDF)", sub: "Key commitments, risk factors, MD&A" },
    { icon: "🧾", label: "GST Returns (3B vs 2A)", sub: "Circular trading & inflation detection" },
    { icon: "🏦", label: "Bank Statements", sub: "Cash flow patterns & anomaly flags" },
    { icon: "⚖️", label: "Legal / DRT Notices", sub: "Recovery suits, wilful default flags" },
    { icon: "🏛️", label: "MCA Filings", sub: "Director history, charge records" },
  ];
  docs.forEach((d, i) => {
    card(s, 0.4, 1.25 + i * 0.78, 4.3, 0.68, CARD, BLUE);
    s.addText(d.icon, { x: 0.55, y: 1.3 + i * 0.78, w: 0.45, h: 0.45, fontSize: 18, margin: 0 });
    s.addText(d.label, { x: 1.1, y: 1.3 + i * 0.78, w: 3.5, h: 0.28, fontSize: 11, color: TEXT, bold: true, margin: 0 });
    s.addText(d.sub, { x: 1.1, y: 1.56 + i * 0.78, w: 3.5, h: 0.22, fontSize: 8.5, color: MUTED, margin: 0 });
  });

  // Right: GST reconciliation highlight
  card(s, 5.1, 1.25, 4.45, 3.9, CARD);
  s.addText("GST Reconciliation Engine", { x: 5.2, y: 1.35, w: 4.25, h: 0.3, fontSize: 12, color: ACCENT, bold: true, margin: 0 });
  s.addText("GSTR-3B  vs  GSTR-2A  vs  Bank Credits", { x: 5.2, y: 1.64, w: 4.25, h: 0.25, fontSize: 9, color: MUTED, margin: 0 });

  const rows = [
    ["Month", "3B (₹L)", "2A (₹L)", "Bank", "Flag"],
    ["Jan 24", "48.2", "46.5", "47.0", "✓ Clear"],
    ["Feb 24", "51.0", "49.0", "48.0", "✓ Clear"],
    ["Mar 24", "89.0", "42.0", "45.0", "⚠ +112%"],
    ["Jun 24", "92.0", "41.0", "43.0", "⚠ +124%"],
  ];
  const rowColors = [SURFACE, CARD, CARD, "EF444415", "EF444415"];
  const flagColors = [MUTED, ACCENT, ACCENT, DANGER, DANGER];
  rows.forEach((row, ri) => {
    const colWidths = [0.75, 0.72, 0.72, 0.72, 0.9];
    let cx = 5.15;
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: cx, y: 2.02 + ri * 0.38, w: colWidths[ci], h: 0.36,
        fill: { color: rowColors[ri] }, line: { color: BORDER, width: 0.5 }
      });
      s.addText(cell, {
        x: cx + 0.04, y: 2.04 + ri * 0.38, w: colWidths[ci] - 0.08, h: 0.3,
        fontSize: ri === 0 ? 8 : 9, color: ci === 4 ? flagColors[ri] : (ri === 0 ? MUTED : TEXT),
        bold: ri === 0 || ci === 4, align: "center", margin: 0
      });
      cx += colWidths[ci];
    });
  });

  // AI finding
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 3.98, w: 4.45, h: 0.9,
    fill: { color: DANGER, transparency: 90 }, line: { color: DANGER, width: 0.75 }
  });
  s.addText([
    { text: "🚨 AI Finding: ", options: { bold: true, color: DANGER } },
    { text: "GSTR-3B in Mar & Jun show revenue 112–124% above GSTR-2A purchase data — strong indicator of circular trading / revenue inflation.", options: { color: TEXT } }
  ], { x: 5.2, y: 4.04, w: 4.25, h: 0.78, fontSize: 8.5, margin: 0 });

  // Qualitative notes feature
  card(s, 0.4, 5.08, 4.3, 0.34, SURFACE);
  s.addText("📝  Credit Officer notes (site visit, DD) auto-parsed into risk score", {
    x: 0.5, y: 5.12, w: 4.1, h: 0.26, fontSize: 8.5, color: MUTED, italic: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 5 — PILLAR 2: RESEARCH AGENT
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("PILLAR 2", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: ACCENT, bold: true, charSpacing: 3, margin: 0 });
  s.addText("Research Agent — The Digital Credit Manager", {
    x: 0.5, y: 0.5, w: 9, h: 0.55, fontSize: 26, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Sources crawled
  const sources = [
    { icon: "📰", label: "Economic Times / Moneycontrol", color: BLUE },
    { icon: "⚖️", label: "eCourts Portal — Litigation History", color: DANGER },
    { icon: "🏛️", label: "MCA21 — Director & Charge Data", color: WARN },
    { icon: "🔎", label: "SFIO Enforcement Database", color: DANGER },
    { icon: "📊", label: "ICRA / CRISIL Sector Reports", color: ACCENT },
    { icon: "📋", label: "CIBIL Commercial Reports", color: BLUE },
  ];
  sources.forEach((src, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    card(s, 0.35 + col * 2.45, 1.3 + row * 0.75, 2.3, 0.65, CARD, src.color);
    s.addText(src.icon + "  " + src.label, {
      x: 0.48 + col * 2.45, y: 1.38 + row * 0.75, w: 2.1, h: 0.5,
      fontSize: 9, color: TEXT, bold: false, margin: 0
    });
  });

  // Right: Sample findings
  s.addText("Sample Findings — Sharma Chemicals Ltd.", {
    x: 5.15, y: 1.28, w: 4.4, h: 0.3, fontSize: 11, color: ACCENT, bold: true, margin: 0
  });

  const findings = [
    { type: "HIGH RISK", color: DANGER, icon: "🚨", title: "DRT Mumbai: Recovery suit ₹4.2 Cr (PNB)", src: "eCourts Portal" },
    { type: "CAUTION", color: WARN, icon: "⚠️", title: "Promoter named in SFIO probe — related-party txns", src: "Economic Times" },
    { type: "POSITIVE", color: ACCENT, icon: "✅", title: "Sector: Specialty chemicals +18% FY26 — ICRA", src: "Business Standard" },
    { type: "CAUTION", color: WARN, icon: "⚠️", title: "GST penalty ₹12L for missed Q2 deadline", src: "Moneycontrol" },
  ];
  findings.forEach((f, i) => {
    card(s, 5.1, 1.65 + i * 0.88, 4.45, 0.78, CARD);
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.65 + i * 0.88, w: 0.045, h: 0.78, fill: { color: f.color }, line: { color: f.color } });
    s.addText(f.icon, { x: 5.2, y: 1.7 + i * 0.88, w: 0.35, h: 0.35, fontSize: 16, margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.58, y: 1.72 + i * 0.88, w: 0.7, h: 0.22,
      fill: { color: f.color, transparency: 82 }, line: { color: f.color, width: 0.5 }
    });
    s.addText(f.type, { x: 5.58, y: 1.72 + i * 0.88, w: 0.7, h: 0.22, fontSize: 6.5, color: f.color, bold: true, align: "center", margin: 0 });
    s.addText(f.title, { x: 5.2, y: 1.97 + i * 0.88, w: 4.25, h: 0.28, fontSize: 9.5, color: TEXT, bold: true, margin: 0 });
    s.addText(f.src, { x: 5.2, y: 2.23 + i * 0.88, w: 4.25, h: 0.18, fontSize: 8, color: MUTED, margin: 0 });
  });

  // Qualitative portal note
  card(s, 0.35, 3.6, 4.7, 0.65, SURFACE, ACCENT);
  s.addText("📝 Qualitative Portal", { x: 0.5, y: 3.66, w: 4.45, h: 0.25, fontSize: 10, color: ACCENT, bold: true, margin: 0 });
  s.addText("Credit officers enter site visit observations → AI adjusts risk score in real-time based on NLP sentiment + key triggers", {
    x: 0.5, y: 3.9, w: 4.45, h: 0.28, fontSize: 8.5, color: MUTED, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 — PILLAR 3: CAM & DECISION ENGINE
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("PILLAR 3", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: WARN, bold: true, charSpacing: 3, margin: 0 });
  s.addText("CAM Generator & Decision Engine", {
    x: 0.5, y: 0.5, w: 9, h: 0.55, fontSize: 26, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Five Cs
  const fiveCs = [
    { c: "Character", score: 52, color: WARN },
    { c: "Capacity",  score: 71, color: ACCENT },
    { c: "Capital",   score: 68, color: ACCENT },
    { c: "Collateral",score: 74, color: BLUE },
    { c: "Conditions",score: 66, color: BLUE },
  ];
  s.addText("Five Cs Scoring", { x: 0.4, y: 1.22, w: 4.5, h: 0.3, fontSize: 11, color: MUTED, bold: true, margin: 0 });
  fiveCs.forEach((fc, i) => {
    const y = 1.55 + i * 0.62;
    card(s, 0.4, y, 4.5, 0.54, CARD);
    s.addText(fc.c, { x: 0.55, y: y + 0.05, w: 1.6, h: 0.28, fontSize: 11, color: TEXT, bold: true, margin: 0 });
    s.addText(String(fc.score), { x: 0.55, y: y + 0.28, w: 1.6, h: 0.22, fontSize: 9.5, color: fc.color, bold: true, margin: 0 });
    // Bar background
    s.addShape(pres.shapes.RECTANGLE, { x: 2.25, y: y + 0.16, w: 2.4, h: 0.22, fill: { color: BORDER }, line: { color: BORDER } });
    // Bar fill
    s.addShape(pres.shapes.RECTANGLE, { x: 2.25, y: y + 0.16, w: 2.4 * fc.score / 100, h: 0.22, fill: { color: fc.color }, line: { color: fc.color } });
  });

  // Composite score
  card(s, 0.4, 4.72, 4.5, 0.62, SURFACE, WARN);
  s.addText("Composite Score:", { x: 0.55, y: 4.8, w: 2.4, h: 0.28, fontSize: 11, color: MUTED, bold: true, margin: 0 });
  s.addText("63 / 100  —  MEDIUM-HIGH RISK", { x: 2.6, y: 4.8, w: 2.25, h: 0.28, fontSize: 11, color: WARN, bold: true, margin: 0 });
  s.addText("Weighted: Character 30% | Capacity 25% | Capital 20% | Collateral 15% | Conditions 10%", {
    x: 0.55, y: 5.05, w: 4.25, h: 0.22, fontSize: 7.5, color: MUTED, margin: 0
  });

  // Decision output
  card(s, 5.1, 1.22, 4.45, 2.3, CARD, WARN);
  s.addText("🏦  DECISION OUTPUT", { x: 5.25, y: 1.32, w: 4.2, h: 0.28, fontSize: 10, color: WARN, bold: true, charSpacing: 1, margin: 0 });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.25, y: 1.68, w: 4.1, h: 0.42,
    fill: { color: WARN, transparency: 82 }, line: { color: WARN }
  });
  s.addText("CONDITIONAL APPROVAL", {
    x: 5.25, y: 1.68, w: 4.1, h: 0.42, fontSize: 16, color: WARN, bold: true, align: "center", fontFace: "Arial Black", margin: 0
  });

  const decisions = [
    ["Loan Limit:", "₹8.5 Crore  (vs ₹15 Cr requested)"],
    ["Interest Rate:", "MCLR + 2.75%  (~11.5% p.a.)"],
    ["Tenor:", "36 months"],
    ["Security:", "Factory property + promoter guarantee"],
  ];
  decisions.forEach(([k, v], i) => {
    s.addText(k, { x: 5.25, y: 2.22 + i * 0.3, w: 1.5, h: 0.26, fontSize: 9.5, color: MUTED, bold: true, margin: 0 });
    s.addText(v, { x: 6.85, y: 2.22 + i * 0.3, w: 2.65, h: 0.26, fontSize: 9.5, color: TEXT, margin: 0 });
  });

  // Explainability block
  card(s, 5.1, 3.65, 4.45, 1.65, CARD, BLUE);
  s.addText("🧠  SHAP Explainability", { x: 5.25, y: 3.73, w: 4.2, h: 0.28, fontSize: 10, color: BLUE, bold: true, margin: 0 });

  const shap = [
    { label: "Promoter litigation (SFIO)", val: "−18 pts", color: DANGER },
    { label: "GST inflation anomaly", val: "−11 pts", color: DANGER },
    { label: "Low factory utilisation", val: "−8 pts", color: DANGER },
    { label: "Collateral coverage", val: "+14 pts", color: ACCENT },
    { label: "Positive sector outlook", val: "+9 pts", color: ACCENT },
  ];
  shap.forEach((sh, i) => {
    s.addText("›  " + sh.label, { x: 5.25, y: 4.08 + i * 0.28, w: 3.2, h: 0.24, fontSize: 8.5, color: TEXT, margin: 0 });
    s.addText(sh.val, { x: 8.4, y: 4.08 + i * 0.28, w: 1.1, h: 0.24, fontSize: 8.5, color: sh.color, bold: true, align: "right", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 7 — SYSTEM ARCHITECTURE
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("ARCHITECTURE", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: ACCENT, bold: true, charSpacing: 3, margin: 0 });
  s.addText("Technical Architecture & Stack", {
    x: 0.5, y: 0.5, w: 9, h: 0.55, fontSize: 26, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Layer boxes
  const layers = [
    { label: "INPUT LAYER", color: BLUE, items: ["GST / ITR / Bank XML", "PDF Docs (OCR)", "Scanned images", "MCA / eCourts APIs"] },
    { label: "DATABRICKS PIPELINE", color: ACCENT, items: ["Delta Lake ingestion", "PySpark transforms", "LLM extraction (Claude)", "Feature engineering"] },
    { label: "AI AGENTS", color: WARN, items: ["LangChain agents", "Tavily web search", "Vector store (FAISS)", "NLP sentiment (BERT)"] },
    { label: "OUTPUT LAYER", color: MUTED, items: ["XGBoost scorer + SHAP", "CAM (python-docx/PDF)", "React dashboard", "REST API"] },
  ];

  layers.forEach((l, i) => {
    card(s, 0.28 + i * 2.38, 1.3, 2.2, 3.55, CARD, l.color);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.28 + i * 2.38, y: 1.3, w: 2.2, h: 0.38,
      fill: { color: l.color, transparency: 80 }, line: { color: l.color }
    });
    s.addText(l.label, {
      x: 0.32 + i * 2.38, y: 1.33, w: 2.12, h: 0.3,
      fontSize: 8.5, color: l.color, bold: true, align: "center", charSpacing: 0.5, margin: 0
    });
    l.items.forEach((item, j) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.38 + i * 2.38, y: 1.85 + j * 0.68, w: 1.98, h: 0.56,
        fill: { color: SURFACE }, line: { color: BORDER }
      });
      s.addText(item, {
        x: 0.42 + i * 2.38, y: 1.9 + j * 0.68, w: 1.9, h: 0.46,
        fontSize: 9, color: TEXT, align: "center", margin: 0
      });
    });
    // Arrow
    if (i < layers.length - 1) {
      s.addText("→", {
        x: 2.28 + i * 2.38, y: 2.88, w: 0.3, h: 0.35,
        fontSize: 18, color: ACCENT, bold: true, align: "center", margin: 0
      });
    }
  });

  // India-specific callout
  card(s, 0.28, 5.02, 9.44, 0.38, "00D4AA12", ACCENT);
  s.addText("🇮🇳  India-Specific Intelligence:  GSTR-2A vs 3B Reconciliation  ·  CIBIL Commercial  ·  DRT / eCourts  ·  MCA21  ·  RBI Circular Parsing", {
    x: 0.4, y: 5.08, w: 9.2, h: 0.28, fontSize: 9, color: ACCENT, align: "center", bold: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 8 — DEMO SCREENSHOTS
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("LIVE DEMO", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: ACCENT, bold: true, charSpacing: 3, margin: 0 });
  s.addText("Prototype — Working End-to-End Demo", {
    x: 0.5, y: 0.5, w: 9, h: 0.55, fontSize: 26, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  const screens = [
    { title: "Step 1: Upload & Extract", color: BLUE, desc: "Drop PDFs, GST files & bank statements → AI extraction with GST reconciliation table showing circular trading flags" },
    { title: "Step 2: Research Agent", color: ACCENT, desc: "Watch agent crawl eCourts, MCA, news in real-time → Findings ranked by risk relevance with source attribution" },
    { title: "Step 3: CAM & Decision", color: WARN, desc: "Five Cs scoring cards + SHAP explainability + full Credit Appraisal Memo downloadable as PDF/DOCX" },
  ];

  screens.forEach((sc, i) => {
    const x = 0.3 + i * 3.18;
    // Simulated screen frame
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.25, w: 3.0, h: 2.2,
      fill: { color: SURFACE }, line: { color: sc.color, width: 1 },
      shadow: { type: "outer", blur: 12, offset: 3, angle: 135, color: "000000", opacity: 0.3 }
    });
    // Screen "chrome" bar
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.25, w: 3.0, h: 0.28,
      fill: { color: CARD }, line: { color: sc.color, width: 0.5 }
    });
    // Traffic light dots
    ["EF4444","F59E0B","00D4AA"].forEach((c, di) => {
      s.addShape(pres.shapes.OVAL, {
        x: x + 0.12 + di * 0.2, y: 1.32, w: 0.1, h: 0.1,
        fill: { color: c }, line: { color: c }
      });
    });
    // Content mockup lines
    for (let li = 0; li < 5; li++) {
      s.addShape(pres.shapes.RECTANGLE, {
        x: x + 0.15, y: 1.68 + li * 0.26, w: li % 2 === 0 ? 2.5 : 1.6, h: 0.14,
        fill: { color: li === 0 ? sc.color : BORDER, transparency: li === 0 ? 60 : 0 }, line: { color: "transparent" }
      });
    }
    // Label
    card(s, x, 3.55, 3.0, 0.42, CARD, sc.color);
    s.addText(sc.title, { x: x + 0.1, y: 3.61, w: 2.8, h: 0.28, fontSize: 10, color: sc.color, bold: true, margin: 0 });
    // Description
    s.addText(sc.desc, { x: x + 0.05, y: 4.06, w: 2.9, h: 0.7, fontSize: 8.5, color: MUTED, margin: 0 });
  });

  // CTA
  card(s, 0.3, 4.95, 9.4, 0.42, "00D4AA12", ACCENT);
  s.addText("✨  Full interactive prototype built with React + Claude API  ·  Available for live demo during judging", {
    x: 0.5, y: 5.01, w: 9.0, h: 0.3, fontSize: 10, color: ACCENT, align: "center", bold: true, margin: 0
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 9 — WHY US / DIFFERENTIATORS
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("DIFFERENTIATORS", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: ACCENT, bold: true, charSpacing: 3, margin: 0 });
  s.addText("Why IntelliCredit Wins", {
    x: 0.5, y: 0.5, w: 9, h: 0.55, fontSize: 28, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  const diff = [
    { icon: "🇮🇳", title: "India-First Design", color: ACCENT, desc: "Built specifically for GSTR-2A vs 3B, CIBIL Commercial, DRT recovery, MCA21, and RBI regulatory parsing — not a generic global tool." },
    { icon: "🧠", title: "Explainable AI, Not a Black Box", color: BLUE, desc: "Every decision comes with SHAP-based factor attribution. Judges, regulators and borrowers can see exactly why a limit was set." },
    { icon: "⚡", title: "End-to-End in One Platform", color: WARN, desc: "From raw scanned PDFs to a signed-off Credit Appraisal Memo — no human hand-offs, no spreadsheet exports, no tool-switching." },
    { icon: "🔗", title: "Multi-Source Synthesis", color: ACCENT, desc: "Uniquely cross-links GST data with bank flows, corroborates with eCourts and MCA filings, and validates against live news — all automatically." },
    { icon: "👤", title: "Human-in-the-Loop", color: BLUE, desc: "Credit officers can inject qualitative site-visit notes at any point. The AI recalibrates the risk score transparently around human insight." },
    { icon: "📋", title: "CAM-Ready Output", color: WARN, desc: "Generates a bank-grade Credit Appraisal Memo (Word/PDF) meeting RBI guidelines — ready to submit to credit committee on Day 1." },
  ];

  diff.forEach((d, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.35 + col * 4.8;
    const y = 1.28 + row * 1.35;
    card(s, x, y, 4.58, 1.2, CARD, d.color);
    s.addText(d.icon, { x: x + 0.12, y: y + 0.08, w: 0.55, h: 0.55, fontSize: 24, margin: 0 });
    s.addText(d.title, { x: x + 0.75, y: y + 0.1, w: 3.72, h: 0.32, fontSize: 13, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0 });
    s.addText(d.desc, { x: x + 0.75, y: y + 0.45, w: 3.72, h: 0.66, fontSize: 8.5, color: MUTED, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 10 — TEAM & ROADMAP
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  addBase(s);

  s.addText("TEAM & ROADMAP", { x: 0.5, y: 0.18, w: 9, h: 0.3, fontSize: 9, color: ACCENT, bold: true, charSpacing: 3, margin: 0 });
  s.addText("The Team Behind IntelliCredit", {
    x: 0.5, y: 0.5, w: 9, h: 0.55, fontSize: 26, color: TEXT, bold: true, fontFace: "Arial Black", margin: 0
  });

  // Team members
  const members = [
    { name: "Team Member 1", role: "AI / ML Engineer", skills: "LLM pipelines · LangChain · Vector DB", color: ACCENT },
    { name: "Team Member 2", role: "Data Engineer", skills: "Databricks · PySpark · Delta Lake", color: BLUE },
    { name: "Team Member 3", role: "Credit Domain Expert", skills: "Banking · Credit analysis · CAM writing", color: WARN },
    { name: "Team Member 4", role: "Full Stack Developer", skills: "React · FastAPI · Cloud deployment", color: BLUE },
  ];

  members.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.35 + col * 2.5;
    const y = 1.32 + row * 1.28;
    card(s, x, y, 2.35, 1.12, CARD, m.color);
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.12, y: y + 0.12, w: 0.62, h: 0.62,
      fill: { color: m.color, transparency: 70 }, line: { color: m.color }
    });
    s.addText(m.name.charAt(0), { x: x + 0.12, y: y + 0.12, w: 0.62, h: 0.62, fontSize: 18, color: m.color, bold: true, align: "center", margin: 0 });
    s.addText(m.name, { x: x + 0.82, y: y + 0.1, w: 1.45, h: 0.28, fontSize: 10.5, color: TEXT, bold: true, margin: 0 });
    s.addText(m.role, { x: x + 0.82, y: y + 0.36, w: 1.45, h: 0.24, fontSize: 9, color: m.color, margin: 0 });
    s.addText(m.skills, { x: x + 0.82, y: y + 0.6, w: 1.45, h: 0.44, fontSize: 7.5, color: MUTED, margin: 0 });
  });

  // Roadmap
  s.addText("Roadmap", { x: 5.2, y: 1.28, w: 4.4, h: 0.3, fontSize: 12, color: MUTED, bold: true, margin: 0 });

  const roadmap = [
    { phase: "Phase 1  ✓", label: "Hackathon MVP", desc: "3-pillar prototype, React UI, mock data demo", color: ACCENT },
    { phase: "Phase 2", label: "Banking Integration", desc: "Live CBS APIs, real GST portal, Finbox/CKYC", color: BLUE },
    { phase: "Phase 3", label: "Pilot Deployment", desc: "NBFC / regional bank pilot — 50 live cases", color: WARN },
    { phase: "Phase 4", label: "Scale & Compliance", desc: "RBI sandbox, SOC-2 audit, multi-bank rollout", color: MUTED },
  ];
  roadmap.forEach((r, i) => {
    card(s, 5.15, 1.62 + i * 0.88, 4.45, 0.76, CARD, r.color);
    s.addShape(pres.shapes.OVAL, {
      x: 5.28, y: 1.76 + i * 0.88, w: 0.35, h: 0.35,
      fill: { color: r.color, transparency: 75 }, line: { color: r.color }
    });
    s.addText(r.phase, { x: 5.68, y: 1.7 + i * 0.88, w: 1.6, h: 0.25, fontSize: 8.5, color: r.color, bold: true, margin: 0 });
    s.addText(r.label, { x: 5.68, y: 1.92 + i * 0.88, w: 3.8, h: 0.26, fontSize: 10.5, color: TEXT, bold: true, margin: 0 });
    s.addText(r.desc, { x: 5.68, y: 2.16 + i * 0.88, w: 3.8, h: 0.2, fontSize: 8, color: MUTED, margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 11 — CLOSING / THANK YOU
// ═══════════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.04, fill: { color: ACCENT }, line: { color: ACCENT } });

  // Decorative glow
  s.addShape(pres.shapes.OVAL, {
    x: -1, y: 0.5, w: 6, h: 6,
    fill: { color: "00D4AA", transparency: 93 }, line: { color: "00D4AA", transparency: 88 }
  });

  s.addText([
    { text: "Intelli", options: { color: TEXT } },
    { text: "Credit", options: { color: ACCENT } }
  ], { x: 1, y: 0.8, w: 8, h: 1.4, fontSize: 72, fontFace: "Arial Black", bold: true, align: "center", margin: 0 });

  s.addText("Bridging India's Credit Intelligence Gap — with AI", {
    x: 1, y: 2.18, w: 8, h: 0.5, fontSize: 17, color: MUTED, align: "center", italic: true, margin: 0
  });

  const summary = [
    { icon: "📥", label: "Data Ingestor" },
    { icon: "🔍", label: "Research Agent" },
    { icon: "📋", label: "CAM Engine" },
  ];
  summary.forEach((item, i) => {
    card(s, 1.9 + i * 2.15, 2.92, 1.9, 0.72, CARD, ACCENT);
    s.addText(item.icon + "  " + item.label, {
      x: 1.98 + i * 2.15, y: 3.02, w: 1.74, h: 0.52,
      fontSize: 11, color: TEXT, bold: true, align: "center", margin: 0
    });
  });

  // Award highlight
  s.addShape(pres.shapes.RECTANGLE, {
    x: 2.5, y: 3.88, w: 5.0, h: 0.55,
    fill: { color: ACCENT, transparency: 85 }, line: { color: ACCENT }
  });
  s.addText("🏆  TOP 10  of  500 Teams  —  National Level", {
    x: 2.5, y: 3.88, w: 5.0, h: 0.55, fontSize: 14, color: ACCENT, bold: true, align: "center", fontFace: "Arial Black", margin: 0
  });

  s.addText("Thank You  ·  Questions Welcome", {
    x: 1, y: 4.7, w: 8, h: 0.45, fontSize: 16, color: MUTED, align: "center", margin: 0
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 5.55, w: 10, h: 0.075, fill: { color: SURFACE }, line: { color: SURFACE } });
  s.addText("IntelliCredit — AI Credit Appraisal Engine  |  National Hackathon 2025", {
    x: 0.4, y: 5.56, w: 9.2, h: 0.07, fontSize: 7, color: MUTED, align: "center", margin: 0
  });
}

// ── WRITE FILE ───────────────────────────────────────────────────────────────
pres.writeFile({ fileName: "IntelliCredit_Hackathon_Presentation.pptx" })
  .then(() => console.log("✅  IntelliCredit_Hackathon_Presentation.pptx generated successfully!"))
  .catch(err => console.error("❌  Error:", err));
