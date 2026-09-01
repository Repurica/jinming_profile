"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { useRef } from "react";
import { useExperience } from "@/components/experience/experience-provider";

gsap.registerPlugin(useGSAP);

export function Initialization() {
  const root = useRef<HTMLDivElement>(null);
  const { reducedMotion, initialized, setInitialized } = useExperience();

  useGSAP(
    () => {
      if (initialized) return;
      if (reducedMotion) {
        setInitialized(true);
        return;
      }

      const title = root.current?.querySelector<HTMLElement>("[data-init-title]");
      if (!title) return;
      const split = new SplitType(title, { types: "chars" });
      const timeline = gsap.timeline({ onComplete: () => setInitialized(true) });
      timeline
        .from(split.chars, { yPercent: 110, opacity: 0, stagger: 0.035, duration: 0.55 })
        .to("[data-init-line]", { scaleX: 1, duration: 0.55 }, "<0.1")
        .to(root.current, { yPercent: -100, duration: 0.78, ease: "power4.inOut" }, "+=0.18");

      return () => {
        split.revert();
        timeline.kill();
      };
    },
    { scope: root, dependencies: [reducedMotion, initialized, setInitialized] },
  );

  if (initialized || reducedMotion) return null;

  return (
    <div ref={root} className="initialization">
      <button className="init-skip" type="button" onClick={() => setInitialized(true)}>
        Skip initialization
      </button>
      <div className="init-register">
        <span>J/S — 2026</span>
        <span>STATE 00</span>
      </div>
      <p>SYSTEM INITIALIZATION</p>
      <div className="init-name" data-init-title>CAO JINMING</div>
      <div className="init-line"><i data-init-line /></div>
      <small>BUSINESS / WORKFLOW / SYSTEM</small>
    </div>
  );
}
