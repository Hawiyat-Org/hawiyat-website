# Implementation Plan: PageSpeed Recovery + Metric Maximization

## Overview

Recover the mobile Lighthouse score (Performance 66 → ≥90, Best Practices 92 → 100, SEO/Agentic 1/3 → 3/3) and hold Accessibility at 100, without regressing the Next 15 / CSP work. Each metric gets a specialist fleet review before implementation. The two concrete regressions to root-cause first: **CLS 0.499 on the footer** and **a CSP inline-style violation** (`style-src 'self'` blocking an injected `<style>`).

## Architecture Decisions

- **CLS first (P0):** the footer shift (0.499) is the single biggest score killer. Likely the footer image (SkeletonImage on `/logo.png`) or the marquee images collapsing to zero height before load. Fix by reserving layout space (explicit dimensions / `aspect` boxes on marquee logos) rather than removing skeletons.
- **CSP inline-style (P0):** `next-themes` injects a `<style>` on theme change (transition freeze) even with `disableTransitionOnChange` set; and possibly framer-motion/GSAP inject styles. Best Practice: allow *inline styles* via a **nonce on the injected `<style>`** or `style-src-elem` — but simplest safe fix: add `'unsafe-inline'` back to `style-src` only if the theme freeze style is the sole offender AND re-verify Observatory (the plan previously removed it). Investigate the actual source first, then choose: nonce-style (preferred, keeps CSP strict) vs scoped `style-src-elem`.
- **robots/llms timeouts (P1):** confirm whether it's a header/middleware interaction (CSP/matcher excluding them) or a Lighthouse quirk. Ensure `app/robots.ts` and `public/llms.txt` return 200 with correct content-type and are not blocked by the middleware matcher.
- **TBT (P1):** keep Meta Pixel `lazyOnload` (founder decision), minimize the 1st-party long task if it's our code (run-console/GSAP? — measure).
- **Vertical slicing:** one complete metric per task group (analysis → reviewed plan → implement → verify via PSI), so each lands independently.

## Dependency Graph

```
CLS fix (footer/marquee image space)
   │
   ├── PSI re-run → confirms CLS < 0.1
CSP inline-style fix (nonce or scoped allowlist)
   │
   ├── browser console check (no CSP violations)
   ├── Best Practices 100
robots.txt + llms.txt fetch fix (headers/middleware)
   │
   ├── SEO 3/3 + Agentic 3/3
TBT reduction (Meta Pixel lazyOnload + 1st-party task)
   │
   ├── Performance ≥ 90
Accessibility hold (manual items review)
   │
   └── a11y 100
Final: full gate + pnpm audit + PSI re-run
```

## Task List

### Phase 1: Root-cause analysis (research, per-metric specialist)

- [ ] Task 1: CLS analysis — identify the footer shift source (read footer/marquee/testimonials image layout, `image-with-skeleton.tsx`; confirm whether images reserve space pre-load). Write findings.
- [ ] Task 2: CSP inline-style analysis — find what injects the `<style>` (next-themes transition style, framer-motion, GSAP, shadcn); decide nonce vs scoped allowlist. Write findings.
- [ ] Task 3: robots.txt + llms.txt fetch analysis — check headers, middleware matcher, Vercel behavior; confirm root cause of timeout. Write findings.
- [ ] Task 4: TBT analysis — measure which 1st-party script contributes the long task (chunk 726-*, run-console, GSAP); confirm Meta Pixel is lazyOnload. Write findings.
- [ ] Task 5: Accessibility manual-check review — walk the 10 Lighthouse manual items; list anything fixable. Write findings.

### Checkpoint: Root cause approved (each finding reviewed by a metric specialist)

- [ ] All 5 findings written + reviewed; implementation approach chosen per metric
- [ ] Founder decision on Meta Pixel (keep lazyOnload vs remove/scope)

### Phase 2: CLS fix

- [ ] Task 6: Reserve layout space for footer + marquee/testimonial images (explicit aspect/dimensions on SkeletonImage wrappers or parent boxes) so nothing shifts on load.
  - Acceptance: mobile CLS < 0.1 on re-run; no visual change.
  - Verify: gate + PSI mobile CLS.

### Checkpoint: CLS

- [ ] PSI mobile CLS < 0.1; Performance improved

### Phase 3: CSP inline-style fix

- [ ] Task 7: Apply the chosen fix (nonce-style for the injected style, or scoped `style-src-elem`/hash). Confirm zero CSP console violations on `/`, `/composer`, `/services`, `/about`, `/faq` + theme toggle.
  - Acceptance: Best Practices 100; no `unsafe-inline` re-added to `script-src`; CSP stays as strict as feasible.
  - Verify: browser console + gate.

### Checkpoint: CSP

- [ ] No CSP violations; Best Practices 100

### Phase 4: robots.txt + llms.txt fetch

- [ ] Task 8: Ensure `app/robots.ts` + `public/llms.txt`/`llmsfull.txt`/`pricing.md` are fetchable (HTTP 200, correct content-type, not excluded by middleware matcher, no CSP/header block). Fix middleware matcher or headers if that's the cause.
  - Acceptance: SEO 3/3 + Agentic 3/3 on re-run; `curl -sI` returns 200 with `text/plain`/`application/xml`.
  - Verify: curl + PSI.

### Checkpoint: Fetchability

- [ ] robots.txt + llms.txt 200; SEO + Agentic 3/3

### Phase 5: TBT reduction

- [ ] Task 9: Reduce 1st-party main-thread cost (e.g. defer run-console/GSAP if it's the chunk 726-* offender; confirm Meta Pixel stays lazyOnload or apply founder decision). Do NOT regress a11y.
  - Acceptance: TBT < 200ms where possible; Performance ≥ 90.
  - Verify: PSI + gate.

### Checkpoint: Performance

- [ ] Performance ≥ 90; TBT reduced; no a11y regression

### Phase 6: Accessibility hold + final

- [ ] Task 10: Apply any fixable manual-check items (focus, labels, landmarks); hold a11y at 100.
- [ ] Task 11: Full gate + `pnpm audit` (0) + PSI mobile/desktop re-run + commit + push.

### Checkpoint: Complete

- [ ] All success criteria in SPEC.md met
- [ ] Full gate + audit 0
- [ ] Human review before deploy

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| CSP fix weakens the policy (re-adds unsafe-inline) | Med | Prefer nonce/hash; only re-add `style-src 'unsafe-inline'` if the sole offender is the theme style and Observatory delta is acceptable; document |
| CLS fix changes visual layout (images sized differently) | Low | Reserve space with the same dimensions already declared; visually verify |
| robots/llms timeout is a Lighthouse quirk, not a bug | Low | Confirm with curl + headers before any code change; if quirk, no code needed |
| Meta Pixel removal decision | Med | Founder input required; keep lazyOnload default |
| SkeletonImage above-the-fold adds paint cost | Low | Keep (no CLS); optionally eager/priority on the header logo only |

## Open Questions

- Founder: Meta Pixel keep vs remove/scope.
- Whether the robots/llms timeout reproduces outside Lighthouse (curl check).
- Whether a 5th marquee/GSAP refactor is worth it for TBT vs deferring.
