# Spec: Hawiyat Refinement Round — Playful Tone, Services Consolidation, Design Polish

> Status: Approved founder direction. Branch: `rebrand/ai-infrastructure-identity`. Supersedes prior home-order notes where they conflict.

## Objective
Refine the Hawiyat site: playful, human (non-corporate) copy with **no em dashes**; brand-first hero ("Hawiyat AI Composer") that mentions our own-infrastructure hosting; smaller card border-radius; pricing badge above the title; copyright 2025-2026; Proof section redesigned with lucide icons (drop ARR/MRR); **services page shows non-Composer services only** (n8n, Evolution API, Hosting — combined into one card each) with **tier selectors on detail pages**; hosting framed as container-based (not VPS); and **duplicated content removed across pages**.

## Founder decisions (binding)
1. **Services page = non-Composer only.** Show n8n Hosting (1 card), Evolution API (1 card), Hosting (1 card, container-based). Composer tiers live ONLY on home Pricing.
2. **Delete Composer service detail pages** (`/services/composer-pro`, `composer-max5x`, `composer-max20x`, `llm-credit`) — remove from catalog + sitemap. Home Pricing is the sole Composer purchase path.
3. **Tier selector on detail pages**: `/services/n8n-hosting` (Freelance/Startup/Enterprise), `/services/evolution-api` (WhatsApp/Startup/Enterprise), `/services/hosting-*` — a visible plan selector switches price + features + order-form (replaces the stacked ServicePlans layout).
4. **Proof section redesign**: lucide icons per stat, drop the ARR/MRR figure. Keep 100+ clients, 10+ resellers, 100B+ tokens (3 cards).
5. **Hero**: H1 "Hawiyat AI Composer"; playful sub mentioning our own infrastructure hosting + DZD + Algeria; no em dashes.
6. **Tone**: playful, human, non-corporate. **No em dashes (—) anywhere in renderable copy** — replace with commas/periods/colons.
7. **Pricing tags**: PRO / MAX 5X / MAX 20X badges render ABOVE the card title.
8. **Copyright**: `Copyright © 2025-2026 Hawiyat`.
9. **Border radius**: cards `rounded-lg` → `rounded-md`; buttons `rounded-lg` → `rounded-md` (keep `rounded-full` only for true circles/toggles per prior pass).
10. **Hosting = container-based** (not VPS): update copy in `lib/data/services.ts` hosting entries + any "VPS" mentions (only a privacy-page false-positive exists today).
11. **Remove duplicated content** across pages (e.g. "sits between / one layer / execution layer" repeated in hero, composer, FAQ, terms).

## Tech Stack
Next.js 14 App Router · React 18 · TypeScript · Tailwind · Prisma/Postgres · shadcn/ui · lucide-react · GSAP (composer only).

## Commands
```
pnpm dev / pnpm build / pnpm lint / npx tsc --noEmit
```

## Project Structure (relevant)
```
components/
  hero-section.tsx      # Brand-first H1 + playful sub (own infra), no em dash
  pricing.tsx           # badge above title; rounded-md
  our-numbers.tsx       # lucide icons, drop ARR, 3 stats
  faq.tsx               # no em dashes; playful answers
  call-to-action.tsx, partners-marquee.tsx, algeria-band.tsx  # tone + radius + no em dash
  services/
    services-catalog.tsx      # non-Composer only; combine tier cards → one card each
    service-plans.tsx         # tier selector (replaces stacked)
    service-order-form.tsx, order-form.tsx  # radius
app/
  page.tsx              # home order unchanged (Hero→Marquee→OurNumbers→Pricing→FAQ→CTA)
  services/page.tsx     # H1/desc for non-Composer catalog
  services/[slug]/page.tsx  # tier selector wiring; remove composer-* slugs
  services/layout.tsx   # ItemList = n8n, evolution, hosting (no composer)
  sitemap.ts            # remove /services/composer-*, llm-credit
  composer/page.tsx     # no em dashes; tone
  about/page.tsx        # no em dashes; tone
  terms/page.tsx        # no em dashes; remove duplicated "execution layer" overlap
lib/data/services.ts    # hosting = container-based copy; remove em dashes; tier data intact
components/footer.tsx   # copyright 2025-2026
```

## Code Style
- Copy: playful, human, non-corporate. No em dashes. No reseller/"cheap" framing. DZD + Algeria = identity.
- Radius: `rounded-md` cards/buttons (smaller). `rounded-full` only true circles.
- Tokens only (monochrome). lucide icons.
- Keep verified stats: 100+ clients, 10+ resellers, 100B+ tokens. NO ARR/MRR figures rendered.

## Testing Strategy
No formal suite (per AGENTS.md). Gates: `npx tsc --noEmit`, `pnpm lint` (0 errors), `pnpm build` (succeeds). Manual browser: home hero, pricing badge position, Proof icons, services catalog (3 cards), detail-page tier selector, footer copyright, no em dashes visible.

## Boundaries
- **Always:** no em dashes in renderable copy; keep verified stats exact; tokens only; smaller radius; delete composer-* service routes from catalog + sitemap.
- **Ask first:** changing stat VALUES; adding/removing services beyond composer consolidation; changing pricing.
- **Never:** reintroduce reseller/cheap framing; restore ARR/MRR figures; reintroduce full-rounded buttons; break the OrderForm/order flow; add new products.

## Success Criteria
- `/services` shows exactly 3 cards (n8n, Evolution, Hosting) — no composer cards.
- `/services/composer-pro`, `composer-max5x`, `composer-max20x`, `llm-credit` 404/redirect and are gone from sitemap + ItemList.
- `/services/n8n-hosting` etc. have a working tier selector (price/features/order-form switch).
- Home hero: "Hawiyat AI Composer" + playful sub mentioning own infrastructure; no em dash.
- Proof section: 3 stats with lucide icons, no ARR/MRR.
- Footer: `© 2025-2026`.
- `rg -c "—" components app --glob '*.tsx'` → 0.
- Cards/buttons `rounded-md`.
- Build/lint/tsc green.
