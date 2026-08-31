"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { useExperience } from "./experience-provider";

export function MagneticControl({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reducedMotion } = useExperience();

  function move(event: PointerEvent<HTMLSpanElement>) {
    if (reducedMotion || event.pointerType === "touch") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left - box.width / 2) * 0.16;
    const y = (event.clientY - box.top - box.height / 2) * 0.16;
    if (ref.current) ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "translate3d(0, 0, 0)";
  }

  return (
    <span className={`magnetic ${className}`} onPointerMove={move} onPointerLeave={reset}>
      <span ref={ref}>{children}</span>
    </span>
  );
}
