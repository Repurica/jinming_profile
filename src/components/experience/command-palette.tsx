"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useExperience } from "./experience-provider";

const commands = [
  { label: "Open MaFe Bento", hint: "WORK / 01", destination: "/work/mafe-bento" },
  { label: "Open SBS Transit", hint: "RISK / 02", destination: "/work/sbs-transit" },
  { label: "Show recruiter lenses", hint: "GLOBAL MODE", destination: "/#recruiter-lens" },
  { label: "Open resume", hint: "PRINT FILE", destination: "/resume" },
  { label: "Contact", hint: "SIGNAL", destination: "/contact" },
  { label: "About", hint: "PROFILE", destination: "/profile" },
] as const;

export function CommandPalette({ onNavigate }: { onNavigate: (destination: string) => void }) {
  const { paletteOpen, setPaletteOpen, reducedMotion } = useExperience();
  const originRef = useRef<HTMLElement | null>(null);
  const firstCommandRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!paletteOpen) originRef.current = document.activeElement as HTMLElement;
        setPaletteOpen(!paletteOpen);
      }
      if (event.key === "Escape" && paletteOpen) {
        event.preventDefault();
        setPaletteOpen(false);
      }
    }

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [paletteOpen, setPaletteOpen]);

  useEffect(() => {
    if (paletteOpen) {
      firstCommandRef.current?.focus();
      return;
    }
    originRef.current?.focus();
  }, [paletteOpen]);

  function run(destination: string) {
    onNavigate(destination);
    setPaletteOpen(false);
  }

  return (
    <AnimatePresence>
      {paletteOpen ? (
        <motion.div
          className="palette-backdrop"
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setPaletteOpen(false);
          }}
        >
          <motion.div
            className="command-palette"
            role="dialog"
            aria-modal="true"
            aria-label="System command palette"
            onKeyDown={(event) => {
              if (event.key !== "Tab") return;
              const focusable = event.currentTarget.querySelectorAll<HTMLButtonElement>(
                "button:not([disabled])",
              );
              const first = focusable[0];
              const last = focusable[focusable.length - 1];
              if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last?.focus();
              } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first?.focus();
              }
            }}
            initial={reducedMotion ? false : { y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 8, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.24 }}
          >
            <header>
              <span>SYSTEM COMMAND</span>
              <kbd>ESC</kbd>
            </header>
            <div className="command-list">
              {commands.map((command, index) => (
                <button
                  ref={index === 0 ? firstCommandRef : undefined}
                  key={command.label}
                  type="button"
                  onClick={() => run(command.destination)}
                >
                  <span>{command.label}</span>
                  <small>{command.hint}</small>
                </button>
              ))}
            </div>
            <footer>CMD / CTRL + K · NAVIGATE THE SYSTEM</footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
