"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useExperience } from "@/components/experience/experience-provider";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const story = [
  ["BUSINESS CONTEXT", "Restaurant owners and kitchen staff define the real operating environment."],
  ["WORKFLOW", "Order-to-preparation work becomes a mapped sequence and functional requirements."],
  ["UI SYSTEM", "User flows and acceptance criteria make the workflow usable and testable."],
  ["ARCHITECTURE", "Requirements continue through architecture, implementation, deployment, and iteration."],
  ["SUPPLY LAYER", "A proposed system design extends into inventory logic, supplier data flows, and scalability."],
] as const;

export function MafeStory() {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useExperience();

  useGSAP(
    () => {
      if (
        reducedMotion ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.matchMedia("(max-width: 900px)").matches ||
        !track.current
      ) return;
      const tween = gsap.to(track.current, {
        xPercent: -80,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=3200",
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      });
      return () => tween.kill();
    },
    { scope: root, dependencies: [reducedMotion], revertOnUpdate: true },
  );

  return (
    <div className="mafe-story" ref={root}>
      <div className="mafe-story-track" ref={track}>
        {story.map(([title, detail], index) => (
          <article key={title}>
            <span>0{index + 1} / 05</span>
            <h3>{title}</h3>
            <p>{detail}</p>
            <i aria-hidden="true" />
          </article>
        ))}
      </div>
    </div>
  );
}
