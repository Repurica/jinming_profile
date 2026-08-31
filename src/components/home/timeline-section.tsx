import Link from "next/link";
import { TimelineView } from "@/components/timeline/timeline-view";

export function TimelineSection() {
  return (
    <section className="chapter timeline-section" id="timeline" aria-labelledby="timeline-title">
      <header className="chapter-header">
        <div><p className="chapter-label">06 / TIMELINE</p><h2 id="timeline-title">Build history,<br />in sequence.</h2></div>
        <p>Education, work, and leadership from 2022 through 2026. Filter the record or open the dedicated timeline file.</p>
      </header>
      <TimelineView />
      <Link className="section-route-link" href="/timeline">OPEN TIMELINE ROUTE ↗</Link>
    </section>
  );
}
