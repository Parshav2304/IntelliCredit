import React, { useState } from 'react';
import { T } from '../theme';
import { SectionLabel, Chip, Spinner, ProgressBar, Card, StatusIndicator } from './Shared';
import { FileText, FileSpreadsheet, Building2, Gavel, FileSignature, Landmark, UploadCloud, CheckCircle2, AlertTriangle, Info, Database, Activity } from 'lucide-react';

const DOC_TYPES = [
  { key: "ar", icon: FileText, label: "Annual Report", color: "var(--blue)", ext: "PDF" },
  { key: "gst", icon: FileSpreadsheet, label: "GST Returns", color: "var(--accent)", ext: "XLSX" },
  { key: "bank", icon: Landmark, label: "Bank Statement", color: "#8B5CF6", ext: "PDF" },
  { key: "legal", icon: Gavel, label: "Legal / DRT Notice", color: "var(--danger)", ext: "PDF" },
  { key: "mca", icon: Building2, label: "MCA Filing", color: "var(--warn)", ext: "PDF" },
  { key: "sanction", icon: FileSignature, label: "Sanction Letter", color: "var(--text-soft)", ext: "PDF" },
];

const DEMO_FILES = [
  { id: 1, name: "Annual_Report_FY2024.pdf", size: 4200000, type: DOC_TYPES[0] },
  { id: 2, name: "GSTR3B_Apr23_Mar24.xlsx", size: 184000, type: DOC_TYPES[1] },
  { id: 3, name: "BankStatement_HDFC_FY24.pdf", size: 920000, type: DOC_TYPES[2] },
  { id: 4, name: "DRT_Notice_PNB_Mumbai.pdf", size: 224000, type: DOC_TYPES[3] },
  { id: 5, name: "MCA_Filings_FY2024.pdf", size: 380000, type: DOC_TYPES[4] },
];

const EXTRACTED_DATA = [
  { label: "Reported Revenue", value: "₹42.8 Cr", sub: "FY24 Audited", color: "var(--blue)" },
  { label: "Core EBITDA", value: "₹6.1 Cr", sub: "14.3% Margin", color: "var(--accent)" },
  { label: "Tangible Net Worth", value: "₹24.2 Cr", sub: "Clean Balance Sheet", color: "var(--accent)" },
  { label: "Gross Debt", value: "₹43.8 Cr", sub: "D/E: 1.8x", color: "var(--warn)" },
  { label: "Avg. DSCR", value: "1.42x", sub: "Serviceability: Adequate", color: "var(--blue)" },
  { label: "Capacity Utilization", value: "40%", sub: "Source: Field Visit", color: "var(--danger)" },
];

export default function DataIngestor({ onComplete }) {
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState({});
  const [done, setDone] = useState(false);
  const [notes, setNotes] = useState("Factory found operating at ~40% capacity. Management was evasive about Q3 revenue shortfall. Machinery looks aged — last capex approximately 4 years ago. Plant hygiene acceptable.");
  const [dragging, setDragging] = useState(false);

  const loadDemo = () => { if (!done && !processing) setFiles(DEMO_FILES); };

  const runExtraction = async () => {
    if (!files.length) return;
    setProcessing(true);
    for (const f of files) {
      setProgress(p => ({ ...p, [f.id]: "processing" }));
      await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
      setProgress(p => ({ ...p, [f.id]: "done" }));
    }
    setProcessing(false);
    setDone(true);
  };

  const fmt = b => b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1000).toFixed(0)} KB`;

  return (
    <div className="feature-container fade-up">
      {/* Header */}
      <div className="feature-header">
        <div className="header-text">
          <SectionLabel color="var(--blue)">Workflow Pipeline • Pillar 01</SectionLabel>
          <h2 className="feature-title">Multi-Format Document Intelligence</h2>
          <p className="feature-description">
            Ingest financial statements, GST returns, and legal filings. AI dynamically extracts structured intelligence and cross-validates records to detect credit risks in real-time.
          </p>
        </div>
        <div className="step-badge">
          <SectionLabel color="var(--blue)">Step 1 of 3</SectionLabel>
          <div className="step-dots">
            <div className="step-dot active" />
            <div className="step-dot" />
            <div className="step-dot" />
          </div>
        </div>
      </div>

      <div className="workspace-main">
        {/* Left Side: Upload & Queue */}
        <div className="workspace-left">
          <div className={`uplink card-hover ${dragging ? 'dragging' : ''} glass`}
            onDrop={e => { e.preventDefault(); setDragging(false); loadDemo(); }}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={loadDemo}>
            <div className="uplink-icon">
              <UploadCloud size={40} color="var(--accent)" />
            </div>
            <div className="uplink-title">Ingest Entity Documents</div>
            <div className="uplink-text">Drag & drop or <span className="text-highlight">load demo dataset</span></div>
            <div className="uplink-meta">PDF, XLSX, DOCX, JPEG supported</div>
          </div>

          <div className="doc-type-grid">
            {DOC_TYPES.map(d => {
              const Icon = d.icon;
              return (
                <div key={d.key} className="doc-type-item">
                  <div className="doc-type-icon" style={{ color: d.color, background: `color-mix(in srgb, ${d.color}, transparent 90%)` }}>
                    <Icon size={16} />
                  </div>
                  <div className="doc-type-info">
                    <span className="doc-type-label">{d.label}</span>
                    <span className="doc-type-ext">{d.ext}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {files.length > 0 && (
            <div className="queue-section fade-up-1">
              <div className="queue-header">
                <SectionLabel>{files.length} Items in Processing Queue</SectionLabel>
                {processing && <Spinner size={16} />}
              </div>
              <div className="queue-list scrollable">
                {files.map(f => {
                  const Icon = f.type.icon;
                  const st = progress[f.id];
                  return (
                    <div key={f.id} className={`queue-item ${st === 'done' ? 'done' : ''}`}>
                      <div className="q-icon" style={{ background: st === 'done' ? 'var(--accent-dim)' : 'var(--surface)', color: st === 'done' ? 'var(--accent)' : 'var(--text-dim)' }}>
                        {st === 'done' ? <CheckCircle2 size={16} /> : <Icon size={16} />}
                      </div>
                      <div className="q-info">
                        <div className="q-name">{f.name}</div>
                        <div className="q-meta">{fmt(f.size)} • {f.type.label}</div>
                      </div>
                      <div className="q-status">
                        {st === 'processing' && <Spinner size={14} color="var(--blue)" />}
                        {st === 'done' && <Chip color="var(--accent)">Verified</Chip>}
                        {!st && <Chip color="var(--text-dim)">Queued</Chip>}
                      </div>
                    </div>
                  );
                })}
              </div>
              {!done && !processing && (
                <button onClick={runExtraction} className="btn-action glow btn-hover">
                  <Activity size={18} /> <span>Deploy Extraction Engine</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Insights */}
        <div className="workspace-right">
          {!done ? (
            <Card glass className="empty-state">
              <div className="empty-icon"><Database size={48} color="var(--text-dim)" /></div>
              <h3>Waiting for Data Pipeline</h3>
              <p>Upload documents to initiate structural analysis and fraud detection algorithms.</p>
            </Card>
          ) : (
            <div className="insights-workspace fade-up-2">
              <div className="insight-section">
                <div className="insight-header">
                  <SectionLabel color="var(--accent)"><Database size={14} /> Structural Extraction Result</SectionLabel>
                  <StatusIndicator status="Sync Complete" />
                </div>
                <div className="metrics-bar">
                  {EXTRACTED_DATA.map((m, i) => (
                    <div key={i} className="metric-pill">
                      <div className="m-val" style={{ color: m.color }}>{m.value}</div>
                      <div className="m-lab">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="insight-section">
                <Card glass accent="var(--danger)" className="anomaly-card">
                  <div className="anomaly-header">
                    <AlertTriangle size={20} color="var(--danger)" />
                    <div className="anomaly-title">High-Risk Signal: Revenue Anomaly Detected</div>
                    <Chip color="var(--danger)">Critical</Chip>
                  </div>
                  <div className="anomaly-body">
                    <p>Cross-reconciliation of <strong>GSTR-3B vs Bank Credits</strong> reveals significant inflation in Mar-24 and Jun-24. AI indicates potential circular trading pattern to artificially inflate turnover.</p>
                    <div className="mini-table">
                      <div className="mt-row mt-head">
                        <span>Period</span><span>GST Declaration</span><span>Verified Credits</span><span>Variance</span>
                      </div>
                      <div className="mt-row">
                        <span>Mar-24</span><span>₹89.0L</span><span>₹45.0L</span><span className="text-danger">↑ 97%</span>
                      </div>
                      <div className="mt-row">
                        <span>Jun-24</span><span>₹92.0L</span><span>₹43.0L</span><span className="text-danger">↑ 113%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              <Card accent="var(--warn)" className="qual-notes-card">
                <SectionLabel color="var(--warn)"><FileSignature size={14} /> Operational Observation</SectionLabel>
                <textarea 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  className="notes-input"
                />
                <div className="notes-footer">
                  <Info size={12} /> Data will be structurally mapped to Character & Capacity pillars.
                </div>
              </Card>

              <div className="workspace-footer">
                <button onClick={onComplete} className="btn-proceed glow btn-hover">
                  Proceed to Intelligence Research →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .feature-container { display: flex; flex-direction: column; gap: 32px; padding: 10px; }
        .feature-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .feature-title { font-size: 32px; font-weight: 800; color: var(--text); letter-spacing: -0.03em; margin-top: 4px; }
        .feature-description { font-size: 15px; color: var(--text-soft); margin-top: 8px; max-width: 580px; line-height: 1.6; }

        .step-badge { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
        .step-dots { display: flex; gap: 6px; }
        .step-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border-hi); }
        .step-dot.active { background: var(--blue); box-shadow: 0 0 10px var(--blue); }

        .workspace-main { display: grid; grid-template-columns: 340px 1fr; gap: 32px; align-items: flex-start; }
        
        .workspace-left { display: flex; flex-direction: column; gap: 20px; }
        .uplink {
          padding: 32px 24px; text-align: center; cursor: pointer; border-radius: 20px;
          border: 1px dashed var(--border-hi) !important;
          background: hsla(var(--h-bg), 30%, 15%, 0.4) !important;
        }
        .uplink.dragging { border-color: var(--accent) !important; background: var(--accent-dim) !important; }
        .uplink-icon { margin-bottom: 20px; display: inline-flex; padding: 16px; border-radius: 50%; background: var(--surface); border: 1px solid var(--border); }
        .uplink-title { font-size: 16px; font-weight: 700; color: var(--text); margin-bottom: 6px; }
        .uplink-text { font-size: 13px; color: var(--text-soft); margin-bottom: 4px; }
        .text-highlight { color: var(--accent); font-weight: 600; }
        .uplink-meta { font-size: 11px; color: var(--text-dim); }

        .doc-type-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .doc-type-item {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
        }
        .doc-type-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .doc-type-info { display: flex; flex-direction: column; }
        .doc-type-label { font-size: 11px; font-weight: 600; color: var(--text-soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .doc-type-ext { font-size: 9px; font-family: var(--font-mono); color: var(--text-dim); }

        .queue-section { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .queue-header { display: flex; justify-content: space-between; align-items: center; padding: 0 4px; }
        .queue-list { display: flex; flex-direction: column; gap: 8px; max-height: 280px; overflow-y: auto; padding-right: 4px; }
        .queue-item { display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--card); border: 1px solid var(--border); border-radius: 10px; transition: var(--transition); }
        .queue-item.done { border-color: var(--accent-dim); background: hsla(var(--h-primary), 100%, 39%, 0.02); }
        .q-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .q-info { flex: 1; }
        .q-name { font-size: 12px; font-weight: 600; color: var(--text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
        .q-meta { font-size: 10px; color: var(--text-dim); }
        .btn-action { width: 100%; padding: 14px; background: var(--accent); color: var(--bg); border-radius: 12px; font-weight: 700; border: none; display: flex; align-items: center; justify-content: center; gap: 8px; --glow-color: var(--accent-dim); }

        .workspace-right { flex: 1; }
        .empty-state { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px; }
        .empty-icon { margin-bottom: 24px; opacity: 0.5; }
        .empty-state h3 { font-size: 20px; font-weight: 700; color: var(--text-soft); margin-bottom: 12px; }
        .empty-state p { font-size: 14px; color: var(--text-dim); max-width: 320px; }

        .insights-workspace { display: flex; flex-direction: column; gap: 24px; }
        .insight-section { display: flex; flex-direction: column; gap: 12px; }
        .insight-header { display: flex; justify-content: space-between; align-items: center; }
        
        .metrics-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .metric-pill { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 16px; }
        .m-val { font-size: 18px; font-weight: 800; color: var(--text); }
        .m-lab { font-size: 11px; font-weight: 600; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }

        .anomaly-card { padding: 20px !important; }
        .anomaly-header { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .anomaly-title { font-size: 15px; font-weight: 700; flex: 1; color: var(--text); }
        .anomaly-body p { font-size: 13px; color: var(--text-soft); line-height: 1.6; margin-bottom: 16px; }
        .mini-table { background: var(--bg); border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
        .mt-row { display: grid; grid-template-columns: 80px 1fr 1fr 80px; padding: 10px 16px; font-size: 12px; border-bottom: 1px solid var(--border); }
        .mt-row:last-child { border-bottom: none; }
        .mt-head { background: var(--surface); font-family: var(--font-mono); font-size: 10px; color: var(--text-dim); text-transform: uppercase; }
        .text-danger { color: var(--danger); font-weight: 700; }

        .qual-notes-card { padding: 20px !important; }
        .notes-input { width: 100%; height: 100px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; color: var(--text); padding: 16px; font-size: 14px; line-height: 1.6; resize: none; margin-top: 8px; outline: none; transition: var(--transition); }
        .notes-input:focus { border-color: var(--warn); }
        .notes-footer { margin-top: 10px; display: flex; align-items: center; gap: 6px; font-size: 11px; color: var(--text-dim); }

        .workspace-footer { display: flex; justify-content: flex-end; }
        .btn-proceed { padding: 16px 32px; background: var(--text); color: var(--bg); border-radius: 14px; font-weight: 800; font-size: 15px; display: flex; align-items: center; gap: 8px; --glow-color: hsla(0,0%,100%,0.1); }
      `}</style>
    </div>
  );
}
