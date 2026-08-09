# Hawiyat Batch 4b — Hawiyat Cloud: By order, no Basic/VIP tiers

**Branch:** `rebrand/ai-infrastructure-identity` · **HEAD:** `174cdb8` · tree clean.

## Global Constraints (BINDING)
- Execution-layer identity; no em dashes (—) in .ts/.tsx, no "cheap", no hover:scale, no emojis, design tokens only.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.
- External links `target="_blank" rel="noopener noreferrer"`.
- Keep slugs `hosting-basic`/`hosting-vip` (routes stay live). Do NOT delete services.

## Task — Hawiyat Cloud is a single "By order" cloud offering (no price, no Basic/VIP tiers)

Follow-up to batch 4: the founder wants the Hawiyat Cloud card to show NO price. Instead it should say something like "By order" — businesses contact Hawiyat, discuss their needs, then Hawiyat deploys on its own cloud (VPS, containers, Kubernetes, etc.). Also REMOVE the Basic/VIP tier concept entirely from the card and the detail page.

### Catalog card (`components/services/services-catalog.tsx`)
- The cloud card (hosting fold, ~line 54-78) currently: name "Hawiyat Cloud", tag "Basic / VIP", price "from 1,000 DA/month", description mentioning "Basic or VIP".
- Change:
  - `tag`: remove "Basic / VIP" (set `tag: undefined` or drop the tag for this card).
  - `price` / `priceLabel`: set to `price: ""`, `priceLabel: ""` (the contact branch will show "By order" instead).
  - `description`: reframe to a contact-based cloud runtime, e.g. "Managed cloud on our infrastructure: containers, VPS, or Kubernetes, sized to your needs. Contact us to plan your deployment and get a quote in DZD." (no em dashes)
  - The price area render (~line 263-284): for `availability === "contact"`, show "By order" instead of the price row. Keep the "By quote"/availability badge logic (top-left) but make sure no price renders for contact cards. Currently the card shows "from 1,000 DA/month" + "Ordered via the team" — replace that whole block with a single mono line "By order" (uppercase, text-muted-ink) for contact services. The `unavailable` branch stays.
  - `features`: keep as generic cloud capabilities (containers, databases, SSL, deploys, monitoring) — no Basic/VIP wording.

### Detail page (`app/services/[slug]/page.tsx`)
- Remove the synthetic Basic/VIP/CUSTOM plans build for hosting (~line 48-82). Do NOT build Basic/VIP tiers. Instead, for hosting services (contact-only cloud), render a single "By order" contact card.
- The right-column logic (~line 353+): currently `isUnavailable ? notice : plans?.length ? ServicePlans : single-price-card`. Add a branch: if `isContact` (hosting), render a dedicated cloud contact card instead of ServicePlans:
  - eyebrow mono "CLOUD", heading "By order" (or "Hawiyat Cloud · By order"), body explaining: "Tell us what you need to run, and we will plan the deployment on our cloud, containers, VPS, or Kubernetes, and quote you in DZD."
  - A features list (managed containers, VPS and Kubernetes options, databases, SSL, auto-deploys, monitoring, backups, support AR/FR/EN).
  - Primary WhatsApp button (prefilled "Hello Hawiyat! I would like to plan a Cloud deployment."), secondary Email button.
- Simplest robust implementation: for `isHosting`, set `plans = undefined` and let a new `isContact` cloud card branch handle the right column. Ensure n8n/Evolution (not contact) still render `ServicePlans` with their real tiers + order form.
- `mobilePrice` (~line 194-203): for hosting contact, return `null` (no price shown) OR a "By order" label — decide and note. Prefer null (price hidden) so mobile matches desktop.
- JSON-LD: for contact cloud, do NOT emit an OfferCatalog of Basic/VIP offers. Only emit Service schema (name/description/provider). The `hasOfferCatalog` block should be skipped when `isHosting`/contact. Keep n8n/Evolution OfferCatalog intact.
- The `unavailable` notice-card path can stay (unused) or be removed — keep it for future, it's harmless.

### Data layer (`lib/data/services.ts`)
- hosting-basic + hosting-vip: update `name`/`shortDesc`/`description` to a single cloud-by-order framing that no longer leads with tiers:
  - hosting-basic: name "Hawiyat Cloud", shortDesc "Managed cloud, sized to your needs", description "A managed cloud runtime on our infrastructure: containers, VPS, or Kubernetes, planned with our team. Contact us to start."
  - hosting-vip: same cloud framing (name "Hawiyat Cloud"), shortDesc "Managed cloud with databases and priority support", description "A managed cloud runtime with databases, containers, and priority support. Contact us to plan your deployment."
  - `features`: make them cloud capability lines (containers, VPS/Kubernetes options, managed database, SSL, automatic deploys, monitoring, backups) — remove "1 application"/"2 applications" Basic/VIP-implying lines if they render anywhere, OR keep them as capability examples. The detail page will no longer render a tier list, so features only feed the new cloud card / llms. Adjust wording to cloud.
  - `price`/`priceLabel`: set to `price: ""`, `priceLabel: "By order"` (or keep price as reference only — but the catalog/detail must not render a number). Set `priceLabel: "By order"` and `price: ""`.
  - `tag`: remove "Starter"/"VIP" (set undefined).
  - `seo.title`/`description`: reframe to "Hawiyat Cloud ... By order, contact us" keeping cloud/hosting Algeria keywords.
  - `details.overview` + `seoContent`: reframe to cloud-by-order (VPS/containers/Kubernetes, contact to plan + quote in DZD). Keep facts.

### llmsfull.txt / pricing.md
- Hosting sections: remove the Basic/VIP price tables/plans; replace with a single "Hawiyat Cloud — by order" entry: availability "available by contacting the team", no fixed price, describes VPS/container/Kubernetes, contact to plan + DZD quote. Keep prices out.
- Update `pricing.md` hosting table to a single row: "Hawiyat Cloud | By order | Sized to your needs, quote in DZD" (drop Basic 1,000 / VIP 2,000).

## Files touched
- lib/data/services.ts (hosting-basic + hosting-vip)
- components/services/services-catalog.tsx (cloud card tag/price/description/badge)
- app/services/[slug]/page.tsx (drop Basic/VIP plans, add cloud-by-order contact card, mobilePrice, JSON-LD)
- public/llmsfull.txt, public/pricing.md (hosting → single by-order cloud)

## Out of scope
- n8n/Evolution tiers + order flow, ServicePlans component itself (unless a small tweak is needed for the new card — prefer NOT to touch it; build the cloud card inline in the detail page), app/terms, composer pricing.
