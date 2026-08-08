# v2 Validation — Dependencies & Sequencing (Final State)

**Validator:** Validation Specialist (dependencies & sequencing)
**Date:** 2026-08-08
**Branch:** `rebrand/ai-infrastructure-identity` @ `bd98188` (Tasks 1–8 committed; Task 9 pending)
**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md`

---

## Verdict: PASS_WITH_CONDITIONS

The executed sequence is **buildable and interface-consistent** in the final state, and Task 9 is correctly positioned as the QA gate — but Task 9 must still clear four concrete items (one of which is rebrand-scope residue introduced *during* the rebrand: the `api/chat` system prompt).

---

## Verified Gates (evidence)

| Gate | Result | Evidence |
|---|---|---|
| `npx tsc --noEmit` | ✅ exit 0 | Fresh run on HEAD `bd98188` |
| `pnpm build` | ✅ exit 0 | 25 routes generated, all 8 `/services/[slug]` SSG paths present |
| `pnpm lint` | ❌ exit 1 | 16 errors across 6 files (all pre-existing at merge-base `5892b71`; **Task 9 Step 1 mandates lint pass — open item**) |
| Runtime redirects | ✅ | `/hawiyat-composer` → 308 `/composer`; `/ai-algeria` → 308 `/`; `/composer` 200; `/schedule` 404 |
| Deleted-module imports | ✅ | Zero imports of any deleted component/file/route |
| Parallelization | ✅ | No leftover artifact; build serial |

---

## Confirmed Interface-Contract Summary (final state)

| Contract | Producer | Consumer(s) | Status |
|---|---|---|---|
| `ExecutionTrace` (props `stages/active/telemetry/className`) | `components/execution-trace.tsx` | `/composer` (`active={5}`, `telemetry`, `className`) + hero Execution Console `components/ai-playground.tsx:133` (`active`, `telemetry`, `className`) | ✅ Props consistent; no `showTelemetry` prop used (telemetry renders iff array non-empty); `active`/`telemetry`/`className` all supported |
| Tokens / Tailwind map | `app/globals.css` (hex + `-rgb` companion vars) + `tailwind.config.js` (`rgb(var(--x-rgb) / <alpha-value>)`) | Task 5/7/8 components | ✅ All classes used resolve in built CSS: `text-muted-ink`, `bg-surface-dim`, `bg-signal-bg`, `text-signal-contrast`, and opacity variants `bg-danger/70`, `bg-ember/70`, `bg-ok/70`, `border-signal/60`, `bg-signal/20`, `bg-surface/95` → `rgb(var(--danger-rgb)/.7)` etc. |
| `services` data (Task 6) | `lib/data/services.ts` ids `composer-pro`, `composer-max5x`, `composer-max20x`, `llm-credit`, `n8n-hosting`, `hosting-basic`, `evolution-api`, `hosting-vip` | `components/pricing.tsx` (`getComposerService("composer-pro"/"composer-max5x"/"composer-max20x")` with throw guard) + `/services/[slug]` (`getServiceBySlug`) + `services-catalog.tsx` (`CARD_ORDER` keys `id--planname`) | ✅ All ids present; `CARD_ORDER` keys match derived `id--plan.name` format; `originalPrice` renders are guarded (`[slug]:216,295`, `service-plans.tsx:66`) |
| `.agents/product-marketing.md` (Task 5) | Task 5 Step 1 | Copy tasks T5/T6/T7 | ✅ Exists (6,974 bytes), GC12 satisfied |
| Redirects (Task 4) → `/composer` (Task 5) | `next.config.mjs` `redirects()` | `/composer` page | ✅ `/composer` exists (app/composer/page.tsx + layout.tsx); runtime 308s confirmed; `/schedule` correctly 404s |
| GC13 muted text | Tokens | All new components | ✅ No bare `text-muted`/`bg-muted` in new components (rg `-P "text-muted(?!-)"` → zero); all use `text-muted-ink` |
| GC4 fonts / no Bootstrap CDN | `app/layout.tsx` | All pages | ✅ Exactly Space Grotesk + JetBrains Mono; no Bootstrap Icons CDN; no Ubuntu/Dancing Script/Playfair/Poly |
| GC5 proof numbers | `components/trusted-brands.tsx` + `/composer` | Home + composer telemetry bands | ✅ `100+`, `10+`, `100B+`, `≈2.6M DZD` render (no `+50B`, no `60+`, no literal `TODO` anywhere) |

---

## Findings by Severity

### BLOCKER
None. `tsc`, `build`, and runtime routing all pass in the final state; no interface pair is broken.

### IMPORTANT

**I-1 — `app/api/chat/route.ts` retains the OLD reseller system prompt (rebrand-scope residue).**
- Interface/step: HawiyatBot API route — modified **during** the rebrand (commits `f547cca`, merged in `52f34ce`) but only the logo/prompt header was touched.
- What's wrong: The live `POST` system prompt still teaches the bot to sell the reseller identity: "2x Claude credits", "5x Claude capacity, no limits", "20x Claude capacity", "routing and caching gateway for AI coding tools", "Routes simple tasks to cheaper models automatically to cut AI costs", "Claude Code, Cursor, CLIs", "Hawiyat Composer v1.7".
- Why: Violates GC1 (never sell cheap Claude / execution layer), GC2 (models as routes not SKUs), GC8 (`Hawiyat AI Composer` naming + drop "and Claude Code"). It's inside a string literal, so tsc/build pass silently.
- How to fix: Task 9 Step 3's copy audit `rg -n "cheap|subscription|credit|2x|5x|20x Claude|Hawiyat Composer(?! AI)|and Claude Code"` **will catch this route** — rewrite the system prompt to execution-layer framing (task → plan → route → execute → evaluate), pricing via `lib/data/services.ts`, naming "Hawiyat AI Composer".

**I-2 — `pnpm lint` is red (16 errors); Task 9 Step 1 mandates a clean lint.**
- Interface/step: GC6 verification gate; Task 9 Step 1.
- What's wrong: `pnpm lint` exits 1. Files: `app/privacy/page.tsx` (2× `react/no-unescaped-entities`), `app/services/[slug]/page.tsx:314` (unescaped `'` in "What's Included"), `components/chatwoot-widget.tsx` (unused `Send`/`Minimize2`, 5× `no-explicit-any`), `components/services/order-form.tsx` (unused `CreditCard`, 2× `any`), `components/ui/input.tsx` (empty-object-type), `components/ui/use-toast.ts` (unused `actionTypes`).
- Why: All 16 errors exist identically at merge-base `5892b71` — pre-existing debt the branch inherited, but the plan's gate (GC6 / Task 9 Step 1) requires `pnpm lint` to pass before completion.
- How to fix: Task 9 must fix all 16 (escape apostrophes; drop unused imports; replace `any` with `unknown`/typed signatures). Note `[slug]` "What's Included" is a render-path string Task 6 touched — fix in Task 9.

**I-3 — Plain "Hawiyat Composer" (missing "AI") + legal-page optimizer framing.**
- Interface/step: GC8 rename across render paths.
- What's wrong: `rg -P "Hawiyat Composer(?! AI)"` hits: `app/about/page.tsx:225` ("Green Duty — AI delivered via Hawiyat Composer"), `app/terms/page.tsx:32,175,179` ("5. The Service: Hawiyat Composer", "AI optimization layer"), `app/terms/layout.tsx:6`, `app/privacy/page.tsx:68,123,155,276`, plus `app/api/chat/route.ts` (I-1).
- Why: GC8 says "Hawiyat Composer" → **"Hawiyat AI Composer"** everywhere; terms/privacy were touched in Task 1 (schedule removal) and Task 8 (token sweep) but the naming stayed legacy. Build-clean but copy debt.
- How to fix: Task 9 Step 3 audit pattern `Hawiyat Composer(?! AI)` catches these — rename all occurrences; reword `terms` §5 ("AI optimization layer") to execution-layer voice.

**I-4 — Reseller/cost-optimizer SEO keywords remain in `lib/data/services.ts` (hosting-basic).**
- Interface/step: Task 9 Step 6 item 6 keyword pruning (GC1 cost-optimizer ban).
- What's wrong: `lib/data/services.ts:305–320, 342, 344` still contain "Affordable web hosting", SEO keywords `"cheap hosting algeria"`, `"hebergement pas cher algerie"`, `"affordable hosting dz"`, and prose "cheap hosting" / "affordable". Also `app/terms/page.tsx:181` "faster, cheaper, and more effective".
- Why: Task 6 scoped its scrub to client-count claims (`60+`) — the cost-optimizer keywords for `hosting-basic` were not in Task 6's sweep, so they survive. Violates GC1 (cost only as final proof point) and DESIGN.md §Copy & Voice.
- How to fix: Task 9 Step 6 item 6 — drop `cheap/affordable/pas cher` keywords and prose from hosting-basic/hosting-vip `seo`+`seoContent`; keep honest `price` + `priceLabel`.

### MINOR

**M-1 — Cosmetic stale comment.** `app/globals.css:606` "/* Very slow spin for Hawiyat Composer logo */" + `.animate-very-slow-spin` — comment not rendered; verify the class has no consumers before removing (orphan CSS, no behavior impact).

**M-2 — Dark-mode / visual QA not machine-verifiable here.** `pricing.tsx` Enterprise card (`bg-signal-bg text-ink`), `ai-playground` console dots (`bg-danger/70` etc.), and `trusted-brands` partner-login light/dark image swap all compile, but contrast must be eyeballed. This is exactly Task 9 Step 5's design-audit checklist — no action beyond executing it.

**M-3 — `/composer` telemetry band renders only `100+` and `≈2.6M DZD`** (not `10+ resellers` / `100B+ tokens`). Consistent with plan Task 5 Step 6 (verified-only), and the home proof band carries all four. No fix needed — noted so Task 9's Step 4 proof audit doesn't "fix" it back.

---

## Task 9 Readiness Summary

Task 9 is **correctly positioned** as the QA gate and must still catch:
1. **I-1** `api/chat` reseller system prompt (Step 3 copy audit will flag — must rewrite, not skip).
2. **I-2** 16 lint errors (Step 1 requires `pnpm lint` pass — currently red).
3. **I-3** plain "Hawiyat Composer" naming + terms §5 optimizer framing (Step 3).
4. **I-4** cost-optimizer keywords in services data (Step 6 item 6).

No sequencing defect exists: T1 schema/dead-code → T2 tokens → T3 trace → T4 routes → T5 composer (+`.agents`) → T6 services → T7 home → T8 about/sweep all hold; T4→T5 contiguity closed the redirect window; `/composer` exists for the Task 4 redirects; no `/schedule`/deleted-route 404s; no parallel-build contention artifacts.
