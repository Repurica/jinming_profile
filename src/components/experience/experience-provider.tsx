"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { RecruiterLens } from "@/content";

type ExperienceValue = {
  lens: RecruiterLens;
  setLens: (lens: RecruiterLens) => void;
  reducedMotion: boolean;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
  currentChapter: string;
  setCurrentChapter: (chapter: string) => void;
  initialized: boolean;
  setInitialized: (initialized: boolean) => void;
};

const ExperienceContext = createContext<ExperienceValue | null>(null);

export function ExperienceProvider({ children }: { children: ReactNode }) {
  const [lens, setLens] = useState<RecruiterLens>("fintech");
  const [reducedMotion, setReducedMotion] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [currentChapter, setCurrentChapter] = useState("profile");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.lens = lens;
  }, [lens]);

  const value = useMemo(
    () => ({
      lens,
      setLens,
      reducedMotion,
      paletteOpen,
      setPaletteOpen,
      currentChapter,
      setCurrentChapter,
      initialized,
      setInitialized,
    }),
    [lens, reducedMotion, paletteOpen, currentChapter, initialized],
  );

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>;
}

export function useExperience() {
  const value = useContext(ExperienceContext);
  if (!value) {
    throw new Error("useExperience must be used within ExperienceProvider");
  }
  return value;
}
