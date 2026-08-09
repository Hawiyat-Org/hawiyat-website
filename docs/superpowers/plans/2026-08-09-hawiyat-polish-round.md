# Hawiyat Polish Round — 2026-08-09

**Goal:** Polish the shipped site per founder feedback. Broaden Composer's
positioning (it is NOT a WhatsApp/n8n/CRM tool — it is an execution layer for
any task), fix the proof-band animation, drop the AI Composer access service,
add a custom hosting option, and trim two lower-value surfaces.

**Branch:** `rebrand/ai-infrastructure-identity` · **HEAD:** `5a9201c` · working tree clean.

## Global Constraints (BINDING — from DESIGN.md / AGENTS.md / SPEC.md)

- Execution-layer identity: Composer is the execution layer between frontier AI models and business systems. It handles ANY task (docs, invoices, research, reports, code, support, operations) — WhatsApp/CRM/ERP are routes, never the whole story.
- No em dashes (—). No "cheap"/"cheaper". No `hover:scale`. No emojis. No raw hex in components (tokens only). Fonts: Space Grotesk + JetBrains Mono only.
- Verified stats ONLY: `100+`, `10+`, `100B+ tokens executed through Composer`. NO ARR/MRR figures render anywhere.
- Hero H1 stays "Hawiyat AI Composer" (founder-confirmed brand-first). CTA system: See plans in DZD / Order X, live in 24h / Watch a run / Chat on WhatsApp / See services in DZD / Book the full stack.
- Composer service entries (`composer-pro`, `composer-max5x`, `composer-max20x`) stay in `lib/data/services.ts` for home Pricing — they are excluded from the catalog/sitemap via `EXCLUDED_SERVICE_IDS`. Do NOT delete them.
- Reduced-motion respected. All transitions 300ms.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.

## Tasks

### Task 1 — Broaden Composer positioning (hero + composer page copy)

Hero subtitle (`components/hero-section.tsx` ~line 19) currently reads:
"Hand Composer a job like a WhatsApp refund or a 40-lead follow-up. It picks
the best AI, connects your systems, and ships a result it already checked.
Billed in DZD, supported from Algeria."

Rewrite to show Composer handles ANY business task, not just WhatsApp/leads.
Keep it benefit-led, concrete, execution-layer voice, no em dashes. Suggested
direction: name 2-3 varied tasks (e.g. draft the weekly report, reconcile an
invoice, follow up a customer, turn a PDF spec into code) that are NOT
WhatsApp-only, then the "picks the best AI, connects your systems, checks the
result" line. Keep "Billed in DZD, supported from Algeria." closer.

Composer page (`app/composer/page.tsx`):
- `SYSTEMS` list currently WhatsApp/CRM/ERP/Email/Databases/n8n. Add general
  categories so it does not read as a WhatsApp tool: e.g. add Docs, Sheets,
  Slack/Teams, API endpoints, and rename header copy "One layer. Every model.
  Every system." stays, but the systems grid should include office/ops/API
  categories. Keep each with a short role note. Do not bloat (6-8 cards).
- `STAGES` and `CAPABILITIES` copy: check no paragraph limits Composer to
  WhatsApp/CRM. "Calls tools only when a task needs them" is fine. Fix any
  line that says "WhatsApp, CRM, ERP, databases, n8n. Each run gets the tools
  it needs" if it reads exclusive — add "and anything else you already run".
- The run example in hero/intro copy: "resolve the refund for order 3051 on
  WhatsApp in Algerian Arabic" is ONE example — keep it but ensure adjacent
  copy says "a task like this, or a report, an invoice, a research brief"
  so it is clearly one of many.
- `FULLSTACK` block stays (that is the enterprise bundle).
- Remove the "Five tools, one you." section entirely (Task 4 in this plan — see below).

### Task 2 — Proof band count-up animation (smooth + fast)

`components/our-numbers.tsx` currently renders static text values
(`100+`, `10+`, `100B+`). Add a count-up animation that is SMOOTH and FAST
(not sluggish): animate the numeric part of each value on first view
(useInView/IntersectionObserver), ease-out over ~800ms, respect
`prefers-reduced-motion` (render final value immediately). Values contain
suffixes (`100+`, `10+`, `100B+`) — animate the leading integer and append
the suffix (`B+`). Do not animate with a counter library; keep it dependency-free.
Must not exceed the 3-card layout.

### Task 3 — Remove AI Composer access (llm-credit) service

Remove the `llm-credit` service end-to-end. It is NOT needed per founder.
- `lib/data/services.ts`: delete the `llm-credit` entry (line ~778-867).
  Do NOT add it to `EXCLUDED_SERVICE_IDS` (it must not exist at all).
- `components/services/services-catalog.tsx`: remove `"llm-credit": 0` from
  `CARD_ORDER` (line ~120) and any other llm-credit references.
- `app/services/[slug]/page.tsx`: remove the `service.id === "llm-credit"`
  ternary (line ~365-366) — hosting-basic keeps its normal "All-inclusive pricing" line.
- `app/services/layout.tsx`: remove "AI Composer access" from ItemList (line 16).
- `app/services/page.tsx` + layout description copy: remove "AI Composer access" mention.
- `public/llmsfull.txt`: delete the "### AI Composer access — 2,500 DA/month" section (lines ~110-128).
- `public/pricing.md`: remove the "AI Composer access" row (line 30) and section (line ~61).
- `public/llms.txt`: update the Services link text + the "What does Composer cost" answer to drop the 2,500 DA/month pay-per-run mention.
- `app/terms/page.tsx`: update line ~367 that mentions "Pay-per-run AI Composer access" so it no longer references a deleted product.
- Grep-verify no live string still says "AI Composer access" or links `/services/llm-credit`.

### Task 4 — Hosting custom plan (contact us) + remove Most Popular badge

Hosting (`/services/hosting-basic` and `/services/hosting-vip`, which fold
into one detail page) currently shows Basic + VIP tiers. Add a third
"CUSTOM" option for teams that need more (more apps, more RAM, dedicated
infra, SLAs): selecting it shows a contact-us card (WhatsApp link + email)
instead of an order form. Implementation must fit the existing
`ServicePlans` component without breaking n8n/Evolution tiers:
- Extend `ServicePlans` (components/services/service-plans.tsx) to accept a
  "custom" plan entry (e.g. `custom?: boolean` on `ServicePlan`, or a
  `customContact?: { wa: string; email: string }` prop) and render a
  contact CTA instead of `ServiceOrderForm` when the active plan is custom.
- `app/services/[slug]/page.tsx`: for hosting, append a CUSTOM plan to the
  synthetic `plans` array (price label "Custom" / no fixed price), routed to contact.
- Keep prices for Basic/VIP exactly as-is.

Remove the "Most Popular" badge: `components/services/service-plans.tsx`
lines ~98-102 (`isPopular` + badge + the `border-signal/40 ring-1` styling on
line ~90-92). Remove the badge and the popular styling entirely.

### Task 5 — Remove "Five tools, one you." section (composer)

`app/composer/page.tsx`: delete the entire "Why not DIY" section (the
section with eyebrow `WHY NOT DIY`, H2 "Five tools, one you.", the
DIY/COMPOSER two-card grid, `DIY_FRAGMENTS`, `COMPARISON`, and `COMPOSER_RUN`
consts). It is not needed. Ensure imports of any now-unused lucide icons
(ShieldCheck, RefreshCw, TrendingDown are used by CAPABILITIES — check each
removed icon is truly unused after removal) are cleaned. The section header
comment `{/* ─── Why not DIY ─── */}` goes too. Adjacent sections
(Telemetry and Full-stack) stay untouched.

### Task 6 — Final verification

- All gates: `npx tsc --noEmit`, `pnpm lint`, `pnpm build`.
- Grep-verify: no em dashes in changed files; no "AI Composer access"
  references remain; no `/services/llm-credit` links; no hover:scale;
  no "cheap".
- `git add -A` + commit(s) with descriptive messages on the rebrand branch.

## Files touched (summary)

- `components/hero-section.tsx` — subtitle
- `app/composer/page.tsx` — systems, copy, remove Five-tools section, icon imports
- `components/our-numbers.tsx` — count-up animation
- `lib/data/services.ts` — delete llm-credit entry
- `components/services/services-catalog.tsx` — CARD_ORDER
- `app/services/[slug]/page.tsx` — llm-credit ternary, hosting CUSTOM plan
- `app/services/layout.tsx` — ItemList
- `app/services/page.tsx` — description copy
- `components/services/service-plans.tsx` — custom plan + remove Most Popular
- `public/llmsfull.txt`, `public/pricing.md`, `public/llms.txt` — llm-credit removal
- `app/terms/page.tsx` — pay-per-run mention

## Out of scope

- Home Pricing cards (they read composer-pro/max from the services array — untouched).
- DESIGN.md, product-marketing.md, schema changes.
- Any new service/product.
