# Implementation Plan: Hawiyat Monochrome Home Redesign

> Companion to `SPEC.md` (source of truth). Research base: `.superpowers/sdd/2026-08-08-hawiyat-monochrome-redesign/*-findings.md`. This is a strategic merge — restore layout MECHANISMS from git `f547cca`, keep all current de-resellerized copy.

## Overview
Convert the Hawiyat home + chrome to a full monochrome, humanified, hawiyat.org-faithful layout: simple hero, partners marquee, switchable MAX pricing, Our Numbers band, newsletter removed, Algeria band to `/about`, minimal motion, less radius, and the header hydration fix. Keep the execution-layer identity everywhere.

## Architecture Decisions
- **Token names kept, values re-pointed to grayscale** — minimal churn; `--signal*`/`--ember*` become neutral fills/accents; only `--danger`/`--ok` stay chromatic.
- **Restore from f547cca ONLY the marquee mechanism**; everything else keep-current-and-restyle (current code is already de-resellerized + data-driven + token-based).
- **Split `trusted-brands.tsx`** into `partners-marquee.tsx` (marquee + logos + ItemList JSON-LD) and `our-numbers.tsx` (static 4 verified stats) to match the binding home order.
- **Delete:** `ai-playground.tsx`, `newsletter.tsx`, `app/api/subscribe/route.ts`, `EmailSubscription` Prisma model, `animated-text.tsx`, `animated-counter.tsx`. Keep `execution-trace.tsx` + `scroll-animations.tsx` (composer uses them).
- **Ordering keeps the build green** at every step: hydration → tokens → hero → marquee/numbers → pricing → algeria-band → newsletter teardown → sweep.

## Task List

### Phase 1: Foundations
- [ ] Task 1: Fix header hydration error (mounted-guard theme toggle)
- [ ] Task 2: Monochrome tokens + radius (globals.css + tailwind.config.js)

### Checkpoint: Foundations
- [ ] `npx tsc --noEmit` + `pnpm build` green; hydration error gone in browser (dark + reload)

### Phase 2: Home structure
- [ ] Task 3: Strip hero console → simple centered hero; delete `ai-playground.tsx`; drop `#dashboard` CSS/GSAP
- [ ] Task 4: Split proof band → `partners-marquee.tsx` (marquee from f547cca) + `our-numbers.tsx` (static stats); rebuild `app/page.tsx` to binding order
- [ ] Task 5: Restyle pricing (rounded-lg, ink buttons, no glow/scale; keep data-driven switchable MAX + OrderForm)

### Checkpoint: Home structure
- [ ] Home renders Hero → marquee → Pricing → Our Numbers → FAQ → CTA → Footer; tsc/build green

### Phase 3: Content relocation + teardown
- [ ] Task 6: Move Algeria band → `/about`
- [ ] Task 7: Newsletter teardown (component + route + EmailSubscription model + privacy §4)
- [ ] Task 8: Minimal-motion + dead-code sweep (delete animated-*; scroll-animations #dashboard cleanup; DESIGN.md + footer/home cleanup)

### Checkpoint: Complete
- [ ] All gates green (tsc/lint/build/db:push); browser QA (light+dark, marquee, hydration, switchable MAX); `rg` gates clean; copy audit clean

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Marquee duplicate logos announced twice | Med | `aria-hidden` on second track (f547cca had it) |
| Header toggle CLS on mounted swap | Low | `h-5 w-5` neutral placeholder keeps box size |
| `lib/data/services.ts` broken by pricing restyle | High | Do NOT touch; restyle is presentation-only |
| EmailSubscription removal breaks build | Med | grep for consumers (only `/api/subscribe`) before removing; `db:push` after |
| `#dashboard` leftovers reference removed element | Low | Delete CSS + GSAP blocks for hygiene |
| Reseller copy re-sneaks in via merge | High | Do not restore f547cca copy; execution-layer copy kept |

## Open Questions
- Confirm deletion of prod `email_subscriptions` rows (legal recommends yes).
