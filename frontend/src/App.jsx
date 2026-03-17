import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DataIngestor from './components/DataIngestor';
import ResearchAgent from './components/ResearchAgent';
import CAMEngine from './components/CAMEngine';

function App() {
  const [activeTab, setActiveTab] = useState("ingest");
  const [completedSteps, setCompletedSteps] = useState([]);

  const handleComplete = (stepId, nextStepId) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
    }
    if (nextStepId) {
      setActiveTab(nextStepId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="app-container">
      <Sidebar active={activeTab} setActive={setActiveTab} completedSteps={completedSteps} />

      <main className="main-content">
        <div className="content-wrapper">
          {activeTab === "ingest" && (
            <DataIngestor onComplete={() => handleComplete("ingest", "research")} />
          )}
          {activeTab === "research" && (
            <ResearchAgent onComplete={() => handleComplete("research", "cam")} />
          )}
          {activeTab === "cam" && (
            <CAMEngine />
          )}
        </div>
      </main>

      <style jsx>{`
        .app-container {
          display: flex;
          min-height: 100vh;
          background-color: var(--bg);
        }
        .main-content {
          flex: 1;
          padding: 40px 20px;
          margin-left: 280px;
          display: flex;
          justify-content: center;
        }
        .content-wrapper {
          width: 100%;
          max-width: 1000px;
        }
        @media (max-width: 1100px) {
          .main-content {
            margin-left: 260px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
