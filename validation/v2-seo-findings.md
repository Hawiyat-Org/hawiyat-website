# v2 SEO / AEO-GEO Audit Findings

Audit target: rebrand HEAD `bd98188` (execution-layer positioning).
Auditor: SEO + AI-search (AEO/GEO) pass against `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md` + task scope.

## Verdict: FAIL

Two scoped checks fail outright (scope §5 `llms.txt` currency; scope §6 old-positioning leak in metadata/JSON-LD), plus a live AI-facing endpoint still speaks the old "coding-tool gateway / cost-cutter" language. Core SEO plumbing (sitemap, redirects, canonical, structured data) is correct.

---

## BLOCKER

### B1 — `public/llms.txt` is stale and still speaks the old positioning (scope §5 fails)
- **File:** `public/llms.txt`
- **What's wrong:** Last touched at commit `7465432` (pre-rebrand). It describes Hawiyat as *"AI infrastructure, subscriptions, automation, hosting…"*, names Composer as *"Gateway, caching, and routing for compatible coding tools and supported AI providers"*, lists a *"Claude Code guides"* page, and links five dead/removed routes: `/ai-algeria`, `/hawiyat-composer`, `/guides/claude`, `/cyber-security` (all now 404 — `/ai-algeria` and `/hawiyat-composer` only redirect). The task description states llms.txt was edited during the rebrand — it was not.
- **Why:** `llms.txt` is the primary agent-readable surface for LLM/AI crawlers. Any AI assistant ingesting it today learns the reseller/gateway identity the rebrand deleted, and receives URLs that 404 after redirect resolution — poisoning both brand truth and citability.
- **Fix:** Rewrite `public/llms.txt` to execution-layer framing with **live routes only** (`/`, `/composer`, `/services`, `/services/[slug]`, `/about`, `/privacy`, `/terms`, `/dmca`). Keep the DZD / Algeria / Arabic-French-English facts + contact block (they are good GEO signals). Drop "subscriptions", "gateway", "Claude Code", and all removed paths.

---

## IMPORTANT

### I1 — Old "AI Provider in Algeria" entity aliasing survived in `app/layout.tsx` (scope §6 fails)
- **File:** `app/layout.tsx` — `keywords` (lines 43–44), `organizationSchema.alternateName` (lines 138–148), `organizationSchema.keywords` (lines 151–159)
- **What's wrong:** `"Algeria's AI Provider"`, `"Algeria AI Provider"`, `"AI provider in Algeria"`, `"AI in Algeria"`, `"B2B AI Algeria"`, `"AI provider algeria"`, `"fournisseur IA algerie"` survive in the page `<meta name="keywords">` AND in the Organization JSON-LD `alternateName`/`keywords`.
- **Why:** The audit scope explicitly lists *"AI Provider in Algeria"* as an old-positioning term that should be gone. These are the exact "AI provider / AI agency" identity signals AGENTS.md and the plan say Hawiyat is **not**. They appear in machine-readable schema, so they feed the entity graph AI engines and Google build for the brand.
- **Fix:** Remove the Provider/agency-framed aliases from `keywords` and from `organizationSchema.alternateName`/`keywords`. If geographic-entity anchors are still wanted for GEO, keep only neutral ones (e.g. `"Hawiyat"`, `"AI infrastructure in Algeria"`, `"AI execution layer Algeria"` — never "provider").

### I2 — Live AI endpoint `app/api/chat/route.ts` still primes Gemini with the old reseller/gateway copy
- **File:** `app/api/chat/route.ts` (system prompt, lines ~20–56)
- **What's wrong:** The HawiyatBot system prompt describes *"Hawiyat Composer — Hawiyat's routing and caching gateway for AI coding tools"*, with example answers about *"Claude Code, Cursor, CLIs"*, *"Routes simple tasks to cheaper models automatically to cut AI costs"*, *"Same Endpoints, Way Less Waste"*.
- **Why:** Not in the strict metadata/JSON-LD/services scope, but it is a public, AI-facing surface: whatever this assistant says about Hawiyat is the brand as heard through an AI. It is the last reseller voice on the site and contradicts the execution-layer identity.
- **Fix:** Rewrite the system prompt to execution-layer facts: Composer decides the best way to accomplish each task (UNDERSTAND→PLAN→ROUTE→EXECUTE→EVALUATE→RESULT), models are routes not SKUs, context from WhatsApp/CRM/ERP/email/databases, every run evaluated and costed in DZD.

---

## MINOR

### M1 — "cheap / pas cher / hebergement" cost-optimizer language in hosting service metadata
- **File:** `lib/data/services.ts` — `hosting-basic` keywords (lines 308, 310–311, 314: `"cheap hosting algeria"`, `"hebergement web algerie"`, `"hebergement pas cher algerie"`, `"hebergement site web algerie"`), `hosting-basic.seoContent.whatIs` (line 342: *"who want cheap hosting"*), `hosting-vip` keywords (lines 717, 720: `"hebergement premium algerie"`, `"hebergement professionnel algerie"`), `hosting-vip.seoContent.whyChoose` (line 751: *"something cheap hosting plans skip"*).
- **Why:** Plan copy rule (§6, voice item 2) forbids "cheap/affordable/save money" as an opener — cost is a final proof point. "Pas cher" keywords also drag the brand toward budget-hosting, diluting the premium execution-layer positioning. Hosting is a legitimate catalog category, so the terms are not blockers — just tone drift.
- **Fix:** Swap `cheap` → `affordable`/`budget-friendly` in copy; consider trimming `hebergement pas cher algerie` from keywords; keep `cheap hosting algeria` only if explicitly targeting that SERP.

### M2 — Removed routes without redirects will 404 for previously indexed URLs
- **Files:** `next.config.mjs` redirects block; removed `app/` routes
- **What's wrong:** The three required redirects exist and are correct: `/hawiyat-composer`→`/composer`, `/ai-algeria`→`/`, `/dcma`→`/dmca` (page-level `permanentRedirect`, 308). But `/cyber-security`, `/guides` (and `/guides/*`), `/schedule`, `/bootcamp`, `/templates` now 404 with no redirect.
- **Why:** If any of those URLs were previously indexed, search engines and AI crawlers hit 404s. Out of scope for the three mandated redirects, but cheap to protect.
- **Fix:** Add legacy 308 redirects, e.g. `/cyber-security`→`/services`, `/guides/*`→`/composer` (or `/services`), `/schedule`→`/`, `/templates`→`/`, `/bootcamp`→`/` — or confirm none were ever indexed.

### M3 — FAQ content is on-page but not marked up as FAQPage (scope §4, "where applicable")
- **File:** `app/services/[slug]/page.tsx` renders `service.faq` (lines 258–262) as plain HTML; `app/services/layout.tsx` ItemList is correct.
- **Why:** The `faq` arrays are solid long-tail/AI-answer content but invisible to rich-result and answer engines. Adding per-service FAQPage JSON-LD (same Q/A) would capture AI Overviews/answer blocks.
- **Fix:** Inject a `FAQPage` block next to the existing `Service`+`BreadcrumbList` script on detail pages. Optional enhancement — no leak.

### M4 — `app/terms/layout.tsx` description retains legacy subscription phrasing
- **File:** `app/terms/layout.tsx` (metadata description: *"…API keys, subscription plans, monthly quotas…"*)
- **Why:** Terms is a legal page (low crawl weight), but the visible meta description still describes an LLM-subscription product model that no longer exists.
- **Fix:** Reword to the layer model: *"API keys, DZD per-task billing, acceptable use, security, liability…"*.

---

## PASS (verified)

- **Sitemap** (`app/sitemap.ts`): only live routes — `/`, `/composer`, `/services`, `/about`, `/privacy`, `/terms`, `/dmca` + all 8 service slugs. `/composer` and `/services` at priority 0.9. No removed routes.
- **Redirects:** `/hawiyat-composer`→`/composer` (308), `/ai-algeria`→`/` (308), `/dcma`→`/dmca` (page-level `permanentRedirect`). Canonical on every page via `createMetadata`/layout; root canonical `/`.
- **Root metadata** (`app/layout.tsx`): title/description/OG/Twitter are execution-layer; keywords list is clean of `vps / hebergement / pas cher / reduce ai costs / llm caching`. (Only the "AI Provider" aliases in I1 are dirty.)
- **Structured data:** `/services` ItemList names exactly match the plan target (`Hawiyat AI Composer`, `AI Composer access`, `n8n Hosting`, `Evolution API`, `Application Hosting`). Detail pages emit `Service` + `BreadcrumbList` + `OfferCatalog`/`Offer` in DZD. Home emits `WebSite` + `Organization` (split correctly; `contactPoint`/`sameAs`/`foundingLocation` on Organization).
- **AEO content:** every service has self-contained `whatIs/whyChoose/howItWorks` blocks rendered on the detail page — answer-shaped, execution-layer (composer entries fully de-resellerized: "models are routes, not SKUs", no OpenAI-credit/reseller framing). FAQ rendered as HTML.
- **`public/ai.txt`** exists (agent-friendly robots + sitemap pointer) — fine as a supplementary surface once `llms.txt` is fixed.

## Priority order to close FAIL → PASS
1. Rewrite `public/llms.txt` (B1).
2. Purge "AI Provider" aliases from `app/layout.tsx` keywords + Organization schema (I1).
3. Rewrite `app/api/chat/route.ts` system prompt (I2).
4. Minor sweep: M1–M4.
