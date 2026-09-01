import { render, screen } from "@testing-library/react";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { expect, it } from "vitest";
import { ExperienceProvider } from "@/components/experience/experience-provider";
import Home from "./page";

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
  const appDirectory = dirname(fileURLToPath(import.meta.url));

  expect(existsSync(resolve(appDirectory, "icon.svg"))).toBe(true);
  expect(existsSync(resolve(appDirectory, "../../public/favicon.ico"))).toBe(true);
});
