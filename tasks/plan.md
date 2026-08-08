# Implementation Plan: Hawiyat Refinement Round

> Companion to `SPEC.md`. Execution via subagent-driven development (implementer + reviewer per task). All work on `rebrand/ai-infrastructure-identity`.

## Overview
Playful humanized copy (no em dashes), brand-first hero with own-infra mention, smaller card radius, pricing badge-above-title, copyright 2025-2026, Proof section redesign (icons, drop ARR), services consolidation (non-Composer only, combined tier cards + detail-page tier selector, container-based hosting), and cross-page dedup.

## Architecture Decisions
- **Services data stays the source of truth** (`lib/data/services.ts`) — do NOT remove tier data (n8n/evolution plans stay). Only the CATALOG presentation changes (combine tiers → one card; composer tiers hidden from catalog) + detail page gets a tier selector.
- **Composer detail pages deleted** (catalog + sitemap + ItemList); home Pricing is the sole Composer path. Routes will 404 (acceptable) — no redirect needed unless a redirect is trivial.
- **Tier selector**: build a small client component in `service-plans.tsx` that shows plan buttons (Freelance/Startup/Enterprise) and switches the displayed price/features/order-form payload. Detail pages pass `?plan=` support (already partially wired).
- **Tone pass**: replace `—` with commas/periods across 10 files; hand-tune playful copy in hero/FAQ/CTA/composer/about.
- **Hosting = container-based**: rewrite hosting `seo`/`seoContent`/`description` copy to "container-based app hosting" (remove any VPS implication; only a privacy-page false positive exists today).

## Task List

### Phase 1: Copy + tone
- [ ] Task 1: Em-dash removal + playful copy pass (hero, FAQ, CTA, our-numbers, composer, about, partners-marquee, algeria-band, pricing, layout, terms) — `rg -c "—"` → 0; playful not corporate; keep verified stats.
- [ ] Task 2: Hero rewrite — H1 "Hawiyat AI Composer", playful sub mentioning own infrastructure + DZD + Algeria, no em dash; update hero JSON-LD headline.

### Checkpoint 1
- [ ] tsc/lint/build green; `rg —` = 0; hero copy verified

### Phase 2: Design polish
- [ ] Task 3: Border radius — cards `rounded-lg`→`rounded-md`, buttons `rounded-lg`→`rounded-md` (keep true circles). ~80 usages to evaluate.
- [ ] Task 4: Pricing — badges (PRO/MAX 5X/MAX 20X) ABOVE the card title; radius to rounded-md.
- [ ] Task 5: Proof section (our-numbers) — lucide icons per stat, drop ARR/MRR, keep 3 stats (100+ clients, 10+ resellers, 100B+ tokens).
- [ ] Task 6: Footer copyright → `© 2025-2026 Hawiyat`.

### Checkpoint 2
- [ ] Home renders: hero (Hawiyat AI Composer + own infra), pricing badge-above-title, Proof 3 icons, footer © 2025-2026; radius smaller

### Phase 3: Services consolidation
- [ ] Task 7: Services catalog — non-Composer only (n8n, Evolution, Hosting combined → one card each); remove composer tier cards; adjust CARD_ORDER + category styles; update /services H1/desc + layout ItemList.
- [ ] Task 8: Detail-page tier selector — `service-plans.tsx` shows plan buttons switching price/features/order-form; wire `?plan=`; hosting entries framed container-based.
- [ ] Task 9: Delete composer-* + llm-credit service pages from catalog/sitemap/ItemList (routes 404; home Pricing is the path). Update `lib/data/services.ts` hosting copy to container-based.

### Checkpoint 3
- [ ] /services = 3 cards; /services/n8n-hosting tier selector works; composer service routes 404 + gone from sitemap; no VPS mentions

### Phase 4: Dedup + QA
- [ ] Task 10: Cross-page dedup — remove repeated "sits between / one layer / execution layer" phrasing across hero, composer, FAQ, terms; keep each concept once.
- [ ] Task 11: Final QA — tsc/lint/build green; browser pass (home, composer, services, detail pages, footer, no em dashes); `rg —` = 0; no duplicated copy.

### Final
- [ ] Whole-round review (dispatch reviewer); then present for founder.

## Risks
| Risk | Mitigation |
|------|-----------|
| Deleting composer pages breaks home pricing CTAs | Home Pricing uses OrderForm (no link to /services/composer-*) — verify no dangling links after delete |
| Tier selector breaks order flow | Keep the order-form payload shape identical; test switch + submit |
| Tone pass weakens positioning | Keep verified stats + DZD/Algeria identity; playful ≠ vague |
| Radius change breaks a layout | Small, visual-only; verify no overflow |

## Open Questions
- None blocking (founder answered all).
