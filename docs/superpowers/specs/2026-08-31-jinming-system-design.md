# JINMING / SYSTEM — Design Specification

## Purpose

Build a production-quality personal website that helps recruiters and hiring managers decide whether to interview Cao Jinming for work spanning FinTech, product/workflow engineering, full-stack software, data, and cybersecurity. The experience must demonstrate a repeatable professional pattern: turning complex business workflows into usable technical systems.

`BUILD_BRIEF.md` is the factual and product source of truth. No biography, metric, contact detail, employer claim, link, technology, or outcome may be added unless it appears there.

## Recommended approach

Use progressive enhancement with a semantic DOM/SVG core and one deliberately bounded WebGL enhancement.

Alternative 1, DOM/SVG only, would offer the simplest performance and accessibility profile but would not fully realize the requested cinematic artifact cloud. Alternative 2, WebGL-led chapters, would make the site visually novel at the cost of fragile navigation, reduced-motion complexity, and recruiter usability. The selected hybrid preserves the expressive hero while keeping every project, graph, workflow, and route readable and operable without WebGL or animation completion.

## Experience architecture

The homepage is a continuous seven-chapter manuscript:

1. INITIALIZE introduces the system in a short, skippable cinematic sequence.
2. PROFILE states the positioning and provides immediate access to work and the resume.
3. SYSTEM MAP connects projects to capabilities and reveals factual previews.
4. PROOF OF WORK presents the MaFe Bento order-flow story and Loan Ranger process engine.
5. RISK LAYER presents SBS Transit work as a diagnostic workflow without invented results.
6. CAPABILITY GRAPH connects skills to supplied evidence, followed by the filterable timeline.
7. SIGNAL provides an honest outreach-message utility without pretending to send anything.

Desktop uses a persistent bottom dock and an optional custom cursor. Mobile uses compact navigation and purpose-built vertical diagram fallbacks. Standard links always remain available.

Secondary routes provide durable, direct destinations: `/work/[slug]`, `/timeline`, `/profile`, `/contact`, and `/resume`. Unknown case-study slugs and unknown routes return a designed 404. `/resume` is quiet, print-friendly, and free of heavy effects.

## Visual system

The visual language is a premium diagnostic manuscript rather than a conventional portfolio. Warm paper, near-black ink, fine rules, data traces, oversized editorial type, vertical annotations, and deliberately asymmetric composition establish the identity. Violet, blue, teal, and vermillion are semantic lens accents, not decorative gradients.

Typography uses three locally managed Next font families: an expressive display face, a technical sans, and a mono label face. CSS custom properties encode color, spacing, border, type, motion, and current-lens tokens. Grain and grid texture are lightweight CSS/SVG effects; there is no stock media.

The layout remains readable before hydration. Critical copy is never initialized as hidden. Motion enhances hierarchy rather than revealing otherwise inaccessible content.

## State and data boundaries

Typed content under `src/content` is the only source for profile facts, education, projects, capabilities, timeline entries, skills, and nullable contact channels. Case-study pages and homepage modules consume the same records to prevent factual drift.

A single `ExperienceProvider` owns:

- active recruiter lens;
- reduced-motion preference;
- command-palette state;
- current chapter;
- initialization completion.

Component-local state handles graph selection, timeline filters, workflow runs, and process perspectives. URL routes remain the source of truth for direct navigation. No global state library is needed.

## Component boundaries

The root shell provides metadata, skip link, global navigation, recruiter-lens control, command palette, custom cursor, smooth scrolling, and the experience provider.

Each homepage chapter is a focused section component. Reusable interaction primitives include lens controls, editorial headings, case links, graph nodes, contextual previews, process-stage controls, and magnetic controls. Diagram-specific data and rendering stay separate so the desktop SVG and mobile narrative can share selection state without sharing unsuitable layout logic.

The R3F artifact cloud is isolated behind a dynamic client import. A designed DOM/SVG hero composition is both its loading fallback and the final rendering on mobile, touch, reduced-motion, or failed WebGL capability.

## Interaction design

The recruiter lens changes CSS accent tokens, annotations, graph emphasis, and project ordering while leaving all facts intact. It is a radio-style keyboard-operable control.

The System Map and Evidence Graph use real buttons inside labeled SVG/DOM structures. Selecting or focusing a node highlights connected evidence, dims unrelated items, updates an `aria-live` preview, and preserves a direct case link. Mobile presents the same relationships as a vertical interactive narrative.

The MaFe Bento `RUN ORDER` control moves a visible order ticket through the six supplied workflow stages. Desktop may use a scoped GSAP timeline and one pinned explanatory sequence; mobile and reduced-motion use direct step transitions and never pin or scrub.

Loan Ranger switches among customer, dealer, and financial-institution perspectives while keeping the same four-stage lifecycle visible. SBS Transit exposes four risk areas and a five-stage campaign timeline without metrics. Timeline filters affect a chronological hybrid list with restrained desktop year-marker parallax only.

The command palette is an accessible dialog opened by Cmd/Ctrl+K and offers only the requested commands. Magnetic controls and the labeled custom cursor apply only to fine pointers with motion enabled. Escape closes overlays; focus is restored to the opener.

The contact utility builds and copies an outreach draft. It states that direct channels are not configured and never claims transmission. The resume route offers browser print/save, not a nonexistent download.

## Motion and rendering architecture

CSS handles grain, grid, hover, focus, and ambient line movement. Motion handles state transitions, previews, and the command palette. GSAP handles initialization, the scoped MaFe story, order/loan paths, and chapter choreography. SplitType is reserved for major headings and reverted during cleanup. R3F is used only for the hero artifact composition.

Lenis initializes only when reduced motion is not requested. It is connected to GSAP's ticker without duplicate request-animation-frame loops and is destroyed on cleanup. ScrollTrigger is registered once and each use is scoped with `gsap.context()` and reverted on unmount.

The hero Canvas uses demand rendering and intersection visibility. Pointer camera effects are slight, desktop-only, and paused offscreen. The DOM fallback occupies the same bounded region to avoid layout shift.

## Accessibility and resilience

The document uses semantic landmarks and heading order, a skip link, visible focus rings, sufficient contrast, labeled controls, accessible dialog behavior, and keyboard/touch equivalents for every hover interaction. Changes to graph previews and workflow states are announced selectively.

Reduced motion removes smooth scrolling, cursor physics, camera movement, parallax, pinned/scrubbed storytelling, split character motion, and path travel. Content remains complete and transitions become direct or very short. If JavaScript or WebGL fails, semantic text, navigation, case links, and the DOM hero remain useful.

Missing contact fields render an explicit configuration-unavailable state rather than dead links. Missing case slugs use `notFound()`. Copy failure provides a selectable text fallback. The design does not depend on network images or a backend.

## Metadata and discoverability

The root defines a canonical base, title template, description, Open Graph and Twitter metadata, and Person JSON-LD limited to supplied facts. Generated sitemap and robots routes enumerate public routes and known case pages. The no-invented-assets constraint means social metadata must not reference a nonexistent image.

## Verification strategy

Unit and component tests cover content integrity, lens behavior, graph selection, workflow controls, timeline filtering, command-palette keyboard behavior, nullable contact handling, and unknown case slugs where practical. Static checks include ESLint, TypeScript, and a production build.

A production server is then exercised in a real browser at desktop and mobile widths and with reduced motion. The smoke pass checks the hero, lens, System Map preview, order run, loan perspectives, risk timeline, Evidence Graph, timeline filter, command palette, resume and print styling, secondary routes, console errors, and 404 behavior. Screenshots are inspected for clipping, overlap, contrast, and responsive composition, with defects fixed before completion.

## Scope discipline

The site includes no CMS, analytics service, email backend, downloadable resume artifact, headshot, authentication, database, fabricated metrics, testimonials, or optional easter egg. These can be added later only with factual content and an explicit product need.
