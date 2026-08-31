"use client";

import { useEffect, useState } from "react";
import { projects, type ProjectSlug } from "@/content";
import { SystemMapDesktop } from "./system-map-desktop";
import { SystemMapMobile } from "./system-map-mobile";
import { SystemPreview } from "./system-preview";

export function SystemMap() {
  const [activeSlug, setActiveSlug] = useState<ProjectSlug>("mafe-bento");
  const [mobile, setMobile] = useState(false);
  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0]!;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const update = () => setMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (mobile) return <SystemMapMobile />;

  return (
    <div className="system-map-layout">
      <SystemMapDesktop
        activeProject={activeProject}
        onSelect={(slug: ProjectSlug) => setActiveSlug(slug)}
      />
      <SystemPreview project={activeProject} />
    </div>
  );
}
