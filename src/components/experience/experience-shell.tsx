"use client";

import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { CommandPalette } from "./command-palette";
import { CustomCursor } from "./custom-cursor";
import { ExperienceProvider } from "./experience-provider";
import { MobileNav } from "./mobile-nav";
import { SmoothScroll } from "./smooth-scroll";
import { SystemDock } from "./system-dock";

function ExperienceChrome({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const quietRoute = pathname === "/resume";

  return (
    <>
      {quietRoute ? null : <SmoothScroll />}
      {quietRoute ? null : <MobileNav />}
      {children}
      {quietRoute ? null : <SystemDock />}
      {quietRoute ? null : (
        <CommandPalette onNavigate={(destination) => router.push(destination)} />
      )}
      {quietRoute ? null : <CustomCursor />}
    </>
  );
}

export function ExperienceShell({ children }: { children: ReactNode }) {
  return (
    <ExperienceProvider>
      <ExperienceChrome>{children}</ExperienceChrome>
    </ExperienceProvider>
  );
}
