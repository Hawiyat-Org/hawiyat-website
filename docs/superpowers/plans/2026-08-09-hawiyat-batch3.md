# Hawiyat Batch 3 — Legal Terms, Hosting Unavailable, Links, Twitter, Spinner

**Branch:** `rebrand/ai-infrastructure-identity` · **HEAD:** `04da5a9` · tree clean.

## Global Constraints (BINDING)
- Execution-layer identity; no em dashes (—) in .ts/.tsx, no "cheap", no hover:scale, no emojis, design tokens only.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.
- External links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`).
- Use Next.js optimized components (`next/link` Link, `next/image` Image) wherever feasible.
- Reduced-motion respected.

## Tasks

### Task 1 — Legal fleet: review + expand the provided Terms, implement
Founder supplied a Terms document (HTML, v1.2, "AI optimization layer" framing, plan names Starter/Growth/Scale/Team/Coding). The existing `app/terms/page.tsx` (1105 lines, 20 sections) is already execution-layer-adapted and covers most of it. Fleet must:
- 1a. Legal reviewer: check the provided document + the existing page for legal completeness, Algeria law fit (governing law, arbitration CNA, consumer protection, data, liability cap), and missing clauses.
- 1b. Product-fit auditor: reconcile plan names (current site sells Composer Pro/MAX 5X/MAX 20X + n8n + Evolution + Hosting — NOT Starter/Team/Coding), "Execution Layer" vs "Optimization Layer" wording, quota vs capacity, API-key framing vs the actual ordering flow.
- 1c. Expansion reviewer: merge both documents into the definitive expanded Terms for hawiyat.org, flagging contradictions with the live site (services that exist, DZD billing, no accounts/API dashboard yet, order via WhatsApp/website).
- Then implement the merged Terms into `app/terms/page.tsx` (and only if the fleet recommends, small additions to privacy/dmca — default: no).
- Deliverable: the terms page reflects the merged doc, site-accurate (Composer Pro/MAX, n8n, Evolution, Hosting, DZD), all 20 sections, legal sound, no em dashes.

### Task 2 — Mark Hosting unavailable on the services page
Add an availability state so Hosting (Basic/VIP/CUSTOM) shows as "Unavailable" for now. `lib/data/services.ts` hosting entries + `components/services/services-catalog.tsx` card + detail page:
- Add an optional `availability?: "available" | "unavailable"` (or `available: boolean`) field to the `Service` interface; set hosting-basic/hosting-vip to unavailable.
- Catalog: show a clear "Unavailable" badge on the Hosting card (distinct styling, e.g. bg-surface-dim text-muted-ink border), and either (a) keep the card clickable to read info but make the order CTA disabled/message, or (b) the cleanest UX: card shows Unavailable badge; clicking goes to the detail page where the order form is replaced by a "Hosting is temporarily unavailable" notice + a "Chat on WhatsApp" / "See Composer plans" fallback. Decide the best option and implement consistently. The `CUSTOM` tier contact card should still work (it's contact-us, not an order) OR also be paused — pick and note.
- Ensure sitemap still lists hosting (it's a real page, just not orderable) — do NOT remove routes.
- Do NOT touch n8n/Evolution availability.

### Task 3 — External links open in a new tab
All links whose href starts with `http(s)://` and points OUTSIDE hawiyat.org must have `target="_blank"` + `rel="noopener noreferrer"`. Inventory already found: wa.me links (7, all have target but check rel — add rel="noopener noreferrer" where missing), hawiyat.org link in terms (already ok), about brand links (already ok). Audit `app/` + `components/` for any external <a>/<Link> missing target or rel and fix. Keep mailto: links as-is (no target). Internal `/...` links must NOT get target="_blank".

### Task 4 — Next.js optimized components audit
- Replace any raw `<a href="...">` (non-mailto) with `next/link` `Link` for internal routes. (External http links should stay <a> with target/rel, per Next guidance.)
- Confirm `next/image` Image used for all <img> (there are 0 raw <img> already).
- `app/terms/page.tsx` has `<a>` mailto + hawiyat.org links (acceptable); internal "Back to home" already uses Link. Report PASS/ISSUE per file.

### Task 5 — Remove Twitter icon from footer
`components/footer.tsx` socialLinks: remove the `{ name: "X (Twitter)", href: "https://x.com/hawiyat", Icon: Twitter }` entry (no Twitter account) and the now-unused `Twitter` import.

### Task 6 — Add a loading spinner
Add a global page-load spinner using Next.js App Router:
- Create `app/loading.tsx` (root) with a centered spinner (lucide `Loader2` with `animate-spin`, or a CSS spinner) on `bg-paper text-ink` tokens. Optionally also `app/composer/loading.tsx` and `app/services/loading.tsx` inheriting the same component. Minimal, token-styled, respects reduced-motion (animate-spin is fine but ensure it doesn't cause layout shift).
- Verify it renders during route transitions (Next shows loading.tsx during navigation). Do not break any page.

### Task 7 — Final verification
All gates + greps (no em dashes, no external link missing _blank/rel, hosting unavailable shown, Twitter gone, loading spinner present). Commit(s) on rebrand branch.

## Files touched (summary)
- app/terms/page.tsx (Task 1)
- lib/data/services.ts (Task 2 availability + Task 1 term consistency)
- components/services/services-catalog.tsx (Task 2 badge)
- app/services/[slug]/page.tsx (Task 2 order-CTA gating)
- components/footer.tsx (Task 5)
- app/loading.tsx + optional segment loadings (Task 6)
- Any component with an external link missing target/rel (Task 3)

## Out of scope
- Home pricing cards (composer Pro/MAX/Enterprise features — a separate dedicated subagent is redoing MAX 20X + Enterprise features in parallel; do NOT touch pricing features).
- DESIGN.md, schema changes, new products.
