import React from 'react';
import { T } from '../theme';

export const Chip = ({ color = T.accent, bg, children, size = 11 }) => (
    <span style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "2px 9px", borderRadius: 4,
        background: bg || color + "18", border: `1px solid ${color}44`,
    color, fontSize: size, fontWeight: 700, letterSpacing: ".06em",
    textTransform: "uppercase", whiteSpace: "nowrap",
  }}>{children}</span>
);

export const Spinner = ({ size = 18, color = T.accent }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    border: `2px solid ${color}30`, borderTopColor: color,
    animation: "spin .7s linear infinite", flexShrink: 0,
  }} />
);

export const ProgressBar = ({ value, color = T.accent, height = 5 }) => (
  <div style={{ background: T.border, borderRadius: 99, height, overflow: "hidden" }}>
    <div style={{
      width: `${value}%`, height: "100%", background: color,
      borderRadius: 99, transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
    }} />
  </div>
);

export const Card = ({ children, style = {}, className = "", accent, onClick = null }) => (
  <div 
    onClick={onClick}
    className={`card-hover ${className}`} 
    style={{
      background: T.card, border: `1px solid ${T.border}`,
      borderLeft: accent ? `3px solid ${accent}` : undefined,
      borderRadius: 12, padding: 18, cursor: onClick ? "pointer" : "default", ...style,
    }}
  >
    {children}
  </div>
);

export const SectionLabel = ({ children, color = T.accent, style={} }) => (
  <div style={{
    fontSize: 10, fontWeight: 700, letterSpacing: ".15em",
    textTransform: "uppercase", color, marginBottom: 10,
    fontFamily: T.mono, ...style
  }}>{children}</div>
);

export const Divider = () => (
  <div style={{ height: 1, background: T.border, margin: "20px 0" }} />
);
