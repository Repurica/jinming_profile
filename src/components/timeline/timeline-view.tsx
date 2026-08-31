"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { timelineEntries } from "@/content";
import { TimelineFilter, type TimelineFilterValue } from "./timeline-filter";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function TimelineView() {
  const [filter, setFilter] = useState<TimelineFilterValue>("all");
  const root = useRef<HTMLDivElement>(null);
  const entries = useMemo(
    () => timelineEntries.filter((entry) => filter === "all" || entry.category === filter),
    [filter],
  );

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 900px)").matches) return;
      const markers = gsap.utils.toArray<HTMLElement>(".timeline-year", root.current);
      markers.forEach((marker) => {
        gsap.fromTo(
          marker,
          { yPercent: -20 },
          {
            yPercent: 20,
            ease: "none",
            scrollTrigger: { trigger: marker.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    },
    { scope: root, dependencies: [filter] },
  );

  return (
    <div className="timeline-view" ref={root}>
      <TimelineFilter value={filter} onChange={setFilter} />
      <ol>
        {entries.map((entry) => (
          <li key={entry.id} data-category={entry.category}>
            <time className="timeline-year" dateTime={String(entry.year)}>{entry.year}</time>
            <div>
              <span>{entry.category}</span>
              <h3>{entry.title}</h3>
              <p>{entry.detail}</p>
              {entry.projectSlug ? <Link href={`/work/${entry.projectSlug}`}>OPEN FILE ↗</Link> : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
