import React, { useState, useEffect } from 'react';
import { T } from '../theme';
import { SectionLabel, Chip, Spinner, Card, StatusIndicator } from './Shared';
import { Bot, Search, Globe, ShieldAlert, CheckCircle, BrainCircuit, Terminal, Activity, Zap, Cpu, Server, Gavel, AlertTriangle, TrendingUp } from 'lucide-react';

const SEARCH_QUERIES = [
    "Crawling Economic Times for promoter mentions — Rajesh Sharma...",
    "Scanning eCourts portal for litigation history...",
    "Querying MCA21 — director KYC & compliance records...",
    "Fetching RBI circulars: NBFC lending norms FY25...",
    "Searching sector news: specialty chemicals India FY25...",
    "Cross-referencing CIBIL Commercial algorithmic signals...",
    "Checking SFIO enforcement action database...",
];

const STATIC_FINDINGS = [
    { type: "danger", icon: Gavel, source: "eCourts Portal", date: "03 Mar 2026", title: "DRT Mumbai: Recovery suit ₹4.2 Cr filed by Punjab National Bank (pending)", relevance: 97 },
    { type: "danger", icon: ShieldAlert, source: "Economic Times", date: "12 Jan 2026", title: "Promoter Rajesh Sharma named in SFIO probe for related-party transactions", relevance: 94 },
    { type: "warn", icon: AlertTriangle, source: "GSTN / MCA", date: "20 Nov 2025", title: "Company missed Q2 GST compliance deadline — ₹12L penalty levied", relevance: 88 },
    { type: "ok", icon: TrendingUp, source: "ICRA Research", date: "08 Feb 2026", title: "Specialty chemicals sector demand forecast: +18% growth in FY27", relevance: 81 },
    { type: "ok", icon: CheckCircle, source: "MCA21 Portal", date: "15 Dec 2025", title: "Annual return filed on time. No director DIN disqualification.", relevance: 72 },
];

export default function ResearchAgent({ onComplete }) {
    const [stage, setStage] = useState('brief'); // brief, running, done
    const [log, setLog] = useState([]);
    const [synthesis, setSynthesis] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [findings, setFindings] = useState([]);

    const run = async () => {
        setStage('running'); setLog([]); setFindings([]); setSynthesis("");

        for (const q of SEARCH_QUERIES) {
            await new Promise(r => setTimeout(r, 400 + Math.random() * 300));
            setLog(l => [...l, q]);
        }

        for (const f of STATIC_FINDINGS) {
            await new Promise(r => setTimeout(r, 300));
            setFindings(prev => [...prev, f]);
        }

        setStreaming(true);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

            const response = await fetch('http://localhost:3000/api/research/stream', { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) throw new Error("Backend unavailable");
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
            console.error("Agent Fetch Error:", e);
            setSynthesis("Secondary research reveals critical risks. Simulation fallback triggered: Intelligence node connection delayed. Using high-fidelity cached local synthesis.\n\nCRITICAL OVERRIDE: Active recovery suit detected via high-fidelity eCourts signal. SFIO probe on promoter Rajesh Sharma confirmed for related-party transactions. GST compliance lags noted.");
        }

        setStreaming(false);
        setStage('done');
    };

    return (
        <div className="feature-container fade-up">
            <div className="feature-header">
                <div className="header-text">
                    <SectionLabel color="var(--accent)">Workflow Pipeline • Pillar 02</SectionLabel>
                    <h2 className="feature-title">Autonomous Credit Manager</h2>
                    <p className="feature-description">
                        AI-driven autonomous research agent crawling legal portals, news vectors, and regulatory databases to construct a deep-theta risk profile of the entity.
                    </p>
                </div>
                <div className="step-badge">
                    <SectionLabel color="var(--accent)">Step 2 of 3</SectionLabel>
                    <div className="step-dots">
                        <div className="step-dot active" />
                        <div className="step-dot active" />
                        <div className="step-dot" />
                    </div>
                </div>
            </div>

            <div className="workspace-main">
                {stage === 'brief' ? (
                    <div className="brief-workspace fade-up-1">
                        <Card glass className="deployment-brief">
                            <div className="brief-header">
                                <Cpu size={24} color="var(--accent)" />
                                <h3>Agent Deployment Briefing</h3>
                                <StatusIndicator status="Ready" />
                            </div>
                            <div className="brief-grid">
                                <div className="brief-item">
                                    <Globe size={16} color="var(--blue)" />
                                    <span>Target: Sharma Specialty Chemicals Ltd.</span>
                                </div>
                                <div className="brief-item">
                                    <Server size={16} color="var(--accent)" />
                                    <span>Nodes: eCourts, MCA21, RBI, Economic Times</span>
                                </div>
                                <div className="brief-item">
                                    <BrainCircuit size={16} color="var(--warn)" />
                                    <span>Model: IntelliCredit-Risk-v4 (Autonomous)</span>
                                </div>
                            </div>
                            <div className="brief-actions">
                                <button onClick={run} className="btn-deploy glow btn-hover">
                                    <Zap size={18} /> <span>Initialize Intelligence Crawl</span>
                                </button>
                            </div>
                        </Card>
                    </div>
                ) : (
                    <div className="agent-workspace-flex fade-up-1">
                        <div className="agent-monitor">
                            <div className="terminal-card glass">
                                <div className="terminal-header">
                                    <Terminal size={14} color="var(--text-dim)" />
                                    <span className="terminal-title">AGENT_ACTIVITY_MONITOR</span>
                                    {stage === 'running' && <Spinner size={12} />}
                                </div>
                                <div className="terminal-body scrollable">
                                    {log.map((l, i) => (
                                        <div key={i} className="log-line fade-up">
                                            <span className="log-ts">[{new Date().toLocaleTimeString()}]</span>
                                            <span className="log-prefix">SIGNAL_FOUND:</span>
                                            <span className="log-text">{l}</span>
                                        </div>
                                    ))}
                                    {stage === 'running' && <div className="log-cursor" />}
                                </div>
                            </div>

                            {findings.length > 0 && (
                                <div className="signals-grid fade-up-2">
                                    <SectionLabel>{findings.length} High-Fidelity Signals Extracted</SectionLabel>
                                    <div className="signals-list">
                                        {findings.map((f, i) => {
                                            const Icon = f.icon;
                                            return (
                                                <div key={i} className={`signal-item signal-${f.type}`}>
                                                    <div className="signal-icon">
                                                        <Icon size={18} />
                                                    </div>
                                                    <div className="signal-content">
                                                        <div className="signal-title">{f.title}</div>
                                                        <div className="signal-meta">{f.source} • {f.date}</div>
                                                    </div>
                                                    <div className="signal-weight">
                                                        <Chip color={f.type === 'danger' ? 'var(--danger)' : f.type === 'warn' ? 'var(--warn)' : 'var(--accent)'}>
                                                            {f.relevance}% Match
                                                        </Chip>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {stage === 'done' && !synthesis && !streaming && (
                                <div className="fallback-action">
                                     <button onClick={onComplete} className="btn-proceed glow btn-hover">
                                        Proceed to Credit Decision Engine →
                                    </button>
                                </div>
                            )}
                        </div>

                        {(synthesis || streaming) && (
                            <div className="synthesis-column fade-up-3">
                                <Card accent="var(--blue)" className="synthesis-card glow">
                                    <div className="synthesis-header">
                                        <BrainCircuit size={20} color="var(--blue)" />
                                        <SectionLabel color="var(--blue)">
                                            AI Intelligence Synthesis {streaming && <Spinner size={14} color="var(--blue)" />}
                                        </SectionLabel>
                                    </div>
                                    <div className="synthesis-content">
                                        {synthesis}
                                    </div>
                                    {stage === 'done' && (
                                        <div className="synthesis-footer">
                                            <button onClick={onComplete} className="btn-proceed glow btn-hover">
                                                Proceed to Credit Decision Engine →
                                            </button>
                                        </div>
                                    )}
                                </Card>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <style jsx>{`
                .feature-container { display: flex; flex-direction: column; gap: 32px; padding: 10px; }
                .feature-header { display: flex; justify-content: space-between; align-items: flex-start; }
                .feature-title { font-size: 32px; font-weight: 800; color: var(--text); letter-spacing: -0.03em; margin-top: 4px; }
                .feature-description { font-size: 15px; color: var(--text-soft); margin-top: 8px; max-width: 580px; line-height: 1.6; }

                .step-badge { display: flex; flex-direction: column; align-items: flex-end; gap: 8px; }
                .step-dots { display: flex; gap: 6px; }
                .step-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--border-hi); }
                .step-dot.active { background: var(--accent); box-shadow: 0 0 10px var(--accent); }

                .deployment-brief { padding: 40px !important; text-align: center; max-width: 600px; margin: 0 auto; }
                .brief-header { display: flex; flex-direction: column; align-items: center; gap: 16px; margin-bottom: 32px; }
                .brief-header h3 { font-size: 20px; font-weight: 800; color: var(--text); }
                .brief-grid { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 40px; }
                .brief-item { display: flex; align-items: center; gap: 14px; padding: 14px 20px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; font-size: 14px; color: var(--text-soft); text-align: left; }
                .btn-deploy { padding: 16px 32px; background: var(--accent); color: var(--bg); border-radius: 14px; font-weight: 800; font-size: 15px; display: flex; align-items: center; gap: 10px; margin: 0 auto; }

                .agent-workspace-flex { display: flex; gap: 32px; align-items: flex-start; }
                @media (max-width: 1200px) { .agent-workspace-flex { flex-direction: column; } }
                
                .agent-monitor { flex: 1; display: flex; flex-direction: column; gap: 24px; min-width: 0; }
                .synthesis-column { width: 400px; position: sticky; top: 32px; }
                @media (max-width: 1200px) { .synthesis-column { width: 100%; position: static; } }

                .terminal-card { border-radius: 16px; overflow: hidden; display: flex; flex-direction: column; height: 220px; }
                .terminal-header { padding: 12px 16px; background: var(--surface); border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 10px; }
                .terminal-title { font-size: 10px; font-family: var(--font-mono); color: var(--text-dim); letter-spacing: 0.1em; }
                .terminal-body { flex: 1; padding: 16px; background: hsla(0,0%,0%,0.3); font-family: var(--font-mono); font-size: 11px; display: flex; flex-direction: column; gap: 4px; }
                .log-line { display: flex; gap: 10px; color: var(--text-soft); }
                .log-ts { color: var(--text-dim); }
                .log-prefix { color: var(--accent); font-weight: 700; }
                .log-cursor { width: 8px; height: 16px; background: var(--accent); animation: blink 1s infinite; margin-top: 2px; }
                @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

                .signals-grid { display: flex; flex-direction: column; gap: 12px; }
                .signals-list { display: flex; flex-direction: column; gap: 8px; }
                .signal-item { display: flex; align-items: center; gap: 14px; padding: 14px; background: var(--card); border: 1px solid var(--border); border-radius: 12px; border-left: 4px solid transparent; }
                .signal-item.signal-danger { border-left-color: var(--danger); }
                .signal-item.signal-warn { border-left-color: var(--warn); }
                .signal-item.signal-ok { border-left-color: var(--accent); }
                .signal-icon { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; background: var(--surface); color: var(--text-soft); flex-shrink: 0; }
                .signal-content { flex: 1; min-width: 0; }
                .signal-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 320px; }
                .signal-meta { font-size: 10px; color: var(--text-dim); font-family: var(--font-mono); }

                .synthesis-card { padding: 24px !important; }
                .synthesis-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
                .synthesis-content { font-size: 14px; color: var(--text); line-height: 1.7; white-space: pre-wrap; font-family: var(--font-sans); }
                .synthesis-footer { margin-top: 24px; display: flex; justify-content: flex-end; }
                
                .fallback-action { display: flex; justify-content: center; margin-top: 10px; }
                .btn-proceed { padding: 14px 24px; background: var(--text); color: var(--bg); border-radius: 12px; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 8px; }
                .btn-proceed { padding: 14px 24px; background: var(--text); color: var(--bg); border-radius: 12px; font-weight: 700; font-size: 14px; display: flex; align-items: center; gap: 8px; }
            `}</style>
        </div>
    );
}

function GavelIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14.5 12.5-8 8a2.119 2.119 0 1 1-3-3l8-8" /><path d="m16 16 6-6" /><path d="m8 8 6-6" /><path d="m9 7 8 8" /><path d="m21 11-8-8" /></svg> }
function ShieldAlertIcon() { return <ShieldAlert size={20} /> }
function AlertIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg> }
function TrendingUpIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg> }
function CheckIcon() { return <CheckCircle size={20} /> }
