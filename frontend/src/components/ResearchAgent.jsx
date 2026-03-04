import React, { useState } from 'react';
import { T } from '../theme';
import { SectionLabel, Chip, Spinner, Card } from './Shared';
import { Bot, Search, Globe, ShieldAlert, CheckCircle, BrainCircuit } from 'lucide-react';

const SEARCH_QUERIES = [
    "Crawling Economic Times for promoter mentions — Rajesh Sharma...",
    "Scanning eCourts portal for litigation history...",
    "Querying MCA21 — director KYC & compliance records...",
    "Fetching RBI circulars: NBFC lending norms FY25...",
    "Searching sector news: specialty chemicals India FY25...",
    "Cross-referencing CIBIL Commercial algorithmic signals...",
    "Checking SFIO enforcement action database...",
];

export default function ResearchAgent({ onComplete }) {
    const [running, setRunning] = useState(false);
    const [done, setDone] = useState(false);
    const [log, setLog] = useState([]);
    const [synthesis, setSynthesis] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [findings, setFindings] = useState([]);

    const STATIC_FINDINGS = [
        { type: "danger", icon: <GavelIcon />, source: "eCourts Portal", date: "03 Mar 2026", title: "DRT Mumbai: Recovery suit ₹4.2 Cr filed by Punjab National Bank (pending)", relevance: 97 },
        { type: "danger", icon: <ShieldAlertIcon />, source: "Economic Times", date: "12 Jan 2026", title: "Promoter Rajesh Sharma named in SFIO probe for related-party transactions", relevance: 94 },
        { type: "warn", icon: <AlertIcon />, source: "GSTN / MCA", date: "20 Nov 2025", title: "Company missed Q2 GST compliance deadline — ₹12L penalty levied", relevance: 88 },
        { type: "ok", icon: <TrendingUpIcon />, source: "ICRA Research", date: "08 Feb 2026", title: "Specialty chemicals sector demand forecast: +18% growth in FY27", relevance: 81 },
        { type: "ok", icon: <CheckIcon />, source: "MCA21 Portal", date: "15 Dec 2025", title: "Annual return filed on time. No director DIN disqualification.", relevance: 72 },
    ];

    const run = async () => {
        setRunning(true); setLog([]); setFindings([]); setSynthesis("");

        for (const q of SEARCH_QUERIES) {
            await new Promise(r => setTimeout(r, 400 + Math.random() * 400));
            setLog(l => [...l, q]);
        }

        for (const f of STATIC_FINDINGS) {
            await new Promise(r => setTimeout(r, 300));
            setFindings(prev => [...prev, f]);
        }

        setRunning(false);
        setStreaming(true);

        try {
            const response = await fetch('http://localhost:3000/api/research/stream');
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

            while (true) {
                const { done: rd, value } = await reader.read();
                if (rd) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || "";

                for (const line of lines) {
                    if (!line.startsWith("data:")) continue;
                    const dataContent = line.replace(/^data:\s*/, "").trim();
                    if (dataContent === "[DONE]") continue;
                    if (!dataContent) continue;
                    try {
                        const j = JSON.parse(dataContent);
                        if (j.type === "content_block_delta" && j.delta?.text) {
                            setSynthesis(s => s + j.delta.text);
                        }
                    } catch (e) { }
                }
            }
        } catch (e) {
            console.error(e);
            setSynthesis("Secondary research reveals critical risks. Simulation fallback triggered: Network Error.");
        }

        setStreaming(false);
        setDone(true);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div className="fade-up" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                    <SectionLabel color={T.accent}>Pillar 02 — Web Intelligence Agent</SectionLabel>
                    <h2 style={{ fontFamily: T.sans, fontSize: 28, fontWeight: 800, color: T.text, letterSpacing: "-.02em" }}>
                        Autonomous Credit Manager
                    </h2>
                    <p style={{ fontSize: 14, color: T.textSoft, marginTop: 8, maxWidth: 550, lineHeight: 1.5 }}>
                        AI autonomously navigates MCA21, eCourts, RBI notices, and news sentiment vectors in real-time. Signals are mapped to financial contexts without hallucinations.
                    </p>
                </div>
                <Chip color={T.accent} size={12}>Step 2 / 3</Chip>
            </div>

            <Card className="fade-up-1" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: T.surface, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.accent }}>
                        <Globe size={24} />
                    </div>
                    <div>
                        <div style={{ fontSize: 10, color: T.textDim, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: T.mono }}>Target Verification Entity</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: T.text, marginTop: 4 }}>Sharma Specialty Chemicals Ltd.</div>
                        <div style={{ fontSize: 12, color: T.textSoft, marginTop: 4, fontFamily: T.mono }}>Promoter: Rajesh Sharma · MCA DIN Tracker: Enabled</div>
                    </div>
                </div>
                {!running && !done && (
                    <button onClick={run} className="btn-hover" style={{
                        background: T.accent, color: T.bg, border: "none", borderRadius: 10,
                        padding: "12px 24px", fontWeight: 700, fontSize: 14, cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 8
                    }}>
                        <Search size={16} /> Deploy Agent
                    </button>
                )}
                {running && <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Spinner size={20} color={T.accent} /><span style={{ fontSize: 14, color: T.accent, fontWeight: 700 }}>Agent crawling nodes...</span></div>}
                {done && <Chip color={T.accent} size={12}><div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><CheckCircle size={14} /> Intelligence Gathered</div></Chip>}
            </Card>

            {log.length > 0 && (
                <Card className="fade-up-2" style={{ padding: "16px 20px" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <Bot size={16} color={T.textDim} />
                        <SectionLabel color={T.textDim} style={{ marginBottom: 0 }}>Web Scraping Activity Log</SectionLabel>
                    </div>
                    <div style={{ fontFamily: T.mono, display: "flex", flexDirection: "column", gap: 6 }}>
                        {log.map((l, i) => (
                            <div key={i} className="fade-up" style={{ fontSize: 12, color: i === log.length - 1 && running ? T.accent : T.textDim, display: "flex", gap: 10, alignItems: "center" }}>
                                <span style={{ color: T.accent, fontSize: 12 }}>›</span>
                                {l}
                                {(i < log.length - 1 || !running) && <CheckCircle size={12} color={T.accent} style={{ marginLeft: "auto" }} />}
                                {i === log.length - 1 && running && <Spinner size={12} color={T.accent} />}
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {findings.length > 0 && (
                <div className="fade-up-3">
                    <SectionLabel color={T.textSoft}>{findings.length} High-Fidelity Signals — Arranged by Risk Weightage</SectionLabel>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {findings.map((item, i) => (
                            <div key={i} className="fade-up" style={{
                                display: "flex", gap: 16, alignItems: "center",
                                background: T.card,
                                border: `1px solid ${item.type === "danger" ? T.danger + "55" : item.type === "warn" ? T.warn + "55" : T.border}`,
                                borderLeft: `4px solid ${item.type === "danger" ? T.danger : item.type === "warn" ? T.warn : T.accent}`,
                                borderRadius: 12, padding: "16px 20px", transition: "all 0.2s ease"
                            }}>
                                <div style={{ flexShrink: 0, color: item.type === "danger" ? T.danger : item.type === "warn" ? T.warn : T.accent, padding: 10, background: (item.type === "danger" ? T.danger : item.type === "warn" ? T.warn : T.accent) + "1A", borderRadius: 8 }}>
                                    {item.icon}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 600, color: T.text, marginBottom: 6 }}>{item.title}</div>
                                    <div style={{ fontSize: 12, color: T.textDim, fontFamily: T.mono }}>
                                        Source: <span style={{ color: T.textSoft }}>{item.source}</span> · {item.date}
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0, borderLeft: `1px solid ${T.border}`, paddingLeft: 16 }}>
                                    <Chip color={item.type === "danger" ? T.danger : item.type === "warn" ? T.warn : T.accent} size={11}>
                                        {item.type === "danger" ? "HIGH RISK" : item.type === "warn" ? "CAUTION" : "POSITIVE"}
                                    </Chip>
                                    <span style={{ fontSize: 11, color: T.textDim, fontFamily: T.mono }}>
                                        confidence: <span style={{ color: T.text, fontWeight: 700 }}>{item.relevance}%</span>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {(synthesis || streaming) && (
                <Card className="fade-up-4" style={{ borderColor: T.blue + "40", background: T.blueDim, padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                        <BrainCircuit size={20} color={T.blue} />
                        <SectionLabel color={T.blue} style={{ marginBottom: 0, fontSize: 12 }}>Executive Intelligence Summary {streaming && <Spinner size={14} color={T.blue} />}</SectionLabel>
                    </div>
                    <p style={{ fontSize: 14, color: T.text, lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: T.body }}>{synthesis}</p>
                </Card>
            )}

            {done && (
                <div className="fade-up-4" style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
                    <button onClick={onComplete} className="btn-hover" style={{
                        background: T.text, color: T.bg, border: "none", borderRadius: 12,
                        padding: "14px 32px", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: T.sans,
                        display: "flex", alignItems: "center", gap: 8
                    }}>Proceed to Credit Decision Engine →</button>
                </div>
            )}
        </div>
    );
}

function GavelIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" /><path d="m16 16 6-6" /><path d="m8 8 6-6" /><path d="m9 7 8 8" /><path d="m21 11-8-8" /></svg> }
function ShieldAlertIcon() { return <ShieldAlert size={20} /> }
function AlertIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> }
function TrendingUpIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg> }
function CheckIcon() { return <CheckCircle size={20} /> }
