import Link from "next/link";
import type { Project } from "@/content";

export function SystemPreview({ project }: { project: Project }) {
  return (
    <div
      className="system-preview"
      role="region"
      aria-label={`${project.mapLabel} system preview`}
      aria-live="polite"
    >
      <header>
        <span>SELECTED SYSTEM</span>
        <strong>{project.mapLabel}</strong>
      </header>
      <dl>
        <div><dt>PROBLEM</dt><dd>{project.problem}</dd></div>
        <div><dt>ROLE</dt><dd>{project.role}</dd></div>
        <div><dt>SYSTEM</dt><dd>{project.system}</dd></div>
        <div><dt>PROOF</dt><dd>{project.proof}</dd></div>
      </dl>
      <Link href={`/work/${project.slug}`} data-cursor="OPEN FILE →">
        ENTER CASE <span>↗</span>
      </Link>
    </div>
  );
}
