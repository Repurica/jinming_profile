"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect } from "react";
import { useExperience } from "./experience-provider";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  const { reducedMotion } = useExperience();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reducedMotion]);

  return null;
}
