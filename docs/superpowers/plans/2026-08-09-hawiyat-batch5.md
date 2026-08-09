# Hawiyat Batch 5 — YouTube footer, Composer card, usage.ai button

**Branch:** `main` · **HEAD:** `57f49e2` · tree clean.

## Global Constraints (BINDING)
- Execution-layer identity; no em dashes (—) in .ts/.tsx, no "cheap", no hover:scale, no emojis, design tokens only.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.
- External links `target="_blank" rel="noopener noreferrer"`.
- CTA system: See plans in DZD / Order X, live in 24h / Chat on WhatsApp / etc.
- Composer prices (source of truth `lib/data/services.ts`): Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month.

## Tasks

### Task 1 — YouTube in footer
`components/footer.tsx`: add a YouTube social link → `https://www.youtube.com/@Hawiyat` (lucide `Youtube` icon, name "YouTube"), external (target _blank + rel noopener noreferrer, handled by existing isExternal helper). Keep existing socials.

### Task 2 — Composer card on home page reflecting prices + details (services-page conventions)
The founder wants a Composer card on the HOME page that reflects the prices and shows details, following the conventions used on the SERVICES page catalog cards. On the home page, Composer is currently only in the Pricing section (joined PRO/MAX/Enterprise). Add a dedicated Composer "card" (a section/panel) that mirrors the services-catalog card visual language (image, category badge, name, description, price "from 6,000 DA/month", features, CTA) but shows the Composer pricing details. This should make Composer look like a first-class service on the home page with its prices visible.

Design guidance for the implementer/planners:
- Look at `components/services/services-catalog.tsx` card structure (image block, category pill, name, description, features, price row, tag badge) and `components/pricing.tsx` for the actual price data + OrderForm flow.
- Suggested: a new section on `app/page.tsx` (e.g. between OurNumbers and Pricing, or replacing/supplementing) rendering a Composer card panel that shows: "Hawiyat AI Composer" with the composer image, category "AI Execution", description, the three price tiers (Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month) as detail rows, key features, and CTAs: "See plans in DZD" → #pricing, plus the usage.ai button (Task 3). It must NOT duplicate the Pricing section's job; it sells Composer as a service entry point.
- Follow design tokens, mono labels, rounded-lg borders, bg-surface cards. No em dashes.
- Planners must decide: exact placement on the home page, component name, whether to reuse `services` data (`composer-pro` etc. via `getComposerService`-like lookup) for prices.

### Task 3 — usage.ai.hawiyat.cloud button for Composer clients
Add a button/link that directs Composer clients to their usage dashboard at `https://usage.ai.hawiyat.cloud` (external, target _blank rel noopener noreferrer). This should appear in the new Composer card (Task 2) and, per planners, possibly on the composer page (`app/composer/page.tsx`) too. Label something like "Open your usage dashboard" (execution-layer voice, no em dashes). External link, not a Next Link.

## Fleet workflow (this round)
1. Dispatch 3 parallel planning/validation subagents (brainstorm): (a) home Composer card + usage button design, (b) placement + reuse of pricing data + services-convention fidelity, (c) copy/identity + SEO + CTA system validation. They produce a consolidated design recommendation.
2. Implement the agreed design (single implementer subagent).
3. Dispatch review subagents (task review + whole change review).

## Files touched (expected)
- components/footer.tsx (Task 1)
- new component (e.g. components/composer-card.tsx) + app/page.tsx (Task 2)
- app/composer/page.tsx possibly (Task 3)

## Out of scope
- Pricing section redesign, services data changes, new products, DESIGN.md.
