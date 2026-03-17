import React from 'react';
import { T } from '../theme';

export const Chip = ({ color = "var(--accent)", children, size = 11 }) => (
    <span className="chip" style={{
        '--chip-color': color,
        '--chip-bg': `color-mix(in srgb, ${color}, transparent 85%)`,
        fontSize: size,
    }}>{children}</span>
);

export const Spinner = ({ size = 20, color = "var(--accent)" }) => (
  <div className="spinner" style={{
    width: size, height: size,
    '--spinner-color': color,
  }} />
);

export const ProgressBar = ({ value, color = "var(--accent)", height = 6 }) => (
  <div className="progress-bar-container" style={{ height }}>
    <div className="progress-bar-fill glow" style={{
      width: `${value}%`, background: color, '--glow-color': color
    }} />
  </div>
);

export const Card = ({ children, style = {}, className = "", accent, onClick = null, glass = false }) => (
  <div 
    onClick={onClick}
    className={`card card-hover ${glass ? 'glass' : ''} ${accent ? 'card-accent' : ''} ${className}`} 
    style={{
      '--card-accent': accent,
      '--glow-color': accent ? `color-mix(in srgb, ${accent}, transparent 80%)` : 'transparent',
      cursor: onClick ? "pointer" : "default", ...style,
    }}
  >
    {children}
  </div>
);

export const SectionLabel = ({ children, color = "var(--text-dim)", style={} }) => (
  <div className="section-label" style={{
    color, ...style
  }}>{children}</div>
);

export const StatusIndicator = ({ status = "active", color = "var(--accent)" }) => (
  <div className="status-indicator">
    <div className={`status-dot ${status === 'active' ? 'pulse' : ''}`} style={{ background: color }} />
    <div className="status-label" style={{ color }}>{status}</div>
  </div>
);

export const Divider = () => (
  <div className="divider" />
);

export const SharedStyles = () => (
  <style jsx>{`
    .chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 6px;
      background: var(--chip-bg);
      border: 1px solid color-mix(in srgb, var(--chip-color), transparent 70%);
      color: var(--chip-color);
      font-weight: 700;
      letter-spacing: .04em;
      text-transform: uppercase;
      white-space: nowrap;
      font-family: var(--font-mono);
    }
    .spinner {
      border-radius: 50%;
      border: 2px solid color-mix(in srgb, var(--spinner-color), transparent 85%);
      border-top-color: var(--spinner-color);
      animation: spin .7s linear infinite;
      flex-shrink: 0;
    }
    .progress-bar-container {
      background: var(--surface);
      border-radius: 99px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .progress-bar-fill {
      height: 100%;
      border-radius: 99px;
      transition: width 1s cubic-bezier(.4,0,.2,1);
    }
    .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px;
    }
    .card-accent {
      border-left: 4px solid var(--card-accent) !important;
    }
    .section-label {
      font-size: 10px;
      font-weight: 700;
      letter-spacing: .12em;
      text-transform: uppercase;
      margin-bottom: 12px;
      font-family: var(--font-sans);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: .05em;
      font-family: var(--font-mono);
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
    .pulse {
      animation: pulse-ring 1.5s cubic-bezier(0.24, 0, 0.38, 1) infinite;
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.9); opacity: 0.8; }
      50% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(0.9); opacity: 0.8; }
    }
    .divider {
      height: 1px;
      background: var(--border);
      margin: 24px 0;
      opacity: 0.5;
    }
  `}</style>
);
