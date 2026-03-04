import { useState, useRef, useEffect, useCallback } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg:        "#070B12",
  surface:   "#0D1117",
  card:      "#111827",
  cardHover: "#141e2e",
  border:    "#1F2D3D",
  borderHi:  "#2A3F54",
  accent:    "#00C896",
  accentDim: "#00C89615",
  accentMid: "#00C89630",
  warn:      "#F0A500",
  warnDim:   "#F0A50015",
  danger:    "#E8455A",
  dangerDim: "#E8455A15",
  blue:      "#3D8EF0",
  blueDim:   "#3D8EF015",
  text:      "#E2EAF4",
  textSoft:  "#94A3B8",
  textDim:   "#4B5E72",
  mono:      "'JetBrains Mono', 'Fira Code', monospace",
  sans:      "'Syne', 'DM Sans', system-ui, sans-serif",
  body:      "'DM Sans', system-ui, sans-serif",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: ${T.bg}; color: ${T.text}; font-family: ${T.body}; }
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: ${T.surface}; }
    ::-webkit-scrollbar-thumb { background: ${T.border}; border-radius: 10px; }
    textarea, input { font-family: ${T.body}; }
    @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
    @keyframes scanline { 0% { top: -10%; } 100% { top: 110%; } }
    @keyframes glow { 0%,100% { box-shadow: 0 0 8px ${T.accent}40; } 50% { box-shadow: 0 0 22px ${T.accent}70; } }
    .fade-up { animation: fadeUp .4s ease both; }
    .fade-up-1 { animation: fadeUp .4s .06s ease both; }
    .fade-up-2 { animation: fadeUp .4s .12s ease both; }
    .fade-up-3 { animation: fadeUp .4s .18s ease both; }
    .fade-up-4 { animation: fadeUp .4s .24s ease both; }
    .btn-hover:hover { opacity:.88; transform:translateY(-1px); }
    .btn-hover { transition: all .18s ease; }
    .card-hover:hover { border-color: ${T.borderHi} !important; background: ${T.cardHover} !important; }
    .card-hover { transition: all .18s ease; }
    .spin { animation: spin 1s linear infinite; }
    .pulse { animation: pulse 1.4s ease infinite; }
  `}</style>
);

// ─── ATOM COMPONENTS ─────────────────────────────────────────────────────────

const Chip = ({ color = T.accent, bg, children, size = 11 }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "2px 9px", borderRadius: 4,
    background: bg || color + "18", border: `1px solid ${color}44`,
    color, fontSize: size, fontWeight: 700, letterSpacing: ".06em",
    textTransform: "uppercase", whiteSpace: "nowrap",
  }}>{children}</span>
);

const Spinner = ({ size = 18, color = T.accent }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    border: `2px solid ${color}30`, borderTopColor: color,
    animation: "spin .7s linear infinite", flexShrink: 0,
  }} />
);

const ProgressBar = ({ value, color = T.accent, height = 5 }) => (
  <div style={{ background: T.border, borderRadius: 99, height, overflow: "hidden" }}>
    <div style={{
      width: `${value}%`, height: "100%", background: color,
      borderRadius: 99, transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
    }} />
  </div>
);

const Card = ({ children, style = {}, className = "", accent }) => (
  <div className={`card-hover ${className}`} style={{
    background: T.card, border: `1px solid ${T.border}`,
    borderLeft: accent ? `3px solid ${accent}` : undefined,
    borderRadius: 12, padding: 18, ...style,
  }}>{children}</div>
);

const SectionLabel = ({ children, color = T.accent }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: ".15em",
    textTransform: "uppercase", color, marginBottom: 10,
    fontFamily: T.mono,
  }}>{children}</div>
);

const Divider = () => (
  <div style={{ height: 1, background: T.border, margin: "20px 0" }} />
);

// ─── SIDEBAR NAV ──────────────────────────────────────────────────────────────
const STEPS = [
  { id: "ingest",   icon: "⬇", label: "Data Ingestor",    sub: "Pillar 01", color: T.blue },
  { id: "research", icon: "◎", label: "Research Agent",   sub: "Pillar 02", color: T.accent },
  { id: "cam",      icon: "◈", label: "CAM & Decision",   sub: "Pillar 03", color: T.warn },
];

const Sidebar = ({ active, setActive, completedSteps }) => (
  <aside style={{
    width: 230, background: T.surface, borderRight: `1px solid ${T.border}`,
    display: "flex", flexDirection: "column", padding: "24px 0",
    position: "sticky", top: 0, height: "100vh", flexShrink: 0,
  }}>
    {/* Logo */}
    <div style={{ padding: "0 22px 24px" }}>
      <div style={{ fontFamily: T.sans, fontSize: 22, fontWeight: 800, letterSpacing: "-.02em" }}>
        <span style={{ color: T.text }}>Intelli</span>
        <span style={{ color: T.accent }}>Credit</span>
      </div>
      <div style={{ fontSize: 10, color: T.textDim, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>
        AI Appraisal Engine
      </div>
    </div>

    <div style={{ height: 1, background: T.border, margin: "0 0 20px" }} />

    {/* Steps */}
    <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: "0 12px", flex: 1 }}>
      {STEPS.map((s, i) => {
        const isActive = active === s.id;
        const isDone = completedSteps.includes(s.id);
        return (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "12px 14px",
            background: isActive ? s.color + "15" : "transparent",
            border: `1px solid ${isActive ? s.color + "40" : "transparent"}`,
            borderRadius: 10, cursor: "pointer", textAlign: "left", width: "100%",
            transition: "all .18s",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              background: isActive ? s.color + "25" : T.card,
              border: `1px solid ${isActive ? s.color + "60" : T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, color: isActive ? s.color : T.textDim,
            }}>
              {isDone ? <span style={{ color: T.accent, fontSize: 12 }}>✓</span> : s.icon}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: isActive ? T.text : T.textSoft }}>{s.label}</div>
              <div style={{ fontSize: 10, color: isActive ? s.color : T.textDim, fontFamily: T.mono, marginTop: 1 }}>{s.sub}</div>
            </div>
          </button>
        );
      })}
    </div>

    {/* Case badge */}
    <div style={{ padding: "0 12px" }}>
      <div style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 10, padding: "12px 14px",
      }}>
        <div style={{ fontSize: 9, color: T.textDim, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: T.mono }}>Active Case</div>
        <div style={{ fontSize: 12, color: T.text, fontWeight: 600, marginTop: 4 }}>Sharma Specialty Chemicals</div>
        <div style={{ fontSize: 10, color: T.textSoft, marginTop: 2 }}>CIN: U24100MH2010PLC204762</div>
        <div style={{ marginTop: 8 }}>
          <Chip color={T.warn} size={10}>Under Review</Chip>
        </div>
      </div>
    </div>
  </aside>
);

// ─── PILLAR 1: DATA INGESTOR ──────────────────────────────────────────────────
const DOC_TYPES = [
  { key: "ar",      icon: "📄", label: "Annual Report",       color: T.blue,   ext: "PDF" },
  { key: "gst",     icon: "🧾", label: "GST Returns",         color: T.accent, ext: "XLSX" },
  { key: "bank",    icon: "🏦", label: "Bank Statement",      color: "#8B5CF6",ext: "PDF" },
  { key: "legal",   icon: "⚖️", label: "Legal / DRT Notice",  color: T.danger, ext: "PDF" },
  { key: "mca",     icon: "🏛️", label: "MCA Filing",          color: T.warn,   ext: "PDF" },
  { key: "sanction",icon: "📋", label: "Sanction Letter",     color: T.textSoft,ext: "PDF" },
];

const DEMO_FILES = [
  { id:1, name:"Annual_Report_FY2024.pdf",      size:4200000, type:DOC_TYPES[0] },
  { id:2, name:"GSTR3B_Apr23_Mar24.xlsx",       size:184000,  type:DOC_TYPES[1] },
  { id:3, name:"BankStatement_HDFC_FY24.pdf",   size:920000,  type:DOC_TYPES[2] },
  { id:4, name:"DRT_Notice_PNB_Mumbai.pdf",     size:224000,  type:DOC_TYPES[3] },
  { id:5, name:"MCA_Filings_FY2024.pdf",        size:380000,  type:DOC_TYPES[4] },
];

const GST_ROWS = [
  { month:"Jan 2024", b3:48.2, a2:46.5, bank:47.0, flag:false },
  { month:"Feb 2024", b3:51.0, a2:49.0, bank:48.0, flag:false },
  { month:"Mar 2024", b3:89.0, a2:42.0, bank:45.0, flag:true  },
  { month:"Apr 2024", b3:53.0, a2:51.0, bank:52.0, flag:false },
  { month:"May 2024", b3:56.0, a2:54.0, bank:53.5, flag:false },
  { month:"Jun 2024", b3:92.0, a2:41.0, bank:43.0, flag:true  },
];

const EXTRACTED_DATA = {
  revenue: "₹42.8 Cr (FY24)",
  ebitda: "₹6.1 Cr (14.3%)",
  networth: "₹24.2 Cr",
  debt: "₹43.8 Cr",
  dscr: "1.42x",
  utilisation: "40% (site visit)",
};

function DataIngestor({ onComplete }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({});
  const [done, setDone] = useState(false);
  const [gstOpen, setGstOpen] = useState(false);
  const [extractOpen, setExtractOpen] = useState(false);
  const [notes, setNotes] = useState("Factory found operating at ~40% capacity. Management was evasive about Q3 revenue shortfall. Machinery looks aged — last capex approximately 4 years ago. Plant hygiene acceptable.");
  const [dragging, setDragging] = useState(false);

  const loadDemo = () => { if (!done && !processing) setFiles(DEMO_FILES); };

  const runExtraction = async () => {
    if (!files.length) return;
    setProcessing(true);
    for (const f of files) {
      setProgress(p => ({ ...p, [f.id]: "processing" }));
      await new Promise(r => setTimeout(r, 800 + Math.random() * 700));
      setProgress(p => ({ ...p, [f.id]: "done" }));
    }
    setProcessing(false);
    setDone(true);
  };

  const fmt = b => b > 1e6 ? `${(b/1e6).toFixed(1)} MB` : `${(b/1000).toFixed(0)} KB`;

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      {/* Header */}
      <div className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <SectionLabel color={T.blue}>Pillar 01 — Data Ingestor</SectionLabel>
          <h2 style={{ fontFamily:T.sans, fontSize:26, fontWeight:800, color:T.text, letterSpacing:"-.02em" }}>
            Multi-Format Document Intelligence
          </h2>
          <p style={{ fontSize:13, color:T.textSoft, marginTop:6, maxWidth:480 }}>
            Ingest PDFs, spreadsheets and scanned documents. AI extracts structured data and cross-validates GST filings against bank records.
          </p>
        </div>
        <Chip color={T.blue}>Step 1 / 3</Chip>
      </div>

      {/* Drop zone */}
      <div className="fade-up-1"
        onDrop={e => { e.preventDefault(); setDragging(false); loadDemo(); }}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={loadDemo}
        style={{
          border: `2px dashed ${dragging ? T.blue : T.border}`,
          borderRadius: 14, padding: "28px 24px", textAlign:"center",
          cursor:"pointer", background: dragging ? T.blueDim : T.card,
          transition:"all .2s",
        }}>
        <div style={{ fontSize:32, marginBottom:10 }}>📂</div>
        <div style={{ color:T.text, fontWeight:600, fontSize:14, marginBottom:4 }}>
          Drop documents or <span style={{ color:T.blue }}>click to load demo set</span>
        </div>
        <div style={{ fontSize:12, color:T.textDim }}>
          PDF · XLSX · DOCX · Scanned images &nbsp;·&nbsp; Annual Reports, GST, Bank, Legal, MCA
        </div>
      </div>

      {/* Doc type tags */}
      <div className="fade-up-2" style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {DOC_TYPES.map(d => (
          <span key={d.key} style={{
            display:"flex", alignItems:"center", gap:6,
            background:T.card, border:`1px solid ${T.border}`, borderRadius:8,
            padding:"5px 12px", fontSize:12, color:T.textSoft,
          }}>
            <span>{d.icon}</span>
            <span style={{ color:d.color, fontWeight:600 }}>{d.label}</span>
            <span style={{ background:T.border, borderRadius:3, padding:"1px 5px", fontSize:10, fontFamily:T.mono }}>{d.ext}</span>
          </span>
        ))}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="fade-up-2">
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <SectionLabel>{files.length} Documents Queued</SectionLabel>
            {!done && !processing && (
              <button onClick={runExtraction} className="btn-hover" style={{
                background:T.blue, color:"#fff", border:"none", borderRadius:8,
                padding:"8px 20px", fontWeight:700, fontSize:13, cursor:"pointer",
              }}>▶ Run AI Extraction</button>
            )}
            {processing && <div style={{ display:"flex", alignItems:"center", gap:8 }}><Spinner /><span style={{ fontSize:12, color:T.textSoft }}>Processing...</span></div>}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {files.map(f => {
              const st = progress[f.id];
              return (
                <div key={f.id} style={{
                  display:"flex", alignItems:"center", gap:14,
                  background:T.card, border:`1px solid ${st==="done" ? T.accent+"44" : T.border}`,
                  borderRadius:10, padding:"12px 16px", transition:"all .3s",
                }}>
                  <span style={{ fontSize:22 }}>{f.type.icon}</span>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{f.name}</div>
                    <div style={{ fontSize:11, color:T.textDim, marginTop:2 }}>{f.type.label} · {fmt(f.size)}</div>
                    {st === "processing" && (
                      <div style={{ marginTop:6 }}>
                        <ProgressBar value={65} color={T.blue} />
                      </div>
                    )}
                  </div>
                  <div>
                    {!st && <Chip color={T.textDim} size={10}>Queued</Chip>}
                    {st === "processing" && <div style={{ display:"flex", alignItems:"center", gap:6 }}><Spinner size={14} color={T.blue} /><span style={{ fontSize:11, color:T.blue, fontWeight:600 }}>Extracting</span></div>}
                    {st === "done" && <Chip color={T.accent}>✓ Extracted</Chip>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GST Reconciliation */}
      {done && (
        <div className="fade-up-3">
          <button onClick={() => setGstOpen(o => !o)} style={{
            display:"flex", alignItems:"center", gap:10, background:"none",
            border:`1px solid ${T.border}`, color:T.text, borderRadius:8,
            padding:"10px 16px", cursor:"pointer", fontSize:13, fontWeight:600, width:"100%",
            marginBottom: gstOpen ? 12 : 0,
          }}>
            <span style={{ color:T.danger, fontSize:16 }}>⚠</span>
            GST vs Bank Reconciliation
            <Chip color={T.danger} size={10}>2 Anomalies Detected</Chip>
            <span style={{ marginLeft:"auto", color:T.textDim, fontSize:12 }}>{gstOpen ? "▲ Collapse" : "▼ Expand"}</span>
          </button>

          {gstOpen && (
            <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, overflow:"hidden" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
                <thead>
                  <tr style={{ background:T.surface }}>
                    {["Month","GSTR-3B (₹L)","GSTR-2A (₹L)","Bank Credits","Variance","Status"].map(h => (
                      <th key={h} style={{ padding:"10px 14px", color:T.textDim, fontWeight:700, textAlign:"left", borderBottom:`1px solid ${T.border}`, fontSize:10.5, textTransform:"uppercase", letterSpacing:".06em", fontFamily:T.mono }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GST_ROWS.map((row, i) => (
                    <tr key={i} style={{ background:row.flag ? T.dangerDim : "transparent", borderBottom:`1px solid ${T.border}` }}>
                      <td style={{ padding:"10px 14px", color:T.text, fontWeight:500, fontFamily:T.mono }}>{row.month}</td>
                      <td style={{ padding:"10px 14px", color:row.flag ? T.danger : T.text, fontWeight:row.flag ? 700 : 400, fontFamily:T.mono }}>₹{row.b3}L</td>
                      <td style={{ padding:"10px 14px", color:T.text, fontFamily:T.mono }}>₹{row.a2}L</td>
                      <td style={{ padding:"10px 14px", color:T.text, fontFamily:T.mono }}>₹{row.bank}L</td>
                      <td style={{ padding:"10px 14px", color:row.flag ? T.danger : T.accent, fontWeight:700, fontFamily:T.mono }}>
                        {row.flag ? `↑ ${(((row.b3 - row.a2)/row.a2)*100).toFixed(0)}%` : "Normal"}
                      </td>
                      <td style={{ padding:"10px 14px" }}>
                        {row.flag ? <Chip color={T.danger} size={10}>⚠ Revenue Inflation</Chip> : <Chip color={T.accent} size={10}>✓ Clear</Chip>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding:"14px 16px", background:T.dangerDim, borderTop:`1px solid ${T.danger}33` }}>
                <span style={{ fontSize:12, color:T.danger, fontWeight:700 }}>🚨 AI Finding: </span>
                <span style={{ fontSize:12, color:T.text }}>GSTR-3B in Mar-24 (+112%) and Jun-24 (+124%) significantly exceed GSTR-2A purchase data and bank credits — strong indicator of <strong>circular trading or revenue inflation</strong>. This will be flagged in the risk model.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Extracted Data */}
      {done && (
        <div className="fade-up-3">
          <button onClick={() => setExtractOpen(o => !o)} style={{
            display:"flex", alignItems:"center", gap:10, background:"none",
            border:`1px solid ${T.border}`, color:T.text, borderRadius:8,
            padding:"10px 16px", cursor:"pointer", fontSize:13, fontWeight:600, width:"100%",
            marginBottom: extractOpen ? 12 : 0,
          }}>
            <span style={{ color:T.accent, fontSize:16 }}>◈</span>
            Extracted Financial Data
            <Chip color={T.accent} size={10}>6 Key Metrics</Chip>
            <span style={{ marginLeft:"auto", color:T.textDim, fontSize:12 }}>{extractOpen ? "▲ Collapse" : "▼ Expand"}</span>
          </button>
          {extractOpen && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
              {Object.entries(EXTRACTED_DATA).map(([k, v]) => (
                <Card key={k} style={{ padding:"14px 16px" }}>
                  <div style={{ fontSize:10, color:T.textDim, textTransform:"uppercase", letterSpacing:".08em", fontFamily:T.mono, marginBottom:5 }}>{k.replace(/_/g, " ")}</div>
                  <div style={{ fontSize:16, fontWeight:700, color:T.accent, fontFamily:T.mono }}>{v}</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Qualitative Notes */}
      {done && (
        <Card className="fade-up-4" accent={T.warn}>
          <SectionLabel color={T.warn}>📝 Credit Officer — Site Visit & Due Diligence Notes</SectionLabel>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{
            width:"100%", background:T.surface, border:`1px solid ${T.border}`,
            borderRadius:8, color:T.text, fontSize:13, padding:"12px 14px",
            resize:"vertical", minHeight:90, lineHeight:1.6, outline:"none",
          }} />
          <div style={{ fontSize:11, color:T.textDim, marginTop:6 }}>
            These observations will be parsed by the Research Agent and factored into the final risk score.
          </div>
        </Card>
      )}

      {done && (
        <div className="fade-up-4" style={{ display:"flex", justifyContent:"flex-end" }}>
          <button onClick={onComplete} className="btn-hover" style={{
            background:T.accent, color:T.bg, border:"none", borderRadius:10,
            padding:"13px 32px", fontWeight:700, fontSize:14, cursor:"pointer",
            fontFamily:T.sans, letterSpacing:"-.01em",
          }}>Continue to Research Agent →</button>
        </div>
      )}
    </div>
  );
}

// ─── PILLAR 2: RESEARCH AGENT (Claude-powered) ────────────────────────────────
const SEARCH_QUERIES = [
  "Crawling Economic Times for promoter mentions — Rajesh Sharma...",
  "Scanning eCourts portal for litigation history...",
  "Querying MCA21 — director KYC & compliance records...",
  "Fetching RBI circulars: NBFC lending norms FY25...",
  "Searching sector news: specialty chemicals India FY25...",
  "Cross-referencing CIBIL Commercial signals...",
  "Checking SFIO enforcement action database...",
];

function ResearchAgent({ onComplete }) {
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [log, setLog] = useState([]);
  const [synthesis, setSynthesis] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [findings, setFindings] = useState([]);

  const STATIC_FINDINGS = [
    { type:"danger", icon:"🚨", source:"eCourts Portal", date:"03 Mar 2025", title:"DRT Mumbai: Recovery suit ₹4.2 Cr filed by Punjab National Bank (pending)", relevance:97 },
    { type:"warn",   icon:"⚠️", source:"Economic Times", date:"12 Jan 2025", title:"Promoter Rajesh Sharma named in SFIO probe for related-party transactions", relevance:94 },
    { type:"warn",   icon:"⚠️", source:"Moneycontrol",   date:"20 Nov 2024", title:"Company missed Q2 GST compliance deadline — ₹12L penalty levied by GSTN", relevance:88 },
    { type:"ok",     icon:"✅", source:"Business Standard",date:"08 Feb 2025",title:"Specialty chemicals sector demand forecast: +18% growth in FY26 — ICRA", relevance:81 },
    { type:"ok",     icon:"✅", source:"MCA21 Portal",   date:"15 Dec 2024", title:"Annual return filed on time. No director disqualification flags detected.", relevance:72 },
  ];

  const run = async () => {
    setRunning(true); setLog([]); setFindings([]); setSynthesis("");

    // Simulate crawl log
    for (const q of SEARCH_QUERIES) {
      await new Promise(r => setTimeout(r, 500 + Math.random() * 400));
      setLog(l => [...l, q]);
    }

    // Reveal findings one by one
    for (const f of STATIC_FINDINGS) {
      await new Promise(r => setTimeout(r, 350));
      setFindings(prev => [...prev, f]);
    }

    setRunning(false);

    // Stream synthesis via Claude API
    setStreaming(true);
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          stream:true,
          messages:[{
            role:"user",
            content:`You are a senior credit analyst at an Indian bank. Based on these research findings about Sharma Specialty Chemicals Ltd., write a concise 3-paragraph credit intelligence synthesis (no markdown headers, just flowing prose). 

Findings:
1. DRT Mumbai: Recovery suit ₹4.2 Cr filed by Punjab National Bank (pending)
2. Promoter Rajesh Sharma named in SFIO probe for related-party transactions  
3. Company missed Q2 GST deadline — ₹12L penalty
4. Specialty chemicals sector: +18% growth forecast FY26 (ICRA)
5. MCA annual return filed on time, no director disqualification
6. GST data cross-check found revenue inflation anomalies in Mar-24 (+112%) and Jun-24 (+124%)
7. Factory operating at 40% capacity (credit officer site visit)

Write a professional, data-driven synthesis covering: (1) key risk signals, (2) positive factors, (3) overall intelligence summary and recommended lending posture. Keep it sharp and banker-appropriate. About 120 words total.`
          }],
        }),
      });

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done: rd, value } = await reader.read();
        if (rd) break;
        buffer += decoder.decode(value, { stream:true });
        const lines = buffer.split("\n");
        buffer = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const j = JSON.parse(data);
            if (j.type === "content_block_delta" && j.delta?.text) {
              setSynthesis(s => s + j.delta.text);
            }
          } catch {}
        }
      }
    } catch {
      setSynthesis("Secondary research reveals two critical risk signals: an active DRT recovery case (₹4.2 Cr by PNB) and an SFIO probe on the promoter for related-party transactions — both significantly impair character scoring. GST anomalies in Mar-24 and Jun-24 corroborate data integrity concerns flagged during document extraction. On the positive side, sector outlook remains strong per ICRA (+18% FY26), and MCA compliance is clean.\n\nThe factory operating at 40% capacity (credit officer observation) limits near-term debt serviceability despite adequate collateral. Combined, the intelligence picture warrants a cautious lending posture — conditional approval at a reduced limit with enhanced monitoring covenants is recommended.");
    }
    setStreaming(false);
    setDone(true);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <SectionLabel color={T.accent}>Pillar 02 — Research Agent</SectionLabel>
          <h2 style={{ fontFamily:T.sans, fontSize:26, fontWeight:800, color:T.text, letterSpacing:"-.02em" }}>
            Digital Credit Manager
          </h2>
          <p style={{ fontSize:13, color:T.textSoft, marginTop:6, maxWidth:500 }}>
            AI agent autonomously crawls eCourts, MCA21, SFIO, news archives and sector reports. All findings are ranked by risk relevance.
          </p>
        </div>
        <Chip color={T.accent}>Step 2 / 3</Chip>
      </div>

      {/* Entity card */}
      <Card className="fade-up-1" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div>
          <div style={{ fontSize:10, color:T.textDim, letterSpacing:".1em", textTransform:"uppercase", fontFamily:T.mono }}>Target Entity</div>
          <div style={{ fontSize:18, fontWeight:700, color:T.text, marginTop:4 }}>Sharma Specialty Chemicals Ltd.</div>
          <div style={{ fontSize:12, color:T.textSoft, marginTop:3 }}>CIN: U24100MH2010PLC204762 · Promoter: Rajesh Sharma</div>
        </div>
        {!running && !done && (
          <button onClick={run} className="btn-hover" style={{
            background:T.accent, color:T.bg, border:"none", borderRadius:10,
            padding:"12px 24px", fontWeight:700, fontSize:13, cursor:"pointer",
          }}>🔍 Launch Agent</button>
        )}
        {running && <div style={{ display:"flex", alignItems:"center", gap:8 }}><Spinner color={T.accent} /><span style={{ fontSize:12, color:T.accent, fontWeight:600 }}>Agent running...</span></div>}
        {done && <Chip color={T.accent}>✓ Research Complete</Chip>}
      </Card>

      {/* Crawl log */}
      {log.length > 0 && (
        <Card className="fade-up-2" style={{ padding:"14px 16px" }}>
          <SectionLabel color={T.textDim}>Agent Activity Log</SectionLabel>
          <div style={{ fontFamily:T.mono, display:"flex", flexDirection:"column", gap:3 }}>
            {log.map((l, i) => (
              <div key={i} style={{ fontSize:11.5, color:i === log.length-1 && running ? T.accent : T.textDim, display:"flex", gap:8, alignItems:"center" }}>
                <span style={{ color:T.accent, fontSize:10 }}>›</span>
                {l}
                {(i < log.length-1 || !running) && <span style={{ color:T.accent, fontSize:10, marginLeft:"auto" }}>✓</span>}
                {i === log.length-1 && running && <Spinner size={12} color={T.accent} />}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Findings */}
      {findings.length > 0 && (
        <div className="fade-up-3">
          <SectionLabel color={T.textSoft}>{findings.length} Findings — Sorted by Risk Relevance</SectionLabel>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {findings.map((item, i) => (
              <div key={i} style={{
                display:"flex", gap:12, alignItems:"flex-start",
                background:T.card,
                border:`1px solid ${item.type==="danger" ? T.danger+"44" : item.type==="warn" ? T.warn+"44" : T.border}`,
                borderRadius:10, padding:"13px 16px",
              }}>
                <span style={{ fontSize:20, flexShrink:0, marginTop:1 }}>{item.icon}</span>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:600, color:T.text, marginBottom:5 }}>{item.title}</div>
                  <div style={{ fontSize:11, color:T.textDim, fontFamily:T.mono }}>
                    {item.source} · {item.date}
                  </div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:6, flexShrink:0 }}>
                  <Chip color={item.type==="danger" ? T.danger : item.type==="warn" ? T.warn : T.accent} size={10}>
                    {item.type==="danger" ? "HIGH RISK" : item.type==="warn" ? "CAUTION" : "POSITIVE"}
                  </Chip>
                  <span style={{ fontSize:10, color:T.textDim, fontFamily:T.mono }}>
                    relevance <span style={{ color:T.text, fontWeight:700 }}>{item.relevance}%</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Synthesis */}
      {(synthesis || streaming) && (
        <Card className="fade-up-4" style={{ borderColor:T.blue+"44", background:T.blueDim }}>
          <SectionLabel color={T.blue}>🤖 AI Intelligence Synthesis {streaming && <Spinner size={12} color={T.blue} />}</SectionLabel>
          <p style={{ fontSize:13, color:T.text, lineHeight:1.8, whiteSpace:"pre-wrap" }}>{synthesis}</p>
        </Card>
      )}

      {done && (
        <div className="fade-up-4" style={{ display:"flex", justifyContent:"flex-end" }}>
          <button onClick={onComplete} className="btn-hover" style={{
            background:T.accent, color:T.bg, border:"none", borderRadius:10,
            padding:"13px 32px", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:T.sans,
          }}>Generate CAM & Decision →</button>
        </div>
      )}
    </div>
  );
}

// ─── PILLAR 3: CAM ENGINE (Claude-powered) ────────────────────────────────────
const FIVE_CS = [
  { c:"Character",  icon:"👤", score:52, color:T.danger, summary:"SFIO probe on promoter, related-party transactions, late GST compliance. Significant credibility risk.", flags:["SFIO probe active","Related-party anomaly","GST compliance lapse"] },
  { c:"Capacity",   icon:"⚙️", score:71, color:T.warn,   summary:"DSCR 1.42x is adequate but factory at 40% utilisation limits near-term upside. Revenue CAGR 12% (3yr).", flags:["DSCR: 1.42x (adequate)","Factory: 40% utilisation","Revenue CAGR: 12%"] },
  { c:"Capital",    icon:"💰", score:68, color:T.warn,   summary:"D/E at 1.8x is elevated but within specialty chemicals sector norms. Net worth ₹24.2 Cr. No new equity infusion in 2 years.", flags:["D/E ratio: 1.8x","Net Worth: ₹24.2 Cr","No recent equity dilution"] },
  { c:"Collateral", icon:"🏭", score:74, color:T.accent, summary:"Primary security: factory land + building (Mumbai suburb) valued ₹38 Cr. Realizable value ~₹28 Cr (0.74x). Clear title, lien marked.", flags:["Primary: ₹38 Cr property","Realizable: ~₹28 Cr","Clear title, lien confirmed"] },
  { c:"Conditions", icon:"🌐", score:66, color:T.blue,   summary:"Specialty chemicals sector outlook positive (ICRA: +18% FY26). RBI NBFC tightening increases bank credit dependency — opportunity.", flags:["Sector: ICRA Positive","RBI NBFC tightening","Crude sensitivity: Medium"] },
];

function CAMEngine() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [camText, setCamText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [activeC, setActiveC] = useState(null);
  const [camVisible, setCamVisible] = useState(false);

  const composite = 63;
  const scoreColor = composite >= 75 ? T.accent : composite >= 55 ? T.warn : T.danger;

  const generate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    setGenerating(false);
    setDone(true);
    setStreaming(true);

    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          stream:true,
          messages:[{
            role:"user",
            content:`Generate a professional Credit Appraisal Memo (CAM) executive summary for Sharma Specialty Chemicals Ltd. Write in formal banking language. Include:

1. COMPANY OVERVIEW: Brief 2-line summary
2. CREDIT ASSESSMENT (Five Cs scores): Character 52/100, Capacity 71/100, Capital 68/100, Collateral 74/100, Conditions 66/100. Composite: 63/100 — Medium-High Risk
3. KEY RISKS: SFIO probe on promoter, active DRT recovery suit ₹4.2 Cr (PNB), GST revenue inflation anomalies Mar-24 & Jun-24, factory at 40% capacity
4. MITIGANTS: Adequate collateral (₹38 Cr property), positive sector outlook (ICRA +18% FY26), clean MCA compliance, DSCR 1.42x
5. RECOMMENDATION: Conditional Approval — ₹8.5 Crore (vs ₹15 Cr requested), MCLR + 2.75% (~11.5% p.a.), 36-month tenor
6. KEY COVENANTS: 3-4 bullet points

Format it cleanly with section headers in CAPS. About 200 words. Formal, precise, banker-grade language.`
          }],
        }),
      });

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      while (true) {
        const { done:rd, value } = await reader.read();
        if (rd) break;
        buf += decoder.decode(value, { stream:true });
        const lines = buf.split("\n"); buf = lines.pop();
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") continue;
          try {
            const j = JSON.parse(data);
            if (j.type==="content_block_delta" && j.delta?.text) setCamText(s => s + j.delta.text);
          } catch {}
        }
      }
    } catch {
      setCamText(`COMPANY OVERVIEW
Sharma Specialty Chemicals Ltd. (CIN: U24100MH2010PLC204762) is a Mumbai-based specialty chemicals manufacturer with revenue of ₹42.8 Cr (FY24) and a 12% revenue CAGR over three years.

CREDIT ASSESSMENT — FIVE Cs
Character: 52/100 — Materially impaired by active SFIO probe on promoter and related-party transaction anomalies. Capacity: 71/100 — DSCR of 1.42x is adequate; however factory utilisation at 40% limits serviceability. Capital: 68/100 — D/E at 1.8x; net worth ₹24.2 Cr, no recent equity infusion. Collateral: 74/100 — Factory property (Mumbai suburb) valued ₹38 Cr, realizable ~₹28 Cr; clean title. Conditions: 66/100 — Sector outlook positive (ICRA: +18% FY26); RBI NBFC tightening creates banking opportunity. COMPOSITE SCORE: 63/100 — MEDIUM-HIGH RISK.

KEY RISKS
Active DRT recovery suit (₹4.2 Cr, PNB). SFIO promoter probe (related-party transactions). GST revenue inflation anomalies (Mar-24: +112%, Jun-24: +124%). Factory under-utilisation (40%).

RECOMMENDATION
CONDITIONAL APPROVAL — ₹8.50 Crore (57% of requested ₹15 Cr) at MCLR + 2.75% (~11.5% p.a.), 36-month tenor.

KEY COVENANTS
• Quarterly stock audit by bank-appointed auditor
• Monthly GST reconciliation submission  
• Promoter personal guarantee mandatory
• No dividend declaration without prior bank NOC`);
    }
    setStreaming(false);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      <div className="fade-up" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <SectionLabel color={T.warn}>Pillar 03 — Decision Engine</SectionLabel>
          <h2 style={{ fontFamily:T.sans, fontSize:26, fontWeight:800, color:T.text, letterSpacing:"-.02em" }}>
            CAM Generator & Credit Decision
          </h2>
          <p style={{ fontSize:13, color:T.textSoft, marginTop:6, maxWidth:500 }}>
            Five Cs scoring · SHAP-style explainability · AI-generated Credit Appraisal Memo · Final lending recommendation.
          </p>
        </div>
        <Chip color={T.warn}>Step 3 / 3</Chip>
      </div>

      {!done && (
        <div className="fade-up-1" style={{ display:"flex", justifyContent:"center", padding:"40px 0" }}>
          <button onClick={generate} disabled={generating} className="btn-hover" style={{
            background: generating ? T.surface : T.warn, color: generating ? T.textSoft : T.bg,
            border:`2px solid ${generating ? T.border : T.warn}`, borderRadius:12,
            padding:"16px 40px", fontWeight:700, fontSize:16, cursor:generating ? "default":"pointer",
            display:"flex", alignItems:"center", gap:10, fontFamily:T.sans,
          }}>
            {generating ? <><Spinner color={T.warn} /> Generating CAM...</> : "⚡ Generate Credit Appraisal Memo"}
          </button>
        </div>
      )}

      {done && (
        <>
          {/* Score + Verdict */}
          <Card className="fade-up-1" style={{ display:"flex", alignItems:"center", gap:28, padding:22 }}>
            {/* Ring */}
            <div style={{ position:"relative", width:90, height:90, flexShrink:0 }}>
              <svg width={90} height={90} style={{ transform:"rotate(-90deg)", position:"absolute" }}>
                <circle cx={45} cy={45} r={36} fill="none" stroke={T.border} strokeWidth={8} />
                <circle cx={45} cy={45} r={36} fill="none" stroke={scoreColor} strokeWidth={8}
                  strokeDasharray={`${2*Math.PI*36*composite/100} ${2*Math.PI*36}`}
                  strokeLinecap="round" />
              </svg>
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontFamily:T.mono, fontSize:20, fontWeight:800, color:scoreColor }}>{composite}</span>
                <span style={{ fontSize:9, color:T.textDim, fontFamily:T.mono }}>/100</span>
              </div>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:10, color:T.textDim, letterSpacing:".1em", textTransform:"uppercase", fontFamily:T.mono }}>Composite Credit Score</div>
              <div style={{ fontFamily:T.sans, fontSize:28, fontWeight:800, color:scoreColor, lineHeight:1.1, marginTop:4 }}>{composite}<span style={{ fontSize:14, color:T.textSoft }}>/100</span></div>
              <div style={{ fontSize:12, color:T.textSoft, marginTop:4 }}>Risk Band: <strong style={{ color:T.warn }}>MEDIUM-HIGH</strong></div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ border:`2px solid ${T.warn}`, borderRadius:8, padding:"10px 18px", marginBottom:10, display:"inline-block" }}>
                <div style={{ fontFamily:T.sans, fontSize:17, fontWeight:800, color:T.warn }}>CONDITIONAL APPROVAL</div>
              </div>
              <div style={{ fontSize:12, color:T.textSoft }}>Limit: <strong style={{ color:T.text }}>₹8.5 Crore</strong></div>
              <div style={{ fontSize:12, color:T.textSoft }}>Rate: <strong style={{ color:T.text }}>MCLR + 2.75%</strong></div>
              <div style={{ fontSize:12, color:T.textSoft }}>Tenor: <strong style={{ color:T.text }}>36 months</strong></div>
            </div>
          </Card>

          {/* Five Cs */}
          <div className="fade-up-2">
            <SectionLabel color={T.textSoft}>Five Cs Analysis — Click to Expand</SectionLabel>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {FIVE_CS.map(fc => (
                <div key={fc.c} style={{
                  background:T.card, border:`1px solid ${activeC===fc.c ? fc.color+"66" : T.border}`,
                  borderRadius:10, overflow:"hidden", transition:"border-color .2s",
                }}>
                  <div onClick={() => setActiveC(activeC===fc.c ? null : fc.c)} style={{
                    padding:"13px 16px", display:"flex", alignItems:"center", gap:14, cursor:"pointer",
                  }}>
                    <span style={{ fontSize:20 }}>{fc.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:6 }}>{fc.c}</div>
                      <ProgressBar value={fc.score} color={fc.color} />
                    </div>
                    <span style={{ fontFamily:T.mono, fontSize:20, fontWeight:800, color:fc.color, minWidth:44, textAlign:"right" }}>{fc.score}</span>
                    <span style={{ color:T.textDim, fontSize:12, marginLeft:4 }}>{activeC===fc.c ? "▲":"▼"}</span>
                  </div>
                  {activeC===fc.c && (
                    <div style={{ padding:"0 16px 14px", borderTop:`1px solid ${T.border}` }}>
                      <p style={{ fontSize:12.5, color:T.textSoft, lineHeight:1.7, margin:"12px 0 10px" }}>{fc.summary}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {fc.flags.map((f,i) => (
                          <span key={i} style={{ background:T.surface, border:`1px solid ${T.border}`, color:T.textDim, fontSize:10.5, borderRadius:4, padding:"3px 9px", fontFamily:T.mono }}>{f}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SHAP + Covenants */}
          <div className="fade-up-3" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
            <Card style={{ borderColor:T.blue+"44", background:T.blueDim }}>
              <SectionLabel color={T.blue}>🧠 SHAP Explainability</SectionLabel>
              {[
                { label:"Promoter litigation (SFIO)", val:"−18 pts", pos:false },
                { label:"GST inflation anomaly (2 months)", val:"−11 pts", pos:false },
                { label:"Factory utilisation (40%)", val:"−8 pts", pos:false },
                { label:"Adequate collateral coverage", val:"+14 pts", pos:true },
                { label:"Positive sector outlook (ICRA)", val:"+9 pts", pos:true },
                { label:"Clean MCA compliance", val:"+6 pts", pos:true },
              ].map((s,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:`1px solid ${T.border}`, fontSize:12 }}>
                  <span style={{ color:T.textSoft }}>{s.label}</span>
                  <span style={{ fontFamily:T.mono, fontWeight:700, color:s.pos ? T.accent : T.danger }}>{s.val}</span>
                </div>
              ))}
            </Card>
            <Card style={{ borderColor:T.warn+"44", background:T.warnDim }}>
              <SectionLabel color={T.warn}>⚠ Conditions of Approval</SectionLabel>
              {[
                "Quarterly stock audit by bank-appointed auditor",
                "Monthly GST reconciliation submission",
                "Promoter personal guarantee mandatory",
                "No dividend without prior bank NOC",
                "Trigger review if DSCR drops below 1.20x",
              ].map((c,i) => (
                <div key={i} style={{ display:"flex", gap:8, padding:"5px 0", fontSize:12, color:T.textSoft, borderBottom:`1px solid ${T.border}` }}>
                  <span style={{ color:T.warn, flexShrink:0 }}>→</span>{c}
                </div>
              ))}
            </Card>
          </div>

          {/* CAM Text */}
          {(camText || streaming) && (
            <Card className="fade-up-4" style={{ borderColor:T.accent+"44" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                <SectionLabel color={T.accent}>📄 Credit Appraisal Memo — AI Generated {streaming && <Spinner size={12} color={T.accent} />}</SectionLabel>
                <button onClick={() => setCamVisible(v => !v)} style={{
                  background:"none", border:`1px solid ${T.border}`, color:T.textSoft,
                  borderRadius:6, padding:"4px 12px", fontSize:11, cursor:"pointer",
                }}>{camVisible ? "▲ Collapse" : "▼ View Full CAM"}</button>
              </div>
              {(camVisible || streaming) && (
                <div style={{
                  background:T.surface, border:`1px solid ${T.border}`, borderRadius:8,
                  padding:"16px 18px", fontSize:12.5, color:T.text, lineHeight:1.8,
                  whiteSpace:"pre-wrap", fontFamily:T.mono, maxHeight:320, overflowY:"auto",
                }}>{camText}{streaming && <span className="pulse" style={{ color:T.accent }}>▌</span>}</div>
              )}
              {!camVisible && !streaming && (
                <div style={{ fontSize:12, color:T.textDim }}>
                  CAM ready — {camText.length} characters · Click "View Full CAM" to expand
                </div>
              )}
            </Card>
          )}

          {/* Download row */}
          <Card className="fade-up-4" style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, color:T.text }}>Credit Appraisal Memo — Ready for Submission</div>
              <div style={{ fontSize:11, color:T.textDim, marginTop:3, fontFamily:T.mono }}>
                Sharma Specialty Chemicals Ltd. · {new Date().toLocaleDateString("en-IN")} · Composite: 63/100
              </div>
            </div>
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn-hover" style={{
                background:T.surface, color:T.text, border:`1px solid ${T.border}`,
                borderRadius:8, padding:"9px 18px", fontWeight:600, fontSize:12, cursor:"pointer",
              }}>📥 Download PDF</button>
              <button className="btn-hover" style={{
                background:T.accent, color:T.bg, border:"none",
                borderRadius:8, padding:"9px 18px", fontWeight:700, fontSize:12, cursor:"pointer",
              }}>📥 Download DOCX</button>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function IntelliCredit() {
  const [active, setActive] = useState("ingest");
  const [completed, setCompleted] = useState([]);

  const complete = (step, next) => {
    setCompleted(c => [...new Set([...c, step])]);
    setActive(next);
  };

  return (
    <>
      <GlobalStyles />
      <div style={{ display:"flex", minHeight:"100vh", background:T.bg }}>
        <Sidebar active={active} setActive={setActive} completedSteps={completed} />

        {/* Main content */}
        <main style={{ flex:1, overflowY:"auto", padding:"36px 40px", minHeight:"100vh" }}>
          {/* Top bar */}
          <div style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            marginBottom:32, paddingBottom:20, borderBottom:`1px solid ${T.border}`,
          }}>
            <div>
              <div style={{ fontSize:11, color:T.textDim, letterSpacing:".1em", textTransform:"uppercase", fontFamily:T.mono }}>National Hackathon 2025</div>
              <div style={{ fontSize:16, fontWeight:700, color:T.text, marginTop:2 }}>
                Next-Gen Corporate Credit Appraisal
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Chip color={T.textDim} size={10}>Case: SSCL-2025-0047</Chip>
              <Chip color={T.accent}>🏆 Top 10 / 500 Teams</Chip>
            </div>
          </div>

          {/* Pillar content */}
          <div key={active} style={{ animation:"fadeUp .35s ease both" }}>
            {active === "ingest"   && <DataIngestor  onComplete={() => complete("ingest",   "research")} />}
            {active === "research" && <ResearchAgent onComplete={() => complete("research", "cam")}      />}
            {active === "cam"      && <CAMEngine />}
          </div>
        </main>
      </div>
    </>
  );
}
