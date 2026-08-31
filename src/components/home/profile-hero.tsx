"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MagneticControl } from "@/components/experience/magnetic-control";
import { RecruiterLens } from "@/components/experience/recruiter-lens";
import { useExperience } from "@/components/experience/experience-provider";
import { ArtifactFallback } from "@/components/hero/artifact-fallback";
import { profile } from "@/content";
import { EditorialTransform } from "./editorial-transform";
import { Initialization } from "./initialization";

const ArtifactScene = dynamic(() => import("@/components/hero/artifact-scene"), {
  ssr: false,
});

export function ProfileHero() {
  const { reducedMotion } = useExperience();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 901px) and (pointer: fine)");
    const update = () => setEligible(desktop.matches && !reducedMotion);
    update();
    desktop.addEventListener("change", update);
    return () => desktop.removeEventListener("change", update);
  }, [reducedMotion]);

  useEffect(() => {
    const node = sceneRef.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(Boolean(entry?.isIntersecting)), {
      rootMargin: "120px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Initialization />
      <section className="profile-hero" id="profile" aria-labelledby="profile-title">
        <div className="hero-grid-trace" aria-hidden="true" />
        <header className="hero-register">
          <span>JINMING / SYSTEM</span>
          <span>SYSTEM FILE 2026</span>
          <span>SINGAPORE / SG</span>
        </header>

        <div className="hero-statement">
          <p className="chapter-label">01 / PROFILE</p>
          <h1 id="profile-title"><span>CAO</span> JINMING</h1>
          <p className="hero-positioning">{profile.positioning}</p>
          <div className="hero-actions">
            <MagneticControl>
              <Link href="#work" className="system-button primary" data-cursor="DRAG">Read the work <span>↓</span></Link>
            </MagneticControl>
            <MagneticControl>
              <Link href="/resume" className="system-button" data-cursor="PDF">Open resume <span>↗</span></Link>
            </MagneticControl>
          </div>
          <RecruiterLens />
        </div>

        <div className="hero-artifacts" ref={sceneRef}>
          <ArtifactFallback />
          {eligible && visible ? <ArtifactScene /> : null}
          <div className="artifact-axis axis-x" aria-hidden="true" />
          <div className="artifact-axis axis-y" aria-hidden="true" />
        </div>

        <aside className="hero-annotation" aria-label="Profile annotation">
          <span>金融科技</span>
          <p>{profile.context}</p>
          <div><i /> ACTIVE SYSTEM</div>
        </aside>

        <footer className="hero-status">
          <span>STATUS / AVAILABLE FOR CONVERSATION</span>
          <span>LENS / SELECTABLE</span>
          <span>SCROLL TO INSPECT ↓</span>
        </footer>
      </section>
      <EditorialTransform />
    </>
  );
}
