import { RiskLayer } from "@/components/risk/risk-layer";

export function RiskSection() {
  return (
    <section className="chapter risk-section" aria-labelledby="risk-title">
      <header className="chapter-header">
        <div><p className="chapter-label">04 / RISK LAYER</p><h2 id="risk-title">Risk becomes<br />visible work.</h2></div>
        <p>SBS Transit is presented as a diagnostic layer: training, campaign coordination, auditing, and document risk—without invented campaign metrics.</p>
      </header>
      <RiskLayer />
    </section>
  );
}
