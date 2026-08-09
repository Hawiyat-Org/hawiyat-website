# Hawiyat Batch 2 — Nav CTA, Video, Count-up, FAQ page, SEO files, 10-agent audit

**Branch:** `rebrand/ai-infrastructure-identity` · **HEAD:** `0c7c45c` · tree clean.

## Global Constraints (BINDING)
- Execution-layer identity; hero H1 stays "Hawiyat AI Composer"; no em dashes (—), no "cheap", no hover:scale, no emojis, design tokens only.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.
- CTA system: See plans in DZD / Order X, live in 24h / Watch a run / Chat on WhatsApp / See services in DZD / Book the full stack.
- Reduced-motion respected everywhere.

## Tasks

### Task 1 — Header "Start Building" → home pricing
`components/header.tsx`: the desktop CTA (href="/composer", ~line 119) and the mobile CTA (href="/composer", ~line 193) both say "Start Building" and point to /composer. Change BOTH to `/#pricing`. Keep label "Start Building". Confirm the nav links (Composer/Services/About) stay.

### Task 2 — Speed up Composer text animation
The composer page "text animation" = the GSAP `reveal-up` reveal (opacity 0, y 100% → in, duration 0.8s, stagger 0.2s) in `components/scroll-animations.tsx`, plus the run-console stage step `STAGE_MS = 900`. Speed up BOTH:
- scroll-animations.tsx: reveal timeline duration 0.8 → 0.35, stagger 0.2 → 0.08. Keep trace-line scrub and reduced-motion branch untouched.
- run-console.tsx: `STAGE_MS = 900` → `600`. Keep all behavior.
Do NOT remove the animations (user said "remove or speedup" — choose speedup).

### Task 3 — Count-up animation on ALL number-stat cards
The proof band (`components/our-numbers.tsx`) already has `AnimatedNumber`. The composer telemetry band (`app/composer/page.tsx` ~lines 373-386: `100+` clients, `100B+` tokens) still uses static text. Add the count-up there too. To avoid duplication, extract a shared component:
- Create `components/animated-number.tsx` exporting `AnimatedNumber` (move the existing implementation from our-numbers.tsx, or a generic version: props { value: string; className?: string }, parses leading integer + suffix, first-view IO trigger, ~800ms ease-out, reduced-motion → final value, SSR-safe final value in HTML).
- Refactor `components/our-numbers.tsx` to use the shared component (behavior unchanged).
- Apply the shared component to the composer telemetry values (100+, 100B+) in `app/composer/page.tsx`. Keep the mono display classes.

### Task 4 — Home hero video CTA (YouTube intro)
`components/hero-section.tsx`: replace the secondary CTA "Watch a run execute" (Link → /composer, ~lines 31-36) with a video button that plays the Composer intro video https://www.youtube.com/watch?v=V2N9RvzCdnM in a modal (shadcn `Dialog` from `@/components/ui/dialog`). Button label: "Watch the intro". Use a `Play` lucide icon. The modal contains a responsive YouTube iframe embed (`https://www.youtube-nocookie.com/embed/V2N9RvzCdnM`), 16:9 aspect, autoplay on open, allow fullscreen. Client component — add "use client" to hero-section (check it's currently a server component; converting is acceptable, verify no SSR issue). The primary CTA (See Composer plans → #pricing) stays. Keep the WhatsApp link below.

### Task 5 — Dedicated FAQ page + footer link + SEO wiring
- Extract the FAQ data from `components/faq.tsx` into `lib/data/faqs.ts` (export `faqs` array with question/answer; keep the current 8 entries). Refactor `components/faq.tsx` to import from it (behavior + FAQPage JSON-LD unchanged).
- Create `app/faq/page.tsx`: a full page using the shared `faqs`, with `createMetadata` (title "FAQ | Hawiyat AI Composer & Services in Algeria", description, path "/faq"), a hero header, the FAQ list, and a FAQPage JSON-LD script. Reuse the visual language of home FAQ (mono eyebrow "FAQ", H2, disclosure rows). Server component; the list needs no client state (render as static; if disclosures need JS, make the list a small client component). Simpler: render all answers expanded OR reuse the home accordion pattern via a client component. Recommend: extract the accordion UI into `components/faq-accordion.tsx` (client, used by both home FAQ section and the /faq page) OR keep home as-is and render a static expanded list on /faq. Choose the lowest-risk option; both are acceptable.
- `components/footer.tsx`: add "FAQ" link under "Company" (or a new "Resources" group) → `/faq`.
- `app/sitemap.ts`: add "/faq" to the `routes` array (priority 0.8, monthly).
- `public/llmsfull.txt` + `public/llms.txt`: add a "FAQ" link/mention pointing to https://www.hawiyat.org/faq so agents discover it.
- Verify `app/robots.ts` already emits sitemap (it does — leave it).

### Task 6 — Verify + improve existing SEO files (do not recreate)
Confirm all of these already exist and are correct; only ADD the new /faq route where applicable:
- `app/robots.ts` (robots.txt) — exists, emits sitemap. PASS, no change.
- `app/sitemap.ts` (sitemap.xml) — add "/faq". Also confirm service slugs still auto-derived.
- `public/llms.txt`, `public/llmsfull.txt`, `public/pricing.md` — exist. Add /faq reference (llms + llmsfull), leave pricing.md (already has tables). Ensure no dead links.
Report PASS/ISSUE per file with the exact change made.

### Task 7 — Dispatch 10 audit/evaluation subagents
After Tasks 1-6 land and are reviewed, dispatch TEN parallel evaluation subagents covering SEO, conversion rate (CRO), and marketing strategy, plus overall review/audit. Each returns a findings file in `.superpowers/sdd/2026-08-09-hawiyat-batch2/audits/`. Suggested split (all research-only, no code edits):
1. SEO audit (technical: metadata, schema, sitemap, robots, canonicals, CWV signals)
2. AEO/GEO audit (llms.txt, llmsfull.txt, pricing.md, FAQPage, AI citation)
3. CRO audit (home page above-the-fold, hero, CTAs, pricing)
4. CRO audit (composer page + run-console + video CTA funnel)
5. CRO audit (services catalog + detail pages + order flow)
6. Marketing strategy audit (positioning, messaging consistency, DZD/Algeria, channel readiness)
7. Copy/voice audit (identity, no em dashes, no "cheap", execution-layer)
8. Performance audit (JS bundles, GSAP/iframe cost, count-up animation cost)
9. Accessibility audit (a11y of new modal, accordion, nav CTA, count-up)
10. Competitive/landscape audit (vs n8n/WhatsApp BSP/global AI infra for the Algeria market)
Each: read the relevant surfaces, write findings (BLOCKER/IMPORTANT/MINOR + recommendations), return a short summary. Controller triages and files the outputs.

## Files touched
- components/header.tsx · components/hero-section.tsx · components/scroll-animations.tsx · components/run-console.tsx · components/animated-number.tsx (new) · components/our-numbers.tsx · app/composer/page.tsx · components/faq.tsx · lib/data/faqs.ts (new) · app/faq/page.tsx (new) · components/footer.tsx · app/sitemap.ts · public/llms.txt · public/llmsfull.txt

## Out of scope
- pricing.md content, DESIGN.md, services data, home pricing cards.
