import { SystemMap } from "@/components/system-map/system-map";

export function SystemMapSection() {
  return (
    <section className="chapter system-map-section" id="system-map" aria-labelledby="system-map-title">
      <header className="chapter-header">
        <div>
          <p className="chapter-label">02 / SYSTEM MAP</p>
          <h2 id="system-map-title">From scattered signals<br />to connected systems.</h2>
        </div>
        <p>
          Select a project or capability. The map traces where business process,
          technical systems, risk, and evidence meet.
        </p>
      </header>
      <SystemMap />
    </section>
  );
}
