"use client";

import { useState } from "react";
import { campaignStages, risks } from "./risk-timeline";

export function RiskLayer() {
  const [activeId, setActiveId] = useState<(typeof risks)[number]["id"]>("training");
  const active = risks.find((risk) => risk.id === activeId) ?? risks[0];

  return (
    <div className="risk-layer">
      <div className="risk-controls" role="radiogroup" aria-label="Risk layer">
        {risks.map((risk, index) => (
          <button
            type="button"
            role="radio"
            aria-checked={activeId === risk.id}
            key={risk.id}
            onClick={() => setActiveId(risk.id)}
          >
            <span aria-hidden="true">0{index + 1}</span>{risk.label}
          </button>
        ))}
      </div>
      <div
        className="risk-evidence"
        role="region"
        aria-label={`${active.label} risk evidence`}
      >
        <span>OBSERVED WORK / SBS TRANSIT</span>
        <p>{active.evidence}</p>
      </div>
      <div className="campaign-path" aria-label="Campaign timeline">
        <div className="campaign-line" aria-hidden="true" />
        {campaignStages.map((stage, index) => (
          <div key={stage}>
            <i aria-hidden="true" />
            <span>0{index + 1}</span>
            <strong>{stage}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
