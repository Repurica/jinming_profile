import type { Metadata } from "next";
import { RouteShell } from "@/components/route-shell";
import { TimelineView } from "@/components/timeline/timeline-view";

export const metadata: Metadata = { title: "Timeline", alternates: { canonical: "/timeline" } };

export default function TimelinePage() {
  return (
    <RouteShell label="06 / TIMELINE" title="Build history, in sequence." intro="Education, work, and leadership from 2022 through 2026.">
      <section className="route-content"><TimelineView /></section>
    </RouteShell>
  );
}
