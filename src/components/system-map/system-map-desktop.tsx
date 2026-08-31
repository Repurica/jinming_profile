"use client";

import type { Project, ProjectSlug } from "@/content";
import { mapEdges, mapNodes } from "./map-model";

export function SystemMapDesktop({
  activeProject,
  onSelect,
}: {
  activeProject: Project;
  onSelect: (slug: ProjectSlug) => void;
}) {
  const activeCapabilities = new Set(activeProject.capabilities);

  return (
    <div className="system-map-desktop" aria-label="Project and capability map">
      <svg className="system-map-lines" viewBox="0 0 1000 650" aria-hidden="true">
        {mapEdges.map((edge) => {
          const project = mapNodes.find((node) => node.id === edge.projectSlug);
          const capability = mapNodes.find((node) => node.label === edge.capability);
          if (!project || !capability) return null;
          return (
            <line
              key={edge.id}
              x1={project.x * 10}
              y1={project.y * 6.5}
              x2={capability.x * 10}
              y2={capability.y * 6.5}
              data-active={edge.projectSlug === activeProject.slug}
            />
          );
        })}
      </svg>
      <div className="map-origin" aria-hidden="true"><span>BUSINESS</span><i /><span>SYSTEM</span></div>
      {mapNodes.map((node) => {
        if (node.kind === "project") {
          return (
            <button
              className="map-node project-node"
              key={node.id}
              type="button"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              aria-pressed={activeProject.slug === node.projectSlug}
              data-connected={activeProject.slug === node.projectSlug ? "true" : "false"}
              onClick={() => node.projectSlug && onSelect(node.projectSlug)}
            >
              <span aria-hidden="true">PROJECT</span>{node.label}
            </button>
          );
        }

        const connected = activeCapabilities.has(node.label);
        return (
          <button
            className="map-node capability-node"
            key={node.id}
            type="button"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            data-connected={connected ? "true" : "false"}
            onClick={() => {
              const match = mapEdges.find((edge) => edge.capability === node.label);
              if (match) onSelect(match.projectSlug);
            }}
          >
            {node.label}
          </button>
        );
      })}
    </div>
  );
}
