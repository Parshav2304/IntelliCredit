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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar active={activeTab} setActive={setActiveTab} completedSteps={completedSteps} />

      <main style={{ flex: 1, padding: "40px 60px", marginLeft: 250, maxWidth: 1000 }}>
        {activeTab === "ingest" && (
          <DataIngestor onComplete={() => handleComplete("ingest", "research")} />
        )}
        {activeTab === "research" && (
          <ResearchAgent onComplete={() => handleComplete("research", "cam")} />
        )}
        {activeTab === "cam" && (
          <CAMEngine />
        )}
      </main>
    </div>
  );
}

export default App;
