# JINMING / SYSTEM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and verify the complete production-quality CAO JINMING “JINMING / SYSTEM” recruiting website defined in `BUILD_BRIEF.md`.

**Architecture:** Use Next.js App Router with typed content records and semantic React/DOM/SVG as the accessible core. A single experience context coordinates global lens, motion preference, palette, and chapter state; GSAP, Motion, Lenis, and SplitType have narrowly separated animation responsibilities, while a lazy R3F scene progressively enhances only the desktop hero.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, GSAP with `@gsap/react` and ScrollTrigger, Motion, Lenis, SplitType, Three.js with React Three Fiber and Drei, Vitest, Testing Library, Playwright/browser automation.

**Spec:** `docs/superpowers/specs/2026-08-31-jinming-system-design.md`

## Global Constraints

- `BUILD_BRIEF.md` is authoritative; do not invent facts, metrics, links, contact details, technologies, or outcomes.
- Keep typed factual data under `src/content`; nullable email, LinkedIn, PDF, headshot, and work-authorization fields remain `null`.
- Use WebGL only for the lazy desktop hero; all diagrams and essential content use semantic DOM/SVG.
- All interactions must have keyboard and touch equivalents and remain complete with reduced motion.
- The `/resume` route must print cleanly and offer browser print/save without claiming a PDF exists.
- Unknown case slugs and unknown routes must produce a designed 404.
- Commit each verified task as a small reviewable Git commit.

---

### Task 1: Application foundation and test harness

**Files:**
- Create: `package.json`, lockfile, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`, `vitest.setup.ts`
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`
- Create: `src/app/layout.test.tsx`

**Interfaces:**
- Produces: Next.js App Router shell, Tailwind pipeline, `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`.

- [ ] Install the brief-approved runtime dependencies and focused test dependencies in the existing repository root.
- [ ] Write a shell test asserting the rendered document exposes the skip target and main landmark.
- [ ] Run the test and confirm it fails before the shell exists.
- [ ] Implement the minimal typed root layout, global CSS token foundation, and semantic homepage shell.
- [ ] Run the focused test, lint, and TypeScript; correct all failures.
- [ ] Commit with `chore: establish application foundation`.

### Task 2: Typed factual content and metadata

**Files:**
- Create: `src/content/types.ts`, `src/content/profile.ts`, `src/content/projects.ts`, `src/content/timeline.ts`, `src/content/capabilities.ts`, `src/content/index.ts`
- Create: `src/content/content.test.ts`
- Modify: `src/app/layout.tsx`
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/components/seo/person-json-ld.tsx`

**Interfaces:**
- Produces: `Project`, `TimelineEntry`, `Capability`, `RecruiterLens`, `ContactChannels`; `projects`, `timelineEntries`, `capabilities`, `profile`, and lookup helpers.

- [ ] Write tests asserting every supplied project, role, education entry, skill, timeline year, and null contact field exactly matches the build brief; assert project slugs are unique.
- [ ] Run the content test and confirm the missing module failure.
- [ ] Implement immutable typed records and lookup helpers without adding unsupplied facts.
- [ ] Add title template, description, canonical metadata, Open Graph/Twitter text metadata, Person JSON-LD, sitemap entries, and robots policy without nonexistent images or social URLs.
- [ ] Run content tests, lint, TypeScript, and build.
- [ ] Commit with `feat: centralize factual profile content`.

### Task 3: Experience shell and global controls

**Files:**
- Create: `src/components/experience/experience-provider.tsx`, `smooth-scroll.tsx`, `recruiter-lens.tsx`, `command-palette.tsx`, `custom-cursor.tsx`, `system-dock.tsx`, `mobile-nav.tsx`, `magnetic-control.tsx`
- Create: `src/components/experience/experience.test.tsx`
- Modify: `src/app/layout.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: `useExperience(): { lens, setLens, reducedMotion, paletteOpen, setPaletteOpen, currentChapter, setCurrentChapter }` and accessible global controls.
- Consumes: recruiter lens identifiers and project slugs from `src/content`.

- [ ] Write component tests for arrow-key lens selection, Cmd/Ctrl+K opening, Escape closing, command navigation, and focus restoration.
- [ ] Run the focused tests and confirm missing component failures.
- [ ] Implement the provider and radio-style lens selector, then the focus-managed command dialog and route commands.
- [ ] Add desktop dock, compact mobile navigation, reduced-motion-aware Lenis integration, fine-pointer cursor labels, and magnetic controls.
- [ ] Run focused tests, lint, and TypeScript.
- [ ] Commit with `feat: add global experience controls`.

### Task 4: Cinematic profile hero

**Files:**
- Create: `src/components/home/initialization.tsx`, `profile-hero.tsx`, `editorial-transform.tsx`
- Create: `src/components/hero/artifact-fallback.tsx`, `artifact-scene.tsx`, `hero-artifacts.ts`
- Create: `src/components/home/profile-hero.test.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: chapter anchors `#system`, `#work`, `#timeline`, `#profile`, `#signal`; hero artifact case links; lazy desktop `ArtifactScene` with DOM/SVG fallback.
- Consumes: `useExperience`, project slugs, motion preference.

- [ ] Write tests asserting positioning copy, resume/work links, artifact case destinations, and reduced-motion initialization bypass.
- [ ] Run focused tests and confirm failure.
- [ ] Implement the always-readable hero and 1–2 second initialization choreography using scoped GSAP and reversible SplitType.
- [ ] Implement the designed DOM/SVG artifact composition, then dynamically import the demand-rendered R3F enhancement for eligible desktop clients with intersection pausing and subtle pointer rotation.
- [ ] Add the BUSINESS / WORKFLOW / SYSTEM editorial text resolution and system status treatment.
- [ ] Run focused tests, lint, TypeScript, and build.
- [ ] Commit with `feat: create cinematic profile hero`.

### Task 5: System Map and case preview

**Files:**
- Create: `src/components/system-map/system-map.tsx`, `system-map-desktop.tsx`, `system-map-mobile.tsx`, `system-preview.tsx`, `map-model.ts`
- Create: `src/components/system-map/system-map.test.tsx`
- Create: `src/components/home/system-map-section.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: accessible project/capability selection with `PROBLEM / ROLE / SYSTEM / PROOF` preview and `ENTER CASE` link.
- Consumes: content projects/capabilities and current lens.

- [ ] Write tests for keyboard node selection, connected-node emphasis state, preview fields, case link, and mobile narrative labels.
- [ ] Run focused tests and confirm failure.
- [ ] Implement a deterministic map model with explicit project-to-capability edges.
- [ ] Implement the desktop bespoke SVG connection layer and button nodes without hover-only information.
- [ ] Implement the mobile vertical narrative using the same model and selection state.
- [ ] Run focused tests, lint, and TypeScript.
- [ ] Commit with `feat: build interactive system map`.

### Task 6: Proof-of-work process engines

**Files:**
- Create: `src/components/work/order-flow-engine.tsx`, `mafe-story.tsx`, `loan-process-engine.tsx`, `process-stage.tsx`
- Create: `src/components/work/process-engines.test.tsx`
- Create: `src/components/home/proof-of-work-section.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: `CUSTOMER → ORDER → RESTAURANT SYSTEM → KITCHEN → PREPARATION → SUPPLY / INVENTORY` visualization; Loan Ranger four-stage lifecycle and three perspective controls.
- Consumes: MaFe Bento and Loan Ranger factual records and reduced-motion state.

- [ ] Write fake-timer tests proving RUN ORDER visits each stage and direct reduced-motion state changes remain readable; test all three Loan Ranger perspectives and four lifecycle stages.
- [ ] Run focused tests and confirm failure.
- [ ] Implement the six-stage order model and visible ticket with scoped GSAP travel plus an explicit “workflow visualization” label.
- [ ] Implement one desktop-only pinned MaFe narrative and a non-pinned mobile/reduced-motion sequence.
- [ ] Implement Loan Ranger perspective emphasis without adding lifecycle outcomes or metrics.
- [ ] Run focused tests, lint, TypeScript, and build.
- [ ] Commit with `feat: add workflow process engines`.

### Task 7: Risk, evidence, and timeline chapters

**Files:**
- Create: `src/components/risk/risk-layer.tsx`, `risk-timeline.tsx`
- Create: `src/components/evidence/evidence-graph.tsx`, `evidence-model.ts`
- Create: `src/components/timeline/timeline-view.tsx`, `timeline-filter.tsx`
- Create: `src/components/home/risk-section.tsx`, `capability-section.tsx`, `timeline-section.tsx`
- Create: `src/components/home/evidence-timeline.test.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: four risk controls, five campaign stages, eight evidence capabilities with factual links, and filterable 2022–2026 timeline.
- Consumes: project, role, education, skill, capability, and timeline content records.

- [ ] Write tests for all risk labels/stages, capability-to-evidence selection with no percentages, and timeline filtering that preserves chronological order.
- [ ] Run focused tests and confirm failure.
- [ ] Implement Risk Layer controls and campaign path with reduced-motion-safe direct transitions.
- [ ] Implement the keyboard-operable Evidence Graph with explicit evidence relationships and live preview.
- [ ] Implement timeline filters and desktop-only motion-enabled year-marker parallax.
- [ ] Run focused tests, lint, and TypeScript.
- [ ] Commit with `feat: add risk evidence and timeline chapters`.

### Task 8: Signal and secondary routes

**Files:**
- Create: `src/components/contact/contact-terminal.tsx`, `contact-terminal.test.tsx`
- Create: `src/components/resume/resume-document.tsx`
- Create: `src/app/contact/page.tsx`, `src/app/profile/page.tsx`, `src/app/timeline/page.tsx`, `src/app/resume/page.tsx`
- Create: `src/app/work/[slug]/page.tsx`, `src/app/not-found.tsx`
- Create: `src/components/home/signal-section.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css`

**Interfaces:**
- Produces: outreach draft copy utility, static project params and factual case pages, print/save resume, direct profile/timeline routes, designed 404.
- Consumes: all centralized content and `getProjectBySlug(slug)`.

- [ ] Write tests that null channels render no dead external links, copy success says “copied” rather than “sent,” every known slug renders, and unknown slugs invoke not-found behavior.
- [ ] Run focused tests and confirm failure.
- [ ] Implement the contact terminal with editable/selectable outreach draft and honest clipboard fallback.
- [ ] Implement the profile, timeline, case detail, and resume routes from shared content records.
- [ ] Add print CSS that removes navigation/effects and preserves readable resume hierarchy; add an explicit `window.print()` control.
- [ ] Implement the designed not-found route with working return navigation.
- [ ] Run all tests, lint, TypeScript, and build.
- [ ] Commit with `feat: complete routes and contact signal`.

### Task 9: Production verification and visual repair

**Files:**
- Modify only files implicated by verified defects.
- Create: `tests/smoke.spec.ts` if browser assertions can be retained without brittle animation timing.

**Interfaces:**
- Consumes the complete production build.
- Produces exact command results and inspected desktop/mobile/reduced-motion screenshots.

- [ ] Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`; fix root causes and repeat until all pass.
- [ ] Start the production server and verify it responds before browser automation.
- [ ] At desktop width, verify hero visibility, lens changes, System Map preview, RUN ORDER, Loan perspectives, Risk timeline, Evidence Graph, timeline filter, Cmd/Ctrl+K, resume route, and unknown-route 404; assert no console errors.
- [ ] At mobile width, repeat core navigation and interaction checks and confirm the mobile artifact/map/process fallbacks are usable without horizontal overflow.
- [ ] Emulate reduced motion and confirm initialization, pinned sections, parallax, cursor physics, and camera movement are disabled while all content remains visible.
- [ ] Inspect full-page and focused screenshots for clipping, overlap, contrast, and visual hierarchy; repair every obvious issue and rerun affected checks.
- [ ] Review `git diff --check`, final status, and commit history; commit verified repairs with `fix: resolve production verification issues` only if repairs were required.
