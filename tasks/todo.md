# Todo — Hawiyat SEO + Trust + Hosting Collapse Round

Gate (every task): `npx tsc --noEmit` exit 0 · `pnpm lint` 0 errors · `pnpm build` succeeds · no em dashes in changed .tsx · no "cheap" · design tokens only.

## Phase 1: Technical SEO

- [ ] Task 1: 301 non-www → www redirect
  - Acceptance: `vercel.json` has `redirects: [{ source: "/(.*)", destination: "https://www.hawiyat.org/$1", permanent: true }]`; next.config.mjs redirects unchanged.
  - Verify: build passes; `curl -sI https://hawiyat.org/` → 301 (after deploy).
  - Files: `vercel.json`

- [ ] Task 2: Service + hasOfferCatalog schema on /services
  - Acceptance: `app/services/layout.tsx` emits `@type: "Service"` + `hasOfferCatalog` with DZD offers for Composer (6,000/15,000/30,000 DA/mo), n8n (8,000/30,000/80,000 DA/yr), Evolution (7,000/30,000/80,000 DA/yr), Hawiyat Cloud (by-order, DZD, no fixed price); stale bare-name ItemList replaced/fixed.
  - Verify: build + view-source /services → Service schema present; gate passes.
  - Files: `app/services/layout.tsx` (+ `app/services/page.tsx` if needed)

- [ ] Task 3: Enterprise tier in AI-SEO files + schema
  - Acceptance: `public/pricing.md`, `public/llmsfull.txt`, `public/llms.txt` each contain a Composer Enterprise (custom, DZD) entry; composer `SoftwareApplication.offers` in `app/composer/page.tsx` gains a 4th Enterprise offer (no price, custom contact).
  - Verify: `grep -i enterprise public/pricing.md public/llmsfull.txt public/llms.txt` → match; build passes.
  - Files: `public/pricing.md`, `public/llmsfull.txt`, `public/llms.txt`, `app/composer/page.tsx`

- [ ] Task 4: Remove meta-keywords
  - Acceptance: `keywords` array removed from `app/layout.tsx` root metadata.
  - Verify: `grep -c 'name="keywords"'` on built HTML → 0; gate passes.
  - Files: `app/layout.tsx`

### Checkpoint: Phase 1
- [ ] Full gate passes
- [ ] Build HTML shows Service schema on /services; no keywords meta
- [ ] Machine files contain Enterprise

## Phase 2: Trust & Claims

- [ ] Task 5: Align 100+ → 200+ in service SEO blocks
  - Acceptance: zero "100+ clients" in `lib/data/services.ts` (n8n, Cloud Basic, Evolution, Cloud VIP → "200+ clients").
  - Verify: `rg -n "100\+ clients" lib/data/services.ts` → none; gate passes.
  - Files: `lib/data/services.ts`

- [ ] Task 6: Dated provenance under proof bands
  - Acceptance: home (`components/our-numbers.tsx`) and composer telemetry (`app/composer/page.tsx`) show "Figures verified against the Hawiyat operations dashboard as of August 9, 2026."; link (if any) → `/about`, no dangling href.
  - Verify: build + `pnpm dev` shows both lines; no link to non-existent /stats.
  - Files: `components/our-numbers.tsx`, `app/composer/page.tsx`

- [ ] Task 7: SLA clause in Terms
  - Acceptance: `app/terms/page.tsx` adds an SLA clause (uptime definition, measurement window, compensation mechanics) backing the 99.9% promise; no em dashes.
  - Verify: Terms page contains the clause; gate passes.
  - Files: `app/terms/page.tsx`

### Checkpoint: Phase 2
- [ ] Full gate passes
- [ ] Zero "100+ clients" in data; provenance lines render; SLA present

## Phase 3: Hosting Collapse

- [ ] Task 8: Single /services/hawiyat-cloud route
  - Acceptance: `lib/data/services.ts` consolidated to one cloud entry (id/slug `hawiyat-cloud`, by-order contact); `/services/hosting-basic` + `/services/hosting-vip` 308-redirect to `/services/hawiyat-cloud`; existing detail page renders the cloud card.
  - Verify: gate passes; routes redirect in build/dev.
  - Files: `lib/data/services.ts`, `app/services/[slug]/page.tsx`, `next.config.mjs` (redirects)

- [ ] Task 9: Update links + sitemap + meta to single URL
  - Acceptance: sitemap lists only `/services/hawiyat-cloud`; llms.txt/llmsfull.txt hosting links point to it; catalog card + footer + related-links use it; meta description ≤155 chars.
  - Verify: `rg "services/hosting-" app components lib public` → none (except redirect source); gate passes.
  - Files: `app/sitemap.ts`, `public/llms.txt`, `public/llmsfull.txt`, `components/services/services-catalog.tsx`, `components/footer.tsx`, `app/services/[slug]/page.tsx`

### Checkpoint: Phase 3
- [ ] Full gate passes
- [ ] hosting-basic/vip redirect; single cloud URL everywhere

## Phase 4: Content Placeholders + Perf + P2

- [ ] Task 10: Testimonials section (home)
  - Acceptance: home page has a testimonials section (2-3 quote slots, role/company placeholders, token styling, no fake content).
  - Verify: `pnpm dev` shows the section; gate passes.
  - Files: `components/testimonials.tsx` (new), `app/page.tsx`

- [ ] Task 11: Team grid (/about)
  - Acceptance: `/about` has a 5-member team grid (photo/role/credential placeholder slots, token styling).
  - Verify: `pnpm dev` /about shows grid; gate passes.
  - Files: `app/about/page.tsx`

- [ ] Task 12: Compress assets
  - Acceptance: partner SVGs (itihad, itsol, estin) via SVGO + compress `public/hawiyat.png` (og) + favicon; page weight target < 800 KB; logos still crisp.
  - Verify: file sizes drop materially; `pnpm dev` logos render correctly.
  - Files: `public/trust/*.svg`, `public/hawiyat.png`, `public/favlogo.ico`

- [ ] Task 13: Comparison table on /composer
  - Acceptance: semantic `<table>` on `/composer` comparing Hawiyat AI Composer vs ChatGPT / n8n Cloud / OpenRouter (execution loop, routing, context, evaluation, fallbacks, DZD, WhatsApp/CRM wiring); factual, on-identity, no `reveal-up`.
  - Verify: `pnpm dev` /composer shows table; gate passes.
  - Files: `app/composer/page.tsx`

- [ ] Task 14: E-E-A-T dates
  - Acceptance: `/about`, `/faq`, `/privacy`, `/dmca` have "Last updated" lines + `dateModified`/`modifiedTime` metadata.
  - Verify: each page shows a date; gate passes.
  - Files: `app/about/layout.tsx`, `app/faq/page.tsx`, `app/privacy/page.tsx`, `app/dmca/page.tsx` (+ layouts)

### Checkpoint: Complete
- [ ] Full gate passes
- [ ] All 13 SPEC success criteria met
- [ ] Manual `pnpm dev` walkthrough clean
- [ ] Human review before deploy
