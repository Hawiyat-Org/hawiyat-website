# Hawiyat Batch 6b — Composer detail page on /services + Start Building link

**Branch:** `main` · **HEAD:** `4184b12` · tree clean.

## Global Constraints (BINDING)
- Execution-layer identity; no em dashes (—) in .ts/.tsx, no "cheap", no hover:scale, no emojis, design tokens only.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.
- External links `target="_blank" rel="noopener noreferrer"`.
- Composer prices (source of truth `lib/data/services.ts`): Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month.

## Goal
The founder wants Composer orderable from BOTH the home page pricing AND the services page. The `/services` Composer card must behave like the n8n/Evolution cards: a normal card that links to a real detail page (`/services/composer-pro`) with a Pro / MAX 5X / MAX 20X tier selector + order form. This reverses the earlier "Composer sold only on home pricing" exclusion.

## Task A (orchestrator's task) — Composer detail page + normal card
Files: `lib/data/services.ts`, `components/services/services-catalog.tsx`, `app/services/[slug]/page.tsx`.

1. `lib/data/services.ts`:
   - Add a `plans` array to the `composer-pro` entry (mirroring n8n's `plans`): three ServicePlans — Pro (6,000 DA/month, tagline "For solo builders. Give it a task, get a checked result.", features from composer-pro.features), MAX 5X (15,000 DA/month, tagline "5× more tasks at the same time, for startups and teams shipping daily.", features from composer-max5x.features), MAX 20X (30,000 DA/month, tagline "20× more tasks at the same time, for agencies running AI at scale.", features from composer-max20x.features). Prices as numeric strings "6000"/"15000"/"30000".
   - Set `EXCLUDED_SERVICE_IDS = ["composer-max5x", "composer-max20x"]` (composer-pro is NO LONGER excluded so it gets a detail page; max5x/max20x stay excluded from catalog/sitemap/static-gen since they fold into the composer-pro card).
   - Confirm home pricing (`components/pricing.tsx` via `getComposerService`) still reads composer-pro/max5x/max20x by id from the `services` array — unaffected by EXCLUDED. Do NOT break home pricing.
2. `components/services/services-catalog.tsx`:
   - REMOVE the hand-built `composerCard` constant (slug ""), `ComposerCardView`, the `isComposer`/`tierRows`/`cta` fields on `CatalogCard`, and the `[composerCard, ...buildCatalogCards()]` prepend + the `service.isComposer ? ComposerCardView : ...` branch in the render map. Composer becomes a NORMAL card.
   - In `buildCatalogCards()`: skip `composer-max5x` and `composer-max20x` (fold into the composer card, like hosting-vip). Let `composer-pro` flow through the normal tiered-card branch (it now has `plans`) → card shows "from 6,000 DA/month" via `lowestPlanPrice`, name "Hawiyat AI Composer Pro", and the whole card is a `<Link href="/services/composer-pro">`.
   - Update `CARD_ORDER`: `"composer-pro": 0` first, then n8n/evolution/hosting.
3. `app/services/[slug]/page.tsx`:
   - `composer-pro` now has `plans` → ServicePlans renders the tier selector + ServiceOrderForm automatically (composer-pro availability is default available, not contact). Verify no `COMPOSER_SLUGS` special-casing is needed (it should "just work" via service.plans). If max5x/max20x slugs are requested directly they 404 (fine — no links point there).
   - JSON-LD OfferCatalog will emit Pro/MAX offers (plans non-custom) — correct.
   - Verify `generateStaticParams`/sitemap now include `/services/composer-pro` (getAllServiceSlugs no longer excludes it).

## Task B (delegated subagent) — "Start Building" → Composer detail page
File: `components/header.tsx` ONLY.
- The desktop CTA "Start Building" (~line 119) and the mobile CTA "Start Building" (~line 193) currently `href="/#pricing"`. Change BOTH to `href="/services/composer-pro"` so Start Building goes to the Composer detail page on the services page.
- Keep label "Start Building" + ArrowRight icon + styling. Nav links (Composer/Services/About) untouched.
- NOTE: `/services/composer-pro` is being created by Task A in parallel. The href is a plain string — build will succeed even before the route exists. Do NOT verify the route exists; just set the href.

## Files touched (expected)
- Task A: lib/data/services.ts, components/services/services-catalog.tsx, app/services/[slug]/page.tsx
- Task B: components/header.tsx

## Out of scope
- Home pricing cards, ORDER FORM components, DESIGN.md, terms.
