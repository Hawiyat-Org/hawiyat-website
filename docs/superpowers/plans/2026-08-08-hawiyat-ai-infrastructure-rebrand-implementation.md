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
5. **Proof-band numbers:** may ship verified values `100+ clients` (108 paying) and `≈2.6M DZD ARR` (2,621,906 DA, `≈` + `DZD` suffix ALWAYS attached); do **NOT** render unverified metrics. **No literal `TODO` string may render on any page** — hide non-verified metrics entirely rather than showing TODO text. **FORBIDDEN: `+50B tokens`, `+60 clients`, "10 Resellers", "300 Templates".**
6. **Verification gates:** build ignores TS/ESLint. Every task MUST end with `npx tsc --noEmit` (or `pnpm lint` where noted) + `pnpm build` to catch errors the build ignores. The tsc gate is only trustworthy if pre-existing dead code is removed (see Task 1: `lib/helper.ts`, `test/email-test.ts`).
7. **Sequence:** Task 1 (Prisma/schedule removal) and Task 2 (token/font infrastructure) MUST precede page rebuilds (Task 4+), because `pnpm build` regenerates the Prisma client from schema and pages depend on tokens/fonts. Task 4 → Task 5 must be contiguous (T5 immediately after T4) to close the `/composer` redirect 404 window. Do NOT parallelize `pnpm build` in the same working tree (races on `.next/` + `.prisma/client`).
8. **Renames in copy:** "Hawiyat Composer" → **"Hawiyat AI Composer"** everywhere; `LLM Credit` → **"AI Composer access"**; drop "and Claude Code" naming in metadata/JSON-LD.
9. `/dcma` stays (redirects to `/dmca`). WhatsApp is primary contact (`wa.me/213559555951`). **`/ai-algeria` gets a permanent redirect** → `/` (do not leave indexed URLs 404ing).
10. All work on branch `rebrand/ai-infrastructure-identity`; commit after each task.
11. **DESIGN.md staleness guard:** `DESIGN.md` §4 TrustedBrands spec still lists `+60 clients` / `+50B tokens`; that is **SUPERSEDED by GC5** (numbers policy) — implementers must NOT copy those stats from DESIGN.md. Do not "fix" plan copy back to DESIGN.md where the plan deliberately overrides it (hero eyebrow, tier naming, home section count).
12. **Copy context:** before writing any marketing copy (Tasks 5/6/7), read `.agents/product-marketing.md` (created in Task 5 Step 1) or `DESIGN.md` §1 & §9. Copy must satisfy the acceptance checklist in Task 9 Step 6.

---

### Task 1: Remove schedule system + fix Prisma drift + seed

**Files:**
- Delete: `app/schedule/` (page + layout), `components/schedule/` (4 files: calendar-grid, schedule-header, scheduling-panel, time-slots-list)
- Delete: `app/api/schedule/` (4 routes: availability, bookings, send-verification, verify-booking)
- Modify: `prisma/schema.prisma` (remove `Booking`/`BusinessHours`/`BlockedDate`/`VerificationCode` — they exist only in migrations, not schema; add back `Waitlist` model — it's drift; keep `Order`/`EmailSubscription`/`BootcampRegistration`)
- Modify: `lib/prisma/seed.ts` (currently a broken copy of the availability API route — replace with minimal no-op seed + comment)
- Delete: `lib/helper.ts` (dead code — `prisma.invoice`/`prisma.payment` reference models absent from schema; breaks the `tsc` gate)
- Delete/Modify: `test/email-test.ts` (imports `sendBookingConfirmationEmail` which is removed — delete it or repoint at `sendOrderConfirmation`/`sendOrderNotification`)
- Delete: `lib/date-utils.ts` (dead schedule-helper code, no importers)
- Modify: `app/sitemap.ts` (remove `/schedule`), `components/footer.tsx`, `app/terms/page.tsx` + `app/privacy/page.tsx` (remove schedule mentions if any), `lib/email-utils.ts` (remove schedule email templates), `components/services-teaser.tsx` (unused — see Task 8 delete)
- Modify: `app/api/waitlist/route.ts` + `app/api/subscribe/route.ts` (they use prisma.waitlist / prisma.emailSubscription — keep)

**Interfaces:**
- Produces: `prisma.schema.prisma` with models `Order`, `EmailSubscription`, `BootcampRegistration` (from existing) + `Waitlist` (restored). No schedule models. `lib/prisma/seed.ts` exports nothing (side-effect only). No `app/schedule`, `app/api/schedule`, `lib/helper.ts`, `lib/date-utils.ts`, `test/email-test.ts` exist.
- Consumes: existing `lib/prisma/prismaClient.ts` named import `{ prisma }`. Restored `Waitlist` MUST satisfy `app/api/waitlist/route.ts` usage (`email` unique, `ipAddress`, `userAgent`, `createdAt`).

- [ ] **Step 0: Baseline** — run `npx tsc --noEmit` and record pre-existing failures (`lib/helper.ts` prisma.invoice/payment; `test/email-test.ts`). This confirms the gate is red BEFORE changes.
- [ ] **Step 1: Read current schema + schedule routes** — confirm the full model list and that only `Order`/`EmailSubscription`/`BootcampRegistration` exist in `schema.prisma` today.
- [ ] **Step 2: Edit `prisma/schema.prisma`** — restore `Waitlist` model and remove the four schedule models. Reference `prisma/migrations/20251114195950_gg/migration.sql` + `20250729143840_init/migration.sql` for the exact historical `Waitlist` fields. Verify the model satisfies `app/api/waitlist/route.ts` (`ipAddress`, `userAgent`, `createdAt`, unique `email`).
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
- [ ] **Step 4: Delete** `app/schedule/`, `components/schedule/`, `app/api/schedule/`, `lib/helper.ts`, `lib/date-utils.ts`.
- [ ] **Step 5: Remove `/schedule` references** in `app/sitemap.ts`, `components/footer.tsx`, `app/terms/page.tsx`, `app/privacy/page.tsx`, `lib/email-utils.ts` (schedule email templates — also removes `sendBookingConfirmationEmail` export + `bookingDetails` type), and anywhere else `rg -l "schedule|availability|verify-booking"` finds.
- [ ] **Step 5b: Handle `test/email-test.ts`** — it imports `sendBookingConfirmationEmail`. Either delete the file (it tests a removed feature) or repoint it at `sendOrderConfirmation`/`sendOrderNotification` which remain in `lib/email-utils.ts`.
- [ ] **Step 6: Verify** `npx tsc --noEmit` passes clean (no `lib/helper.ts` / `test/email-test.ts` errors); `pnpm db:push` works without error; `pnpm build` succeeds.
- [ ] **Step 7: Commit** `git add -A && git commit -m "refactor: remove schedule system; restore Waitlist; fix seed; delete dead code"`

---

### Task 2: Install design tokens + JetBrains Mono + tailwind map

**Files:**
- Modify: `app/globals.css` (replace legacy vars with token set; add dark tokens)
- Modify: `tailwind.config.js` (map new colors; remove `poly`; add `font-mono`)
- Modify: `app/layout.tsx` (add JetBrains Mono via next/font; remove Bootstrap Icons CDN; keep Space Grotesk)

**Interfaces:**
- Produces: CSS variables (light+dark): `--paper --ink --surface --surface-dim --border --muted --signal --signal-text --signal-contrast --signal-bg --ember --ember-deep --danger --ok`, plus shadcn HSL set. **Collision handling (validator I-1):** the new hex `--border`/`--muted` and shadcn HSL `--border`/`--muted` share names. Resolution: the new Hawiyat tokens use hex and shadcn's `--border` (HSL `0 0% 89.8%`) / `--muted` (HSL `0 0% 96.1%`) are **renamed** to `--border-shadcn` / `--muted-shadcn` so both coexist. `text-muted-foreground`/`bg-muted-foreground` keep working (shadcn's `muted.foreground` uses its own var). Tailwind colors: `paper, ink, surface, surface-dim, border, muted, signal, signal-text, signal-contrast, signal-bg, ember, ember-deep, danger, ok` map to `var(--…)`; `border`/`muted` map to the new hex vars; shadcn's `muted.foreground` object form is PRESERVED. `--font-mono` mapped to `mono`.
- Consumes: `DESIGN.md` §Palette + §Contrast rules for exact hex values.

- [ ] **Step 1: Read current `app/globals.css` fully** (558 lines) — inventory legacy vars (`--primary-text-color`, `--btn-bg`, `.purple-bg-grad`, `.gradient-text`, `hero-bg-gradient`, etc.) so the swap doesn't silently break `.btn`, `.header-links`, `.footer-link`, `.faq-accordion`. Note the `* { border-color: hsl(var(--border)); }` rule at ~line 120 and the `@layer base` rules.
- [ ] **Step 2: Rename shadcn colliding vars + add light-mode tokens** in `:root`. Rename `--border` → `--border-shadcn`, `--muted` → `--muted-shadcn` (update the `@layer base` and `*` rules accordingly), then add the Hawiyat hex tokens:
```css
:root {
  /* shadcn HSL set — border/muted renamed to avoid collision */
  --border-shadcn: 0 0% 89.8%;
  --muted-shadcn: 0 0% 96.1%;
  /* ...all other shadcn HSL vars unchanged... */
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
- [ ] **Step 2b: Update the `* { border-color: ... }` and `@layer base` rules** in `globals.css` to reference `var(--border-shadcn)` (shadcn border) — do NOT point them at the new hex `--border` (invalid `hsl(#E4E2DC)`).
- [ ] **Step 3: Add dark tokens** under `.dark` (rename shadcn `--border`/`--muted` to `--border-shadcn`/`--muted-shadcn` there too), plus Hawiyat dark hex tokens:
```css
.dark {
  --border-shadcn: 0 0% 16%;
  --muted-shadcn: 0 0% 14.9%;
  /* Hawiyat dark tokens */
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
- [ ] **Step 4: Edit `tailwind.config.js`** — map new vars to Tailwind colors + `fontFamily.mono`, remove `fontFamily.poly`. **Keep shadcn's `muted: { DEFAULT, foreground }` object form** (so `text-muted-foreground`/`bg-muted-foreground` utilities still generate). The Hawiyat `muted` (text color) maps to `muted.DEFAULT`? NO — instead add Hawiyat `muted` under a distinct key and point legacy `bg-muted`/`from-muted` consumers at `surface-dim` in Task 8. Recommended:
```js
colors: {
  paper: "var(--paper)",
  ink: "var(--ink)",
  surface: "var(--surface)",
  "surface-dim": "var(--surface-dim)",
  border: "var(--border)",          // hex token (new)
  muted: {                           // shadcn object preserved
    DEFAULT: "hsl(var(--muted-shadcn))",
    foreground: "hsl(var(--muted-foreground))",
  },
  "muted-ink": "var(--muted)",       // Hawiyat muted text token (distinct key)
  signal: "var(--signal)",
  "signal-text": "var(--signal-text)",
  "signal-contrast": "var(--signal-contrast)",
  "signal-bg": "var(--signal-bg)",
  ember: "var(--ember)",
  "ember-deep": "var(--ember-deep)",
  danger: "var(--danger)",
  ok: "var(--ok)",
  // keep remaining shadcn mappings unchanged
}
```
- [ ] **Step 4b: Audit legacy muted/border consumers** — run `rg -n "bg-muted|from-muted|to-muted|text-muted-foreground|border-border" components app` and, in the same task, migrate `bg-muted`/`from-muted`/`to-muted` backgrounds to `bg-surface-dim` (they were shadcn gray; the hex `--muted` is a text green). Leave `text-muted-foreground` (still shadcn). This prevents the visual break flagged by validator I-1.
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
- Produces: `<ExecutionTrace stages={…} active={n} telemetry={…} className={…} />` — props: `stages?: string[]` (default `["UNDERSTAND","PLAN","ROUTE","EXECUTE","EVALUATE","RESULT"]`), `active?: number` (index of current step, 0-based), `telemetry?: string[]` (mono strip lines — rendered when non-empty), `className?: string`. **Note: no `showTelemetry` prop — telemetry renders iff `telemetry.length > 0`.** Renders a horizontal pipeline with a moving spark; respects `prefers-reduced-motion` (static when reduced).
- Consumes: tokens `--signal`, `--signal-text`, `--muted`, `--paper`, `--surface-dim`; `--font-mono`. (`border-border` resolves via shadcn `--border-shadcn` after Task 2; `bg-surface`/`text-muted` via Hawiyat hex tokens.)

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
- Delete: `app/cyber-security/`, `app/guides/`, `app/ai-algeria/`, `app/hawiyat-composer/`
- Modify: `components/header.tsx` (nav), `components/footer.tsx` (links), `app/sitemap.ts`
- Modify: `next.config.mjs` (add `redirects()` — build-time, no middleware cost)
- Modify: `components/video-modal.tsx` (imported nowhere — delete it)
- Note: `/composer` (redirect target) is created in **Task 5**, which runs immediately after this task (GC7). No stub needed; the branch is not deployed in the interim.

**Interfaces:**
- Produces: No `app/cyber-security`, `app/guides`, `app/ai-algeria`, `app/hawiyat-composer`, `components/video-modal.tsx` dirs. `next.config.mjs` `redirects()`: `/hawiyat-composer` → 308 `/composer`; `/ai-algeria` → 308 `/`. `header.tsx` nav: Composer | Services | About + CTA. Footer without bootcamp/templates/monitoring/blog links. Sitemap with `/composer`, without removed routes, and without the `SECTIONS` import from the deleted guides data.
- Consumes: Task 2 tokens for any restyle done here.

- [ ] **Step 1: Delete** `app/cyber-security/`, `app/guides/`, `app/ai-algeria/`, `app/hawiyat-composer/`, `components/video-modal.tsx` (confirm `video-modal.tsx` has no importers via `rg`).
- [ ] **Step 2: Add redirects** in `next.config.mjs`:
```js
async redirects() {
  return [
    { source: "/hawiyat-composer", destination: "/composer", permanent: true },
    { source: "/ai-algeria", destination: "/", permanent: true },  // preserve indexed URLs + wedge SEO
  ]
}
```
- [ ] **Step 3: Rewrite `components/header.tsx` nav** — links: `Composer` → `/composer`, `Services` → `/services`, `About` → `/about`; CTA `Start Building` → `/composer`. Remove `AI in Algeria`, `Cyber Security` entries. Keep theme toggle.
- [ ] **Step 4: Rewrite `components/footer.tsx`** — The Layer: AI Composer (`/composer`), Services (`/services`), About (`/about`); Company: Support (WhatsApp `https://wa.me/213559555951`), GitHub; Legal: Terms/Privacy/DMCA. Remove AI Bootcamp/Templates/Monitoring/Blog links. Replace `bi-*` social icons with lucide equivalents.
- [ ] **Step 5: Update `app/sitemap.ts`** — remove `/cyber-security`, `/guides/*`, `/ai-algeria`, `/schedule`, `/bootcamp`, `/templates`; add `/composer`. **Also remove the `SECTIONS` import from `@/app/guides/claude/_data`** (the guides dir was deleted in Step 1 — this import would break the build).
- [ ] **Step 6: Remove orphaned API routes + components** — `app/api/bootcamp/register/`, `app/api/templates/`. **Do NOT delete `bootcamp-effects.tsx`/`registration-modal.tsx` here** — Task 8 owns those file deletions (dedupe per validator). Confirm API routes have no importers via `rg` first.
- [ ] **Step 7: Verify** `rg -rn "cyber-security|ai-algeria|/guides|/schedule|/bootcamp|/templates|/hawiyat-composer" app components` returns nothing except the redirect sources in `next.config.mjs`; `npx tsc --noEmit` + `pnpm build` pass.
- [ ] **Step 8: Commit** `git commit -m "refactor: remove off-mission routes; add /composer + /ai-algeria redirects; update nav/footer/sitemap"`

---

### Task 5: `/composer` page (architecture & engine)

**Files:**
- Create: `app/composer/page.tsx` (+ `app/composer/layout.tsx` with metadata)
- Create: `.agents/product-marketing.md` (copy-context prereq — distilled from DESIGN.md §Identity & Positioning + vision report: positioning statement, 3 ICP segments with pains, proof points with sources, objection handling, "what we are NOT" list)
- Reuse: `ExecutionTrace`, tokens, GSAP.

**Interfaces:**
- Produces: `/composer` page with sections: hero (H1 "Hawiyat AI Composer", sub "The AI execution engine"), Execution Trace (larger), Any Model/Any System (model chips + systems cards), engine capabilities (6 cards), telemetry band (**only verified numbers + hidden unverified — no literal TODO strings rendered**), enterprise full-stack (Composer+n8n+Evolution+Platform, WhatsApp CTA), Why-not-DIY strip, CTA → `/services`.
- Consumes: tokens from Task 2; `ExecutionTrace` from Task 3; `.agents/product-marketing.md` (created here) for copy. **Does NOT consume `lib/data/services.ts`** — the page links to `/services` for pricing; do not add price display here (validator: it runs before Task 6).

- [ ] **Step 1: Create `.agents/product-marketing.md`** — positioning statement, ICP segments (e-commerce/WhatsApp operators, devs/agencies, infra/DevOps), pains, proof points with sources, objection handling. All later copy tasks MUST read it (GC12).
- [ ] **Step 1b: Create `app/composer/layout.tsx`** with metadata (title `Hawiyat AI Composer | The AI Execution Engine`, canonical `/composer`, OG) using `createMetadata` from `@/lib/seo`.
- [ ] **Step 2: Build the hero** — H1 "Hawiyat AI Composer", mono eyebrow `EXECUTION LAYER · MODEL-INDEPENDENT`, sub copy from `.agents/product-marketing.md` + DESIGN.md §1, CTAs (`Start building` → `/services`, `See how it executes` → scroll to trace).
- [ ] **Step 3: Execution loop section** — large `ExecutionTrace` with mono telemetry strip; map the 6 stages with short descriptions.
- [ ] **Step 4: Any Model. Any System.** — two-zone: sticky left title "One layer. Every model. Every system." + right cards (GPT/Claude/Gemini/Llama/open + WhatsApp/CRM/ERP/email/DB/n8n).
- [ ] **Step 5: Engine capabilities** — 6 cards (Model Gateway, Context Selector, Tool Router, Reliability & Fallbacks, Guardrails & Evaluations, Cost Controls) with lucide icons. Write card bodies from the copy checklist (GC12/Task 9).
- [ ] **Step 6: Telemetry/metrics band** — render ONLY verified stats (`100+ clients`, `≈2.6M DZD ARR`); hide all unverified metrics (no literal `TODO` string renders — GC5). Never `+50B tokens`.
- [ ] **Step 7: Enterprise full-stack + Why-not-DIY + CTA** — full-stack bundle section with prefilled WhatsApp CTA ("Book with the team"); DIY comparison strip (OpenAI+Claude+n8n+WhatsApp+DB); final CTA → `/services`.
- [ ] **Step 8: Verify** `npx tsc --noEmit` + `pnpm build`; check `/composer` renders, `/hawiyat-composer` redirects (works now that T5 follows T4 per GC7).
- [ ] **Step 9: Commit** `git commit -m "feat: build /composer architecture & engine page + product-marketing context"`

---

### Task 6: De-resellerize services catalog + detail pages

**Files:**
- Modify: `lib/data/services.ts` (rename, re-categorize, reorder, remove discount mechanics, rewrite copy for ALL entries)
- Modify: `components/services/services-catalog.tsx` (ordering via `CARD_ORDER`, "Why Choose Hawiyat" strip, category badge rendering)
- Modify: `app/services/page.tsx` (H1 + description)
- **Modify: `app/services/layout.tsx`** — metadata title/description AND the JSON-LD `serviceSchema` ItemList names (currently "Hawiyat Composer and Claude Code", "LLM Credit" — validator BLOCKER B1)

**Interfaces:**
- Produces: `services` array with composer entries named `Hawiyat AI Composer` (+ Pro/MAX tiers), `LLM Credit` → `AI Composer access` (full copy rewrite, not just rename), categories `AI Execution` / `Managed Systems` / `Cloud Runtime`. Catalog ordered engine-first via `CARD_ORDER`. **No strikethrough `originalPrice`/launch-price strings on ANY service** (composer + n8n + evolution — spec §6 catalog-wide). No legacy `60+ clients` claims anywhere in `lib/data/services.ts`. `/services` metadata + JSON-LD ItemList use "Hawiyat AI Composer" / "AI Composer access". Detail pages `/services/[slug]` still work via `getServiceBySlug`.
- Consumes: existing `Service`/`ServicePlan` types (keep shape), `OrderForm`/`ServiceOrderForm`/`ServicePlans` components (keep), `.agents/product-marketing.md` (from Task 5) for copy.

- [ ] **Step 1: Rename composer entries** in `lib/data/services.ts` — `name: "Hawiyat AI Composer Pro"`, MAX tiers `Hawiyat AI Composer MAX 5X` / `MAX 20X`; drop `+ Claude Code` from names. Update `shortDesc`/`description`/`features`/`bulletPoints`/`seo`/`details`/`faq` to execution-layer value (routing, context, fallbacks, evaluation) — remove "2x Claude credits", "No daily or weekly limits" credit-multiplier framing. **Define the MAX unit in card copy** ("5X base execution capacity — more parallel runs/tasks"), never "5x Claude credits" (marketing M6).
- [ ] **Step 1b: Fully rewrite `llm-credit` entry** — not just rename. Current entry is a literal reseller SKU ("OpenAI credits served through Hawiyat Composer", "2500 DA for 10 USD credits", features "OpenAI model access… Token usage optimization", 3 credit-amount FAQs). Rewrite to **"AI Composer access"**: price the layer in DZD (per-task cost line), drop "OpenAI credits"/"10 USD"/"Token usage optimization", rewrite `seoContent` + `faq` around execution access (validator/marketing I2).
- [ ] **Step 2: Re-categorize** — `category: "AI Subscription"` → `"AI Execution"`; `LLM Credit` → `"AI Composer access"` under `"AI Execution"`; n8n/Evolution/Hosting → `"Managed Systems"`/`"Cloud Runtime"` as appropriate. **Scrub legacy client-count claims** (`60+ clients`, `60+ live clients`) from ALL `seoContent` blocks (n8n, hosting-basic, evolution-api, hosting-vip) — replace with verified `100+ clients` or neutral phrasing.
- [ ] **Step 3: Remove launch-price discount strings catalog-wide** — delete `originalPrice`/`launchNote` text from composer cards **AND** n8n-hosting Freelance (`originalPrice: "15,000"`) + evolution-api (`originalPrice: "14,000"`) (spec §6 is catalog-wide). Leave honest `price` + `priceLabel`. Verify render sites (`app/services/[slug]/page.tsx:216-218`, `service-plans.tsx:66-68`) are guarded so removing fields is safe.
- [ ] **Step 4: Reorder catalog** in `services-catalog.tsx` — adjust the **`CARD_ORDER`** map (`services-catalog.tsx:77-94`) so Composer/execution tiers sort first, then systems. **There is no `tagStyleMap`** — update the category badge rendering (~line 204) and the tag-color `cn()` chain (~166-178) for the new `AI Execution` / `Managed Systems` / `Cloud Runtime` categories.
- [ ] **Step 5: Rewrite "Why Choose Hawiyat" strip** — lead with execution layer: local support, DZD billing, model-agnostic, telemetry/evaluation, not generic hosting ops.
- [ ] **Step 6: Update `app/services/page.tsx`** H1/description → execution framing ("Run your stack on the Hawiyat execution layer — in DZD"), metadata title without "Claude Code" branding.
- [ ] **Step 6b: Update `app/services/layout.tsx`** — metadata title (`AI Subscriptions and Managed Services` → execution-layer framing) AND the `serviceSchema` ItemList names → `Hawiyat AI Composer`, `AI Composer access`, `n8n Hosting`, `Evolution API`, `Application Hosting` (no "Claude Code", no "LLM Credit").
- [ ] **Step 7: Verify** `npx tsc --noEmit` + `pnpm build`; visit `/services` + a `/services/[slug]`; confirm no `originalPrice` renders, no `60+`/`+50B`/`LLM Credit`/`Claude Code` in `lib/data/services.ts` (`rg -n "60\\+|50B|LLM Credit|Claude Code" lib/data/services.ts app/services` returns nothing).
- [ ] **Step 8: Commit** `git commit -m "feat(services): de-resellerize catalog — AI Composer naming, execution categories, honest pricing, metadata+JSON-LD"`

---

### Task 7: Rebuild home `/` (lean, converting)

**Files:**
- Modify: `app/page.tsx` (full rewrite)
- Modify: `components/hero-section.tsx` (new hero copy + Execution Console), `components/ai-playground.tsx` (→ Execution Console mock, remove "Pablo"), `components/pricing.tsx` (3 cards incl. switchable MAX), `components/trusted-brands.tsx` (proof band), `components/faq.tsx` (5 questions), `components/call-to-action.tsx`, `components/newsletter.tsx` (keep)
- Create: `components/algeria-band.tsx` (the `/ai-algeria` content as a home section)

**Home component disposition (LOCKED — resolves validator I4/technical I-3):**
- **Removed from home, content owned by `/composer` (Task 5):** `benefits-section.tsx`, `prebuilt-tools.tsx`, `additional-features.tsx`, `one-subscription.tsx` — their execution-loop / any-model-any-system / capabilities / why-not-DIY content already lives on `/composer` (T5 S3–S7). These files are deleted in Task 8.
- **Dropped from home (deleted in Task 8):** `build-ai-apps.tsx`, `resources.tsx`.
- **Kept (restyled here):** `hero-section.tsx`, `ai-playground.tsx` (Execution Console), `pricing.tsx`, `trusted-brands.tsx`, `faq.tsx`, `call-to-action.tsx`, `newsletter.tsx`, plus `WhatsAppWidget` + `ScrollAnimations` + `Footer` (MUST remain in the rewritten `app/page.tsx` — completeness I6).

**Interfaces:**
- Produces: Home page order: Hero(+Execution Console) → Pricing (Pro | MAX switchable | Enterprise) → Proof band → Algeria band → FAQ → CTA → Newsletter → Footer. `/services` still the order target. Enterprise card has **"Custom pricing"** label + prefilled WhatsApp CTA + mailto fallback. All `bi-*` and raw hex replaced with lucide + tokens.
- Consumes: tokens (Task 2), `ExecutionTrace` (Task 3), `services` data (Task 6), `.agents/product-marketing.md` (Task 5), verified proof numbers (GC5).

- [ ] **Step 1: Rewrite `app/page.tsx`** to the lean order above; **KEEP `WhatsAppWidget`, `ScrollAnimations`, `Footer`** (do not drop the primary contact channel); drop Testimonials/commented blocks; drop the old "AI provider built for Algeria" inline block (replaced by Algeria band); remove imports of the six dispositioned components.
- [ ] **Step 2: Rework `hero-section.tsx`** — H1 `The layer that decides how your business uses AI.`, mono eyebrow `HAWIYAT AI COMPOSER · EXECUTION LAYER`, sub (from `.agents/product-marketing.md`), CTAs (`Start building` → `/composer`, `See services` → `/services`), embed `ExecutionTrace`/Execution Console in the hero panel (keep the GSAP 3D dashboard wrapper).
- [ ] **Step 3: Convert `ai-playground.tsx`** → Execution Console mock: task chip types in `"Reply to order 1024 on WhatsApp in Arabic"`, spark travels stages, mono telemetry strip; **remove `Pablo`** and legacy nav items; model chips (Hawiyat auto / Claude / GPT / Gemini / Llama). Signup popup copy → "Run your business on Hawiyat". **This file is KEPT (it IS the Execution Console)** — do not delete it in Task 8.
- [ ] **Step 4: Rewrite `pricing.tsx`** — 3 cards:
  - **Pro** (from `composer-pro`): price + OrderForm CTA.
  - **MAX 5X / MAX 20X** switchable — one card with a toggle; pulls both services; OrderForm CTA switches by active tier. Card copy defines the unit ("5X base execution capacity — more parallel runs/tasks"), never "5x Claude credits".
  - **Enterprise** highlighted: full-stack (Composer+n8n+Evolution+Platform); **"Custom pricing"** label; feature list incl. **"Book with the team"**; CTA → WhatsApp with **prefilled message** (`https://wa.me/213559555951?text=Hello%2C%20we%20need%20the%20full%20stack%20%E2%80%94%20Composer%20%2B%20n8n%20%2B%20Evolution%20%2B%20Platform`) + secondary `mailto:contact@hawiyat.org` fallback (marketing M3).
  - H2 e.g. "Plans for the execution layer" + sub "One engine. Every model. In DZD."
- [ ] **Step 5: Build `components/algeria-band.tsx`** — compact section inheriting the deleted page's **full trust payload**: DZD billing, Algiers HQ, **registered Algerian société**, **official invoicing (facturation)**, **model-ownership disclaimer** ("Hawiyat does not claim an official partnership…"), Itihad + Label Projet Innovant, AR/FR/EN support; CTAs → WhatsApp + `/services`. Use tokens; mono eyebrow `BUILT AND SUPPORTED IN ALGERIA`. (marketing I1 — the band is the SEO/messaging successor to `/ai-algeria`.)
- [ ] **Step 6: Update `trusted-brands.tsx`** → proof band: render ONLY verified stats (`100+ clients` = 108 paying; `≈2.6M DZD ARR` — `≈` + `DZD` suffix always attached, marketing M5) + "Partners & early customers" logos (Itihad/ESTIN/IT Solutions — **label accurately as partners, not just "Trusted by"**, marketing M4). **Hide all unverified metrics; no literal `TODO` string renders.** Rework the `StatCard` to be string-safe (current `useCounter` animates integers with `+` prefix and cannot render `≈2.6M DZD` — use a static string/format-aware stat card). Remove fabricated "300 Templates"/"10 Resellers".
- [ ] **Step 7: Update `faq.tsx`** — 5 questions per DESIGN.md §12 (execution-layer answers, incl. north-star line, model-agnostic, DZD costs, data, start). Keep accordion.
- [ ] **Step 8: Update CTA + newsletter** — restyle to tokens + lucide; rewrite headlines to execution-layer voice. (Do NOT restyle the six dispositioned components — they are removed from home and deleted in Task 8.)
- [ ] **Step 9: Verify** `npx tsc --noEmit` + `pnpm lint` + `pnpm build`; check `/` renders all sections, mobile responsive, dark mode, reduced-motion (trace static), WhatsApp widget present.
- [ ] **Step 10: Commit** `git commit -m "feat(home): rebuild lean home with execution hero, 3-card pricing, proof band, Algeria band"`

---

### Task 8: Restyle `/about` + dead-code cleanup + token sweep

**Files:**
- Modify: `app/about/page.tsx` (restyle to tokens/lucide; fix copy)
- Modify: all remaining components touching raw hex / `bi-*` / `font-serif` — token + icon sweep across ~12 files (re-derive list via `rg "bg-\\[#|dark:bg-\\[#|bi-|font-serif|font-thin" components app` — do NOT trust Task 2's stale inventory for files Task 7 rewrote)
- Delete: `components/bootcamp-effects.tsx`, `registration-modal.tsx`, `floating-elements.tsx`, `services-teaser.tsx` (unused), `testimonials.tsx` (commented out), `styles/globals.css` (dead duplicate), **plus the six home components dispositioned in Task 7**: `benefits-section.tsx`, `prebuilt-tools.tsx`, `additional-features.tsx`, `one-subscription.tsx`, `build-ai-apps.tsx`, `resources.tsx`
- **KEEP (do NOT delete):** `components/ai-playground.tsx` — after Task 7 Step 3 it IS the Execution Console embedded in the hero. Deleting it breaks the hero.
- Modify: `components/scroll-animations.tsx` (verify trace-line + reveal still fine)
- Note: `/dcma` stays (redirects to `/dmca`) — do not delete.

**Interfaces:**
- Produces: `/about` restyled (no `bi-*`, no raw hex, no `font-serif` display); repo has no `bi-*` icon usage, no raw `bg-[#…]` in components, no `styles/globals.css`, no dead components (incl. the six dispositioned home components), `ai-playground.tsx` retained as Execution Console. Token/icon conventions enforced.

- [ ] **Step 1: Restyle `app/about/page.tsx`** — replace `bi-*` (`bi-arrow-right`, `bi-whatsapp`, `bi-box-seam`) with lucide (`ArrowRight`, `MessageCircle`, `Package`); replace `bg-[#f6f7fb] dark:bg-[#141414]` with `bg-surface-dim dark:bg-surface-dim` tokens; remove `.purple-bg-grad` decorative blobs; replace `font-serif`/`font-thin` display ("Us", "Together") with Space Grotesk weights; fix copy to execution-layer voice (no "AI subscriptions").
- [ ] **Step 2: Token/icon sweep** — run `rg -n "bg-\\[#|dark:bg-\\[#|bi-|font-serif|font-thin" components app --glob '!**/node_modules/**'` and convert each hit to tokens/lucide. Keep the mapping table from Task 2 Step 1 (e.g. `#f6f7fb`→`surface-dim`, `#141414`→`surface-dim` dark, `#1a1a1a`→`surface`, `#171717`→`surface-dim`).
- [ ] **Step 3: Delete dead files** — `styles/globals.css`, `bootcamp-effects.tsx`, `registration-modal.tsx`, `floating-elements.tsx`, `services-teaser.tsx`, `testimonials.tsx`, and the six dispositioned home components (`benefits-section.tsx`, `prebuilt-tools.tsx`, `additional-features.tsx`, `one-subscription.tsx`, `build-ai-apps.tsx`, `resources.tsx`). Confirm no imports via `rg` first (Task 7 already removed the home imports). **Do NOT delete `ai-playground.tsx`** (Execution Console, used by hero).
- [ ] **Step 4: Verify** `npx tsc --noEmit` + `pnpm lint` + `pnpm build`; `rg -n "bi-|bg-\\[#|dark:bg-\\[#|font-serif|font-thin" components app` returns only intentional (documented) cases or zero; `rg -n "from \"@/components/(benefits-section|prebuilt-tools|additional-features|one-subscription|build-ai-apps|resources)\"" app` returns nothing.
- [ ] **Step 5: Commit** `git commit -m "refactor: restyle about, token/icon sweep, remove dead + dispositioned code"`

---

### Task 9: Final QA + cross-page consistency

**Files:** all changed files.

- [ ] **Step 1: Full verify** — `pnpm lint`, `npx tsc --noEmit`, `pnpm build`. `pnpm db:push` runs clean. (Prefer `db:push` over `db:reset` — `migrate reset` replays migrations that never created the order tables; `db:push` is schema-driven and correct.)
- [ ] **Step 2: Route audit** — visit `/`, `/composer`, `/services`, `/services/[slug]`, `/about`, legal pages. Confirm `/hawiyat-composer` → `/composer` and `/ai-algeria` → `/` redirects; no links to removed routes; no `404` on any in-nav page.
- [ ] **Step 3: Copy audit** — run `rg -n "cheap|subscription|credit|2x|5x|20x Claude|Hawiyat Composer(?! AI)|and Claude Code|LLM Credit|50B|60\\+|affordable|unlimited|cheapest|pas cher|10 USD" app components lib/data` (PCRE via `rg -P`) across ALL 8 services entries + pages. No reseller/cheap-claims; "Hawiyat AI Composer" naming consistent (catch plain "Hawiyat Composer" too, not just `+Claude`).
- [ ] **Step 4: Proof-band audit** — `rg -rn "50B|60\\+|10 Resellers|300 Templates" app components lib/data` returns nothing; `100+ clients` + `≈2.6M DZD ARR` present on home + `/composer`; **no literal `TODO` string renders on any page** (rg `TODO` in `app/ components/` render output; use hidden/omitted values instead).
- [ ] **Step 5: Design audit (inline checklist)** — verify each: (a) no raw hex in components (`rg "bg-\\[#|dark:bg-\\[#" components app` = zero or documented); (b) exactly 2 fonts in `layout.tsx` (Space Grotesk + JetBrains Mono); (c) lucide only (no `bi-`, no Bootstrap CDN link); (d) CTA = `--signal` fill + `--signal-text` in both modes; (e) proof-band numbers policy (GC5); (f) "Hawiyat AI Composer" naming; (g) no refs to `/schedule|/ai-algeria|/cyber-security|/guides|/bootcamp|/templates` in nav/footer/sitemap; (h) `/services/layout.tsx` metadata + JSON-LD use execution naming.
- [ ] **Step 6: Copy-review checklist (marketing I3)** — for every page and every services entry, confirm: (1) no claim without a source (verified number, documented feature, or contract/SLA); (2) no "cheap/affordable/save money" opener — cost only as final proof point (DESIGN.md §Copy & Voice); (3) models appear as *routes*, never as the SKU; (4) every sentence passes "is this the execution layer talking?"; (5) `Hawiyat AI Composer` naming consistent; (6) metadata/keywords pruned of cost-optimizer and reseller terms (`layout.tsx` keywords: drop "reduce ai costs", "llm caching", "vps pas cher algerie", "hebergement pas cher algerie").
- [ ] **Step 7: Commit** any remaining fixes.

---

## Self-Review Notes

- **Spec coverage:** every §2–§10 of the spec maps to a task (routes→T4, home→T7, composer→T5, services→T6, about→T8, tokens/fonts→T2, signature→T3, Prisma→T1, rename→T6+T7+T4, proof policy→T7).
- **No literal `TODO` renders** (GC5): unverified metrics are hidden, not shown as TODO text.
- **Ordering:** T1 (schema + dead code) + T2 (tokens/fonts) precede page builds; T4 → T5 contiguous (GC7); T3 (trace) before T5/T7; T6 (services data) before T7 (pricing pulls services).
- **Dependencies:** `ExecutionTrace` (T3) → `hero`/`composer` (T7/T5). `services` data (T6) → `pricing` (T7). Tokens (T2) → all restyle tasks. `.agents/product-marketing.md` (T5) → copy tasks (T5/T6/T7).
- **Validation-revision note:** this revision incorporates the four-validator report (`validation/*-findings.md`): token collision (T2), dead code/tsc gate (T1), home disposition + ai-playground KEEP (T7/T8), `/services/layout.tsx` metadata + JSON-LD (T6), `/ai-algeria` redirect (T4), llm-credit rewrite (T6), copy-review checklist (T9), DESIGN.md `+50B` superseded (GC11).
