import React, { useState } from 'react';
import { T } from '../theme';
import { SectionLabel, Chip, Spinner, ProgressBar, Card } from './Shared';
import { FileText, FileSpreadsheet, Building2, Gavel, FileSignature, Landmark, UploadCloud, CheckCircle2, AlertTriangle, Info, Database, Activity } from 'lucide-react';

const DOC_TYPES = [
  { key: "ar", icon: <FileText size={16} />, label: "Annual Report", color: T.blue, ext: "PDF" },
  { key: "gst", icon: <FileSpreadsheet size={16} />, label: "GST Returns", color: T.accent, ext: "XLSX" },
  { key: "bank", icon: <Landmark size={16} />, label: "Bank Statement", color: "#8B5CF6", ext: "PDF" },
  { key: "legal", icon: <Gavel size={16} />, label: "Legal / DRT Notice", color: T.danger, ext: "PDF" },
  { key: "mca", icon: <Building2 size={16} />, label: "MCA Filing", color: T.warn, ext: "PDF" },
  { key: "sanction", icon: <FileSignature size={16} />, iconColor: T.textSoft, label: "Sanction Letter", color: T.textSoft, ext: "PDF" },
];

const DEMO_FILES = [
  { id: 1, name: "Annual_Report_FY2024.pdf", size: 4200000, type: DOC_TYPES[0] },
  { id: 2, name: "GSTR3B_Apr23_Mar24.xlsx", size: 184000, type: DOC_TYPES[1] },
  { id: 3, name: "BankStatement_HDFC_FY24.pdf", size: 920000, type: DOC_TYPES[2] },
  { id: 4, name: "DRT_Notice_PNB_Mumbai.pdf", size: 224000, type: DOC_TYPES[3] },
  { id: 5, name: "MCA_Filings_FY2024.pdf", size: 380000, type: DOC_TYPES[4] },
];

const GST_ROWS = [
  { month: "Jan 2024", b3: 48.2, a2: 46.5, bank: 47.0, flag: false },
  { month: "Feb 2024", b3: 51.0, a2: 49.0, bank: 48.0, flag: false },
  { month: "Mar 2024", b3: 89.0, a2: 42.0, bank: 45.0, flag: true },
  { month: "Apr 2024", b3: 53.0, a2: 51.0, bank: 52.0, flag: false },
  { month: "May 2024", b3: 56.0, a2: 54.0, bank: 53.5, flag: false },
  { month: "Jun 2024", b3: 92.0, a2: 41.0, bank: 43.0, flag: true },
];

const EXTRACTED_DATA = {
  revenue: "₹42.8 Cr (FY24)",
  ebitda: "₹6.1 Cr (14.3%)",
  networth: "₹24.2 Cr",
  debt: "₹43.8 Cr",
  dscr: "1.42x",
  utilisation: "40% (site visit)",
};

export default function DataIngestor({ onComplete }) {
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
      await new Promise(r => setTimeout(r, 600 + Math.random() * 500));
      setProgress(p => ({ ...p, [f.id]: "done" }));
    }
    setProcessing(false);
    setDone(true);
  };

  const fmt = b => b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1000).toFixed(0)} KB`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Header */}
      <div className="fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <SectionLabel color={T.blue}>Pillar 01 — Data Ingestor</SectionLabel>
          <h2 style={{ fontFamily: T.sans, fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: "-.02em" }}>
            Multi-Format Document Intelligence
          </h2>
          <p style={{ fontSize: 14, color: T.textSoft, marginTop: 8, maxWidth: 520, lineHeight: 1.5 }}>
            Ingest PDFs, spreadsheets and scanned documents. AI extracts structured data and cross-validates GST filings against bank records to detect circular trading or revenue inflation.
          </p>
        </div>
        <Chip color={T.blue} size={12}>Step 1 / 3</Chip>
      </div>

      {/* Drop zone */}
      <div className="fade-up-1"
        onDrop={e => { e.preventDefault(); setDragging(false); loadDemo(); }}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={loadDemo}
        style={{
          border: `2px dashed ${dragging ? T.blue : T.border}`,
          borderRadius: 16, padding: "32px 24px", textAlign: "center",
          cursor: "pointer", background: dragging ? T.blueDim : T.card,
          transition: "all .2s ease",
        }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <div style={{ background: T.surface, padding: 16, borderRadius: '50%', border: `1px solid ${T.border}`, color: dragging ? T.blue : T.textSoft, transition: "color 0.2s ease" }}>
            <UploadCloud size={32} />
          </div>
        </div>
        <div style={{ color: T.text, fontWeight: 600, fontSize: 15, marginBottom: 6 }}>
          Drop entity documents or <span style={{ color: T.blue }}>click to load demo case</span>
        </div>
        <div style={{ fontSize: 13, color: T.textDim }}>
          PDF · XLSX · DOCX · Scanned images &nbsp;·&nbsp; Annual Reports, GST, Bank, Legal, MCA
        </div>
      </div>

      {/* Doc type tags */}
      <div className="fade-up-2" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {DOC_TYPES.map(d => (
          <span key={d.key} style={{
            display: "flex", alignItems: "center", gap: 8,
            background: T.card, border: `1px solid ${T.border}`, borderRadius: 10,
            padding: "8px 14px", fontSize: 13, color: T.textSoft,
          }}>
            <span style={{ color: d.color }}>{d.icon}</span>
            <span style={{ color: T.textSoft, fontWeight: 600 }}>{d.label}</span>
            <span style={{ background: T.surface, borderRadius: 4, padding: "2px 6px", fontSize: 10, fontFamily: T.mono, color: T.textDim }}>{d.ext}</span>
          </span>
        ))}
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="fade-up-2">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <SectionLabel style={{ marginBottom: 0 }}>{files.length} Documents Queued</SectionLabel>
            {!done && !processing && (
              <button onClick={runExtraction} className="btn-hover" style={{
                background: T.blue, color: "#fff", border: "none", borderRadius: 10,
                padding: "10px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer",
                display: "flex", alignItems: "center", gap: 8
              }}>
                <Activity size={16} /> Run AI Extraction
              </button>
            )}
            {processing && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Spinner size={16} /><span style={{ fontSize: 13, color: T.textSoft }}>Processing Pipeline...</span></div>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {files.map(f => {
              const st = progress[f.id];
              return (
                <div key={f.id} style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: T.card, border: `1px solid ${st === "done" ? T.accent + "44" : T.border}`,
                  borderRadius: 12, padding: "16px", transition: "all .3s ease",
                }}>
                  <div style={{ padding: 10, background: f.type.color + "15", borderRadius: 8, color: f.type.color }}>
                    {f.type.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.text }}>{f.name}</div>
                    <div style={{ fontSize: 12, color: T.textDim, marginTop: 4 }}>{f.type.label} · {fmt(f.size)}</div>
                    {st === "processing" && (
                      <div style={{ marginTop: 8 }}>
                        <ProgressBar value={Math.random() * 60 + 20} color={T.blue} height={6} />
                      </div>
                    )}
                  </div>
                  <div>
                    {!st && <Chip color={T.textDim} size={11}>Queued</Chip>}
                    {st === "processing" && <div style={{ display: "flex", alignItems: "center", gap: 8 }}><Spinner size={14} color={T.blue} /><span style={{ fontSize: 12, color: T.blue, fontWeight: 600 }}>Extracting</span></div>}
                    {st === "done" && <Chip color={T.accent}><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle2 size={12} /> Extracted</div></Chip>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GST Reconciliation - Early Warning Signal */}
      {done && (
        <div className="fade-up-3">
          <button onClick={() => setGstOpen(o => !o)} style={{
            display: "flex", alignItems: "center", gap: 12, background: gstOpen ? T.card : "transparent",
            border: `1px solid ${gstOpen ? T.borderHi : T.border}`, color: T.text, borderRadius: 12,
            padding: "14px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600, width: "100%",
            marginBottom: gstOpen ? 16 : 0, transition: "all 0.2s ease"
          }}>
            <AlertTriangle size={20} color={T.danger} />
            Early Warning Signal: GST vs Bank Reconciliation
            <Chip color={T.danger} size={11}>2 Anomalies Detected</Chip>
            <span style={{ marginLeft: "auto", color: T.textDim, fontSize: 13 }}>{gstOpen ? "▲ Collapse" : "▼ Expand"}</span>
          </button>

          {gstOpen && (
            <div style={{ background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr>
                    {["Month", "GSTR-3B (₹L)", "GSTR-2A (₹L)", "Bank Credits", "Variance", "Status"].map(h => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {GST_ROWS.map((row, i) => (
                    <tr key={i} style={{ background: row.flag ? T.dangerDim : "transparent" }}>
                      <td style={{ fontFamily: T.mono }}>{row.month}</td>
                      <td style={{ color: row.flag ? T.danger : T.text, fontWeight: row.flag ? 700 : 400, fontFamily: T.mono }}>₹{row.b3}L</td>
                      <td style={{ fontFamily: T.mono }}>₹{row.a2}L</td>
                      <td style={{ fontFamily: T.mono }}>₹{row.bank}L</td>
                      <td style={{ color: row.flag ? T.danger : T.accent, fontWeight: 700, fontFamily: T.mono }}>
                        {row.flag ? `↑ ${(((row.b3 - row.a2) / row.a2) * 100).toFixed(0)}%` : "Normal"}
                      </td>
                      <td>
                        {row.flag ? <Chip color={T.danger} size={10}>⚠ Revenue Inflation</Chip> : <Chip color={T.accent} size={10}>✓ Clear</Chip>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ padding: "16px 20px", background: T.dangerDim, borderTop: `1px solid ${T.danger}33`, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <AlertTriangle size={18} color={T.danger} style={{ marginTop: 2 }} />
                <div>
                  <div style={{ fontSize: 13, color: T.danger, fontWeight: 700, marginBottom: 4 }}>AI Fraud Detection Finding</div>
                  <div style={{ fontSize: 13, color: T.text, lineHeight: 1.5 }}>GSTR-3B in Mar-24 (+112%) and Jun-24 (+124%) significantly exceed GSTR-2A purchase data and bank credits. This is a strong indicator of <strong>circular trading or artificial revenue inflation</strong> to boost working capital eligibility.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Extracted Data */}
      {done && (
        <div className="fade-up-3">
          <button onClick={() => setExtractOpen(o => !o)} style={{
            display: "flex", alignItems: "center", gap: 12, background: extractOpen ? T.card : "transparent",
            border: `1px solid ${extractOpen ? T.borderHi : T.border}`, color: T.text, borderRadius: 12,
            padding: "14px 20px", cursor: "pointer", fontSize: 14, fontWeight: 600, width: "100%",
            marginBottom: extractOpen ? 16 : 0, transition: "all 0.2s ease"
          }}>
            <Database size={20} color={T.accent} />
            Extracted Financial Fundamentals
            <Chip color={T.accent} size={11}>6 Key Metrics</Chip>
            <span style={{ marginLeft: "auto", color: T.textDim, fontSize: 13 }}>{extractOpen ? "▲ Collapse" : "▼ Expand"}</span>
          </button>

          {extractOpen && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {Object.entries(EXTRACTED_DATA).map(([k, v]) => (
                <Card key={k} style={{ padding: "16px 20px" }}>
                  <div style={{ fontSize: 11, color: T.textDim, textTransform: "uppercase", letterSpacing: ".1em", fontFamily: T.mono, marginBottom: 8 }}>{k.replace(/_/g, " ")}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: T.text }}>{v}</div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Qualitative Notes */}
      {done && (
        <Card className="fade-up-4" accent={T.warn} style={{ padding: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Info size={16} color={T.warn} />
            <SectionLabel color={T.warn} style={{ marginBottom: 0 }}>Credit Officer — Qualitative Input (Primary Insight)</SectionLabel>
          </div>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} style={{
            width: "100%", background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 10, color: T.text, fontSize: 14, padding: "16px",
            resize: "vertical", minHeight: 90, lineHeight: 1.6, outline: "none",
            transition: "border 0.2s ease",
            fontFamily: T.body
          }}
            onFocus={e => e.target.style.borderColor = T.warn}
            onBlur={e => e.target.style.borderColor = T.border}
          />
          <div style={{ fontSize: 12, color: T.textDim, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
            <Activity size={12} /> These unstructured observations will be structurally parsed by the Research Agent to adjust the risk model.
          </div>
        </Card>
      )}

      {/* Continue */}
      {done && (
        <div className="fade-up-4" style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
          <button onClick={onComplete} className="btn-hover" style={{
            background: T.text, color: T.bg, border: "none", borderRadius: 12,
            padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer",
            fontFamily: T.sans, letterSpacing: "-.01em", display: "flex", alignItems: "center", gap: 8
          }}>Proceed to Secondary Intelligence Agent →</button>
        </div>
      )}
    </div>
  );
}
