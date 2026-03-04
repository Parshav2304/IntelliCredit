import React from 'react';
import { T } from '../theme';
import { Chip } from './Shared';
import { Database, Search, Activity, ShieldAlert } from 'lucide-react';

const STEPS = [
  { id: "ingest", icon: <Database size={16} />, label: "Data Ingestor", sub: "Pillar 01", color: T.blue },
  { id: "research", icon: <Search size={16} />, label: "Research Agent", sub: "Pillar 02", color: T.accent },
  { id: "cam", icon: <Activity size={16} />, label: "CAM & Decision", sub: "Pillar 03", color: T.warn },
];

export default function Sidebar({ active, setActive, completedSteps }) {
  return (
    <aside style={{
      width: 250, background: T.surface, borderRight: `1px solid ${T.border}`,
    display: "flex", flexDirection: "column", padding: "24px 0",
    position: "fixed", top: 0, left: 0, height: "100vh", flexShrink: 0, zIndex: 10,
  }}>
    {/* Logo */}
    <div style={{ padding: "0 22px 24px" }}>
      <div style={{ fontFamily: T.sans, fontSize: 24, fontWeight: 800, letterSpacing: "-.02em" }}>
        <span style={{ color: T.text }}>Intelli</span>
        <span style={{ color: T.accent }}>Credit</span>
      </div>
      <div style={{ fontSize: 10, color: T.accent, letterSpacing: ".1em", textTransform: "uppercase", marginTop: 4, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
        <ShieldAlert size={12} /> OS Enterprise
      </div>
    </div>

    <div style={{ height: 1, background: T.border, margin: "0 0 20px" }} />

    {/* Steps */}
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "0 16px", flex: 1 }}>
      {STEPS.map((s) => {
        const isActive = active === s.id;
        const isDone = completedSteps.includes(s.id);
        return (
          <button key={s.id} onClick={() => setActive(s.id)} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
            background: isActive ? s.color + "15" : "transparent",
            border: `1px solid ${isActive ? s.color + "40" : "transparent"}`,
            borderRadius: 12, cursor: "pointer", textAlign: "left", width: "100%",
            transition: "all .2s ease",
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: isActive ? s.color + "25" : T.card,
              border: `1px solid ${isActive ? s.color + "60" : T.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: isActive ? s.color : T.textDim, transition: "all .2s ease"
            }}>
              {isDone ? <span style={{ color: T.accent, fontSize: 14, fontWeight: 'bold' }}>✓</span> : s.icon}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: isActive ? T.text : T.textSoft, transition: "color .2s ease" }}>{s.label}</div>
              <div style={{ fontSize: 11, color: isActive ? s.color : T.textDim, fontFamily: T.mono, marginTop: 2, transition: "color .2s ease" }}>{s.sub}</div>
            </div>
          </button>
        );
      })}
    </div>

    {/* Active Case Badge */}
    <div style={{ padding: "0 16px" }}>
      <div style={{
        background: T.card, border: `1px solid ${T.border}`, borderRadius: 12, padding: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
      }}>
        <div style={{ fontSize: 10, color: T.textDim, letterSpacing: ".1em", textTransform: "uppercase", fontFamily: T.mono, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          Active Case ID
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.warn, display: "inline-block", boxShadow: `0 0 8px ${T.warn}` }} className="pulse"></span>
        </div>
        <div style={{ fontSize: 13, color: T.text, fontWeight: 700, marginTop: 8 }}>Sharma Specialty Chemicals</div>
        <div style={{ fontSize: 11, color: T.textSoft, marginTop: 4, fontFamily: T.mono }}>CIN: U24100MH2010PLC204762</div>
        <div style={{ marginTop: 12 }}>
          <Chip color={T.warn} size={11}>Under Review</Chip>
        </div>
      </div>
    </div>
  </aside>
  );
}
