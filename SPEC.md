# Spec: Hawiyat SEO + Trust + Hosting Collapse Round

> Status: Approved founder direction (decisions gathered 2026-08-10). Branch: `main`. Supersedes the refinement-round SPEC.md where it conflicts (that spec predates the Composer detail page, the Hawiyat Cloud by-order offering, and the 200+ counter).

## Objective

Improve www.hawiyat.org against the 2026-08-09 SEO audit while preserving the founder's brand decisions. Success = the site is technically sound per the audit (301 redirect, Service schema on /services, Enterprise tier in AI files, no meta-keywords), internally consistent on claims (one client number everywhere, dated provenance), hosting is collapsed into a single Hawiyat Cloud offering, and the two trust gaps (testimonials, team) have sections ready for founder content.

The user (target reader) is a visitor who must trust Hawiyat as an AI infrastructure platform: consistent numbers, provable claims, a clean single cloud offering, and visible social proof.

## Tech Stack

- Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS
- Prisma/Postgres (data backend, untouched this round)
- shadcn/ui components · lucide-react icons · Framer Motion + GSAP (GSAP on `/composer` only)
- Deploy: Vercel (`vercel.json`)

## Commands

```
Dev:      pnpm dev
Build:    pnpm build            # runs `prisma generate` then `next build`
Lint:     pnpm lint
Typecheck: npx tsc --noEmit
Typecheck: npx tsc --noEmit && pnpm lint && pnpm build   # full gate
DB push:  pnpm db:push          # not needed this round (no schema change)
```

## Project Structure

```
app/                  → pages (App Router) + API routes
  services/           → /services hub + detail pages
  services/[slug]     → ServicePlans + order flow + availability gating
  composer/           → /composer engine page (GSAP + run-console)
  stats/              → (NOT built — /stats skipped by founder)
  pricing/            → (NOT built — /pricing page skipped by founder)
components/           → UI components (feature-based)
  services/           → services-catalog, service-plans, order forms
  our-numbers.tsx     → home proof band (200+/10+/100B+)
components/footer.tsx → copyright + socials
lib/data/services.ts  → single source of truth for services + plans + SEO blocks
lib/seo.ts            → createMetadata + SITE_URL + USAGE_DASHBOARD_URL
public/               → llms.txt, llmsfull.txt, pricing.md, trust/ SVGs
tasks/                → plan.md + todo.md (this round)
docs/superpowers/     → plans + specs (record)
```

## Code Style

- No em dashes (—) anywhere in renderable copy — use commas/periods/colons. Verified by grep.
- No "cheap"/"cheapest", no reseller/credit/SKU framing. Models are routes, never SKUs.
- Execution-layer voice: Composer is the execution layer between frontier models and business systems; a unit of work is a run (understand → plan → route → execute → evaluate → result).
- Design tokens only (no raw hex): `text-ink`, `text-muted-ink`, `bg-surface`, `bg-surface-dim`, `bg-signal`, `text-signal-text`, `border-border`, `border-signal/20`. `--danger`/`--ok` are the only chromatic tokens.
- No `hover:scale`, no emojis. Mono font for labels/telemetry/prices; Space Grotesk for prose.
- Prices come from `lib/data/services.ts`, never hardcoded in components; formatted with `Number(...).toLocaleString("en-US")` in UI, comma strings in data.
- External links: `target="_blank" rel="noopener noreferrer"`. Internal routes use `next/link`.
- GSAP `reveal-up`/`trace-line` classes only on `/composer` (AGENTS.md Gotcha 3) — never on new pages.

## Testing Strategy

- No formal test suite (per AGENTS.md). Verification is the gate: `npx tsc --noEmit` (exit 0) + `pnpm lint` (0 errors) + `pnpm build` (succeeds).
- Manual/browser checks via `pnpm dev` after each phase (catalog renders, redirects, provenance lines).
- Grep guards: no em dashes in changed .tsx; no `100+` client claims remaining in `lib/data/services.ts`; `grep -c 'name="keywords"'` → 0 after removal; `curl -sI https://hawiyat.org/` → 301 after deploy.
- Redirects verified by unit-reasoning (308 entries in `next.config.mjs`/`vercel.json`) — not live-tested until deploy.

## Boundaries

- **Always:** run the full gate before committing; keep prices sourced from data; keep the founder's numbers (200+, 100B+, 10+) unchanged; use tokens not hex; keep Composer purchase paths working on both home and /services; scope `git add` to the task's files.
- **Ask first:** changing prices or plan structure; touching `lib/data/services.ts` service entries beyond the hosting collapse + 100+→200+ alignment; removing a route/URL; adding a dependency; any copy that changes the founder's chosen stats.
- **Never:** revert the founder's 200+/100B+ decisions; reintroduce em dashes, "cheap", hover:scale, raw hex, or reseller/SKU framing; add `reveal-up` to non-composer pages; delete a service entry without a redirect; commit secrets.

## Success Criteria (specific, testable)

1. `vercel.json` contains a `redirects` entry with `"permanent": true` for `/(.*)` → `https://www.hawiyat.org/$1`.
2. `/services` HTML emits `@type: "Service"` + `hasOfferCatalog` with DZD offers for Composer (6,000/15,000/30,000 DA/mo), n8n (8,000/30,000/80,000 DA/yr), Evolution (7,000/30,000/80,000 DA/yr), Hawiyat Cloud (by-order, DZD, no fixed price).
3. `public/pricing.md`, `public/llmsfull.txt`, `public/llms.txt`, and the composer `SoftwareApplication` schema each include an Enterprise (custom-priced, DZD) entry.
4. `app/layout.tsx` has no `keywords` array.
5. `lib/data/services.ts` contains zero `100+ clients` — all service SEO blocks say `200+ clients`.
6. Both proof bands (home + composer) carry the dated line "Figures verified against the Hawiyat operations dashboard as of August 9, 2026." with no dangling link (no `/stats` page exists; link to `/about` or omit).
7. `app/terms/page.tsx` has an SLA clause defining uptime, measurement window, and compensation.
8. `/services/hawiyat-cloud` is the single hosting URL; `/services/hosting-basic` and `/services/hosting-vip` 308-redirect to it; sitemap/llms/related-links point at the single URL; the page has a meta description ≤155 chars.
9. A testimonials section exists on home (2-3 anonymized quotes, placeholder slots for founder content).
10. A 5-member team grid exists on `/about` (photo/role/credential placeholder slots).
11. Partner SVGs + og:image + favicon compressed (page weight toward <800 KB).
12. `/composer` has a comparison table (Hawiyat AI Composer vs ChatGPT / n8n Cloud / OpenRouter), semantic HTML, factual, on-identity.
13. `/about`, `/faq`, `/privacy`, `/dmca` have "Last updated" lines + `dateModified` metadata.

## Open Questions

- Provenance link target: `/stats` is skipped → the "See how we count" link points at `/about` (default) or is omitted. Confirmed approach: point at `/about`.
- llms.txt/llmsfull.txt `noindex` (P2-4), `/faq` H1 keyword, `/services` title trim + hub copy expansion, and general image width/height were NOT requested — left out of scope unless the founder adds them.
- Testimonials + team bios are placeholders; founder provides content after the sections ship.
