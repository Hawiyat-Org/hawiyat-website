# Spec: PageSpeed Recovery + Metric Maximization Round

> Status: Draft for founder review (2026-08-10). Branch: `main` @ `9ab3c17`.

## Objective

Recover and maximize Lighthouse/PageSpeed scores on www.hawiyat.org after a regression (mobile Performance dropped 95 → **66**, Best Practices 100 → **92**, SEO 1/3, Agentic 1/3). Target users are the same visitors as always; the goal is a fast, stable, secure page without regressing accessibility (currently 100) or breaking the Next 15 / CSP work already shipped.

The founding principle from the founder: **a 100 score does not mean nothing is improvable.** This round audits each metric thoroughly, plans a fix, has the plan reviewed by a metric-specialist, then implements.

## Metric targets (from the 2026-08-10 mobile Lighthouse run)

| Metric | Now | Target | Primary driver |
|---|---|---|---|
| Performance | 66 | ≥95 | CLS 0.499 (footer), TBT 430ms (Meta Pixel + 1st-party chunk), LCP 2.4s (hero render delay 620ms) |
| Accessibility | 100 | 100 (hold) | audit the 10 "manual check" items anyway |
| Best Practices | 92 | 100 | CSP `style-src 'self'` blocks an injected inline `<style>` (console error) |
| SEO | 1/3 | 3/3 | `robots.txt` fetch timed out (investigate headers/middleware); llms.txt timed out too |
| Agentic Browsing | 1/3 | 3/3 | llms.txt fetch timeout (same root cause likely) |

## Tech Stack

- Next.js 15.5 (App Router) · React 19.2 · TypeScript · Tailwind CSS · shadcn/ui
- Meta Pixel via `next/script` `lazyOnload` (app/layout.tsx) · CSP via `next.config.mjs` headers (env-gated)
- Deploy: Vercel

## Commands

```
Dev:       pnpm dev
Build:     pnpm build            # prisma generate + next build
Lint:      pnpm lint
Typecheck: npx tsc --noEmit
Gate:      npx tsc --noEmit && pnpm lint && pnpm build
Audit:     pnpm audit
Live perf: PageSpeed Insights https://www.hawiyat.org/ (mobile + desktop)
```

## Project Structure (relevant)

```
next.config.mjs         → headers (CSP, HSTS, COOP...), redirects
middleware.ts           → rate limiter (uses lib/rate-limiter), 429 security headers
app/layout.tsx          → ThemeProvider, Meta Pixel (lazyOnload), Organization schema
app/robots.ts           → robots.txt
app/sitemap.ts          → sitemap.xml (static dates)
public/llms.txt         → AI-SEO (fetched by Lighthouse Agentic audit)
components/             → image-with-skeleton, partners-marquee, testimonials, footer, header, hero-section
app/globals.css         → tokens, hero dot pattern, marquee animations
```

## Code Style

- No em dashes (—) in renderable copy. No "cheap". No `hover:scale`. No emojis. Design tokens only (no raw hex).
- Execution-layer voice; DZD/Algeria as identity. External links `target="_blank" rel="noopener noreferrer"`.
- Gates enforced via tsc/lint/build. Fix errors, don't ignore them (AGENTS.md).
- Any new inline style that must survive CSP gets a documented nonce/hash approach, never a silent `unsafe-inline` re-add.

## Testing Strategy

- No formal suite. Verification = the gate (`tsc`/`lint`/`build`) + Lighthouse/PageSpeed re-run + browser console check (zero CSP violations) + `curl -sI` on robots.txt/llms.txt (200 + correct headers).
- CLS verified by re-running PSI mobile (target CLS < 0.1). CSP verified by loading `/`, `/composer`, `/services`, `/about`, `/faq` and checking DevTools console.
- `pnpm audit` must stay 0.

## Boundaries

- **Always:** run the full gate before committing; keep a11y at 100; keep the CSP strict where safe (no blind `style-src 'unsafe-inline'` re-add — prefer a nonce/hash or removing the offending inline style); keep the founder's stats (200+/10+/100B+); keep `pnpm audit` at 0; scope `git add` per task.
- **Ask first:** removing or changing the Meta Pixel (business tracking — founder decision); adding a dependency; changing the CSP in a way that could weaken it; touching the schema/price data; making a page dynamic (losing SSG).
- **Never:** introduce em dashes/cheap/hover:scale/raw hex; revert Next 15 migration; re-add dead code; commit secrets.

## Success Criteria (testable)

1. Mobile Performance ≥ 90 (target 95+) with **CLS < 0.1** (fix the 0.499 footer shift).
2. Best Practices = 100: **zero CSP console violations** on all pages (the `style-src 'self'` inline-style block resolved).
3. SEO = 3/3 and Agentic Browsing = 3/3: `robots.txt` and `llms.txt` fetch successfully with HTTP 200 (investigate + fix the timeout root cause).
4. TBT reduced (Meta Pixel stays `lazyOnload`; 1st-party long task minimized).
5. Accessibility stays 100 (manual items reviewed, no regressions).
6. `pnpm audit` 0. Gates green. No a11y/CSP/identity regressions.

## Open Questions

- **Meta Pixel (founder decision):** keep `lazyOnload` (recommended — it only costs idle TBT, ~230ms of the 430ms) or remove/scope it? The 229 KiB + long tasks are the biggest single TBT driver.
- **robots.txt/llms.txt timeout:** likely a Lighthouse fetch quirk or a header/middleware interaction — confirm before assuming a real bug.
- **SkeletonImage on above-the-fold images:** keep (no CLS) or add `priority`/eager where it matters.
