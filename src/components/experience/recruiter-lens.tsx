"use client";

import type { KeyboardEvent } from "react";
import type { RecruiterLens as RecruiterLensValue } from "@/content";
import { useExperience } from "./experience-provider";

const lenses: readonly { value: RecruiterLensValue; label: string; index: string }[] = [
  { value: "fintech", label: "FinTech", index: "01" },
  { value: "engineering", label: "Engineering", index: "02" },
  { value: "security", label: "Security", index: "03" },
  { value: "workflow", label: "Product / Workflow", index: "04" },
];

export function RecruiterLens() {
  const { lens, setLens } = useExperience();

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(event.key)) return;

    event.preventDefault();
    const next = (index + direction + lenses.length) % lenses.length;
    const nextLens = lenses[next];
    if (!nextLens) return;
    setLens(nextLens.value);
    document.querySelector<HTMLButtonElement>(`[data-lens-control="${nextLens.value}"]`)?.focus();
  }

  return (
    <div className="lens-control" id="recruiter-lens" role="radiogroup" aria-label="Recruiter lens">
      <span className="lens-title">RECRUITER LENS</span>
      <div className="lens-options">
        {lenses.map((item, index) => (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={lens === item.value}
            tabIndex={lens === item.value ? 0 : -1}
            data-lens-control={item.value}
            onClick={() => setLens(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span aria-hidden="true">{item.index}</span>
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
