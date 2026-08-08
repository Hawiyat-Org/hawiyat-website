# Hawiyat Rebrand — QA/Runtime Verification Findings (v2)

**Repo:** /home/aim/Projects/Hawiyat/hawiyat-website
**Branch/HEAD:** `rebrand/ai-infrastructure-identity` @ `bd98188` (clean tree at time of writing)
**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md` (GC5 amended for proof stats)
**QA method:** No formal suite exists (AGENTS.md) — verified via type/build gates, HTTP runtime smoke against the running production build (`next start -p 3999`), static `.next/server/app` output inspection, Docker Postgres schema sync, and source-level inspection of client-interactive features.
**Date:** 2026-08-08

---

## Verdict: PASS_WITH_CONDITIONS

All automated gates pass. Conditions: browser-level interaction QA (OrderForm, MAX toggle, mobile menu, dark mode, GSAP reveal, WhatsApp widget) and dev-mode smoke were NOT executed in this session (no browser E2E harness; a production `next start` server occupies `.next`, so `pnpm dev` was not started to avoid clobbering it). See the manual QA checklist below — it must be run before deploy.

---

## 1. Build / Type Gate — PASS

| Check | Result | Evidence |
|---|---|---|
| `npx tsc --noEmit` | PASS (exit 0) | Ran twice on stable tree (once after fresh build), `TSC_EXIT=0` both times, zero errors |
| `pnpm build` (prisma generate && next build) | PASS (exit 0) | `BUILD_EXIT=0`; "✓ Compiling", "✓ Generating static pages (25/25)"; 25 static pages |
| Route manifest | Correct | `○ /`, `○ /composer`, `○ /about`, `ƒ /services`, `● /services/[slug]` with **8 SSG paths** (n8n-hosting, composer-pro, hosting-basic, evolution-api, composer-max5x, composer-max20x, hosting-vip, llm-credit), `○ /terms`, `○ /privacy`, `○ /dmca`, `○ /dcma`, API: chat/orders/subscribe/waitlist. **No** /hawiyat-composer, /ai-algeria, /cyber-security, /guides, /schedule, /templates, /bootcamp |

**Note (not a defect):** the FIRST tsc run failed with TS6053 "file not found" for `.next/types/...` files — the running `next start` server was concurrently rewriting `.next/types`. On stable state tsc passes. Reliable gate order: `pnpm build` first (regenerates `.next/types`), then `npx tsc --noEmit`.

## 2. Runtime Smoke — PASS

Ran against the already-running production server (`next start -p 3999`, serving HEAD build). Re-verified post-rebuild (200s still returned after my fresh `pnpm build`).

| Route | Status |
|---|---|
| `/` | 200 |
| `/composer` | 200 |
| `/services` | 200 |
| `/services/composer-pro` | 200 |
| `/services/llm-credit`, `/services/composer-max20x`, `/services/n8n-hosting` | 200 |
| `/about` | 200 |
| `/hawiyat-composer` | **308** → `http://localhost:3999/composer` |
| `/ai-algeria` | **308** → `http://localhost:3999/` |
| `/cyber-security`, `/guides`, `/schedule`, `/templates`, `/bootcamp` | 404 (correct absence) |

**Condition:** `pnpm dev` was not started (scope asked "if possible"). A production `next start` was already running on :3999 and shares `.next`; starting `next dev` would clobber it. The production build is the stronger runtime signal, but dev-mode hot-reload and client hydration must be spot-checked manually (checklist item A).

## 3. Static Output (`/.next/server/app`) — PASS

| Check | Result | Evidence |
|---|---|---|
| Proof stats on home `index.html` | All 4 render | `100+` + `clients`, `10+` + `resellers`, `100B+` + `tokens served`, `≈2.6M DZD` + `annual recurring revenue` (stat + mono label pairs in static HTML) |
| Proof stats on `/composer` | 2 verified stats render | `100+` + `clients on the execution layer`, `≈2.6M DZD` + `annual recurring revenue` |
| No literal `TODO` renders | PASS | `rg -l 'TODO'` across **all 8 static HTML files**: zero; source-level `rg 'TODO' app components lib`: zero |
| Forbidden stats absent | PASS | No `+50B`, no `300 Templates`, no `60+ clients` anywhere in static HTML or source. (The three `60` tokens in `index.html` are `bg-white/60`, `opacity-60`, `width="60"` — benign.) |
| Enterprise WhatsApp prefilled link | PASS | Exact spec URL present: `https://wa.me/213559555951?text=Hello%2C%20we%20need%20the%20full%20stack%20%E2%80%94%20Composer%20%2B%20n8n%20%2B%20Evolution%20%2B%20Platform` |
| MAX 5X/20X toggle static data | PASS | `MAX 5X` / `MAX 20X` labels and `5X base` / `20X base execution capacity` unit framing present (source: `components/pricing.tsx` maxTiers) |
| Sitemap / robots | PASS | `sitemap.xml.body`: 8 service slugs + `/composer` + legal; **no** removed routes. `robots.ts`: `disallow /api/, /admin/, /_next/`, sitemap + host set |

## 4. Docker DB — PASS

- Container `hawiyat-pg` (postgres:16-alpine) **Up**.
- `DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hawiyat_db" pnpm db:push` → **exit 0**, "Your database is now in sync with your Prisma schema. Done in 170ms".
- Seed: `npx tsx ./lib/prisma/seed.ts` → "Seed complete (no data required)" (no-op as planned).
- Schema models: `Order`, `EmailSubscription`, `Waitlist`, `BootcampRegistration`. **No** Booking/BusinessHours/BlockedDate/VerificationCode (schedule removal confirmed at schema level).

## 5. Source-Level Feature Verification (static evidence; browser behavior still needs manual QA)

- `components/pricing.tsx`: 3 cards (Pro / switchable MAX / Enterprise). MAX toggle uses `aria-pressed`; `getComposerService` throws on unknown id (all 3 ids exist in data). OrderForm (`components/services/order-form.tsx` exists) opens with Pro → `composer-pro`, MAX → active tier service. Enterprise card: "Custom pricing" label, prefilled WhatsApp CTA + `mailto:contact@hawiyat.org` fallback.
- `lib/data/services.ts`: no `60+`, `50B`, `300`, `Claude Code`, `LLM Credit`, `openai credits`, `10 USD`; no `originalPrice`/`launchNote` **values** (only optional type fields remain; render sites guard with `&&`). Entries renamed correctly: "Hawiyat AI Composer Pro" (6,000 DA/mo), "MAX 5X" (15,000 DA/mo), "MAX 20X" (30,000 DA/mo), `llm-credit` → **"AI Composer access"** (pay-per-run, rewritten).
- `app/services/layout.tsx`: metadata execution framing; JSON-LD ItemList = `Hawiyat AI Composer`, `AI Composer access`, `n8n Hosting`, `Evolution API`, `Application Hosting` (no Claude Code / LLM Credit).
- `components/faq.tsx`: exactly 5 execution-layer questions; accordion with `aria-expanded`/`aria-controls`.
- `components/header.tsx`: nav Composer|Services|About + CTA; mobile menu (hamburger/X, Escape closes, links close menu); dark-mode toggle (Sun/Moon) desktop + mobile.
- `components/footer.tsx`: The Layer/Company/Legal with WhatsApp + GitHub + lucide icons; no removed routes.
- `components/execution-trace.tsx` + `components/scroll-animations.tsx`: trace-line draw-on-scroll gated by `prefers-reduced-motion` (trace static when reduced). See MINOR-3 re: reveal-up under reduced motion.
- `components/ai-playground.tsx`: Execution Console embeds `<ExecutionTrace active telemetry>`; hero uses it.

---

## Findings by Severity

### BLOCKER
None.

### IMPORTANT

1. **I-1 — Browser interaction QA not executed.** Automated evidence covers HTTP, static HTML, and source wiring only. The OrderForm modal (open + submit → `/api/orders`), MAX 5X/20X toggle behavior, mobile menu behavior, dark-mode persistence (next-themes), GSAP reveal/3D dashboard, WhatsApp widget, Chatwoot widget, and `prefers-reduced-motion` behavior are client-side and unverified in a real browser. **Fix:** run the manual QA checklist below before any deploy; if a browser harness is available (`browser-testing-with-devtools`), run it against `pnpm dev` and `pnpm build && pnpm start`.
2. **I-2 — Dev-mode smoke not run.** `pnpm dev` was not started (port/`.next` conflict with the running `next start -p 3999`). Dev-mode compile, HMR, and hydration of client components need a spot check. **Fix:** stop :3999, run `pnpm dev`, curl the same route set (I, §2) + visually load `/`.
3. **I-3 — Workspace concurrency hazard (environment, not code).** During QA the working tree was being modified by parallel validators (untracked `validation/v2-*.md` appeared mid-run) and there is a **stale main-branch worktree at `/tmp/opencode/hawiyat-main`** containing the OLD site (incl. `app/ai-algeria`, `app/hawiyat-composer`, `app/guides`, `components/services-teaser.tsx`, `components/pricing.tsx` with "Claude Code" copy). Shell commands issued from the wrong cwd will grep/build the OLD tree and produce false findings. **Fix:** always pin `workdir`/cwd to `/home/aim/Projects/Hawiyat/hawiyat-website`; re-confirm `git rev-parse --short HEAD == bd98188` before any further verdict; optionally `git worktree remove /tmp/opencode/hawiyat-main` to eliminate confusion.

### MINOR

1. **M-1 — Build warnings (non-blocking).** `pnpm build` warns: caniuse-lite/browserslist data ~9 months old ("run `npx update-browserslist-db@latest`") and `package.json#prisma` config deprecation (Prisma 7 wants `prisma.config.ts`). **Fix:** refresh `browserslist`/`caniuse-lite`; migrate Prisma config when convenient.
2. **M-2 — Header/legacy palette drift.** `components/header.tsx` still uses legacy Tailwind palette (`bg-white/60`, `text-gray-600`, `bg-black`/`bg-white` CTA) rather than the token set (paper/ink/surface…). It works and is not raw hex (so GC3 letter is satisfied), but it visually drifts from the token system and from the tokenized home components. **Fix:** migrate header classes to tokens in a follow-up sweep (matches plan's token-convention goal).
3. **M-3 — Reduced-motion covers trace-line only.** `scroll-animations.tsx` gates the trace-line draw on `prefers-reduced-motion`, but `gsap.set(".reveal-up", {opacity:0, y:"100%"})` runs unconditionally on mount and the reveal-up timeline still animates under reduced motion. If a scroll trigger ever fails to fire, `.reveal-up` content stays invisible (also affects the `reveal-up` elements in non-animated contexts). **Fix:** gate the reveal-up set+timeline on reduced motion too (set elements visible when reduced), and manually verify no section is left opacity:0 at load/scroll in a browser.
4. **M-4 — Mobile menu toggle lacks `aria-expanded`.** Escape-to-close and close-on-navigate work; the hamburger button has `aria-label` but no `aria-expanded` state for AT. **Fix:** add `aria-expanded={isMobileMenuOpen}` to the mobile menu button.
5. **M-5 — tsc gate ordering gotcha.** `npx tsc --noEmit` on a tree with a stale/in-flight `.next` fails with TS6053 on `.next/types/**` (seen once during a concurrent `next start` rewrite). This is an environment artifact, but the reliable gate order is `pnpm build` → `npx tsc --noEmit`. **Fix:** document the order in AGENTS.md verification instructions.

---

## Recommended Manual QA Checklist (no automated suite — run before deploy)

Environment: `pnpm dev` (after stopping `next start -p 3999`). Browser: Chrome + DevTools console open; test viewport widths ~360px, 768px, 1280px; light + dark mode; `prefers-reduced-motion: reduce` via DevTools.

### A. Global / Cross-Page
- [ ] `pnpm dev` boots without compile errors; console has no React hydration warnings on `/`.
- [ ] Header nav (Composer / Services / About) works on every page; logo returns home.
- [ ] Header "Start Building" → `/composer`.
- [ ] Mobile (<768px): hamburger opens menu, links navigate and close it, Escape closes, X icon shows.
- [ ] Dark-mode toggle persists across page navigation (localStorage via next-themes) and no flash-of-wrong-theme on reload.
- [ ] Footer: all links resolve (incl. WhatsApp `wa.me/213559555951`, GitHub, Terms/Privacy/DMCA); no 404s.
- [ ] `/hawiyat-composer` → redirect to `/composer` (no 404 flash); `/ai-algeria` → `/`.
- [ ] 404 page for `/cyber-security`, `/schedule`, `/templates` (styled, not raw).
- [ ] `curl` the API routes for statuses: `/api/orders` (POST path), `/api/subscribe`, `/api/waitlist`, `/api/chat` (env `GEMINI_API_KEY` set → returns 200/valid; unset → graceful error, no 500 crash).

### B. Home `/`
- [ ] Hero renders H1 "The layer that decides how your business uses AI.", Execution Console mock with moving spark + mono telemetry; console works without errors.
- [ ] Proof band: exactly the 4 verified stats (`100+ clients`, `10+ resellers`, `100B+ tokens served`, `≈2.6M DZD ARR`); no "60+"/"300 Templates"/"+50B" anywhere; `≈` and `DZD` attached to ARR.
- [ ] Algeria band: DZD billing, Algiers HQ, registered société, invoicing, model-ownership disclaimer, Itihad/Projet Innovant, AR/FR/EN support claims present and accurate.
- [ ] Pricing: 3 cards. Pro price 6,000 DA/mo. MAX card: toggle 5X ↔ 20X switches price (15,000 ↔ 30,000 DA/mo), features, and capacity line; active toggle has visible signal styling.
- [ ] Pricing CTAs: "Get started" on Pro opens OrderForm pre-filled with **Hawiyat AI Composer Pro**; on MAX opens with the **active tier** (switch to 20X, then open — must be MAX 20X); close works; submit hits `/api/orders` and shows success/error.
- [ ] Enterprise card: "Custom pricing" badge; "Book with the team" opens WhatsApp with the prefilled full-stack message; "Email us instead" opens mailto.
- [ ] FAQ: 5 questions, accordion open/close, first item open by default; answers are execution-layer copy (no reseller/credit framing).
- [ ] CTA section + newsletter subscribe (test invalid email error + valid success).
- [ ] WhatsApp widget (bottom-right) opens Chatwoot/WhatsApp link; present on scroll.
- [ ] Reduced motion: with `prefers-reduced-motion: reduce`, the trace-line is static and **no content is left invisible** (reveal-up elements all visible).

### C. `/composer`
- [ ] Sections load: hero (H1 "Hawiyat AI Composer"), EXECUTION LOOP trace (6 stages + telemetry), ANY MODEL · ANY SYSTEM (model chips + systems cards), ENGINE capabilities (6 cards), TELEMETRY band (`100+ clients`, `≈2.6M DZD ARR` only), enterprise full-stack + WhatsApp CTA, Why-not-DIY strip, CTA → `/services`.
- [ ] All CTAs resolve (no dead links); anchor "See how it executes" scrolls to trace.

### D. Services
- [ ] `/services`: H1 execution framing; catalog ordered engine-first (Composer Pro → MAX 5X → MAX 20X → AI Composer access → n8n → …); category badges AI Execution / Managed Systems / Cloud Runtime; **no** strikethrough/original prices, **no** launch-discount strings; search/filter works.
- [ ] `/services/composer-pro`, `/composer-max5x`, `/composer-max20x`, `/llm-credit`, `/n8n-hosting`, `/evolution-api`, `/hosting-basic`, `/hosting-vip`: each 200, renders name/price/features/FAQs; OrderForm on detail page opens with the right service/plan; no "Claude Code"/"LLM Credit"/credit-multiplier copy.
- [ ] JSON-LD on `/services`: ItemList names are execution naming (Hawiyat AI Composer, AI Composer access, n8n Hosting, Evolution API, Application Hosting).
- [ ] A bogus slug (`/services/does-not-exist`) → 404 (styled) — verify `getServiceBySlug` guard (commit 9939d60 added lookup guard).

### E. `/about` + legal
- [ ] `/about`: restyled to tokens/lucide, no `bi-*` icons, no raw hex backgrounds, copy is execution-layer voice.
- [ ] `/terms`, `/privacy`, `/dmca`, `/dcma`(→/dmca) render, no schedule-system references.

### F. SEO/identity spot checks
- [ ] View-source: `<title>`/`<meta description>` on `/`, `/composer`, `/services` carry execution-layer framing; no "Claude Code"/"LLM Credit" in metadata; no legacy font imports or Bootstrap Icons `<link>` in layout; exactly 2 font families (Space Grotesk + JetBrains Mono).
- [ ] `sitemap.xml` (and `robots.txt`) contain `/composer` and all 8 service slugs; no removed routes.

---

## Automation Gaps (no suite today)

Recommended future additions (in priority order):
1. **HTTP route smoke test** (scriptable now): assert 200s + the two 308 redirects + 404s — zero new deps, curl-only, catches route regressions.
2. **Static content assertions** (scriptable now): grep `.next/server/app/*.html` for the 4 proof stats, absence of `TODO`/`+50B`/`60+`/`300 Templates` — catches GC5 regressions.
3. **Component tests** for `pricing.tsx` toggle (MAX 5X↔20X switches service/price) and `OrderForm` prop wiring (React Testing Library + Vitest) — the highest-value client logic.
4. **E2E** (Playwright) for the top user flows: home → pricing → OrderForm submit; services → detail → order; mobile menu; dark-mode persistence.
