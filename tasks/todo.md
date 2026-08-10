# Todo — PageSpeed Recovery + Metric Maximization

Gate (every task): `npx tsc --noEmit` exit 0 · `pnpm lint` 0 errors · `pnpm build` succeeds · no em dashes · `pnpm audit` 0 · no a11y/CSP/identity regressions.

## Phase 1: Root-cause analysis (research, per-metric specialist)

- [ ] Task 1: CLS analysis — footer shift source (image space before load)
  - Acceptance: root cause identified with file:line; fix approach chosen.
  - Verify: findings doc written.
  - Files: components/footer.tsx, partners-marquee.tsx, testimonials.tsx, image-with-skeleton.tsx

- [ ] Task 2: CSP inline-style analysis — source of injected `<style>`
  - Acceptance: exact injector identified (next-themes/framer-motion/GSAP); fix chosen (nonce/hash/scoped style-src-elem) without weakening script-src.
  - Verify: findings doc written.
  - Files: app/layout.tsx, theme-provider, next.config.mjs, components

- [ ] Task 3: robots.txt + llms.txt fetch analysis
  - Acceptance: root cause of timeout identified (headers/middleware matcher/quirk); fix if real.
  - Verify: curl -sI on /robots.txt and /llms.txt; findings doc.
  - Files: app/robots.ts, middleware.ts, next.config.mjs, public/llms*

- [ ] Task 4: TBT analysis — 1st-party long task source
  - Acceptance: chunk 726-* / run-console / GSAP contribution measured; Meta Pixel confirmed lazyOnload.
  - Verify: findings doc.
  - Files: app/layout.tsx, app/composer/page.tsx, components/run-console.tsx

- [ ] Task 5: Accessibility manual-check review
  - Acceptance: 10 Lighthouse manual items reviewed; fixable items listed.
  - Verify: findings doc.
  - Files: site-wide (app/, components/)

### Checkpoint: Root cause approved
- [ ] 5 findings written + reviewed by metric specialists
- [ ] Founder decision: Meta Pixel keep vs remove/scope

## Phase 2: CLS fix

- [ ] Task 6: Reserve layout space for footer + marquee images
  - Acceptance: mobile CLS < 0.1; no visual change.
  - Verify: gate + PSI mobile CLS.
  - Files: components/footer.tsx, partners-marquee.tsx, testimonials.tsx, image-with-skeleton.tsx

### Checkpoint: CLS
- [ ] PSI CLS < 0.1; Performance improved

## Phase 3: CSP inline-style fix

- [ ] Task 7: Apply CSP fix (nonce or scoped style-src-elem)
  - Acceptance: Best Practices 100; zero CSP console violations; script-src unchanged (no unsafe-inline re-add).
  - Verify: browser console on /, /composer, /services, /about, /faq + theme toggle; gate.
  - Files: app/layout.tsx, theme-provider, next.config.mjs

### Checkpoint: CSP
- [ ] No CSP violations; Best Practices 100

## Phase 4: robots.txt + llms.txt fetch

- [ ] Task 8: Ensure robots + llms fetchable (200, correct content-type, not middleware-blocked)
  - Acceptance: SEO 3/3 + Agentic 3/3; curl 200.
  - Verify: curl + PSI.
  - Files: app/robots.ts, middleware.ts, next.config.mjs, public/llms*

### Checkpoint: Fetchability
- [ ] robots.txt + llms.txt 200; SEO + Agentic 3/3

## Phase 5: TBT reduction

- [ ] Task 9: Reduce 1st-party main-thread cost
  - Acceptance: TBT < 200ms where possible; Performance ≥ 90; no a11y regression.
  - Verify: PSI + gate.
  - Files: app/layout.tsx, app/composer/page.tsx, components/run-console.tsx

### Checkpoint: Performance
- [ ] Performance ≥ 90; TBT reduced

## Phase 6: Accessibility hold + final

- [ ] Task 10: Apply fixable a11y manual-check items; hold a11y at 100
  - Acceptance: a11y stays 100.
  - Verify: PSI + gate.
  - Files: site-wide as needed

- [ ] Task 11: Final gate + audit + PSI re-run + commit + push
  - Acceptance: all SPEC success criteria met; audit 0; pushed.
  - Verify: full gate; PSI mobile/desktop.

### Checkpoint: Complete
- [ ] All SPEC success criteria met
- [ ] Full gate + audit 0
- [ ] Human review before deploy
