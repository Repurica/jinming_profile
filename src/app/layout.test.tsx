import { render, screen } from "@testing-library/react";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import Home from "./page";

const appDirectory = dirname(fileURLToPath(import.meta.url));

it("exposes a skip link and main landmark", () => {
  render(
    <ExperienceProvider>
      <Home />
    </ExperienceProvider>,
  );

  expect(screen.getByRole("link", { name: /skip to main content/i })).toHaveAttribute(
    "href",
    "#main-content",
  );
  expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
});

it("declares browser icons so production navigation stays console-clean", () => {
  const iconPath = resolve(appDirectory, "icon.svg");
  const faviconPath = resolve(appDirectory, "../../public/favicon.ico");

  expect(existsSync(iconPath)).toBe(true);
  expect(existsSync(faviconPath)).toBe(true);

  const palette = [
    ...new Set(readFileSync(iconPath, "utf8").match(/#[\da-f]{6}/gi)?.map((color) => color.toLowerCase())),
  ].sort();
  expect(palette).toEqual(["#0b0b0d", "#775cff", "#f1efe9"].sort());
});

it("gates blocking effects behind the early enhancement marker", () => {
  const layout = readFileSync(resolve(appDirectory, "layout.tsx"), "utf8");
  const styles = readFileSync(resolve(appDirectory, "globals.css"), "utf8");

  expect(layout).toContain('document.documentElement.dataset.enhanced = "true"');
  expect(styles).toMatch(/\.initialization\s*{[^}]*display:\s*none/);
  expect(styles).toMatch(
    /html\[data-enhanced="true"\]\s+\.initialization\s*{[^}]*display:\s*grid/,
  );
  expect(styles).toMatch(
    /@media \(pointer: fine\) and \(min-width: 901px\)\s*{\s*html\[data-enhanced="true"\]\s+body,/,
  );
});
