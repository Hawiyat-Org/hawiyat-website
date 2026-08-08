# Hawiyat Website Rebrand — IA & Content Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Hawiyat's website from an "AI subscription / VPS reseller" into an **AI infrastructure platform** (Approach A IA) per the approved spec `docs/superpowers/specs/2026-08-08-ai-infrastructure-rebrand-design.md` and design system `DESIGN.md` v2.0.

**Architecture:** Delete off-mission routes + schedule system; rename to **Hawiyat AI Composer**; build a lean home (hero + 3-card pricing + proof + Algeria band + FAQ + CTA); build a dedicated `/composer` architecture page; de-resellerize services catalog; install the token system (paper/ink/signal/ember), JetBrains Mono, lucide icons, Execution Trace signature; clean dead code and fix Prisma drift first.

**Tech Stack:** Next.js 14 (App Router, `next@^14.2.32`) • React 18 • TypeScript • Tailwind CSS • Prisma/Postgres • shadcn/ui • Framer Motion + GSAP (ScrollTrigger) • lucide-react.

**Branch:** `rebrand/ai-infrastructure-identity` (already created; all work lands here).

---

## Global Constraints

1. **Positioning copy (hard):** never sell "cheap Claude" or "LLM optimization". Sell the **execution layer**. Product is **Hawiyat AI Composer** (shorthand "Composer" ok in UI).
2. **Model-agnostic:** copy/visuals show GPT/Claude/Gemini/Llama/open models as interchangeable routes.
3. **Tokens only:** no raw hex in components. Tokens in `app/globals.css` per `DESIGN.md` §Palette. CTA button light = `--signal` fill + `--signal-text` (ink); dark = `--signal` + `--signal-text` (dark green).
4. **Fonts:** exactly Space Grotesk (`--font-space`) + JetBrains Mono (`--font-mono`). No Ubuntu/Dancing Script/Playfair/Poly. No Bootstrap Icons CDN (lucide-react only).
5. **Proof-band numbers:** placeholder values marked `TODO`; may ship `100+ clients` (verified 108) and `2.6M DA ARR` (2,621,906 DA). **FORBIDDEN: `+50B tokens`.**
6. **Verification gates:** build ignores TS/ESLint. Every task MUST end with `npx tsc --noEmit` (or `pnpm lint` where noted) + `pnpm build` to catch errors the build ignores.
7. **Sequence:** Task 1 (Prisma/schedule removal) and Task 2 (token/font infrastructure) MUST precede page rebuilds (Task 4+), because `pnpm build` regenerates the Prisma client from schema and pages depend on tokens/fonts.
8. **Renames in copy:** "Hawiyat Composer" → **"Hawiyat AI Composer"**; `LLM Credit` → **"AI Composer access"**.
9. `/dcma` stays (redirects to `/dmca`). WhatsApp is primary contact (`wa.me/213559555951`).
10. All work on branch `rebrand/ai-infrastructure-identity`; commit after each task.

---

### Task 1: Remove schedule system + fix Prisma drift + seed

**Files:**
- Delete: `app/schedule/` (page + layout), `components/schedule/` (all 3 files)
- Delete: `app/api/schedule/` (4 routes: availability, bookings, send-verification, verify-booking)
- Modify: `prisma/schema.prisma` (remove `Booking`/`BusinessHours`/`BlockedDate`/`VerificationCode`; add back `Waitlist` model — it's drift; keep `Order`/`EmailSubscription`)
- Modify: `lib/prisma/seed.ts` (currently a broken copy of the availability API route — replace with minimal no-op seed + comment)
- Modify: `app/sitemap.ts` (remove `/schedule`), `components/footer.tsx`, `app/terms/page.tsx` + `app/privacy/page.tsx` (remove schedule mentions if any), `lib/email-utils.ts` (remove schedule email templates), `components/services-teaser.tsx` (unused — see Task 8 delete)
- Modify: `app/api/waitlist/route.ts` + `app/api/subscribe/route.ts` (they use prisma.waitlist / prisma.emailSubscription — keep)

**Interfaces:**
- Produces: `prisma.schema.prisma` with models `Order`, `EmailSubscription`, `BootcampRegistration` (from existing) + `Waitlist` (restored). No schedule models. `lib/prisma/seed.ts` exports nothing (side-effect only). No `app/schedule` or `app/api/schedule` routes exist.
- Consumes: existing `lib/prisma/prismaClient.ts` named import `{ prisma }`.

- [ ] **Step 1: Read current schema + schedule routes** — confirm the full model list and that only `Order`/`EmailSubscription`/`BootcampRegistration` exist in `schema.prisma` today.
- [ ] **Step 2: Edit `prisma/schema.prisma`** — restore `Waitlist` model and remove the four schedule models. Reference `prisma/migrations/20251114195950_gg/migration.sql` + `20250729143840_init/migration.sql` for the exact historical `Waitlist` fields.
- [ ] **Step 3: Replace `lib/prisma/seed.ts`** with a minimal seed:
```ts
// lib/prisma/seed.ts
import { prisma } from "./prismaClient"

// No seed data required for the marketing site. `pnpm db:reset` runs
// `prisma migrate reset` + this file; a clean DB needs no bootstrap data.
// Re-add seed logic here if the client dashboard needs reference rows.
async function main() {
  // intentionally empty
  console.log("Seed complete (no data required)")
}

main().finally(() => prisma.$disconnect())
```
- [ ] **Step 4: Delete** `app/schedule/`, `components/schedule/`, `app/api/schedule/`.
- [ ] **Step 5: Remove `/schedule` references** in `app/sitemap.ts`, `components/footer.tsx`, `app/terms/page.tsx`, `app/privacy/page.tsx`, `lib/email-utils.ts` (schedule email templates), and anywhere else `rg -l "schedule|availability|verify-booking"` finds.
- [ ] **Step 6: Verify** `npx tsc --noEmit` passes; `pnpm db:push` works without error; `pnpm build` succeeds.
- [ ] **Step 7: Commit** `git add -A && git commit -m "refactor: remove schedule system; restore Waitlist model; fix seed"`

---

### Task 2: Install design tokens + JetBrains Mono + tailwind map

**Files:**
- Modify: `app/globals.css` (replace legacy vars with token set; add dark tokens)
- Modify: `tailwind.config.js` (map new colors; remove `poly`; add `font-mono`)
- Modify: `app/layout.tsx` (add JetBrains Mono via next/font; remove Bootstrap Icons CDN; keep Space Grotesk)

**Interfaces:**
- Produces: CSS variables (light+dark): `--paper --ink --surface --surface-dim --border --muted --signal --signal-text --signal-contrast --signal-bg --ember --ember-deep --danger --ok`, plus existing shadcn HSL set retained. Tailwind colors: `paper, ink, surface, surface-dim, border, muted, signal, signal-text, signal-contrast, signal-bg, ember, ember-deep, danger, ok` mapping to `var(--…)`. `--font-mono` mapped to `mono`.
- Consumes: `DESIGN.md` §Palette + §Contrast rules for exact hex values.

- [ ] **Step 1: Read current `app/globals.css` fully** (558 lines) — inventory legacy vars (`--primary-text-color`, `--btn-bg`, `.purple-bg-grad`, `.gradient-text`, `hero-bg-gradient`, etc.) so the swap doesn't silently break `.btn`, `.header-links`, `.footer-link`, `.faq-accordion`.
- [ ] **Step 2: Add light-mode tokens** to `:root` (keep shadcn HSL set) per DESIGN.md:
```css
:root {
  /* Hawiyat execution-layer tokens (light) */
  --paper: #F7F6F3;
  --ink: #0B0F0E;
  --surface: #FDFCFA;
  --surface-dim: #EDEBE5;
  --border: #E4E2DC;
  --muted: #62665F;
  --signal: #16A085;
  --signal-text: #0B0F0E;
  --signal-contrast: #0C6A56;
  --signal-bg: #E6FFF7;
  --ember: #B06A21;
  --ember-deep: #8C4D11;
  --danger: #C03E2B;
  --ok: #0E9F6E;
}
```
- [ ] **Step 3: Add dark tokens** under `.dark` per DESIGN.md:
```css
.dark {
  --paper: #0A0F0E;
  --ink: #EDF2EF;
  --surface: #111817;
  --surface-dim: #18211F;
  --border: #242B28;
  --muted: #8FA09A;
  --signal: #2EE6B6;
  --signal-text: #00382C;
  --signal-contrast: #B6F7E4;
  --signal-bg: #0E241E;
  --ember: #F2A23B;
  --ember-deep: #FFC97A;
  --danger: #F4684F;
  --ok: #37D67A;
}
```
- [ ] **Step 4: Edit `tailwind.config.js`** — add colors mapping to the new vars + `fontFamily.mono`, remove `fontFamily.poly`.
```js
colors: {
  paper: "var(--paper)",
  ink: "var(--ink)",
  surface: "var(--surface)",
  "surface-dim": "var(--surface-dim)",
  border: "var(--border)",
  muted: "var(--muted)",
  signal: "var(--signal)",
  "signal-text": "var(--signal-text)",
  "signal-contrast": "var(--signal-contrast)",
  "signal-bg": "var(--signal-bg)",
  ember: "var(--ember)",
  "ember-deep": "var(--ember-deep)",
  danger: "var(--danger)",
  ok: "var(--ok)",
  // keep shadcn mappings unchanged
}
fontFamily: {
  sans: ["var(--font-space)", "sans-serif"],
  mono: ["var(--font-mono)", "ui-monospace", "monospace"],
}
```
- [ ] **Step 5: Edit `app/layout.tsx`** — add JetBrains Mono:
```tsx
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
// <html className={`${space.variable} ${mono.variable} antialiased`}>
```
Remove the Bootstrap Icons CDN `<link>` block. Remove the two Google font `@import`s in `globals.css` (Dancing Script/Ubuntu + Poly) — the legacy `.font-serif`/`.font-thin` classes that reference them get fixed in Task 7.
- [ ] **Step 6: Update layout metadata** title/description to execution-layer positioning (see Task 4 copy) — e.g. title default `Hawiyat AI Composer | Execution Layer for Business AI`, description mentioning model-independent execution in DZD.
- [ ] **Step 7: Verify** `pnpm lint` + `npx tsc --noEmit` + `pnpm build` pass; confirm no Bootstrap Icons or legacy font `@import` remain in `app/`.
- [ ] **Step 8: Commit** `git commit -m "feat(tokens): install Hawiyat token set, JetBrains Mono, remove Bootstrap CDN & legacy fonts"`

---

### Task 3: Execution Trace signature component + GSAP

**Files:**
- Create: `components/execution-trace.tsx` (shared signature element)
- Modify: `components/scroll-animations.tsx` (add trace-line reveal)
- Create (test helper): `components/execution-trace-demo.tsx` for hero use (optional; can inline in hero)

**Interfaces:**
- Produces: `<ExecutionTrace stages={…} active={n} telemetry={…} />` — props: `stages: string[]` (default 6), `active: number` (current step), `telemetry: string[]` (mono strip lines), `showTelemetry?: boolean`. Renders a horizontal pipeline with a moving spark; respects `prefers-reduced-motion` (static when reduced).
- Consumes: tokens `--signal`, `--signal-text`, `--muted`, `--paper`, `--surface-dim`; `--font-mono`.

- [ ] **Step 1: Read `components/scroll-animations.tsx`** to match its GSAP setup style.
- [ ] **Step 2: Create `components/execution-trace.tsx`:**
```tsx
"use client"
import { cn } from "@/lib/utils"

export interface ExecutionTraceProps {
  stages?: string[]
  active?: number
  telemetry?: string[]
  className?: string
}

const DEFAULT_STAGES = ["UNDERSTAND", "PLAN", "ROUTE", "EXECUTE", "EVALUATE", "RESULT"]

export function ExecutionTrace({ stages = DEFAULT_STAGES, active = 0, telemetry = [], className }: ExecutionTraceProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-4 md:p-6 font-mono text-xs", className)}>
      <div className="flex items-center justify-between gap-2 overflow-x-auto">
        {stages.map((stage, i) => (
          <div key={stage} className="flex flex-1 items-center gap-2 last:flex-none">
            <span
              className={cn(
                "whitespace-nowrap rounded-full px-2 py-1 transition-colors",
                i <= active ? "bg-signal text-signal-text" : "bg-surface-dim text-muted"
              )}
            >
              {stage}
            </span>
            {i < stages.length - 1 && <span className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>
      {telemetry.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-border pt-3 text-[11px] text-muted">
          {telemetry.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  )
}
```
- [ ] **Step 3: Add a trace-line reveal** to `scroll-animations.tsx` — a 1px horizontal line that draws in on scroll using ScrollTrigger (GSAP `scaleX` from 0→1 on `.trace-line`), keeping existing `reveal-up` + `#dashboard` 3D. Respect `prefers-reduced-motion` (leave the element visible).
- [ ] **Step 4: Verify** `pnpm lint` + `npx tsc --noEmit` pass; `pnpm build` succeeds.
- [ ] **Step 5: Commit** `git commit -m "feat: Execution Trace signature component + trace-line scroll reveal"`

---

### Task 4: Route removal + redirects + nav/footer/sitemap

**Files:**
- Delete: `app/cyber-security/`, `app/guides/`, `app/ai-algeria/`
- Modify: `components/header.tsx` (nav), `components/footer.tsx` (links), `app/sitemap.ts`
- Create: `app/composer/page.tsx` (redirect target — built in Task 5), plus `app/hawiyat-composer/page.tsx` becomes a permanent redirect → `/composer` (delete page, add route):
  - Modify: `next.config.mjs` or `middleware.ts` redirect. Simplest: delete `app/hawiyat-composer/` and add a redirect in `middleware.ts` (already exists with rate limit) or `next.config.mjs` `redirects()`. **Recommend `next.config.mjs` `redirects()`** (build-time, no middleware cost).

**Interfaces:**
- Produces: No `app/cyber-security`, `app/guides`, `app/ai-algeria`, `app/hawiyat-composer` dirs. `/hawiyat-composer` → 308 to `/composer`. `header.tsx` nav: Composer | Services | About + CTA. Footer without bootcamp/templates/monitoring/blog links.
- Consumes: Task 2 tokens for any restyle done here.

- [ ] **Step 1: Delete** `app/cyber-security/`, `app/guides/`, `app/ai-algeria/`.
- [ ] **Step 2: Add redirect** in `next.config.mjs`:
```js
async redirects() {
  return [
    { source: "/hawiyat-composer", destination: "/composer", permanent: true },
  ]
}
```
- [ ] **Step 3: Rewrite `components/header.tsx` nav** — links: `Composer` → `/composer`, `Services` → `/services`, `About` → `/about`; CTA `Start Building` → `/composer`. Remove `AI in Algeria`, `Cyber Security` entries. Keep theme toggle.
- [ ] **Step 4: Rewrite `components/footer.tsx`** — The Layer: AI Composer (`/composer`), Services (`/services`), About (`/about`); Company: Support (WhatsApp `https://wa.me/213559555951`), GitHub; Legal: Terms/Privacy/DMCA. Remove AI Bootcamp/Templates/Monitoring/Blog links. Replace `bi-*` social icons with lucide equivalents (Task 6 covers icon sweep — do it here for footer since it's open).
- [ ] **Step 5: Update `app/sitemap.ts`** — remove `/cyber-security`, `/guides/*`, `/ai-algeria`, `/schedule`, `/bootcamp`, `/templates`; add `/composer`.
- [ ] **Step 6: Remove now-orphaned API routes** `app/api/bootcamp/register/`, `app/api/templates/` and dead components `bootcamp-effects.tsx`, `registration-modal.tsx` (confirm not imported elsewhere first via `rg`).
- [ ] **Step 7: Verify** `rg -rn "cyber-security|ai-algeria|/guides|/schedule|/bootcamp|/templates" app components` returns nothing except intentional; `npx tsc --noEmit` + `pnpm build` pass.
- [ ] **Step 8: Commit** `git commit -m "refactor: remove off-mission routes; add /composer redirect; update nav/footer/sitemap"`

---

### Task 5: `/composer` page (architecture & engine)

**Files:**
- Create: `app/composer/page.tsx` (+ `app/composer/layout.tsx` with metadata)
- Reuse: `ExecutionTrace`, tokens, GSAP.

**Interfaces:**
- Produces: `/composer` page with sections: hero (H1 "Hawiyat AI Composer", sub "The AI execution engine"), Execution Trace (larger), Any Model/Any System (model chips + systems cards), engine capabilities (6 cards), telemetry band (placeholder numbers marked TODO), enterprise full-stack (Composer+n8n+Evolution+Platform, WhatsApp CTA), Why-not-DIY strip, CTA → `/services`.
- Consumes: tokens from Task 2; `ExecutionTrace` from Task 3; `lib/data/services.ts` for pricing references.

- [ ] **Step 1: Create `app/composer/layout.tsx`** with metadata (title `Hawiyat AI Composer | The AI Execution Engine`, canonical `/composer`, OG) using `createMetadata` from `@/lib/seo`.
- [ ] **Step 2: Build the hero** — H1 "Hawiyat AI Composer", mono eyebrow `EXECUTION LAYER · MODEL-INDEPENDENT`, sub copy from DESIGN.md, CTAs (`Start building` → `/services`, `See how it executes` → scroll to trace).
- [ ] **Step 3: Execution loop section** — large `ExecutionTrace` with mono telemetry strip; map the 6 stages with short descriptions.
- [ ] **Step 4: Any Model. Any System.** — two-zone: sticky left title "One layer. Every model. Every system." + right cards (GPT/Claude/Gemini/Llama/open + WhatsApp/CRM/ERP/email/DB/n8n).
- [ ] **Step 5: Engine capabilities** — 6 cards (Model Gateway, Context Selector, Tool Router, Reliability & Fallbacks, Guardrails & Evaluations, Cost Controls) with lucide icons.
- [ ] **Step 6: Telemetry/metrics band** — mono stat cards with **placeholder values marked `TODO`** (never `+50B tokens`). Example: `TODO: tasks executed`, `TODO: p95 latency`, `100+ clients` (verified).
- [ ] **Step 7: Enterprise full-stack + Why-not-DIY + CTA** — full-stack bundle section with WhatsApp CTA ("Book with the team"); DIY comparison strip (OpenAI+Claude+n8n+WhatsApp+DB); final CTA → `/services`.
- [ ] **Step 8: Verify** `npx tsc --noEmit` + `pnpm build`; check `/composer` renders, `/hawiyat-composer` redirects.
- [ ] **Step 9: Commit** `git commit -m "feat: build /composer architecture & engine page"`

---

### Task 6: De-resellerize services catalog + detail pages

**Files:**
- Modify: `lib/data/services.ts` (rename, re-categorize, reorder, remove discount mechanics, rewrite copy for composer entries)
- Modify: `components/services/services-catalog.tsx` (ordering, "Why Choose Hawiyat" strip, category badge map)
- Modify: `app/services/page.tsx` (H1 + metadata + description)

**Interfaces:**
- Produces: `services` array with composer entries named `Hawiyat AI Composer` (+ Pro/MAX tiers), categories from `AI Execution` / `Managed Systems` / `Cloud Runtime`, `LLM Credit` → `AI Composer access`. Catalog ordered engine-first. No strikethrough `originalPrice`/launch-price strings on the composer cards. Detail pages `/services/[slug]` still work via `getServiceBySlug`.
- Consumes: existing `Service`/`ServicePlan` types (keep shape), `OrderForm`/`ServiceOrderForm`/`ServicePlans` components (keep).

- [ ] **Step 1: Rename composer entries** in `lib/data/services.ts` — `name: "Hawiyat AI Composer Pro"`, MAX tiers `Hawiyat AI Composer MAX 5X` / `MAX 20X`; drop `+ Claude Code` from names. Update `shortDesc`/`description`/`features`/`bulletPoints`/`seo`/`details`/`faq` to execution-layer value (routing, context, fallbacks, evaluation) — remove "2x Claude credits", "No daily or weekly limits" credit-multiplier framing.
- [ ] **Step 2: Re-categorize** — `category: "AI Subscription"` → `"AI Execution"`; `LLM Credit` → `"AI Composer access"` under `"AI Execution"`; n8n/Evolution/Hosting stay `"Managed Systems"`/`"Cloud Runtime"` as appropriate.
- [ ] **Step 3: Remove launch-price discount strings** — delete `originalPrice`/launch-note text on composer cards (leave honest `price` + `priceLabel`).
- [ ] **Step 4: Reorder catalog** in `services-catalog.tsx` — engine (Composer) cards first, then systems. Adjust `buildCatalogCards()` ordering + `tagStyleMap` for new categories.
- [ ] **Step 5: Rewrite "Why Choose Hawiyat" strip** — lead with execution layer: local support, DZD billing, model-agnostic, telemetry/evaluation, not generic hosting ops.
- [ ] **Step 6: Update `app/services/page.tsx`** H1/description → execution framing ("Run your stack on the Hawiyat execution layer — in DZD"), metadata title without "Claude Code" branding.
- [ ] **Step 7: Verify** `npx tsc --noEmit` + `pnpm build`; visit `/services` + a `/services/[slug]`.
- [ ] **Step 8: Commit** `git commit -m "feat(services): de-resellerize catalog — Hawiyat AI Composer naming, execution categories, honest pricing"`

---

### Task 7: Rebuild home `/` (lean, converting)

**Files:**
- Modify: `app/page.tsx` (full rewrite)
- Modify: `components/hero-section.tsx` (new hero copy + Execution Console), `components/ai-playground.tsx` (→ Execution Console mock, remove "Pablo"), `components/pricing.tsx` (3 cards incl. switchable MAX), `components/trusted-brands.tsx` (proof band), `components/faq.tsx` (5 questions), `components/call-to-action.tsx`, `components/newsletter.tsx` (keep), `components/benefits-section.tsx`, `components/prebuilt-tools.tsx`, `components/additional-features.tsx`, `components/build-ai-apps.tsx`, `components/one-subscription.tsx`, `components/resources.tsx` (repurpose or drop from home)
- Create: `components/algeria-band.tsx` (the `/ai-algeria` content as a home section)

**Interfaces:**
- Produces: Home page order: Hero(+Execution Console) → Pricing (Pro | MAX switchable | Enterprise) → Proof band → Algeria band → FAQ → CTA → Newsletter → Footer. `/services` still the order target. Enterprise card has "Book with the team → WhatsApp" feature + CTA. All `bi-*` and raw hex replaced with lucide + tokens.
- Consumes: tokens (Task 2), `ExecutionTrace` (Task 3), `services` data (Task 6), verified proof numbers (Task 4 policy).

- [ ] **Step 1: Rewrite `app/page.tsx`** to the lean order above; drop Testimonials/commented blocks; drop the old "AI provider built for Algeria" inline block (replaced by Algeria band).
- [ ] **Step 2: Rework `hero-section.tsx`** — H1 `The layer that decides how your business uses AI.`, mono eyebrow `HAWIYAT AI COMPOSER · EXECUTION LAYER`, sub, CTAs (`Start building` → `/composer`, `See services` → `/services`), embed `ExecutionTrace`/Execution Console in the hero panel (keep the GSAP 3D dashboard wrapper).
- [ ] **Step 3: Convert `ai-playground.tsx`** → Execution Console mock: task chip types in `"Reply to order 1024 on WhatsApp in Arabic"`, spark travels stages, mono telemetry strip; **remove `Pablo`** and legacy nav items; model chips (Hawiyat auto / Claude / GPT / Gemini / Llama). Signup popup copy → "Run your business on Hawiyat".
- [ ] **Step 4: Rewrite `pricing.tsx`** — 3 cards:
  - **Pro** (from `composer-pro`): price + OrderForm CTA.
  - **MAX 5X / MAX 20X** switchable — one card with a toggle; pulls both services; OrderForm CTA switches by active tier.
  - **Enterprise** highlighted: full-stack (Composer+n8n+Evolution+Platform); feature list incl. **"Book with the team → WhatsApp"**; CTA → WhatsApp + `/services`.
  - H2 e.g. "Plans for the execution layer" + sub "One engine. Every model. In DZD."
- [ ] **Step 5: Build `components/algeria-band.tsx`** — compact section: DZD, Algiers HQ, official invoicing (facturation), Itihad + Label Projet Innovant, AR/FR/EN support; CTAs → WhatsApp + `/services`. Use tokens; mono eyebrow `BUILT AND SUPPORTED IN ALGERIA`.
- [ ] **Step 6: Update `trusted-brands.tsx`** → proof band: mono stat cards with `100+ clients` + `2.6M DA ARR` (verified) + placeholders marked `TODO`; "Trusted by" logos (Itihad/ESTIN/IT Solutions) kept.
- [ ] **Step 7: Update `faq.tsx`** — 5 questions per DESIGN.md §12 (execution-layer answers, incl. north-star line, model-agnostic, DZD costs, data, start). Keep accordion.
- [ ] **Step 8: Update CTA/newsletter/benefits/prebuilt/additional/resources/one-subscription** — restyle to tokens + lucide; rewrite headlines to execution-layer voice; **drop `build-ai-apps.tsx` and `resources.tsx` from home** if not needed (defer → Task 8 cleanup or keep with new copy — decide by lean-home principle: home is hero→pricing→proof→Algeria→FAQ→CTA).
- [ ] **Step 9: Verify** `npx tsc --noEmit` + `pnpm lint` + `pnpm build`; check `/` renders all sections, mobile responsive, dark mode, reduced-motion (trace static).
- [ ] **Step 10: Commit** `git commit -m "feat(home): rebuild lean home with execution hero, 3-card pricing, proof band, Algeria band"`

---

### Task 8: Restyle `/about` + dead-code cleanup + token sweep

**Files:**
- Modify: `app/about/page.tsx` (restyle to tokens/lucide; fix copy)
- Modify: all remaining components touching raw hex / `bi-*` / `font-serif` — token + icon sweep across ~12 files (list from Task 2 audit + `rg "bg-\\[#|dark:bg-\\[#|bi-" components app`)
- Delete: `components/bootcamp-effects.tsx`, `registration-modal.tsx`, `floating-elements.tsx`, `services-teaser.tsx` (unused), `testimonials.tsx` (commented out), `components/ai-playground.tsx` (if fully replaced — else keep as Execution Console), `app/dcma` (keep? no — keep `/dcma`), `styles/globals.css` (dead duplicate)
- Modify: `components/scroll-animations.tsx` (verify trace-line + reveal still fine)

**Interfaces:**
- Produces: `/about` restyled (no `bi-*`, no raw hex, no `font-serif` display); repo has no `bi-*` icon usage, no raw `bg-[#…]` in components, no `styles/globals.css`, no dead components. Token/icon conventions enforced.

- [ ] **Step 1: Restyle `app/about/page.tsx`** — replace `bi-*` (`bi-arrow-right`, `bi-whatsapp`, `bi-box-seam`) with lucide (`ArrowRight`, `MessageCircle`, `Package`); replace `bg-[#f6f7fb] dark:bg-[#141414]` with `bg-surface-dim dark:bg-surface-dim` tokens; remove `.purple-bg-grad` decorative blobs; replace `font-serif`/`font-thin` display ("Us", "Together") with Space Grotesk weights; fix copy to execution-layer voice (no "AI subscriptions").
- [ ] **Step 2: Token/icon sweep** — run `rg -n "bg-\\[#|dark:bg-\\[#|bi-" components app --glob '!**/node_modules/**'` and convert each hit to tokens/lucide. Keep the mapping table from Task 2 Step 1 (e.g. `#f6f7fb`→`surface-dim`, `#141414`→`surface-dim` dark, `#1a1a1a`→`surface`, `#171717`→`surface-dim`).
- [ ] **Step 3: Delete dead files** (`styles/globals.css`, `bootcamp-effects.tsx`, `registration-modal.tsx`, `floating-elements.tsx`, `services-teaser.tsx`, `testimonials.tsx`) — confirm no imports via `rg` first.
- [ ] **Step 4: Verify** `npx tsc --noEmit` + `pnpm lint` + `pnpm build`; `rg -n "bi-|bg-\\[#|dark:bg-\\[#|font-serif|font-thin" components app` returns only intentional (documented) cases or zero.
- [ ] **Step 5: Commit** `git commit -m "refactor: restyle about, token/icon sweep, remove dead code"`

---

### Task 9: Final QA + cross-page consistency

**Files:** all changed files.

- [ ] **Step 1: Full verify** — `pnpm lint`, `npx tsc --noEmit`, `pnpm build`. `pnpm db:push` (or `db:reset`) runs clean.
- [ ] **Step 2: Route audit** — visit `/`, `/composer`, `/services`, `/services/[slug]`, `/about`, legal pages. Confirm `/hawiyat-composer` → `/composer` redirect; no links to removed routes.
- [ ] **Step 3: Copy audit** — `rg -n "cheap|subscription|credit|2x|5x|20x Claude|Hawiyat Composer\\+Claude|50B|+50B" app components lib/data` — no reseller/cheap-claims; "Hawiyat AI Composer" naming consistent.
- [ ] **Step 4: Proof-band audit** — confirm no `+50B tokens` anywhere; `100+ clients`/`2.6M DA ARR` present; placeholders marked `TODO`.
- [ ] **Step 5: Design audit** — run validators (design + technical + strategic) on the diff vs. spec to confirm compliance (reuse the three validator briefs from the earlier review).
- [ ] **Step 6: Commit** any remaining fixes.

---

## Self-Review Notes

- **Spec coverage:** every §2–§10 of the spec maps to a task (routes→T4, home→T7, composer→T5, services→T6, about→T8, tokens/fonts→T2, signature→T3, Prisma→T1, rename→T6+T7+T4, proof policy→T7). 
- **Placeholders:** only intentional `TODO` marks on proof-band numbers.
- **Ordering:** T1 (schema) + T2 (tokens/fonts) precede page builds; T3 (trace) before T5/T7; T6 (services data) before T7 (pricing pulls services).
- **Dependencies:** `ExecutionTrace` (T3) → `hero`/`composer` (T7/T5). `services` data (T6) → `pricing` (T7). Tokens (T2) → all restyle tasks.
