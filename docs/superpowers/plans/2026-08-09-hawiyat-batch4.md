# Hawiyat Batch 4 — Hosting → Cloud, available via contact

**Branch:** `rebrand/ai-infrastructure-identity` · **HEAD:** `383a9a2` · tree clean.

## Global Constraints (BINDING)
- Execution-layer identity; no em dashes (—) in .ts/.tsx, no "cheap", no hover:scale, no emojis, design tokens only.
- Gates: `npx tsc --noEmit` exit 0, `pnpm lint` 0 errors, `pnpm build` succeeds.
- External links `target="_blank" rel="noopener noreferrer"`.
- Keep slugs `hosting-basic`/`hosting-vip` (routes stay live, no 404s). Do NOT delete services.

## Task — Reframe Hosting as a Cloud service, available but contact-only

Currently hosting-basic + hosting-vip are `availability: "unavailable"` and the catalog/detail show "Unavailable for now" notices. The founder wants:
1. Hosting is **available**, but **orders happen by contacting Hawiyat** (contact-only, no self-serve order form).
2. Reframe from "Hosting" to a **cloud service** ("Hawiyat Cloud") — managed cloud runtime: containers, databases, compute, automatic deploys, monitoring, not just "app hosting".

### Data layer (`lib/data/services.ts`)
- Extend the `Service` interface: `availability?: "available" | "unavailable" | "contact"` (add the "contact" state; default stays "available").
- hosting-basic + hosting-vip: set `availability: "contact"`. Keep prices/priceLabels/features.
- Reframe display copy to cloud framing:
  - hosting-basic: name "Cloud Basic", shortDesc "Managed cloud runtime for one app", description "A managed cloud runtime for a single application: container, SSL, auto-deploy, monitoring. Order by contacting the team." (Keep slug/id/price.)
  - hosting-vip: name "Cloud VIP", shortDesc "Managed cloud runtime, 2 apps + database", description "A managed cloud runtime for up to two applications with a managed database and priority support. Order by contacting the team."
  - category: keep "Cloud Runtime" (already cloud-correct).
  - tag: keep "Starter" / "VIP" (or "Basic / VIP" — pick the cleaner of existing).
- Update `seo.title`/`seo.description` for both to cloud framing (keep target keywords "cloud hosting algeria", "container hosting algeria", "hebergement web algerie").
- Update `details.overview`/`whatYouGet` lead lines to cloud framing where they say "hosting for a single application" → "managed cloud runtime for one application" etc. Keep the substance (container, SSL, deploys, DB, monitoring).
- Update `seoContent` (whatIs/whyChoose/howItWorks) lead-in words "hosting" → "cloud runtime" where natural; keep prices and facts. Also fix the "n clients" line if present (there is none — verified; do not add client counts).
- Keep the terms-availability framing consistent: do NOT touch app/terms (availability clause already generic enough).

### Catalog card (`components/services/services-catalog.tsx`)
- Card name: "Hosting" → "Hawiyat Cloud" (folds Basic+VIP). Description: reframe to cloud runtime ("Managed cloud runtime for one or two apps with databases, containers, SSL, and automatic deploys. Basic or VIP, ordered via the team.").
- Availability rendering:
  - Add a `"contact"` state distinct from `"unavailable"`:
    - Badge (top-left): for contact → "By quote" or "Contact to order" (bg-signal/10 text-signal-contrast border border-signal/30 or a distinct token-consistent style), mono uppercase.
    - Price area: keep showing "from 1,000 DA/month" (it IS available) but add a small mono sub-line "Ordered via the team" OR swap the price row to "Custom" — decide: keep price (available) + a subtle "by quote" note. Cleanest: keep the price, and the contact badge communicates ordering. Remove the "Unavailable for now" text for hosting.
- The `unavailable` rendering stays for future use (n8n/Evolution are available; nothing currently uses "unavailable" after this change).

### Detail page (`app/services/[slug]/page.tsx`)
- `isUnavailable` stays for the "unavailable" state. Add `isContact = service.availability === "contact"`.
- For hosting (contact-only):
  - Render the plan selector (Basic/VIP/Custom) as before via `ServicePlans`, BUT the order must go through contact, not `ServiceOrderForm`.
  - The cleanest approach: extend `ServicePlans` (components/services/service-plans.tsx) with a `contactOnly?: boolean` prop. When `contactOnly` is true, replace the `ServiceOrderForm` in the active-plan card with a contact card: heading "Order by contacting the team", body "Tell us which plan you need and we will set it up and confirm payment on WhatsApp.", primary WhatsApp button (wa.me/213559555951 with prefilled "Hello Hawiyat! I would like to order Cloud {plan}."), secondary email (mailto:contact@hawiyat.org "Email us"). This reuses the custom-plan contact-card pattern already in ServicePlans.
  - Pass `contactOnly={isContact}` from the detail page for hosting services. n8n/Evolution keep the normal order form (contactOnly false).
  - Update the JSON-LD availability: currently flips to OutOfStock when unavailable; for "contact" use a neutral state (omit `availability` or use `https://schema.org/InStock` with the contact path). Simplest: only set OutOfStock for "unavailable"; for contact leave the default as it is today for available services.
  - The mobile price line (`mobilePrice`) currently suppresses for unavailable — allow it for contact (price is real).
- Keep the `unavailable` notice card code path intact (unused after this change, but keep for future).

### llmsfull.txt / pricing.md
- Update the hosting sections in `public/llmsfull.txt` (add "Availability: available by contacting the team") and `public/pricing.md` hosting section (add a "Contact to order" note). Keep prices/tables.

## Files touched
- lib/data/services.ts (interface + hosting-basic + hosting-vip copy)
- components/services/services-catalog.tsx (card name/badge/price area)
- components/services/service-plans.tsx (contactOnly prop)
- app/services/[slug]/page.tsx (isContact, pass contactOnly, JSON-LD/mobile price)
- public/llmsfull.txt, public/pricing.md (hosting availability note)

## Out of scope
- app/terms, composer/pricing cards, n8n/Evolution availability, order-form components (only ServicePlans contact branch).
