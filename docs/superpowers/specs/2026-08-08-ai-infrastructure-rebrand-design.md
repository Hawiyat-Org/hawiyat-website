# Hawiyat Website Rebrand — IA & Content Overhaul Design Spec

> Status: Approved design (Approach A). Implements the AI-infrastructure identity defined in `DESIGN.md` v2.0. Source of strategy: `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand.md`.

## 1. Context & Goals

Hawiyat's website currently sells "AI subscriptions / cheap Claude" — the exact identity the company's vision report (2026-08-07) says it is NOT. This overhaul shifts the digital identity to **AI infrastructure — the execution layer between frontier AI models and business systems**, with **Hawiyat AI Composer** (renamed from "Hawiyat Composer") as the proprietary execution engine.

**Goal:** Every page rebuilt to the new identity; dead/off-mission pages removed; home made lean and converting; a single dedicated architecture page.

**North star line:** "Whatever AI exists tomorrow, businesses will need a layer that decides how to use it."

## 2. Target IA (Approach A)

**Pages:** `/` · `/composer` · `/services` (+ `/services/[slug]`) · `/about` · `/terms` · `/privacy` · `/dmca`

### Route changes
| Old | Action |
|-----|--------|
| `/hawiyat-composer` | Permanent redirect → `/composer` (keep old URLs working; update sitemap/footer/nav) |
| `/cyber-security` | **Delete** route + nav/footer link. Security story folds into Composer "Guardrails & Evaluations". |
| `/guides` + `/guides/claude/*` | **Delete** (content moves to `usage.ai.hawiyat.cloud`). Remove footer/nav links. |
| `/ai-algeria` | **Delete** page → content becomes a compact home band. |
| `/schedule` | **Delete** page + `/api/schedule/*` routes + Prisma `Booking`/`BusinessHours`/`BlockedDate`/`VerificationCode` models + `components/schedule/*`. Enterprise booking becomes a **feature** on the Enterprise pricing card ("Book with the team → WhatsApp"). |
| `/templates`, `/bootcamp` | No routes exist — remove links from footer/sitemap/nav. |
| `/dcma` | Keep (permanentRedirect → `/dmca`). |

## 3. Shared Chrome

### Header nav
`Composer` (`/composer`) · `Services` (`/services`) · `About` (`/about`) + primary CTA **`Start Building`** → `/composer`. Keep theme toggle (Sun/Moon).

### Footer
- **The Layer:** AI Composer, Services, About
- **Company:** Support (WhatsApp `wa.me/213559555951`), GitHub
- **Legal:** Terms of Service, Privacy Policy, DMCA
- Socials kept. **Remove dead links:** AI Bootcamp, Templates, Monitoring, Blog (no target pages).

### Widgets
- Keep WhatsApp widget (primary contact) + Chatwoot.
- Remove wiring for unused: `RegistrationModal`, `BootcampEffects`, `FloatingElements`, `VideoModal` (unless reused).

## 4. Home `/` (lean, converting)

1. **Hero** — H1 **"The layer that decides how your business uses AI."** Eyebrow (mono): `HAWIYAT AI COMPOSER · EXECUTION LAYER`. Sub: execution-layer value (model-independent, DZD, Algeria). CTAs: `Start building` → `/composer`, `See services` → `/services`. **Execution Console** (scripted animated mock — no backend): task packet `"Reply to order 1024 on WhatsApp in Arabic"` animates UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT with mono telemetry (`ctx 12k · cost 0.4 DZD · Q 0.98 · 210ms`).
2. **Pricing** — **3 cards**:
   - **Pro** — engine tier (source: `composer-pro`), DZD price, OrderForm CTA.
   - **MAX 5X / MAX 20X (switchable)** — single card, toggle switches tiers (sources: `composer-max5x`, `composer-max20x`), OrderForm CTA.
   - **Enterprise** — full-stack (Composer + n8n + Evolution + Platform), highlighted card, **feature: "Book with the team → WhatsApp"** + WhatsApp CTA.
3. **Proof band** — mono stat cards + "Trusted by" logos (Itihad, ESTIN, IT Solutions).
   - **Numbers policy (LOCKED):** ship **placeholder values marked TODO**; correct figures come from Rami's canonical dashboard (source of truth, ≤2 days out).
   - **Verified now (may ship):** `100+ clients` (108 paying), `2.6M DA ARR` (ARR ≈ 2,621,906 DA; MRR ≈ 218,492 DA).
   - **FORBIDDEN:** `+50B tokens` — unverifiable/fabricated (observed window ≈1.06B tokens, lifetime gateway spend only $1,218.07). Never ship.
4. **Algeria band** — compact bottom section (from `/ai-algeria`): DZD, Algiers HQ, official invoicing (facturation), Itihad + Label Projet Innovant, AR/FR/EN support. CTAs → WhatsApp + `/services`.
5. **FAQ** — 5 questions per DESIGN.md §12.
6. **CTA** — "Your first task, executed in 5 minutes." → `/composer`.

## 5. `/composer` (architecture & engine)

- H1 **"Hawiyat AI Composer"**, subtitle **"The AI execution engine."**
- **Execution loop** — UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT (signature trace, larger).
- **Any model. Any system.** — model chips (GPT, Claude, Gemini, Llama, open) + systems cards (WhatsApp, CRM, ERP, email, DB, n8n).
- **Engine capabilities (6)** — Model Gateway, Context Selector, Tool Router, Reliability & Fallbacks, Guardrails & Evaluations, Cost Controls.
- **Telemetry/metrics band** (placeholder numbers, TODO policy from §4.3).
- **Enterprise full-stack** — Composer + n8n + Evolution + Platform "one contract" → WhatsApp + `/services`.
- **Why not DIY** comparison strip (vs OpenAI+Claude+n8n+WhatsApp+DB).
- CTA → `/services`.

## 6. `/services` + `/services/[slug]`

**Catalog rework (de-resellerize):**
- Rename: `Hawiyat Composer + Claude Code` → **`Hawiyat AI Composer`**; `LLM Credit` → **`AI Composer access`**.
- Re-categorize: drop `AI Subscription` / `AI Tokens` → execution-layer categories (`AI Execution`, `Managed Systems`, `Cloud Runtime`).
- Reorder: Composer/execution tiers first; n8n/Evolution/Hosting as "systems you connect."
- Remove strikethrough/launch-price discount mechanics → honest DZD pricing.
- Rewrite "Why Choose Hawiyat" strip → execution-layer value.
- Update `/services` H1 + metadata (currently "AI Subscriptions and Managed Services").

**Detail pages** — keep structure (plans, features, SEO/GEO, FAQ, order form); refresh copy/images + "AI Composer" naming. Source of truth stays `lib/data/services.ts` (`Service`/`ServicePlan`).

## 7. `/about`

Keep content (timeline, credentials/certs, partners, map, CTA) — **restyle to tokens**: replace `bi-*` icons, raw hex (`#f6f7fb`/`#141414`), purple gradients, `font-serif` display → new palette/typography. Fix copy voice → execution layer (no "AI subscriptions").

## 8. Global design/tech work

1. **`app/globals.css`** — install token set: light `--paper/--ink/--surface/--surface-dim/--border/--muted/--signal/--signal-text/--signal-contrast/--signal-bg/--ember/--ember-deep/--danger/--ok`; dark equivalents (per DESIGN.md §Palette). Keep shadcn HSL mapping aligned.
2. **`tailwind.config.js`** — map tokens to Tailwind colors; remove `poly` fontFamily; add `--font-mono`.
3. **`app/layout.tsx`** — add JetBrains Mono (`--font-mono`, next/font); remove Bootstrap Icons CDN + legacy font imports; update metadata → execution-layer positioning; fix `SITE_URL` = `https://www.hawiyat.org`.
4. **Icon sweep** — `bi-*` → lucide across components (~12 files).
5. **Token sweep** — raw `bg-[#…]`/`dark:bg-[#…]` → tokens across components.
6. **Signature** — Execution Trace component + GSAP trace-line reveal added to `scroll-animations.tsx` (keep reveal-up + dashboard 3D; respect `prefers-reduced-motion`).
7. **Dead-code cleanup** — delete `styles/globals.css`, `components/bootcamp-effects.tsx`, `registration-modal.tsx`, `floating-elements.tsx`, `services-teaser.tsx` (unused), `testimonials.tsx` (commented-out), `components/schedule/*`.
8. **Prisma pre-req** — reconcile `prisma/schema.prisma` (currently only `Order`/`EmailSubscription`/`BootcampRegistration`; schedule + waitlist models exist only in migrations — a `pnpm build` regenerating the client would strip them). Exact scope:
   - **Remove** `Booking`/`BusinessHours`/`BlockedDate`/`VerificationCode` models + `/api/schedule/*` routes (schedule is being deleted). Done in the SAME change so the build never regenerates a client missing models that code still references.
   - **Keep** `Waitlist` + `EmailSubscription` (newsletter is live via `/api/subscribe`; `/api/waitlist` still exists) — **reconcile the `Waitlist` model back into schema.prisma** (it's drift, not dead code).
   - **Fix `lib/prisma/seed.ts`** (currently a broken copy of the availability API route — `db:push`/`db:reset` are no-ops). Since the schedule/Friday-closed seeding is being removed with schedule, replace with a minimal seed for what remains (or a no-op with a clear comment).
   - **Remove** `/api/bootcamp/register` + `/api/templates` if orphaned after cleanup (bootcamp page gone; templates page gone).

## 9. Rename — Hawiyat AI Composer

Apply "Hawiyat AI Composer" everywhere: copy, metadata, `lib/data/services.ts`, `/composer` page, Execution Console UI, FAQ, footer, sitemap. (Keep "Composer" as shorthand in UI labels.)

## 10. Out of scope

- Guides, tickets, and booking systems → live in `usage.ai.hawiyat.cloud` (client dashboard), not this site.
- Real Composer live demo/backend in hero → scripted animated mock only.
- Content governance of guide articles.
