# Task List — Hawiyat Monochrome Home Redesign

> See `SPEC.md` (spec) + `tasks/plan.md` (plan). Mark `[x]` as tasks complete.

## Phase 1: Foundations
- [ ] **Task 1: Fix header hydration error**
  - Acceptance: Header theme toggle renders a same-size neutral placeholder until mounted; `<Sun>`/`<Moon>` only after mount; no `<circle>` mismatch server-vs-client.
  - Verify: `pnpm dev` + set `localStorage.theme="dark"` + reload → no hydration warning in console; tsc/build green.
  - Files: `components/header.tsx`
- [ ] **Task 2: Monochrome tokens + radius**
  - Acceptance: globals.css `--signal*`/`--ember*` re-pointed to grayscale (design-findings §1b values); `--danger`/`--ok` unchanged; `--radius` lowered; `signal-hover` added to tailwind.config.js; no new raw hex in components.
  - Verify: `npx tsc --noEmit` + `pnpm build` green; visual check paper/ink/signal in light+dark.
  - Files: `app/globals.css`, `tailwind.config.js`

## Checkpoint: Foundations
- [ ] tsc + build green; hydration error gone in browser

## Phase 2: Home structure
- [ ] **Task 3: Strip hero console**
  - Acceptance: Hero is a centered single column: H1 "The layer that decides how your business uses AI." + subtitle + two buttons (`Get Started` → `/services`, `How it works` → `/composer`). No `#dashboard`/`AIPlayground`. Current clean JSON-LD kept. `ai-playground.tsx` deleted; `#dashboard` CSS + GSAP blocks removed from globals.css + scroll-animations.tsx.
  - Verify: tsc/build green; hero renders simple; `/composer` still uses ExecutionTrace.
  - Files: `components/hero-section.tsx`, `components/ai-playground.tsx` (del), `app/globals.css`, `components/scroll-animations.tsx`
- [ ] **Task 4: Partners marquee + Our Numbers split; rebuild home**
  - Acceptance: `components/partners-marquee.tsx` (marquee two-half markup from f547cca + current 6-partner data + ItemList JSON-LD + reduced-motion guard); `components/our-numbers.tsx` (static 4 verified stats: +100 clients, +10 resellers, +100B tokens, ≈2.6M DZD ARR). `app/page.tsx` = Hero → PartnersMarquee → Pricing → OurNumbers → FAQ → CTA → Footer. `trusted-brands.tsx` + `newsletter.tsx` + `algeria-band.tsx` removed from home; `ScrollAnimations` removed from home.
  - Verify: tsc/build green; home order matches; marquee scrolls + pauses on hover + respects reduced-motion; stats render.
  - Files: `components/partners-marquee.tsx` (new), `components/our-numbers.tsx` (new), `components/trusted-brands.tsx` (del), `app/page.tsx`
- [ ] **Task 5: Restyle pricing**
  - Acceptance: 3 cards `rounded-lg` `bg-surface border`; switchable MAX 5X/20X plain `aria-pressed` toggle (no spring); Enterprise `Custom pricing` + prefilled WhatsApp + mailto; primary buttons `bg-signal text-signal-text rounded-lg hover:bg-signal-hover`; no `hover:scale`/ambient glow; data still from `lib/data/services.ts` (untouched).
  - Verify: tsc/build green; switchable MAX + OrderForm work; monochrome in light+dark.
  - Files: `components/pricing.tsx`

## Checkpoint: Home structure
- [ ] Home = Hero → marquee → Pricing → Our Numbers → FAQ → CTA → Footer; gates green

## Phase 3: Content relocation + teardown
- [ ] **Task 6: Move Algeria band → /about**
  - Acceptance: `components/algeria-band.tsx` mounted in `app/about/page.tsx` (société, facturation, DZD, Itihad/Label Projet Innovant); removed from home; token/radius-correct.
  - Verify: tsc/build green; `/about` shows the band; home has none.
  - Files: `app/about/page.tsx`, `app/page.tsx`
- [ ] **Task 7: Newsletter teardown**
  - Acceptance: `components/newsletter.tsx` + `app/api/subscribe/route.ts` deleted; `EmailSubscription` removed from `prisma/schema.prisma`; `pnpm db:push` clean; `app/privacy/page.tsx` §4 "Communications" bullet updated + effective date bumped; no newsletter refs in home/footer/DESIGN.md.
  - Verify: grep `newsletter|EmailSubscription|/api/subscribe` = zero (except docs to update); db:push clean; build green.
  - Files: `components/newsletter.tsx` (del), `app/api/subscribe/route.ts` (del), `prisma/schema.prisma`, `app/privacy/page.tsx`
- [ ] **Task 8: Minimal-motion + dead-code sweep**
  - Acceptance: `animated-text.tsx` + `animated-counter.tsx` deleted; residual `hover:scale`/unneeded transitions removed from touched components; `scroll-animations.tsx` `#dashboard` blocks gone; DESIGN.md stale refs (newsletter keep, subscribe, marquee note) updated; footer no newsletter link.
  - Verify: tsc/lint/build green; `rg "bi-|bg-\[#|font-serif|2x Claude|LLM Credit|Claude Code|cheap|50B|60+|300 Templates"` clean in renderable files.
  - Files: multiple (see plan)

## Checkpoint: Complete
- [ ] tsc/lint/build/db:push green
- [ ] Browser QA: light+dark monochrome, marquee, hydration gone, switchable MAX, newsletter gone, /about Algeria band
- [ ] Copy audit: execution-layer, no reseller framing
- [ ] Final whole-branch review (dispatch reviewer)
