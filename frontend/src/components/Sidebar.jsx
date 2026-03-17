import React from 'react';
import { T } from '../theme';
import { SectionLabel, Card, StatusIndicator, Chip } from './Shared';
import { Database, Search, Activity, ShieldAlert, ChevronRight, Fingerprint } from 'lucide-react';

const STEPS = [
  { id: "ingest", icon: Database, label: "Data Ingestor", sub: "Pillar 01", color: "var(--blue)" },
  { id: "research", icon: Search, label: "Research Agent", sub: "Pillar 02", color: "var(--accent)" },
  { id: "cam", icon: Activity, label: "CAM & Decision", sub: "Pillar 03", color: "var(--warn)" },
];

export default function Sidebar({ active, setActive, completedSteps }) {
  return (
    <aside className="sidebar glass">
      <div className="sidebar-header">
        <div className="logo-group">
          <div className="logo-icon glow">
            <Fingerprint size={24} color="var(--accent)" />
          </div>
          <div className="logo-text">
            <h1>IntelliCredit</h1>
            <div className="logo-tag">
              <span className="dot" />
              OS ENTERPRISE
            </div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <SectionLabel>Workflow Pipelines</SectionLabel>
        <div className="nav-items">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = active === step.id;
            const isDone = completedSteps.includes(step.id);
            return (
              <button
                key={step.id}
                onClick={() => setActive(step.id)}
                className={`nav-item ${isActive ? 'active' : ''}`}
                style={{ '--step-color': step.color }}
              >
                <div className={`nav-icon-box ${isActive ? 'glow' : ''}`}>
                  {isDone ? <span className="step-done-check">✓</span> : <Icon size={18} />}
                </div>
                <div className="nav-label-group">
                  <span className="nav-pillar">{step.sub}</span>
                  <span className="nav-label">{step.label}</span>
                </div>
                {isActive && <ChevronRight size={14} className="active-arrow" />}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="sidebar-footer">
        <Card glass className="case-status-card">
          <SectionLabel color="var(--text-soft)">Active Case ID</SectionLabel>
          <div className="case-id">Sharma Specialty Chemicals</div>
          <div className="case-meta">CIN: U24100MH2010PLC204762</div>
          <div className="case-divider" />
          <div className="status-indicator-row">
            <StatusIndicator status="Under Review" color="var(--warn)" />
          </div>
        </Card>
      </div>

      <style jsx>{`
        .sidebar {
          width: 280px;
          height: 100vh;
          display: flex;
          flex-direction: column;
          border-right: 1px solid var(--border);
          padding: 32px 20px;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 100;
        }

        .sidebar-header {
          margin-bottom: 48px;
        }

        .logo-group {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--surface);
          border: 1px solid var(--border-hi);
          display: flex;
          align-items: center;
          justify-content: center;
          --glow-color: var(--accent-dim);
        }

        .logo-text h1 {
          font-size: 20px;
          font-weight: 800;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .logo-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
          opacity: 0.8;
        }

        .dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 8px var(--accent);
        }

        .sidebar-nav {
          flex: 1;
        }

        .nav-items {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-item {
          width: 100%;
          background: transparent;
          border: none;
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: var(--transition);
          text-align: left;
          border: 1px solid transparent;
        }

        .nav-item:hover {
          background: var(--card-hover);
        }

        .nav-item.active {
          background: hsla(var(--h-bg), 30%, 15%, 0.8);
          border-color: color-mix(in srgb, var(--step-color), transparent 75%);
        }

        .nav-icon-box {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: var(--surface);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          transition: var(--transition);
          flex-shrink: 0;
        }

        .nav-item:hover .nav-icon-box {
          color: var(--text-soft);
          border-color: var(--border-hi);
        }

        .nav-item.active .nav-icon-box {
          background: color-mix(in srgb, var(--step-color), transparent 85%);
          color: var(--step-color);
          border-color: color-mix(in srgb, var(--step-color), transparent 60%);
          --glow-color: color-mix(in srgb, var(--step-color), transparent 80%);
        }

        .step-done-check {
          color: var(--accent);
          font-weight: 800;
          font-size: 16px;
        }

        .nav-label-group {
          display: flex;
          flex-direction: column;
        }

        .nav-pillar {
          font-size: 9px;
          font-weight: 700;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-family: var(--font-mono);
        }

        .nav-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-soft);
          transition: var(--transition);
        }

        .nav-item.active .nav-label {
          color: var(--text);
        }

        .active-arrow {
          margin-left: auto;
          color: var(--step-color);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .case-status-card {
          padding: 20px !important;
        }

        .case-id {
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 2px;
        }

        .case-meta {
          font-size: 11px;
          color: var(--text-dim);
          font-family: var(--font-mono);
          margin-bottom: 16px;
        }

        .case-divider {
          height: 1px;
          background: var(--border);
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .status-indicator-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      `}</style>
    </aside>
  );
}
