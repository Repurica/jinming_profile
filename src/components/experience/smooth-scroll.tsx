"use client";

import { gsap } from "gsap";
import Lenis from "lenis";
import { useEffect } from "react";
import { useExperience } from "./experience-provider";

export function SmoothScroll() {
  const { reducedMotion } = useExperience();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", () => undefined);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
