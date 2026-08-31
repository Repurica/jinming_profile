"use client";

import { useState } from "react";
import { capabilities } from "@/content";
import { evidenceNodes } from "./evidence-model";

export function EvidenceGraph() {
  const [activeId, setActiveId] = useState(capabilities[0]?.id ?? "full-stack");
  const active = capabilities.find((capability) => capability.id === activeId) ?? capabilities[0]!;
  const center = { x: 50, y: 50 };

  return (
    <div className="evidence-layout">
      <div className="evidence-graph" aria-label="Capability evidence graph">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {evidenceNodes.map((node) => (
            <line
              key={node.id}
              x1={center.x}
              y1={center.y}
              x2={node.x}
              y2={node.y}
              data-active={node.id === activeId}
            />
          ))}
          <circle cx="50" cy="50" r="18" />
        </svg>
        <div className="evidence-core" aria-hidden="true"><span>FACT</span><strong>→</strong><span>SYSTEM</span></div>
        {evidenceNodes.map((node) => (
          <button
            type="button"
            key={node.id}
            aria-pressed={node.id === activeId}
            data-lenses={node.lenses.join(" ")}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onClick={() => setActiveId(node.id)}
          >
            {node.name}
          </button>
        ))}
      </div>
      <div className="evidence-panel" role="region" aria-label={`${active.name} evidence`} aria-live="polite">
        <header><span>SELECTED CAPABILITY</span><h3>{active.name}</h3></header>
        <p>Only supplied projects, roles, education, and skills are connected here.</p>
        <ul>
          {active.evidence.map((item, index) => (
            <li key={item}><span>0{index + 1}</span>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
