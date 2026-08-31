"use client";

import { useEffect, useRef, useState } from "react";
import { useExperience } from "./experience-provider";

export function CustomCursor() {
  const { reducedMotion } = useExperience();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
        setLabel(target?.dataset.cursor ?? "");
      });
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", move);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;
  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <span>{label}</span>
    </div>
  );
}
