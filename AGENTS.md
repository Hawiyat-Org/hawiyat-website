# Hawiyat Website — Agent Guide

> **What Hawiyat is (brand-position truth):** Hawiyat is an **AI infrastructure platform** — the execution layer between frontier AI models (GPT, Claude, Gemini, open models) and business systems (WhatsApp, CRM, ERP, email, databases, workflows). **It is not** an LLM reseller, an AI agency, or an automation tool. The proprietary engine **Composer** decides *the best way to accomplish each task* (model + context + tools + workflow), evaluates the result, and learns — that's the moat. See `DESIGN.md` §Identity & Positioning before touching copy.

## Quick Commands

```bash
pnpm dev                    # Dev server (localhost:3000)
pnpm build                  # Production build (runs prisma generate)
pnpm lint                   # Next.js linting
pnpm db:push                # Push schema to DB + seed
pnpm db:reset               # Reset DB + seed
pnpm prisma generate        # Generate Prisma client only
```

## Architecture

**Stack:** Next.js 15 (App Router, `next@^15.5.16`) • React 19 • TypeScript • Tailwind CSS • Prisma/Postgres • shadcn/ui • Framer Motion + GSAP (ScrollTrigger)

**Key dirs:**
- `app/` — pages + API routes (`app/api/*`)
- `components/` — UI components (feature-based)
- `lib/` — utilities (Prisma client, auth, email helpers)
- `prisma/` — schema/migrations

**Design authority:** `DESIGN.md` is the single source of truth for identity/tokens/copy. Align all new UI with it.

## Critical Conventions

### Prisma Import
```typescript
import { prisma } from '@/lib/prisma/prismaClient'  // ✓ named import
import prisma from '@/lib/prisma/prismaClient'     // ✗ undefined errors
```

### Path aliases
- `@/*` → repo root (`@/components/*`, `@/lib/*`).

### Design tokens (hard rule)
- **No raw hex in components.** The token set (light `--paper/--ink/--surface/--border/--muted/--signal/--signal-text/--ember/--ember-deep`, dark equivalents) is defined in `DESIGN.md` §Palette.
- ✅ **Installed:** the tokens are defined in `app/globals.css` and mapped in `tailwind.config.js`. Values are monochrome grays — use `text-ink`, `text-muted-ink`, `bg-surface`, `bg-surface-dim`, `bg-signal`, `text-signal-text`, `hover:bg-signal-hover` instead of raw hex.
- Legacy components use raw `dark:bg-[#…]`/`bg-[#…]` — audit and replace with tokens as you touch them.

### Fonts — exactly two families
- Space Grotesk (`--font-space`, next/font) for display + body.
- JetBrains Mono (`--font-mono`) for all labels, metadata, pipelines, code.
- Do NOT reintroduce Ubuntu/Dancing Script/Playfair/Poly.

### Icons
- lucide-react + shadcn. **Do not add new Bootstrap Icons CDN usage**; remove stray `bi-*` where touched.

### shadcn/ui
- Components in `components/ui/`; `cn()` from `@/lib/utils`; dark via `class` strategy.

## Environment Variables

```env
DATABASE_URL=postgresql://...
NEXT_PUBLIC_APP_NAME=Hawiyat
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_CHATWOOT_TOKEN=...   # your chat widget token
```
Copy `.env.example` → `.env` if missing.

## Identity / IA

**Pages:**
- `/` home — execution layer story; order is Hero → Partners marquee → Our Numbers → Pricing (PRO / MAX switchable / Enterprise) → Testimonials → FAQ → CTA → Footer (newsletter removed).
- `/composer` — the execution engine (Composer); legacy `/hawiyat-composer` redirects here.
- `/services` — managed services catalog (DZD pricing) + `/services/[slug]` detail pages.
- `/about` — includes the Algeria band.
- Legal — `/terms`, `/privacy`, `/dmca`.
- Note: `/templates`, `/bootcamp`, `/schedule`, `/cyber-security`, `/guides`, `/ai-algeria` were removed from the repo — do not reference them in nav/footer/sitemap.

**Services data** — source of truth is the `services` array in **`lib/data/services.ts`** (type `Service`/`ServicePlan`, 8 entries with `seo`, `details`, `seoContent`, `faq`, optional `plans`, payment-method aware). `components/services/services-catalog.tsx` renders the `/services` grid from it; each service also has a detail page at `/services/[slug]` (`app/services/[slug]/page.tsx`) with `components/services/service-order-form.tsx` + `components/services/service-plans.tsx`. To add/modify services or DZD pricing, edit `lib/data/services.ts` (not the page components).
**Models:** Order. API: `/api/orders`.

## Testing
No formal suite. Verify with `npx tsc --noEmit`, `pnpm lint`, `pnpm build`, then manual browser checks via `pnpm dev`.

## Gotchas
1. `next.config.mjs` ignores TS/ESLint at build — fix errors, don't ignore.
2. Images `unoptimized: true` allows external images.
3. GSAP npm (not CDN) in `scroll-animations.tsx`. Trace-line + reveal-up GSAP, mounted on `/composer` only (dashboard deleted). Never add `reveal-up` classes to non-composer pages — nothing animates them there and the CSS keeps them `opacity: 0` (invisible).
4. Brand: the signature UI element is **The Execution Trace** (pipeline UNDERSTAND→PLAN→ROUTE→EXECUTE→EVALUATE→RESULT with mono telemetry). See `DESIGN.md`.

## Files to Read First
1. `DESIGN.md` — tokens, type, IA, copy, signature element.
2. `AGENTS.md` (this file).
3. `prisma/schema.prisma`.
4. `app/layout.tsx`.
5. `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand.md` — the ongoing rebrand plan.