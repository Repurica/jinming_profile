import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const styles = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "globals.css"),
  "utf8",
);

function blockAfter(source: string, marker: string) {
  const markerIndex = source.indexOf(marker);
  expect(markerIndex, `missing ${marker}`).toBeGreaterThanOrEqual(0);

  const openIndex = source.indexOf("{", markerIndex);
  let depth = 0;
  for (let index = openIndex; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") depth -= 1;
    if (depth === 0) return source.slice(openIndex + 1, index);
  }

  throw new Error(`unclosed block for ${marker}`);
}

function expectDeclaration(rule: string, declaration: RegExp) {
  expect(rule).toMatch(declaration);
}

describe("reduced-motion CSS fallbacks", () => {
  const reducedMotion = blockAfter(styles, "@media (prefers-reduced-motion: reduce)");

  it("restores a native cursor when the custom cursor is disabled", () => {
    const cursorRule = blockAfter(reducedMotion, "body,");

    expect(cursorRule).toMatch(/cursor:\s*auto/);
  });

  it("recomposes every MaFe narrative into an unclipped vertical flow", () => {
    const storyRule = blockAfter(reducedMotion, ".mafe-story {");
    const trackRule = blockAfter(reducedMotion, ".mafe-story-track {");
    const articleRule = blockAfter(reducedMotion, ".mafe-story article {");

    expectDeclaration(storyRule, /height:\s*auto/);
    expectDeclaration(storyRule, /min-height:\s*0/);
    expectDeclaration(storyRule, /overflow:\s*visible/);
    expectDeclaration(trackRule, /display:\s*grid/);
    expectDeclaration(trackRule, /width:\s*auto/);
    expectDeclaration(trackRule, /height:\s*auto/);
    expectDeclaration(trackRule, /transform:\s*none\s*!important/);
    expectDeclaration(articleRule, /width:\s*auto/);
    expectDeclaration(articleRule, /min-height:\s*70svh/);
  });
});
