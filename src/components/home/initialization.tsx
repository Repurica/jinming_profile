"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { useCallback, useEffect, useRef } from "react";
import { useExperience } from "@/components/experience/experience-provider";

gsap.registerPlugin(useGSAP);

export function Initialization() {
  const root = useRef<HTMLDivElement>(null);
  const skip = useRef<HTMLButtonElement>(null);
  const { reducedMotion, initialized, setInitialized } = useExperience();

  const completeInitialization = useCallback(
    (focusMain: "always" | "if-dialog-focused") => {
      const shouldFocusMain =
        focusMain === "always" || Boolean(root.current?.contains(document.activeElement));
      setInitialized(true);
      if (shouldFocusMain) {
        document.querySelector<HTMLElement>("#main-content")?.focus();
      }
    },
    [setInitialized],
  );

  useEffect(() => {
    if (initialized || reducedMotion) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    skip.current?.focus();
  }, [initialized, reducedMotion]);

  useGSAP(
    () => {
      if (initialized) return;
      if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        completeInitialization("if-dialog-focused");
        return;
      }

      const title = root.current?.querySelector<HTMLElement>("[data-init-title]");
      if (!title) return;
      const split = new SplitType(title, { types: "chars" });
      const timeline = gsap.timeline({
        onComplete: () => completeInitialization("if-dialog-focused"),
      });
      timeline
        .from(split.chars, { yPercent: 110, opacity: 0, stagger: 0.035, duration: 0.55 })
        .to("[data-init-line]", { scaleX: 1, duration: 0.55 }, "<0.1")
        .to(root.current, { yPercent: -100, duration: 0.78, ease: "power4.inOut" }, "+=0.18");

      return () => {
        split.revert();
        timeline.kill();
      };
    },
    { scope: root, dependencies: [reducedMotion, initialized, completeInitialization] },
  );

  if (initialized) return null;

  function skipInitialization() {
    completeInitialization("always");
  }

  return (
    <div
      ref={root}
      className="initialization"
      role="dialog"
      aria-modal="true"
      aria-label="System initialization"
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        event.preventDefault();
        skip.current?.focus();
      }}
    >
      <button ref={skip} className="init-skip" type="button" onClick={skipInitialization}>
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
