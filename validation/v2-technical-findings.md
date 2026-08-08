# v2 Technical Validation — Hawiyat AI-Infrastructure Rebrand (Tasks 1–8, HEAD bd98188)

**Validator:** Senior Full-Stack Engineer (technical feasibility + plan-vs-implementation match)
**Date:** 2026-08-08
**Branch:** `rebrand/ai-infrastructure-identity` (working tree clean, HEAD `bd98188`)
**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md`
**Spec:** `docs/superpowers/specs/2026-08-08-ai-infrastructure-rebrand-design.md`
**Scope:** stack realism, interfaces, Prisma state, redirects, under-specified items, fresh-clone build.

---

## Verdict: PASS_WITH_CONDITIONS

The plan is **technically sound and the implemented code matches it**. `npx tsc --noEmit` exits 0, `pnpm build` succeeds (25 pages incl. `/composer` + 8 `/services/[slug]` SSG paths), the Prisma client regenerates with `Waitlist` restored and all schedule models gone, redirects are correct, the token/font/icon infrastructure is fully installed, and the requested sweeps (`bi-`, raw `bg-[#`, `font-serif`/`font-thin`, bare `text-muted`) return zero hits.

No BLOCKER for build/runtime feasibility. The conditions below are live-but-out-of-scope surfaces (orphaned `/api/chat` reseller prompt, stale `public/llms.txt`, in-nav legal copy) and a pre-existing red `pnpm lint` gate the plan's verify steps claim as green.

---

## BLOCKER

None.

- `npx tsc --noEmit` → **exit 0** (clean, no `lib/helper.ts`/`test/email-test.ts` errors — they are deleted).
- `pnpm build` → **exit 0** (`prisma generate && next build`; 25 static pages, `/composer` SSG, `/services/[slug]` 8 pre-rendered slugs, `/dcma` present). `next.config.mjs` sets `typescript.ignoreBuildErrors` + `eslint.ignoreDuringBuilds` (GC6), so tsc/lint must be gated manually — tsc is green.

---

## IMPORTANT

### I1 — `pnpm lint` fails with 16 errors; plan verify-steps claim `pnpm lint` passes
- **Files:** `app/dmca/page.tsx` (1), `app/privacy/page.tsx` (1), `app/services/[slug]/page.tsx` (1), `components/chatwoot-widget.tsx` (2), `components/services/order-form.tsx` (3), `components/ui/input.tsx` (1), `components/ui/use-toast.ts` (1) — `@typescript-eslint/no-unused-vars`, `no-explicit-any`, `no-empty-object-type`, `react/no-unescaped-entities`.
- **What's wrong:** Every task's Step X says "Verify: `pnpm lint` + `npx tsc --noEmit` + `pnpm build` pass." `pnpm lint` is **red** at HEAD.
- **Attribution (verified):** all 16 errors are **pre-existing debt, not rebrand regressions**. Only `app/privacy/page.tsx` and `components/services/order-form.tsx` appear in the rebrand diff, and their diffs are pure `bg-muted`→`bg-surface-dim` token swaps (verified `git diff main...HEAD`); the erroring lines (privacy:25 unescaped entity; order-form:4 unused `CreditCard`, 66–67 `window as any`) are byte-identical on `main`. The other 5 files are untouched by the rebrand. So the branch neither introduced nor fixed these.
- **Why it matters:** GC6's gates are binding; claiming `pnpm lint` green when it isn't is a verification-honesty gap (the plan's own gate is not actually met).
- **How to fix:** Either (a) fix the 16 pre-existing errors (small: escape 4 apostrophes, drop unused imports `Send`/`Minimize2`/`CreditCard`/`actionTypes`, type the `window.fbq`/chatwoot `any`s, extend the empty `InputProps`), or (b) amend the plan/GC6 to record lint as "red pre-rebrand, gate = tsc + build only." Recommend (a) before launch — it's ~30 lines.

### I2 — Live `/api/chat` route still primes Gemini with the old reseller/gateway identity
- **File:** `app/api/chat/route.ts` (system prompt lines 31–76; GET health line 157)
- **What's wrong:** The HawiyatBot system prompt says *"Hawiyat Composer — routing and caching gateway for AI coding tools"*, plans list *"PRO … 2x Claude credits"*, *"MAX 5X … 5x Claude capacity"*, *"MAX 20X … 20x Claude capacity"*, and example answers push *"Claude Code, Cursor, CLIs"*, *"cut AI costs"*, *"Same Endpoints, Way Less Waste"*. This is exactly the identity GC1/GC3 forbid, and it is served by a **live, unauthenticated, POST-able endpoint** (no component calls it — it's orphaned post-rebrand — but the route is deployed).
- **Why:** GC3 (positioning copy is hard), GC8 (drop "Claude Code"/credit naming). Whatever the bot says about Hawiyat *is* the brand heard through AI. Also the only remaining source of `2x/5x/20x Claude` strings in `app/` (the `rg` copy audit in the plan targets `app components lib/data`).
- **How to fix:** Rewrite the prompt to execution-layer facts (Composer decides the best way to accomplish each task; UNDERSTAND→PLAN→ROUTE→EXECUTE→EVALUATE→RESULT; models are routes; context from WhatsApp/CRM/ERP/email/DB; every run evaluated + costed in DZD). Preferred: `git rm app/api/chat/route.ts` if the bot isn't returning (smallest surface), or add per-endpoint rate-limit + `message`/`conversation` length caps (see v2-security I-1). Re-run `rg -ni "claude credits|claude capacity|gateway for AI coding" app`.

### I3 — `public/llms.txt` is stale: old positioning + five removed/dead URLs
- **File:** `public/llms.txt`
- **What's wrong:** Describes *"AI infrastructure, subscriptions, automation, hosting…"*, names Composer *"Gateway, caching, and routing for compatible coding tools"*, and links `/ai-algeria`, `/hawiyat-composer`, `/guides/claude`, `/cyber-security` — `/ai-algeria`+`/hawiyat-composer` only 308, the rest 404. Last touched pre-rebrand.
- **Why:** This is the primary agent-readable surface for LLM crawlers; it teaches the reseller identity the rebrand deleted and hands out dead URLs.
- **How to fix:** Rewrite with live routes only (`/`, `/composer`, `/services`, `/services/[slug]`, `/about`, `/privacy`, `/terms`, `/dmca`), execution-layer framing, keep DZD/Algeria/AR-FR-EN contact block. (Cross-ref: v2-seo B1.)

### I4 — `/terms` §5 still describes Composer as an "AI optimization layer" with subscribe/credit framing
- **File:** `app/terms/page.tsx` (§5 "The Service: Hawiyat Composer", lines ~175–199; §8 "Monthly Quota Policy")
- **What's wrong:** *"Hawiyat Composer is an AI optimization layer… making your interactions faster, cheaper, and more effective"*; §5.2 *"When you subscribe, you receive an API Key."* In-nav, live legal copy that contradicts GC1/GC8 (it also renders "Hawiyat Composer" without "AI").
- **Why:** Legal pages are user-visible and crawled; cost-optimizer + "AI subscriptions" framing is the exact identity being removed.
- **How to fix:** Reword §5 to the execution-layer model (routing/context/tools/fallbacks/evaluation, per-task cost in DZD, no subscription-credit language); sweep `rg -ni "optimization layer|monthly quota|credits" app/terms`. (Cross-ref: v2-marketing B1.)

---

## MINOR

### M1 — `.env.example` does not exist and is gitignored
- **Files:** `.gitignore` (`line 20: .env*`), AGENTS.md ("Copy `.env.example` → `.env` if missing")
- **What's wrong:** There is no `.env.example` tracked (verified `git ls-files | rg env` = empty), and the `/.env*` ignore rule would exclude one if added. A fresh clone has no env template.
- **Why:** Fresh-clone friction — the documented setup step points at a file the repo can't ship. Build itself is env-independent (`NEXT_PUBLIC_APP_NAME` has a fallback; DB/Gemini/chatwoot keys are runtime-only), so this does not break `pnpm install && pnpm build`.
- **How to fix:** Add a negation rule (`!.env.example`) to `.gitignore` and commit a template with the 5 vars from AGENTS.md.

### M2 — `pnpm db:reset` (migrate reset) will fail; use `db:push` (already the plan's guidance)
- **Files:** `prisma/migrations/*` (no `orders`/`email_subscriptions`/`bootcamp_registrations` tables exist in any migration; `20250810114517_the_box` creates only `Account/Session/User/Plan/PricingTier/Subscription/Invoice/Payment/EmailLog`, and the waitlist table lives in `20250729143840_init`)
- **What's wrong:** `db:reset` replays migrations that never created the schema's `Order`/`EmailSubscription`/`BootcampRegistration` tables → `migrate reset` fails/diverges. `db:push` is schema-driven and correct.
- **Why:** Not a rebrand regression — this drift predates the plan and the plan's Task 9 Step 1 already documents "prefer `db:push` over `db:reset`". Flagging as a note: validation did not run `db:push` (requires live DB + mutates); recommend running `pnpm db:push` once before deploy to confirm the restored `Waitlist` and existing tables push cleanly.
- **How to fix:** No code change required; use `pnpm db:push`. Optional hardening: author a proper initial migration so `db:reset` works for fresh environments.

### M3 — Services catalog uses non-token palette colors (violet/purple/cyan/teal) and legacy card surfaces
- **Files:** `components/services/services-catalog.tsx` — `categoryStyles` (`bg-cyan-500/10` / `bg-teal-500/10` / `bg-violet-500/10`, lines 92–96), tag badges (`from-violet-500 to-purple-600`, `from-purple-500 to-violet-600`, lines 170–188), search input `bg-white/80 dark:bg-secondary/80`, cards `bg-white/40 dark:bg-secondary`
- **What's wrong:** Named palette colors, not tokens. Not raw hex (so GC3's "no raw hex" passes literally), but the `violet`/`purple` gradients are the legacy identity the rebrand removed, and the surface/background reads as shadcn gray rather than `--paper`/`--surface`.
- **Why:** DESIGN.md "one system" goal; the plan's Task 6 Step 4 explicitly asked to update the category badge/tag color chain for the new categories.
- **How to fix:** Map `categoryStyles` to tokens (`AI Execution`→`signal`/`signal-bg`, `Managed Systems`→`ember`, `Cloud Runtime`→`ok` or `signal-contrast`), replace gradient tag badges with flat token fills, cards → `bg-surface`. (Cross-ref: v2-frontend B2.)

### M4 — `app/layout.tsx` body/header still use raw `text-black`/`dark:bg-black` + legacy `hero-bg-gradient`
- **Files:** `app/layout.tsx:206` (`text-black dark:bg-black dark:text-white`), `app/layout.tsx:220` (`hero-bg-gradient`); `components/header.tsx` (gray-scale nav + `bg-black dark:bg-white` CTA)
- **What's wrong:** GC3's token rule is scoped to components; `text-black` is Tailwind named (not hex) so the sweep stays clean, but the global header is fully legacy styling (v2-frontend B1) and the primary CTA in `header.tsx` is `bg-black dark:bg-white`, not `--signal` fill + `--signal-text`.
- **How to fix:** Migrate `header.tsx` to tokens (nav `text-ink`/`text-muted-ink`, hover `bg-surface-dim`, CTA `bg-signal text-signal-text`) and drop the `.hero-bg-gradient` body class after the hero is fully token-styled. Task 9 design-audit item (d) covers this.

### M5 — `components/execution-trace.tsx` `active` default and no telemetry-prop guard are fine; flag only as an API footgun
- **File:** `components/execution-trace.tsx` — `active = 0` default means a consumer forgetting `active` renders the first stage as "done". Matches the spec exactly (plan's interface note: no `showTelemetry`, telemetry renders iff `telemetry.length > 0`). `ai-playground.tsx` correctly passes `-1` initially.
- **Why:** Not a bug — document only so future consumers don't omit `active`.
- **How to fix:** No action required.

---

## Verified working (evidence)

- **TypeScript:** `npx tsc --noEmit` → exit 0 (clean, `strict` on). Plan GC6 gate met.
- **Build:** `pnpm build` → exit 0. Route table: `/` (11.3kB), `/composer` (1.21kB), `/about`, `/services`, `/services/[slug]` ×8 (n8n-hosting, composer-pro, hosting-basic, +5), `/dcma`, `/dmca`, `/privacy`, `/terms`, `/robots.txt`, `/sitemap.xml`, `/api/{chat,orders,subscribe,waitlist}`. Middleware compiled (26.6kB). Ran twice — deterministic.
- **Prisma state** (`prisma/schema.prisma`): models = `Order`, `EmailSubscription`, `Waitlist` (restored, unique `email`, `ipAddress`, `userAgent`, `createdAt`), `BootcampRegistration`. Zero schedule models (`Booking/BusinessHours/BlockedDate/VerificationCode` absent). `npx prisma generate` regenerates the client with `Waitlist` (`$WaitlistPayload` present in generated `index.d.ts`, no `Booking`), so `pnpm build`'s `prisma generate` step is schema-faithful.
- **Seed:** `lib/prisma/seed.ts` is the clean no-op + comment (12 lines, `main()` empty, `prisma.$disconnect()`). `/api/waitlist` compiles against restored model (uses `email`, `ipAddress`, `userAgent`, `createdAt`).
- **Deleted:** `app/schedule/`, `app/api/schedule/` (4 routes), `components/schedule/` (4 files), `lib/helper.ts`, `lib/date-utils.ts`, `test/email-test.ts`, `app/cyber-security/`, `app/guides/`, `app/ai-algeria/`, `app/hawiyat-composer/`, `components/video-modal.tsx`, `app/api/bootcamp/register/`, `app/api/templates/`, `styles/globals.css`, and all dispositioned home components (benefits-section, prebuilt-tools, additional-features, one-subscription, build-ai-apps, resources, our-numbers, ai-playground-dashboard, bootcamp-effects, registration-modal, floating-elements, services-teaser, testimonials). No import references remain (`rg` = none). `components/ai-playground.tsx` KEPT (Execution Console, consumed by `hero-section`).
- **Redirects:** `next.config.mjs` → `/hawiyat-composer`→`/composer` (permanent), `/ai-algeria`→`/` (permanent). `/dcma`→`/dmca` via page-level `permanentRedirect` (app/dcma/page.tsx). Nav/footer/sitemap: Composer|Services|About + `Start Building`; footer = The Layer/Company/Legal with WhatsApp primary; sitemap has only live routes + 8 service slugs; no `/schedule`, `/bootcamp`, `/templates`, `/cyber-security`, `/guides`.
- **Tokens & fonts:** `app/globals.css` has full light+dark Hawiyat hex set (`--paper/--ink/--surface/--surface-dim/--border/--muted/--signal/--signal-text/--signal-contrast/--signal-bg/--ember/--ember-deep/--danger/--ok`) matching DESIGN.md §Palette **plus** `-rgb` triplets; shadcn colliders renamed (`--border-shadcn`, `--muted-shadcn`). `tailwind.config.js` maps every token (`paper…ok`, `muted-ink`, `muted: {DEFAULT, foreground}`, `border` → hex), `fontFamily.mono`, no `poly`. `app/layout.tsx` wires `JetBrains_Mono` (`--font-mono`) + `Space_Grotesk`; Bootstrap CDN link gone; no font `@import`s.
- **Interfaces:** `ExecutionTraceProps {stages?, active?, telemetry?, className?}` matches both consumers (`app/composer/page.tsx:212`, `components/ai-playground.tsx:133`). `createMetadata` used in `composer/layout`, `services/page`, `services/layout`, `about/layout`, `terms/layout`, `services/[slug]`. `getComposerService` throws on unknown id; `composer-pro`, `composer-max5x`, `composer-max20x` all exist → module-scope guard evaluates at build.
- **Services data:** ids/slugs `composer-pro`, `composer-max5x`, `composer-max20x`, `llm-credit` (renamed **AI Composer access**, fully rewritten — no "OpenAI credits"/"10 USD"); categories `AI Execution`/`Managed Systems`/`Cloud Runtime`; **zero `originalPrice`/`launchNote` values** (type fields remain, all three render sites guarded by `&&`); no `60+`, `+50B`, `300 Templates`, `LLM Credit`, `Claude Code`, `10 USD`. CARD_ORDER keys match `buildCatalogCards()` output. `/services/layout.tsx` ItemList names = `Hawiyat AI Composer / AI Composer access / n8n Hosting / Evolution API / Application Hosting`.
- **Proof band (GC5 amendment):** home `trusted-brands.tsx` renders `100+` clients, `10+` resellers, `100B+` tokens, `≈2.6M DZD` ARR; `/composer` renders `100+` + `≈2.6M DZD`; partners labeled "Partners & early customers" with Itihad/ESTIN/IT Solutions/RMASC/Green Duty/Mercus Academy. **No literal `TODO` string anywhere** in `app/`/`components/`.
- **Home order:** Hero(+Execution Console) → Pricing(3 cards: Pro / MAX switchable / Enterprise "Custom pricing" + WhatsApp prefilled) → Proof band → Algeria band → FAQ → CTA → Newsletter → Footer, with `WhatsAppWidget` + `ScrollAnimations` retained.
- **Sweeps (scope item 6):** `rg "bi-"` = 0 · `bg-\[#` / `dark:bg-\[#` / `text-\[#` / `border-\[#` = 0 · `font-serif`/`font-thin` = 0 · bare `text-muted` (word-boundary, non-`-ink`/`-foreground`) = 0 (all new components use `text-muted-ink` per GC13).
- **Image assets:** all `lib/data/services.ts` image paths resolve (`/services/n8n-hosting.png`, `/services/hawiyat%20composer.png` → `public/services/hawiyat composer.png`, `/logos/evolutionapi_evolutionapi.png`). All `/trust/*` partner logos exist on disk.
- **Orphaned-route check:** `/api/chat` has no consumer (grep of `app`/`components` = none) — flagged as I2 for its stale content.

## Priority order to close PASS_WITH_CONDITIONS → PASS

1. Rewrite or delete `app/api/chat/route.ts` (I2).
2. Rewrite `public/llms.txt` to live execution-layer routes (I3).
3. Fix or explicitly document the pre-existing `pnpm lint` errors; align plan GC6 verify claims (I1).
4. Reword `/terms` §5 (I4).
5. Minor sweep: M1–M3 (`.env.example`, `db:push` run, services-catalog token mapping).
