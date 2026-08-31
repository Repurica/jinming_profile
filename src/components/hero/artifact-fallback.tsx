import Link from "next/link";
import { heroArtifacts } from "./hero-artifacts";

export function ArtifactFallback() {
  return (
    <div className="artifact-fallback" aria-label="Project artifact index">
      <div className="artifact-orbit" aria-hidden="true" />
      {heroArtifacts.map((artifact, index) => (
        <Link
          className={`artifact-card artifact-${index + 1}`}
          key={artifact.id}
          href={artifact.href}
          data-tone={artifact.tone}
          data-cursor="OPEN FILE →"
          aria-label={`${artifact.title}: open ${artifact.href.split("/").at(-1)}`}
        >
          <span>{artifact.code}</span>
          <strong>{artifact.title}</strong>
          <small>{artifact.detail}</small>
          <i aria-hidden="true">↗</i>
        </Link>
      ))}
    </div>
  );
}
