# Hawiyat Batch 6 — Pricing pop, MAX 20X features, usage dashboard placement, order-success redirect, Composer on services

**Branch:** `main` · **HEAD:** `1d1fcb5` · tree clean.

## Global Constraints (BINDING)
- Execution-layer identity; no em dashes (—) in .ts/.tsx, no "cheap", no hover:scale, no emojis, design tokens only.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.
- External links `target="_blank" rel="noopener noreferrer"`.
- Composer prices (source of truth `lib/data/services.ts`): Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month.
- Usage dashboard URL: `https://usage.ai.hawiyat.cloud` (the site currently uses .cloud; founder wrote .org in one message — flag in summary, keep .cloud for consistency).

## Tasks (each owned by ONE parallel subagent; disjoint files so no commit conflicts)

### Task A — Middle MAX card pops up
`components/pricing.tsx` ONLY. Make the MAX card visually lift above the row: add `lg:-translate-y-3 lg:z-10` (and keep the existing signal top accent + `lg:shadow-2xl lg:shadow-ink/10`). On mobile it must stay in-flow (`translate-y-0`), seams preserved. Do NOT touch other cards.

### Task B — MAX 20X features = "everything MAX 5X has + the diff"
`lib/data/services.ts` (composer-max20x only) + `public/pricing.md` + `public/llmsfull.txt`. Rewrite composer-max20x `features`/`details.whatYouGet`/`seoContent`/`faq` so the first line is "Everything in MAX 5X" then ONLY the deltas (20X capacity, multi-agent traffic resolution, hybrid data compliance, dedicated account manager, advanced DZD analytics). No GDPR. Update the matching MAX 20X blocks in pricing.md + llmsfull.txt. Do NOT touch pricing.tsx or composer-max5x.

### Task C — Usage dashboard placement on home (brainstorm + implement)
`components/hero-section.tsx` (+ `app/page.tsx` if a strip is added). The current "Open your usage dashboard" mono link in the pricing header is too hidden. Brainstorm the best visible home placement and implement it: e.g. a compact outline button or banner ("Already a Composer client? Open your usage dashboard") placed visibly (hero or a strip after Pricing). External target+rel. Keep a single source for the URL (add `export const USAGE_DASHBOARD_URL` to `lib/seo.ts` and import it). Do NOT touch pricing.tsx layout.

### Task D — Order-success opens usage dashboard (home + services)
`components/services/order-form.tsx` (home pricing path) + `components/services/service-order-form.tsx` (services detail path). In the success state, add a prominent "Open your usage dashboard" button/link (target _blank rel noopener noreferrer → USAGE_DASHBOARD_URL) so a client lands on their dashboard right after ordering Composer. Use the shared constant. Keep existing Close/WhatsApp success CTAs.

### Task E — Add Composer to the services page
`components/services/services-catalog.tsx` (+ `app/services/page.tsx` copy if needed). Composer (Pro/MAX) currently has NO card on /services (deliberately excluded). Add a Composer card at the top of the catalog grid: reads prices/features via `getComposerService` from `lib/data/services.ts` (import it), category pill "AI Execution", three tier rows (Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month), CTA "See plans in DZD" → `/#pricing` (composer tiers have NO detail page — card links to home pricing, NOT a /services/[slug] route). Do NOT touch lib/data/services.ts (Task B owns it) — build the card from existing data via getComposerService.

## Files touched (expected)
- Task A: components/pricing.tsx
- Task B: lib/data/services.ts, public/pricing.md, public/llmsfull.txt
- Task C: lib/seo.ts, components/hero-section.tsx (+ maybe app/page.tsx)
- Task D: components/services/order-form.tsx, components/services/service-order-form.tsx
- Task E: components/services/services-catalog.tsx (+ app/services/page.tsx)

## Out of scope
- New products, DESIGN.md, order flow logic beyond the success-state link, composer detail pages.
