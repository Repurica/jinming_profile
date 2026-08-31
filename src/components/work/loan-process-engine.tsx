"use client";

import { useState } from "react";

const perspectives = [
  {
    id: "customer",
    label: "Customer",
    note: "Customer experience across application, issuance, and maintenance.",
    emphasis: [true, true, true, true],
  },
  {
    id: "dealer",
    label: "Dealer",
    note: "Dealer experience where customer and loan-process steps meet.",
    emphasis: [true, true, true, false],
  },
  {
    id: "institution",
    label: "Financial institution",
    note: "Process efficiency across review, processing, issuance, and maintenance.",
    emphasis: [false, true, true, true],
  },
] as const;

const stages = ["APPLICATION", "REVIEW / PROCESSING", "ISSUANCE", "MAINTENANCE"] as const;

export function LoanProcessEngine() {
  const [perspectiveId, setPerspectiveId] = useState<(typeof perspectives)[number]["id"]>("customer");
  const perspective = perspectives.find((item) => item.id === perspectiveId) ?? perspectives[0];

  return (
    <div className="loan-engine">
      <header className="engine-header">
        <div><span>03B / LOAN PROCESS ENGINE</span><h3>Loan Ranger</h3></div>
        <p>DESIGN THINKING × ANALYTICS</p>
      </header>
      <div className="loan-perspectives" role="radiogroup" aria-label="Loan process perspective">
        {perspectives.map((item) => (
          <button
            key={item.id}
            type="button"
            role="radio"
            aria-checked={perspectiveId === item.id}
            onClick={() => setPerspectiveId(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="loan-perspective-note" role="region" aria-label={`${perspective.label} perspective`}>
        <span>ACTIVE PERSPECTIVE</span><p>{perspective.note}</p>
      </div>
      <ol className="loan-stages">
        {stages.map((stage, index) => (
          <li key={stage} data-emphasis={perspective.emphasis[index] ? "true" : "false"}>
            <span>0{index + 1}</span><strong>{stage}</strong><i aria-hidden="true">→</i>
          </li>
        ))}
      </ol>
    </div>
  );
}
