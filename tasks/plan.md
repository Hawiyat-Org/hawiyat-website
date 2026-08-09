# Implementation Plan: Hawiyat SEO + Trust + Hosting Collapse Round

## Overview

Apply the 2026-08-09 SEO audit to www.hawiyat.org: fix the 307→301 redirect, add Service schema with DZD offers to /services, put the Enterprise tier into the AI-SEO machine files + schema, remove meta-keywords, align all client claims to the founder's 200+, add dated provenance to the proof bands, add an SLA clause to Terms, collapse the two hosting slugs into one `/services/hawiyat-cloud` URL (308-redirect the old ones), and ship placeholder sections for testimonials (home) and the team (about). Also compress heavy assets and add a comparison table to /composer.

## Architecture Decisions

- **Single source of truth for services/prices** stays `lib/data/services.ts`. Schema, machine files, catalog, and pricing all read from it (or mirror it) so prices never drift.
- **Hosting collapse = redirect, not canonical-only.** `/services/hosting-basic` + `/services/hosting-vip` → 308 → `/services/hawiyat-cloud`. One canonical URL in sitemap/llms/footer/related-links. The catalog keeps one "Hawiyat Cloud" card pointing at the new slug.
- **Provenance without a /stats page.** `/stats` was skipped by the founder, so the "as of August 9, 2026" line links to `/about` (or is a plain text line with no link). No dangling href.
- **Enterprise in AI files = copy-only.** Add an Enterprise (custom, DZD) entry to pricing.md/llmsfull.txt/llms.txt and a 4th offer in the composer SoftwareApplication schema (no price, custom contact) — mirrors the home Enterprise card.
- **Testimonials + team = placeholder slots.** Sections ship now with structure/visuals and clearly marked content slots; founder fills quotes/bios afterward. No fake content.
- **New pages never get `reveal-up`** (GSAP mounts on /composer only).
- **Parallelizable via subagents:** independent file sets (schema vs machine files vs hosting redirect vs assets vs trust copy) — but shared files (`lib/data/services.ts`, `components/services/services-catalog.tsx`, sitemap) must be sequential or scoped with `git add <files>`.

## Dependency Graph

```
lib/data/services.ts  (single source of truth)
   │
   ├── services-catalog.tsx      → card grid (Composer, n8n, Evolution, Hawiyat Cloud)
   ├── services/[slug]/page.tsx  → detail pages + redirects (hawiyat-cloud)
   ├── service-plans.tsx         → tier selector + order form
   ├── pricing.tsx               → home pricing (unchanged this round)
   └── public/pricing.md, llmsfull.txt, llms.txt  → AI files (Enterprise entry)

vercel.json / next.config.mjs   → redirects (301 www + 308 hosting collapse)
app/services/layout.tsx         → Service + hasOfferCatalog schema
app/layout.tsx                  → remove keywords; (metadata)
components/our-numbers.tsx      → provenance line
app/composer/page.tsx           → provenance line + comparison table + schema offers
app/terms/page.tsx              → SLA clause
app/about/page.tsx              → team grid + "last updated"
components/footer.tsx           → hosting link update + (stats link if any)
public/trust/*.svg, hawiyat.png → compression
```

## Task List

### Phase 1: Technical SEO (fast wins)

- [ ] Task 1: 301 non-www → www redirect in vercel.json
- [ ] Task 2: Service + hasOfferCatalog schema on /services (replace stale ItemList)
- [ ] Task 3: Enterprise tier into pricing.md, llmsfull.txt, llms.txt + composer SoftwareApplication offers
- [ ] Task 4: Remove site-wide meta-keywords tag

### Checkpoint: Technical SEO
- [ ] Full gate passes (tsc, lint, build)
- [ ] Build HTML shows `@type: "Service"` on /services; `grep 'name="keywords"'` → 0
- [ ] pricing.md/llmsfull.txt contain "Enterprise" for Composer

### Phase 2: Trust & Claims Consistency

- [ ] Task 5: Align 4 service SEO blocks 100+ → 200+ (lib/data/services.ts)
- [ ] Task 6: Dated provenance line under home + composer proof bands (link → /about)
- [ ] Task 7: SLA clause in app/terms/page.tsx (uptime, measurement window, compensation)

### Checkpoint: Trust
- [ ] Full gate passes
- [ ] Zero "100+ clients" in lib/data/services.ts
- [ ] Provenance line visible on home + /composer; no dangling link
- [ ] Terms contains the SLA clause

### Phase 3: Hosting Collapse (single Hawiyat Cloud)

- [ ] Task 8: Create /services/hawiyat-cloud (single data entry + redirect hosting-basic/vip → it)
- [ ] Task 9: Update catalog, sitemap, llms files, footer, related-links to the single URL; meta description ≤155

### Checkpoint: Hosting Collapse
- [ ] Full gate passes
- [ ] /services/hosting-basic + /services/hosting-vip 308 → /services/hawiyat-cloud
- [ ] Sitemap/llms list only /services/hawiyat-cloud for hosting

### Phase 4: Trust Content (placeholders) + Perf + P2

- [ ] Task 10: Testimonials section on home (placeholder slots)
- [ ] Task 11: Team grid on /about (placeholder slots)
- [ ] Task 12: Compress partner SVGs + og:image + favicon
- [ ] Task 13: Comparison table on /composer (vs ChatGPT / n8n Cloud / OpenRouter)
- [ ] Task 14: E-E-A-T "last updated" + dateModified on /about, /faq, /privacy, /dmca

### Checkpoint: Complete
- [ ] Full gate passes
- [ ] All 13 success criteria from SPEC.md met
- [ ] Manual `pnpm dev` walkthrough: catalog shows 4 cards, hosting collapses, provenance lines render, comparison table reads well
- [ ] Review with human before deploy

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Hosting collapse breaks existing /services/hosting-* links/SEO | High | 308 redirects (permanent) + update sitemap/llms/related-links; keep the redirect indefinitely |
| Composer purchase path breaks during schema/hosting edits | High | Pricing.tsx and service-plans untouched by Phase 1-3; full gate after each phase |
| Provenance link dangles (no /stats) | Low | Point to /about (exists) or omit the link |
| Parallel subagents commit-collide on shared files | Med | Scope `git add <files>`; run shared-file tasks sequentially |
| Placeholder testimonials/team look unfinished if shipped | Low | Clearly styled sections; founder fills content; no fake quotes/bios |
| SVG compression distorts logos | Med | SVGO with sensible precision; visually verify logos still crisp |

## Open Questions

- Confirmed: keep 200+/100B+/10+ (add provenance); skip /stats, /pricing, white-space landing pages; redirect hosting to a single URL; compress assets; add comparison table + E-E-A-T dates.
- Left out (add if founder wants): llms noindex, /faq H1 keyword, /services title trim + hub copy expansion, general image width/height.
