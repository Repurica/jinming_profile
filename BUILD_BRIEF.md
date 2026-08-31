# CAO JINMING — JINMING / SYSTEM build brief

## Decision and audience
Build a production-quality personal website for recruiters and hiring managers. It must demonstrate how Jinming translates messy business workflows into usable technical systems. The primary decision supported is whether Jinming should be interviewed for roles spanning FinTech, product/workflow engineering, full-stack software, data, and cybersecurity.

Do not build a conventional portfolio template. The site is an explorable professional system: FINTECH SYSTEMS × JAPANESE EDITORIAL DESIGN × DATA VISUALIZATION × DIGITAL MANUSCRIPT × CONTROL-SYSTEM INTERFACE.

Primary positioning:
- “I turn complex workflows into usable product systems.”
- “FinTech & Analytics at SMU, working across software, cybersecurity, data, and business process design.”
- “Between business problems and technical systems.”

## Creative direction and design system
Concept: `JINMING / SYSTEM` / `SYSTEM FILE 2026`.
Aesthetic: a premium diagnostic manuscript—near-black ink, warm paper, precise rules, editorial vertical annotations, intentional asymmetry, technical labels, and cinematic but restrained motion. Inspired by broad principles from experimental Japanese editorial sites, never copied from any copyrighted source.

Color tokens:
- ink `#0B0B0D`
- paper `#F1EFE9`
- muted `#8D8A82`
- fintech `#775CFF` electric violet
- engineering `#3B82F6` cool blue
- security `#087F68` deep teal
- workflow `#E4512B` vermillion

Typography: at most three families. Use an expressive editorial display face, a legible technical sans, and a mono for system labels. Prefer Next font loading and no generic Inter/Arial styling.

Depth:
0 grain/paper; 1 grid/data traces; 2 giant type; 3 content; 4 annotations; 5 cursor/UI; 6 transition masks.

Motion tokens:
- micro 160ms
- UI 320ms
- section 760ms
- cinematic 1200ms
Easing should enter sharply and settle softly; no playful bounce.

## Current repository and stack
The target directory was empty and not a Git repository when inspected. Build under this directory with:
- latest stable Next.js App Router (observed npm latest: 16.3.3)
- React 19, TypeScript
- Tailwind CSS 4
- GSAP + `@gsap/react` + ScrollTrigger
- `motion`
- `lenis`
- `split-type`
- `three`, `@react-three/fiber`, `@react-three/drei`
- use `@react-three/postprocessing`, `maath`, and `simplex-noise` only where they materially improve the result
- use a bespoke DOM/SVG system map rather than shipping an editor-looking React Flow canvas

Do not add libraries without a visual purpose. Keep content data-driven under `src/content`.

## Architecture and chapters
Homepage is one continuous experience with semantic sections and routes for details:
- 00 / INITIALIZE — 1–2 second intro
- 01 / PROFILE — exceptional editorial hero and positioning
- 02 / SYSTEM MAP — interactive project/capability map
- 03 / PROOF OF WORK — signature project systems
- 04 / RISK LAYER — SBS Transit diagnostic experience
- 05 / CAPABILITY GRAPH — evidence-backed skills
- 06 / TIMELINE — filterable career/education timeline
- 07 / SIGNAL — contact terminal without a fake backend

Routes:
- `/`
- `/work/[slug]` for factual case detail pages
- `/timeline`
- `/profile`
- `/contact`
- `/resume` clean, print-friendly, no heavy effects
- metadata, canonical, OG/Twitter metadata, Person JSON-LD, sitemap, robots

Fixed desktop bottom dock: SYSTEM, WORK, TIMELINE, PROFILE, SIGNAL. Compact mobile navigation. Add skip link and strong focus states.

## Signature interactions
Implement these first and make them visually coherent:

1. Cinematic hero
- near-black initialization, grain, thin line, `SYSTEM INITIALIZATION`, character reveal of `CAO JINMING`, then unfold into hero
- left expressive name/statement, center R3F abstract digital-paper artifact cloud, right vertical annotations, bottom system status
- abstract artifacts: order ticket, loan sheet, process diagram, security warning, architecture paper, code/data panes, logistics label
- clicking key artifacts focuses/scrolls to MaFe Bento, SBS Transit, Loan Ranger, or Caritas
- desktop pointer subtly rotates composition; no random sphere or stock illustration
- lazy-load WebGL; mobile uses a designed DOM/SVG artifact composition; offscreen rendering pauses or uses demand mode

2. Global recruiter lens
- modes: FINTECH, ENGINEERING, SECURITY, PRODUCT / WORKFLOW
- globally changes accent tokens, annotations, graph emphasis, and project prominence while preserving the same content
- keyboard-operable compact selector; use React context/state, no Zustand unless needed

3. System Map
- project nodes: MAFE BENTO, SBS TRANSIT, LOAN RANGER, CARITAS IX, ELLIPSIS
- capability nodes: WEB, FINTECH, CYBERSECURITY, WORKFLOW, DATA, CLOUD, PRODUCT, LEADERSHIP, ARCHITECTURE, RISK, ANALYTICS, AUDITING
- custom SVG connections; nodes are buttons; keyboard selection; hover/focus dims unrelated nodes and animates connected edges
- selection opens an in-place contextual preview with PROBLEM / ROLE / SYSTEM / PROOF, then ENTER CASE
- responsive mobile fallback is an interactive vertical narrative, not desktop squeezed or a generic card grid

4. MaFe Bento / ORDER FLOW ENGINE
- pipeline: CUSTOMER → ORDER → RESTAURANT SYSTEM → KITCHEN → PREPARATION → SUPPLY / INVENTORY
- each stage reveals the factual observation/work
- RUN ORDER button launches a visible order ticket through the stages with a GSAP timeline; it is explicitly a workflow visualization, not a backend simulator
- add one carefully scoped pinned story sequence where business context becomes workflow, UI system, architecture, moving order, then supply layer. On mobile/reduced-motion it becomes a clear stepwise narrative without pin/scrub

5. Evidence Graph
- no percentages
- capability nodes: Full-Stack, Workflow Design, Cybersecurity, FinTech, Analytics, Cloud, Mentoring, Architecture
- clicking/focusing a capability highlights only factual evidence: projects, roles, education, and supplied skills

Secondary but required:
- Loan Process Engine: APPLICATION → REVIEW / PROCESSING → ISSUANCE → MAINTENANCE, with CUSTOMER / DEALER / FINANCIAL INSTITUTION perspectives morphing emphasis and paths
- Risk Layer: TRAINING / PHISHING / AUDIT / DOCUMENT RISK and campaign timeline PREP → VENDOR COORDINATION → TEST → EXECUTION → REVIEW; no invented campaign metrics
- filterable hybrid timeline with parallax year markers
- custom cursor desktop only with labels OPEN FILE →, DRAG, ↗, PDF; disable on touch/reduced-motion
- magnetic key controls
- CMD/CTRL+K command palette with commands: open MaFe Bento, open SBS Transit, show lenses, open resume, contact, about
- optional typed easter eggs only after core quality
- editorial text transformation: BUSINESS / WORKFLOW / SYSTEM resolves into `I BUILD BETWEEN THEM.`

## Factual source of truth — never embellish
### Education
Singapore Management University — Master of IT in Business, Financial Technology & Analytics, Aug 2025–Dec 2026.
Singapore Management University — Bachelor of Science, Major in Financial Technology, Second Major in Cybersecurity, Aug 2022–Dec 2025.
Additional exposure: Machine Learning, Blockchain Technology.

### MaFe Bento
Full Stack Web Developer, Singapore, Sep 2025–May 2026.
Worked with restaurant owners and kitchen staff; mapped order-to-preparation workflows; converted workflows into functional requirements; defined user flows and acceptance criteria; handled end-to-end online ordering platform requirements, architecture, implementation, deployment, and post-launch feature iteration; produced technical/functional design for a proposed supply-chain-management system including inventory logic, supplier data flows, and scalability considerations.

### SBS Transit
Cybersecurity Intern, Singapore, May 2024–Aug 2024.
Improved internal cybersecurity training modules and aligned material with current policies; coordinated an internal phishing campaign with internal teams and external vendors across setup, testing, and execution; identified possible security gaps during auditing; helped reduce confidential-document exposure risk.

### Loan Ranger
Project to improve vehicle-loan lifecycle across application, issuance, and maintenance using design thinking and analytics, considering customer experience, dealer experience, and process efficiency for financial institutions.

### Project Caritas IX
Logistics Head. Designed and implemented tracking systems for purchasing, transit, inventory, record accuracy, and logistical coordination.

### SMU Ellipsis Coders Assembly
Mentor. Helped juniors with web application development, programming concepts, debugging, and concept clarification.

### Skills
Programming: Python, C++, Node.js.
Areas: Full-stack development, Cybersecurity, Open Source Intelligence, Data Analytics, AWS, Cloud Infrastructure Architecture.
Languages: English, Chinese.

### Timeline source
2022 SMU BSc begins; 2023 Ellipsis mentoring; 2024 SBS Transit and Caritas; 2025 Bachelor completion, MITB, MaFe Bento; 2026 MaFe Bento and MITB continuation.

No supplied personal email, LinkedIn URL, downloadable PDF, headshot, or work-authorization note exists. Do not invent these. Centralize optional contact fields as null. The UI must gracefully present the `/contact` and `/resume` routes without broken fake external links. Provide print/save on `/resume`; make it easy to replace null contact fields later.

## Animation architecture
- one client `ExperienceProvider` for recruiter lens, reduced-motion preference, command palette, and current chapter
- `SmoothScroll` initializes Lenis only when reduced motion is not requested; connect Lenis RAF to GSAP correctly and clean up
- `gsap.context()` in scoped client components; register ScrollTrigger once; kill/revert on unmount
- SplitType only for major headings and revert splits on cleanup
- CSS handles ambient grain/grid and simple hover states
- Motion handles state/layout transitions, command palette, previews
- GSAP handles intro, pinned MaFe sequence, path/ticket timelines, and chapter choreography
- R3F only for the hero artifact scene. DOM/SVG handles system maps, order/loan/risk/evidence diagrams for accessibility and performance
- all essential content visible without JavaScript animation completion; never default critical content to permanently hidden

## Performance and accessibility
- dynamic import the R3F hero with SSR disabled and a polished fallback
- do not initialize WebGL before needed; degrade on touch/mobile/reduced-motion; pause when offscreen
- restrained postprocessing, no autoplay video, no giant images
- transforms/opacity for motion; avoid layout thrash
- semantic landmarks/headings, skip content, accessible dialogs, keyboard graph controls, visible focus, aria-live for changing previews where useful
- no hover-only information; touch and keyboard equivalents
- `prefers-reduced-motion` removes scrub, parallax, cursor physics, and camera movement, retaining direct transitions and full content
- keep desktop performance practical and architecture capable of Lighthouse ≥90 desktop, Accessibility/SEO ≥95

## Content and behavior constraints
- no generic hero + gradient blob, bento card portfolio, glassmorphism dashboard, cyberpunk/neon, matrix rain, fake terminal spam, random particles/spheres, fake metrics, fake testimonials, fake technologies, stock media, skill percentages, or long loader
- communication terminal is a designed contact interface, but do not claim a message was sent without a backend. It may construct/copy a concise outreach message and explain that direct channels can be configured in content data
- preserve recruiter usability: resume reachable from hero/dock/command palette, normal links work, experimental interactions never block navigation

## Required implementation and verification process
1. Add a short `IMPLEMENTATION_PLAN.md` before coding with design system, motion architecture, chapters, WebGL-vs-DOM decision, and performance risks.
2. Scaffold the app in this existing directory, not a nested folder.
3. Keep typed content data centralized.
4. Build modular components; avoid a monolithic page.
5. Commit meaningful verified stages as small reviewable Git commits.
6. Run dependency install, lint, TypeScript, production build, and any tests.
7. Start the production app and perform a real-browser smoke test at desktop and mobile widths. Verify hero visibility, no console errors, recruiter lens, System Map preview, RUN ORDER, Loan perspectives, Risk timeline, Evidence Graph, timeline filter, command palette keyboard interaction, resume route, print styling, reduced-motion content, and 404 behavior.
8. Inspect screenshots for visual quality and correct obvious clipping/overlap issues.

Done means the implementation is real, built, tested, browser-verified, and committed—not a plan or stub.