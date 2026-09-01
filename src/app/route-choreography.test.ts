import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const styles = readFileSync(
  resolve(dirname(fileURLToPath(import.meta.url)), "globals.css"),
  "utf8",
);

type CssRule = { selectors: string[]; declarations: string };

function leafRules(source: string): CssRule[] {
  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((match) => ({
    selectors: match[1].split(",").map((selector) => selector.trim()),
    declarations: match[2],
  }));
}

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

function ruleFor(source: string, selector: string) {
  const rule = leafRules(source).find((candidate) => candidate.selectors.includes(selector));
  expect(rule, `missing rule for ${selector}`).toBeDefined();
  return rule!;
}

function delayFor(selector: string) {
  const declarations = leafRules(styles).find((rule) => (
    rule.selectors.includes(selector) && /--route-enter-delay:/.test(rule.declarations)
  ))?.declarations;
  if (!declarations) throw new Error(`missing route delay rule for ${selector}`);
  const delay = declarations.match(/--route-enter-delay:\s*(\d+)ms/)?.[1];
  expect(delay, `missing route delay for ${selector}`).toBeDefined();
  return Number(delay);
}

const animatedRouteSelectors = [
  'html[data-enhanced="true"] .route-header nav',
  'html[data-enhanced="true"] .route-header > p',
  'html[data-enhanced="true"] .route-header h1',
  'html[data-enhanced="true"] .route-header > strong',
  'html[data-enhanced="true"] .route-content > *',
];

describe("secondary-route entrance choreography", () => {
  it("animates route hierarchy only when the early enhancement marker is present", () => {
    const revealRule = ruleFor(styles, animatedRouteSelectors[0]);

    expect(revealRule.selectors).toEqual(animatedRouteSelectors);
    expect(revealRule.declarations).toMatch(
      /animation:\s*route-enter\s+var\(--section\)\s+var\(--ease-system\)\s+both/,
    );
    expect(revealRule.declarations).toMatch(
      /animation-delay:\s*var\(--route-enter-delay,\s*280ms\)/,
    );

    const routeAnimationSelectors = leafRules(styles)
      .filter((rule) => /\banimation(?:-name)?\s*:/.test(rule.declarations))
      .flatMap((rule) => rule.selectors)
      .filter((selector) => /\.route-(?:header|content)/.test(selector));

    expect(routeAnimationSelectors.length).toBeGreaterThan(0);
    expect(routeAnimationSelectors.every((selector) => (
      selector.startsWith('html[data-enhanced="true"] ')
    ))).toBe(true);
  });

  it("uses a restrained editorial stagger across the header and route-content children", () => {
    const delays = [
      delayFor('html[data-enhanced="true"] .route-header nav'),
      delayFor('html[data-enhanced="true"] .route-header > p'),
      delayFor('html[data-enhanced="true"] .route-header h1'),
      delayFor('html[data-enhanced="true"] .route-header > strong'),
      delayFor('html[data-enhanced="true"] .route-content > *'),
      delayFor('html[data-enhanced="true"] .route-content > :nth-child(2)'),
      delayFor('html[data-enhanced="true"] .route-content > :nth-child(3)'),
      delayFor('html[data-enhanced="true"] .route-content > :nth-child(4)'),
    ];

    expect(delays).toEqual([...delays].sort((left, right) => left - right));
    expect(new Set(delays).size).toBe(delays.length);
    expect(delays.at(-1)).toBeLessThanOrEqual(520);

    const sectionDuration = Number(styles.match(/--section:\s*(\d+)ms/)?.[1]);
    expect(sectionDuration).toBeGreaterThan(0);
    expect(sectionDuration).toBeLessThanOrEqual(800);
  });

  it("finishes fully visible and untransformed without hiding critical copy", () => {
    const keyframes = blockAfter(styles, "@keyframes route-enter");
    const from = blockAfter(keyframes, "from");
    const to = blockAfter(keyframes, "to");
    const startingOpacity = Number(from.match(/opacity:\s*([\d.]+)/)?.[1]);
    const travel = Number(from.match(/translateY\(([\d.]+)rem\)/)?.[1]);

    expect(startingOpacity).toBeGreaterThan(0);
    expect(startingOpacity).toBeLessThan(1);
    expect(travel).toBeGreaterThan(0);
    expect(travel).toBeLessThanOrEqual(1);
    expect(to).toMatch(/opacity:\s*1/);
    expect(to).toMatch(/transform:\s*none/);
  });

  it("removes every route animation when reduced motion is requested", () => {
    const reducedMotion = blockAfter(styles, "@media (prefers-reduced-motion: reduce)");
    const reducedRule = ruleFor(reducedMotion, animatedRouteSelectors[0]);

    expect(reducedRule.selectors).toEqual(animatedRouteSelectors);
    expect(reducedRule.declarations).toMatch(/animation:\s*none/);
    expect(reducedRule.declarations).toMatch(/opacity:\s*1/);
    expect(reducedRule.declarations).toMatch(/transform:\s*none/);
  });
});
