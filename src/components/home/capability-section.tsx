import { EvidenceGraph } from "@/components/evidence/evidence-graph";

export function CapabilitySection() {
  return (
    <section className="chapter capability-section" aria-labelledby="capability-title">
      <header className="chapter-header">
        <div><p className="chapter-label">05 / CAPABILITY GRAPH</p><h2 id="capability-title">Evidence,<br />not percentages.</h2></div>
        <p>Every capability resolves to supplied projects, roles, education, or skills. Select a node to inspect the factual connection.</p>
      </header>
      <EvidenceGraph />
    </section>
  );
}
