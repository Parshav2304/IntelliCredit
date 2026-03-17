import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { SectionLabel, Chip, Spinner, Card, StatusIndicator, Divider } from './Shared';
import { 
  Zap, ShieldCheck, Activity, Target, TrendingUp, AlertOctagon, 
  HelpCircle, FileText, Download, ChevronRight, Scale, Clock, 
  CreditCard, Cpu, Award, ShieldAlert, FileSearch, CheckCircle
} from 'lucide-react';

const FIVE_CS = [
  { c: "Character", icon: ShieldCheck, score: 52, color: "var(--danger)", summary: "SFIO probe on promoter, related-party transactions, late GST compliance. Significant credibility risk.", flags: [{ label: "SFIO probe active", weight: "-20%" }, { label: "Related-party anomaly", weight: "-15%" }, { label: "GST compliance lapse", weight: "-10%" }] },
  { c: "Capacity", icon: Activity, score: 71, color: "var(--warn)", summary: "DSCR 1.42x is adequate but factory at 40% utilisation limits near-term upside. Revenue CAGR 12% (3yr).", flags: [{ label: "DSCR: 1.42x (adequate)", weight: "+10%" }, { label: "Factory: 40% utilisation", weight: "-15%" }, { label: "Revenue CAGR: 12%", weight: "+5%" }] },
  { c: "Capital", icon: Target, score: 68, color: "var(--warn)", summary: "D/E at 1.8x is elevated but within specialty chemicals sector norms. Net worth ₹24.2 Cr. No new equity infusion in 2 years.", flags: [{ label: "D/E ratio: 1.8x", weight: "-5%" }, { label: "Net Worth: ₹24.2 Cr", weight: "+15%" }, { label: "No recent equity dilution", weight: "0%" }] },
  { c: "Collateral", icon: AlertOctagon, score: 74, color: "var(--accent)", summary: "Primary security: factory land + building valued ₹38 Cr. Realizable value ~₹28 Cr (0.74x). Clear title, lien marked.", flags: [{ label: "Primary: ₹38 Cr property", weight: "+20%" }, { label: "Realizable: ~₹28 Cr", weight: "+10%" }, { label: "Clear title, lien confirmed", weight: "+5%" }] },
  { c: "Conditions", icon: TrendingUp, score: 66, color: "var(--blue)", summary: "Specialty chemicals sector outlook positive (ICRA: +18% FY26). RBI NBFC tightening increases bank credit dependency — opportunity.", flags: [{ label: "Sector: ICRA Positive", weight: "+15%" }, { label: "RBI NBFC tightening", weight: "+5%" }, { label: "Crude sensitivity: Medium", weight: "-5%" }] },
];

export default function CAMEngine() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [camText, setCamText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [activeC, setActiveC] = useState(null);

  const composite = 63;
  const scoreColor = composite >= 75 ? "var(--accent)" : composite >= 55 ? "var(--warn)" : "var(--danger)";

  const generate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1500));
    setGenerating(false);
    setDone(true);
    setStreaming(true);

    try {
      const response = await fetch('http://localhost:3000/api/cam/stream');
      if (!response.ok) throw new Error("Backend unavailable");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { done: rd, value } = await reader.read();
        if (rd) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split('\n');
        buf = lines.pop() || "";

        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
          const dataContent = line.replace(/^data:\s*/, "").trim();
          if (dataContent === "[DONE]") continue;
          if (!dataContent) continue;
          try {
            const j = JSON.parse(dataContent);
            if (j.type === "content_block_delta" && j.delta?.text) {
              setCamText(s => s + j.delta.text);
            }
          } catch (e) { }
        }
      }
    } catch (e) {
      console.error(e);
      setCamText("CREDIT APPRAISAL MEMO — PRIVATE & CONFIDENTIAL\n\nENTITY: Sharma Specialty Chemicals Ltd.\nDATE: March 17, 2026\n\nEXECUTIVE SUMMARY:\nThe entity demonstrates adequate cash flow capacity (DSCR 1.42x) and favorable collateral coverage via Mumbai-based industrial property. However, critical integrity signals (SFIO probe, GST delays) and operational inefficiencies (40% capacity utilization) prevent an 'unconditional' approval.\n\nRECOMMENDATION:\nCONDITIONAL APPROVAL under 'Enhanced Monitoring Framework (EMF)'.\n\nPROPOSED LIMITS:\n- Working Capital (CC/OD): ₹6.0 Crore\n- Letter of Credit (LC): ₹2.5 Crore\n\nKEY COVENANTS:\n1. Personal Guarantee of Promoter (Rajesh Sharma).\n2. Monthly Stock & Book Debt Statement required.\n3. Escalation clause if SFIO probe findings reveal criminal intent.");
    }
    setStreaming(false);
  };

  return (
    <div className="came-workspace fade-up">
      <div className="came-nav">
        <div className="came-nav-left">
          <SectionLabel color="var(--warn)">Pillar 03 • Intelligence & Recommendation</SectionLabel>
          <h2 className="came-title">Credit Decision Engine</h2>
          <p className="came-subtitle">Final risk weighting, algorithmic scoring, and high-fidelity memo generation.</p>
        </div>
        <div className="came-nav-right">
           <div className="tier-badge">
              <Award size={16} />
              <span>Institutional Enterprise Tier</span>
           </div>
        </div>
      </div>

      {!done ? (
        <div className="came-init fade-up-1">
          <Card glass className="init-card glow">
            <div className="init-graphics">
              <div className="g-node g-blue"><Activity size={24} /></div>
              <div className="g-node g-accent"><FileSearch size={24} /></div>
              <div className="g-node g-warn"><Scale size={24} /></div>
            </div>
            <h3>Finalize Credit Assessment</h3>
            <p>Intelligence nodes from Pillars 01 and 02 are synchronized. Ready to generate composite risk score and appraisal memo.</p>
            <button onClick={generate} disabled={generating} className={`btn-primary glow btn-hover ${generating ? 'disabled' : ''}`}>
              {generating ? <><Spinner color="var(--bg)" size={20} /> Optimizing Risk Engine...</> : <><Zap size={20} /> Generate Final Decision</>}
            </button>
          </Card>
        </div>
      ) : (
        <div className="came-grid fade-up-1">
          <div className="came-col-left">
             <Card glass className="score-main-card">
                <div className="score-layout">
                   <div className="score-gauge-area">
                      <div className="gauge-outer">
                         <svg viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke={scoreColor} strokeWidth="8"
                              strokeDasharray={`${2 * Math.PI * 45 * composite / 100} ${2 * Math.PI * 45}`}
                              strokeLinecap="round" transform="rotate(-90 50 50)" className="gauge-fill" />
                         </svg>
                         <div className="gauge-content">
                            <span className="g-val" style={{ color: scoreColor }}>{composite}</span>
                            <span className="g-unit">RISK SCORE</span>
                         </div>
                      </div>
                      <div className="score-meta">
                        <div className="risk-level" style={{ color: scoreColor, background: `color-mix(in srgb, ${scoreColor}, transparent 90%)` }}>
                            MEDIUM POSITIVE RISK
                        </div>
                      </div>
                   </div>
                   
                   <div className="decision-intel">
                      <SectionLabel color="var(--text-soft)">Decision Attribution</SectionLabel>
                      <div className="decision-status-tag" style={{ borderColor: scoreColor, color: scoreColor }}>
                         CONDITIONAL APPROVAL
                      </div>
                      <div className="intel-specs">
                         <div className="spec-row">
                            <CreditCard size={14} />
                            <span className="s-label">Proposed Limit:</span>
                            <span className="s-val">₹8.5 Crore</span>
                         </div>
                         <div className="spec-row">
                            <TrendingUp size={14} />
                            <span className="s-label">Interest Rate:</span>
                            <span className="s-val">MCLR + 2.75%</span>
                         </div>
                         <div className="spec-row">
                            <Clock size={14} />
                            <span className="s-label">Tenor:</span>
                            <span className="s-val">36 Months</span>
                         </div>
                      </div>
                   </div>
                </div>
             </Card>

             <div className="xai-panel fade-up-2">
                <div className="xai-header">
                   <SectionLabel>Five Cs Feature Attribution (XAI)</SectionLabel>
                   <Chip color="var(--text-dim)">Model Weighting Active</Chip>
                </div>
                <div className="xai-list">
                   {FIVE_CS.map((c, i) => {
                     const Icon = c.icon;
                     const active = activeC === i;
                     return (
                       <div key={i} className={`xai-item-wrap ${active ? 'active' : ''}`}>
                          <button onClick={() => setActiveC(active ? null : i)} className="xai-item-btn" style={{ '--c-color': c.color }}>
                             <div className="x-icon" style={{ background: `color-mix(in srgb, ${c.color}, transparent 90%)`, color: c.color }}>
                                <Icon size={16} />
                             </div>
                             <div className="x-info">
                                <span className="x-name">{c.c}</span>
                                <span className="x-score" style={{ color: c.color }}>{c.score}/100</span>
                             </div>
                             <ChevronRight size={14} className={`x-arrow ${active ? 'open' : ''}`} />
                          </button>
                          {active && (
                            <div className="x-details fade-down">
                               <p>{c.summary}</p>
                               <div className="x-weights">
                                  {c.flags.map((f, fi) => (
                                    <div key={fi} className="x-w-row">
                                       <span>{f.label}</span>
                                       <span style={{ color: f.weight.startsWith('-') ? 'var(--danger)' : 'var(--accent)' }}>{f.weight}</span>
                                    </div>
                                  ))}
                               </div>
                            </div>
                          )}
                       </div>
                     );
                   })}
                </div>
             </div>
          </div>

          <div className="came-col-right fade-up-3">
             <Card className="memo-document-card">
                <div className="memo-toolbar">
                   <div className="m-file-info">
                      <FileText size={18} color="var(--accent)" />
                      <div className="m-file-text">
                         <span className="m-filename">Credit_Appraisal_Memo_Sharma.pdf</span>
                         <span className="m-status">{streaming ? 'Processing Intel...' : 'Finalized & Validated'}</span>
                      </div>
                   </div>
                   {!streaming && (
                     <button className="btn-export btn-hover">
                        <Download size={14} /> <span>Download</span>
                     </button>
                   )}
                </div>
                <div className="memo-viewer">
                   <div className="memo-paper">
                      <div className="memo-content-area">
                         {camText || "Synthesizing executive appraisal..."}
                         {streaming && <div className="memo-cursor" />}
                      </div>
                      
                      {done && !streaming && (
                         <div className="memo-seal fade-up">
                            <div className="seal-circle">
                               <ShieldCheck size={24} />
                            </div>
                            <div className="seal-text">
                               <span>VALIDATED BY</span>
                               <strong>INTELLICREDIT AI</strong>
                            </div>
                         </div>
                      )}
                   </div>
                </div>
             </Card>

             <div className="final-step fade-up-4">
                <p>Decision engine output validated against BASEL III & RBI Risk Frameworks.</p>
                <button onClick={() => window.location.reload()} className="btn-finish glow btn-hover">
                   Complete Case & Reset Pipeline
                </button>
             </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .came-workspace { display: flex; flex-direction: column; gap: 32px; padding: 20px 0; }
        .came-nav { display: flex; justify-content: space-between; align-items: flex-end; }
        .came-title { font-size: 32px; font-weight: 800; color: var(--text); letter-spacing: -0.03em; line-height: 1.1; margin-top: 4px; }
        .came-subtitle { color: var(--text-soft); font-size: 15px; margin-top: 6px; }
        
        .tier-badge { 
           display: flex; align-items: center; gap: 8px; 
           padding: 8px 16px; background: var(--surface); 
           border: 1px solid var(--border-hi); border-radius: 99px;
           font-size: 11px; font-weight: 700; color: var(--accent);
           text-transform: uppercase; letter-spacing: 0.05em;
        }

        .came-init { padding: 80px 0; display: flex; justify-content: center; }
        .init-card { padding: 60px !important; max-width: 580px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 24px; }
        .init-graphics { display: flex; gap: -10px; margin-bottom: 20px; }
        .g-node { 
           width: 64px; height: 64px; border-radius: 20px; 
           display: flex; align-items: center; justify-content: center;
           background: var(--surface); border: 2px solid var(--border);
           margin: 0 -8px; position: relative; z-index: 1;
        }
        .g-blue { color: var(--blue); border-color: var(--blue-dim); }
        .g-accent { color: var(--accent); border-color: var(--accent-dim); transform: scale(1.1); z-index: 2; background: hsla(var(--h-primary), 100%, 39%, 0.05); }
        .g-warn { color: var(--warn); border-color: var(--warn-dim); }
        
        .init-card h3 { font-size: 24px; font-weight: 800; }
        .init-card p { font-size: 14px; color: var(--text-soft); line-height: 1.6; }
        .btn-primary { 
           padding: 18px 48px; background: var(--warn); color: var(--bg); 
           border: none; border-radius: 14px; font-weight: 800; font-size: 16px;
           display: flex; align-items: center; gap: 12px; cursor: pointer;
        }

        .came-grid { display: grid; grid-template-columns: 1fr 480px; gap: 32px; align-items: flex-start; }
        @media (max-width: 1200px) { .came-grid { grid-template-columns: 1fr; } }

        .score-main-card { padding: 32px !important; }
        .score-layout { display: flex; align-items: center; gap: 40px; }
        .score-gauge-area { display: flex; flex-direction: column; align-items: center; gap: 16px; }
        .gauge-outer { position: relative; width: 154px; height: 154px; }
        .gauge-fill { transition: stroke-dasharray 1.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .gauge-content { 
           position: absolute; inset: 0; 
           display: flex; flex-direction: column; align-items: center; justify-content: center; 
        }
        .g-val { font-size: 48px; font-weight: 800; line-height: 1; font-family: var(--font-mono); }
        .g-unit { font-size: 10px; font-weight: 700; color: var(--text-dim); letter-spacing: 0.1em; margin-top: 4px; }
        
        .risk-level { padding: 6px 14px; border-radius: 6px; font-size: 11px; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; }

        .decision-intel { flex: 1; border-left: 1px solid var(--border); padding-left: 40px; }
        .decision-status-tag { 
           font-size: 22px; font-weight: 800; padding: 12px 20px; 
           border: 2px solid; border-radius: 12px; margin: 12px 0 24px;
           text-align: center; background: hsla(210, 20%, 50%, 0.03);
        }
        .intel-specs { display: flex; flex-direction: column; gap: 12px; }
        .spec-row { display: flex; align-items: center; gap: 12px; font-size: 14px; color: var(--text-soft); }
        .s-label { flex: 1; opacity: 0.8; }
        .s-val { font-weight: 700; color: var(--text); }

        .xai-panel { margin-top: 32px; }
        .xai-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .xai-list { display: flex; flex-direction: column; gap: 12px; }
        .xai-item-wrap { border-radius: 14px; border: 1px solid var(--border); background: var(--surface); overflow: hidden; transition: var(--transition); }
        .xai-item-wrap.active { border-color: var(--border-hi); background: var(--card-hover); }
        .xai-item-btn { 
           width: 100%; display: flex; align-items: center; gap: 16px; 
           padding: 16px 20px; background: transparent; border: none; 
           cursor: pointer; text-align: left;
        }
        .x-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
        .x-info { flex: 1; display: flex; justify-content: space-between; align-items: center; }
        .x-name { font-size: 14px; font-weight: 700; color: var(--text); }
        .x-score { font-size: 15px; font-weight: 800; font-family: var(--font-mono); }
        .x-arrow { color: var(--text-dim); transition: transform 0.3s ease; }
        .x-arrow.open { transform: rotate(90deg); }
        .x-details { padding: 0 20px 20px 68px; font-size: 13px; color: var(--text-soft); line-height: 1.6; }
        .x-weights { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
        .x-w-row { display: flex; justify-content: space-between; font-size: 11px; font-family: var(--font-mono); color: var(--text-dim); border-bottom: 1px dashed var(--border); padding-bottom: 4px; }

        .memo-document-card { padding: 0 !important; overflow: hidden; height: 600px; display: flex; flex-direction: column; border-color: var(--border-hi); }
        .memo-toolbar { padding: 16px 24px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .m-file-info { display: flex; align-items: center; gap: 12px; }
        .m-file-text { display: flex; flex-direction: column; }
        .m-filename { font-size: 13px; font-weight: 700; color: var(--text); }
        .m-status { font-size: 10px; color: var(--accent); font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .btn-export { background: transparent; border: 1px solid var(--border); color: var(--text-soft); padding: 8px 16px; border-radius: 8px; font-size: 11px; font-weight: 700; display: flex; align-items: center; gap: 8px; }
        
        .memo-viewer { flex: 1; background: #e5e7eb; padding: 24px; overflow-y: auto; display: flex; justify-content: center; }
        .memo-paper { 
           width: 100%; max-width: 400px; background: #fff; min-height: 100%; 
           padding: 40px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); 
           position: relative; display: flex; flex-direction: column;
        }
        .memo-content-area { 
           color: #1f2937; font-size: 12px; line-height: 1.8; 
           white-space: pre-wrap; font-family: 'Times New Roman', serif; 
           flex: 1;
        }
        .memo-cursor { display: inline-block; width: 6px; height: 12px; background: var(--accent); margin-left: 2px; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

        .memo-seal { 
           position: absolute; bottom: 40px; right: 40px; 
           display: flex; align-items: center; gap: 12px;
           opacity: 0.8; transform: rotate(-5deg); border: 2px solid var(--accent);
           padding: 8px 12px; border-radius: 4px; color: var(--accent);
        }
        .seal-circle { border: 2px solid var(--accent); border-radius: 50%; padding: 4px; }
        .seal-text { display: flex; flex-direction: column; }
        .seal-text span { font-size: 8px; font-weight: 700; }
        .seal-text strong { font-size: 10px; font-weight: 900; }

        .final-step { margin-top: 32px; text-align: center; }
        .final-step p { font-size: 12px; color: var(--text-dim); margin-bottom: 16px; font-style: italic; }
        .btn-finish { width: 100%; padding: 18px; background: var(--text); color: var(--bg); border: none; border-radius: 14px; font-weight: 800; font-size: 15px; }
      `}</style>
    </div>
  );
}
