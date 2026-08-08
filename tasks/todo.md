# Task List — Hawiyat Refinement Round

> See `SPEC.md` + `tasks/plan.md`. Mark `[x]` as tasks complete.

## Phase 1: Copy + tone
- [ ] **Task 1: Em-dash removal + playful copy pass**
  - Acceptance: `rg -c "—" components app --glob '*.tsx'` = 0; copy playful/human, not corporate; verified stats intact; no reseller/cheap framing.
  - Verify: tsc/lint/build green; rg em-dash = 0.
  - Files: hero-section, faq, call-to-action, our-numbers, composer/page, about/page, partners-marquee, algeria-band, pricing, layout, terms.
- [ ] **Task 2: Hero rewrite (brand-first)**
  - Acceptance: H1 "Hawiyat AI Composer"; playful sub mentions our own infrastructure + DZD + Algeria; no em dash; JSON-LD headline updated.
  - Verify: tsc/build green; hero renders as intended.
  - Files: components/hero-section.tsx.

## Checkpoint 1
- [ ] tsc/lint/build green; rg em-dash = 0; hero verified.

## Phase 2: Design polish
- [ ] **Task 3: Border radius smaller**
  - Acceptance: cards/buttons `rounded-lg` → `rounded-md`; `rounded-full` only true circles.
  - Verify: tsc/lint/build green; no overflow.
  - Files: all components/app with rounded-lg (≈80).
- [ ] **Task 4: Pricing badge above title**
  - Acceptance: PRO/MAX 5X/MAX 20X badges render ABOVE the card title; radius rounded-md.
  - Verify: tsc/build green; visual.
  - Files: components/pricing.tsx.
- [ ] **Task 5: Proof section redesign**
  - Acceptance: lucide icon per stat; drop ARR/MRR; keep 100+ clients, 10+ resellers, 100B+ tokens (3 cards).
  - Verify: tsc/build green; home renders 3 icon stats.
  - Files: components/our-numbers.tsx.
- [ ] **Task 6: Footer copyright**
  - Acceptance: `Copyright © 2025-2026 Hawiyat`.
  - Verify: footer renders.
  - Files: components/footer.tsx.

## Checkpoint 2
- [ ] Home: hero, pricing badge-above-title, Proof 3 icons, footer © 2025-2026, radius smaller.

## Phase 3: Services consolidation
- [ ] **Task 7: Services catalog non-Composer only**
  - Acceptance: /services shows exactly 3 cards (n8n, Evolution, Hosting); no composer cards; CARD_ORDER + categories updated; /services H1/desc + layout ItemList updated.
  - Verify: tsc/build green; /services = 3 cards.
  - Files: components/services/services-catalog.tsx, app/services/page.tsx, app/services/layout.tsx.
- [ ] **Task 8: Detail-page tier selector**
  - Acceptance: /services/n8n-hosting, evolution-api, hosting-* have a plan selector (buttons) switching price/features/order-form; `?plan=` supported; hosting copy container-based.
  - Verify: tsc/build green; selector + submit works.
  - Files: components/services/service-plans.tsx, app/services/[slug]/page.tsx, lib/data/services.ts (hosting copy).
- [ ] **Task 9: Delete composer service pages**
  - Acceptance: /services/composer-*, llm-credit removed from catalog + sitemap + ItemList (routes 404); no dangling links from home pricing.
  - Verify: sitemap/ItemList clean; home pricing CTAs still work.
  - Files: app/sitemap.ts, app/services/layout.tsx, lib/data/services.ts (if needed).

## Checkpoint 3
- [ ] /services = 3 cards; detail tier selectors work; composer routes 404 + gone from sitemap; no VPS mentions.

## Phase 4: Dedup + QA
- [ ] **Task 10: Cross-page dedup**
  - Acceptance: no repeated "sits between / one layer / execution layer" phrasing across hero/composer/FAQ/terms; each concept appears once.
  - Verify: tsc/build green; rg for repeated phrases reduced.
  - Files: app/composer/page.tsx, components/faq.tsx, app/terms/page.tsx, components/hero-section.tsx.
- [ ] **Task 11: Final QA**
  - Acceptance: tsc/lint/build green; browser pass (home, composer, services, detail pages, footer); no em dashes; no duplicated copy.
  - Verify: all gates + manual.
  - Files: all changed.

## Final
- [ ] Whole-round review (reviewer subagent) → present to founder.
