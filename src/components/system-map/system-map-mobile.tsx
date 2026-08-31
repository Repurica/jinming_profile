"use client";

import { useState } from "react";
import { projects, type ProjectSlug } from "@/content";
import { SystemPreview } from "./system-preview";

export function SystemMapMobile() {
  const [activeSlug, setActiveSlug] = useState<ProjectSlug>("mafe-bento");
  const active = projects.find((project) => project.slug === activeSlug) ?? projects[0]!;

  return (
    <div className="system-map-mobile">
      <p>MOBILE SYSTEM NARRATIVE</p>
      <div className="mobile-map-list">
        {projects.map((project, index) => (
          <div className="mobile-map-entry" key={project.slug}>
            <button
              type="button"
              aria-label={`${project.mapLabel} — inspect`}
              aria-expanded={activeSlug === project.slug}
              onClick={() => setActiveSlug(project.slug)}
            >
              <span>0{index + 1}</span>
              <strong>{project.mapLabel}</strong>
              <small>{project.capabilities.join(" / ")}</small>
              <i aria-hidden="true">{activeSlug === project.slug ? "−" : "+"}</i>
            </button>
            {activeSlug === project.slug ? <SystemPreview project={active} /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}
