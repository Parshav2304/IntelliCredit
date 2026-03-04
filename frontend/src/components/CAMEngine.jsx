import React, { useState } from 'react';
import { T } from '../theme';
import { SectionLabel, Chip, Spinner, Card } from './Shared';
import { Zap, ShieldCheck, Activity, Target, TrendingUp, AlertOctagon, HelpCircle, FileText, Download } from 'lucide-react';

const FIVE_CS = [
  { c: "Character", icon: <ShieldCheck size={18} />, score: 52, color: T.danger, summary: "SFIO probe on promoter, related-party transactions, late GST compliance. Significant credibility risk.", flags: [{ label: "SFIO probe active", weight: "-20%" }, { label: "Related-party anomaly", weight: "-15%" }, { label: "GST compliance lapse", weight: "-10%" }] },
  { c: "Capacity", icon: <Activity size={18} />, score: 71, color: T.warn, summary: "DSCR 1.42x is adequate but factory at 40% utilisation limits near-term upside. Revenue CAGR 12% (3yr).", flags: [{ label: "DSCR: 1.42x (adequate)", weight: "+10%" }, { label: "Factory: 40% utilisation", weight: "-15%" }, { label: "Revenue CAGR: 12%", weight: "+5%" }] },
  { c: "Capital", icon: <Target size={18} />, score: 68, color: T.warn, summary: "D/E at 1.8x is elevated but within specialty chemicals sector norms. Net worth ₹24.2 Cr. No new equity infusion in 2 years.", flags: [{ label: "D/E ratio: 1.8x", weight: "-5%" }, { label: "Net Worth: ₹24.2 Cr", weight: "+15%" }, { label: "No recent equity dilution", weight: "0%" }] },
  { c: "Collateral", icon: <AlertOctagon size={18} />, score: 74, color: T.accent, summary: "Primary security: factory land + building (Mumbai suburb) valued ₹38 Cr. Realizable value ~₹28 Cr (0.74x). Clear title, lien marked.", flags: [{ label: "Primary: ₹38 Cr property", weight: "+20%" }, { label: "Realizable: ~₹28 Cr", weight: "+10%" }, { label: "Clear title, lien confirmed", weight: "+5%" }] },
  { c: "Conditions", icon: <TrendingUp size={18} />, score: 66, color: T.blue, summary: "Specialty chemicals sector outlook positive (ICRA: +18% FY26). RBI NBFC tightening increases bank credit dependency — opportunity.", flags: [{ label: "Sector: ICRA Positive", weight: "+15%" }, { label: "RBI NBFC tightening", weight: "+5%" }, { label: "Crude sensitivity: Medium", weight: "-5%" }] },
];

export default function CAMEngine() {
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);
  const [camText, setCamText] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [activeC, setActiveC] = useState(null);

  const composite = 63;
  const scoreColor = composite >= 75 ? T.accent : composite >= 55 ? T.warn : T.danger;

  const generate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 1200));
    setGenerating(false);
    setDone(true);
    setStreaming(true);

    try {
      const response = await fetch('http://localhost:3000/api/cam/stream');
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
      setCamText("COMPANY OVERVIEW\nSharma Specialty Chemicals Ltd...\nCredit generation fallback triggered due to network error.");
    }
    setStreaming(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div className="fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <SectionLabel color={T.warn}>Pillar 03 — Core Decision Engine</SectionLabel>
          <h2 style={{ fontFamily: T.sans, fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: "-.02em" }}>
            Credit Appraisal & Recommendation
          </h2>
          <p style={{ fontSize: 14, color: T.textSoft, marginTop: 8, maxWidth: 550, lineHeight: 1.5 }}>
            Five Cs algorithmic scoring · Scenario Simulation · Explainable AI (XAI) weights · Auto-generated Credit Appraisal Memo ready for credit committee.
          </p>
        </div>
        <Chip color={T.warn} size={12}>Step 3 / 3</Chip>
      </div>

      {!done && (
        <div className="fade-up-1" style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
          <button onClick={generate} disabled={generating} className="btn-hover" style={{
            background: generating ? T.surface : T.warn, color: generating ? T.textSoft : T.bg,
            border: `2px solid ${generating ? T.border : T.warn}`, borderRadius: 14,
            padding: "18px 48px", fontWeight: 700, fontSize: 16, cursor: generating ? "default" : "pointer",
            display: "flex", alignItems: "center", gap: 12, fontFamily: T.sans,
            boxShadow: generating ? "none" : `0 10px 30px ${T.warn}40`
          }}>
            {generating ? <><Spinner color={T.warn} size={22} /> Generating CAM & Risk Scores...</> : <><Zap size={22} /> Generate Credit Appraisal Memo</>}
          </button>
        </div>
      )}

      {done && (
        <>
          <Card className="fade-up-1" style={{ display: "flex", alignItems: "center", gap: 32, padding: "30px", border: `1px solid ${scoreColor}40`, background: `${scoreColor}05` }}>
            <div style={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}>
              <svg width={110} height={110} style={{ transform: "rotate(-90deg)", position: "absolute" }}>
                <circle cx={55} cy={55} r={46} fill="none" stroke={T.surface} strokeWidth={10} />
                <circle cx={55} cy={55} r={46} fill="none" stroke={scoreColor} strokeWidth={10}
                  strokeDasharray={`${2 * Math.PI * 46 * composite / 100} ${2 * Math.PI * 46}`}
                  strokeLinecap="round" style={{ transition: "stroke-dasharray 1.5s ease-out" }} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: T.mono, fontSize: 26, fontWeight: 800, color: scoreColor }}>{composite}</span>
                <span style={{ fontSize: 11, color: T.textDim, fontFamily: T.mono, marginTop: -4 }}>/100</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: T.textDim, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: T.mono }}>Composite Risk Rating</div>
              <div style={{ fontFamily: T.sans, fontSize: 32, fontWeight: 800, color: scoreColor, lineHeight: 1.1, marginTop: 8 }}>{composite}<span style={{ fontSize: 16, color: T.textSoft }}> / 100</span></div>
              <div style={{ fontSize: 14, color: T.textSoft, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                Risk Band: <strong style={{ color: T.warn, background: T.warnDim, padding: "4px 8px", borderRadius: 4 }}>MEDIUM-HIGH</strong>
              </div>
            </div>
            <div style={{ textAlign: "right", paddingLeft: 30, borderLeft: `1px solid ${T.border}` }}>
              <div style={{ background: T.warnDim, border: `2px solid ${T.warn}`, borderRadius: 10, padding: "12px 20px", marginBottom: 14, display: "inline-block" }}>
                <div style={{ fontFamily: T.sans, fontSize: 18, fontWeight: 800, color: T.warn }}>CONDITIONAL APPROVAL</div>
              </div>
              <div style={{ fontSize: 14, color: T.textSoft, marginBottom: 4 }}>System Limit: <strong style={{ color: T.text, fontSize: 16 }}>₹8.5 Crore</strong></div>
              <div style={{ fontSize: 14, color: T.textSoft, marginBottom: 4 }}>Suggested Rate: <strong style={{ color: T.text }}>MCLR + 2.75%</strong></div>
              <div style={{ fontSize: 14, color: T.textSoft }}>Recommended Tenor: <strong style={{ color: T.text }}>36 months</strong></div>
            </div>
          </Card>

          <div className="fade-up-2">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <SectionLabel color={T.textSoft} style={{ marginBottom: 0 }}>Explainability Panel: Five Cs Factor Breakdown</SectionLabel>
              <Chip color={T.textDim} size={11}>Click factors to view model weights</Chip>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {FIVE_CS.map((c, i) => (
                <div key={i}>
                  <Card
                    onClick={() => setActiveC(activeC === i ? null : i)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                      cursor: "pointer", background: activeC === i ? T.cardHover : T.card,
                      border: activeC === i ? `1px solid ${c.color}60` : `1px solid ${T.border}`
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10, background: c.color + "15",
                      color: c.color, display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                      {c.icon}
                    </div>
                    <div style={{ width: 100, flexShrink: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>{c.c}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: c.color, fontFamily: T.mono }}>{c.score}</div>
                    </div>
                    <div style={{ flex: 1, fontSize: 13, color: T.textDim, lineHeight: 1.5 }}>
                      {c.summary}
                    </div>
                    <div style={{ color: activeC === i ? T.text : T.borderHi, transition: "color 0.2s ease" }}>
                      <HelpCircle size={20} />
                    </div>
                  </Card>

                  {activeC === i && (
                    <div className="fade-up" style={{
                      margin: "8px 0 16px 40px", padding: "16px", background: T.surface,
                      borderRadius: 12, border: `1px dashed ${T.border}`,
                      display: "flex", gap: 16
                    }}>
                      <div style={{ width: "2px", background: c.color, borderRadius: 2 }}></div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, color: T.textSoft, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: T.mono }}>Model Attribution Weights</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                          {c.flags.map((flag, idx) => (
                            <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                              <span style={{ color: T.text }}>{flag.label}</span>
                              <span style={{
                                fontFamily: T.mono, fontWeight: 700,
                                color: flag.weight.startsWith("-") ? T.danger : flag.weight === "0%" ? T.textSoft : T.accent
                              }}>{flag.weight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="fade-up-3">
            <SectionLabel color={T.textSoft} style={{ marginBottom: 16 }}>Final Output</SectionLabel>
            <Card style={{
              borderColor: T.borderHi, background: T.card, padding: "0"
            }}>
              <div style={{ padding: "16px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: T.surface, borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <FileText size={18} color={T.textSoft} />
                  <span style={{ fontSize: 14, fontWeight: 600, color: T.text }}>Credit Appraisal Memo.docx</span>
                  {streaming && <Spinner size={14} color={T.textSoft} />}
                </div>
                {!streaming && (
                  <button className="btn-hover" style={{
                    background: "transparent", border: `1px solid ${T.border}`, color: T.text,
                    padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 6
                  }}>
                    <Download size={14} /> Export to Word
                  </button>
                )}
              </div>
              <div style={{ padding: "30px 40px", fontSize: 14, color: "#111827", lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: T.body, background: "#f8f9fa", minHeight: 300 }}>
                {camText}
              </div>
            </Card>
          </div>

          <div className="fade-up-4" style={{ display: "flex", justifyContent: "center", marginTop: 40, paddingBottom: 40 }}>
            <div style={{ textAlign: "center", color: T.textDim, fontSize: 13 }}>
              End of Workflow. <a href="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }} style={{ color: T.blue, textDecoration: "none" }}>Start New Case</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
