# v2 Marketing Findings — Hawiyat AI-Infrastructure Rebrand (Tasks 1–8, HEAD bd98188)

**Validator:** Marketing (validation of implemented state)
**Date:** 2026-08-08
**Branch:** `rebrand/ai-infrastructure-identity`
**Scope:** positioning consistency, conversion flow, proof & claims (GC5), Algeria band, copy-review criteria, enterprise full-stack narrative.

---

## Verdict: PASS_WITH_CONDITIONS

The core marketing deliverables are implemented and coherent: home order, Execution Console, proof band (all four founder-verified stats with `≈`+`DZD`), Algeria band trust payload, de-resellerized services catalog, `/composer` architecture page, and the enterprise full-stack narrative all read as the execution layer. No `TODO` renders, no forbidden stats, no "cheap Claude" copy on any marketing page, and "Hawiyat AI Composer" naming is consistent across pages/metadata/JSON-LD/services data.

Two surfaces still carry the old reseller / cost-optimizer identity and must be fixed before launch: the **Terms of Service** page (live, in-nav) and the **HawiyatBot `/api/chat` system prompt** (orphaned but live route). Plus legal-page naming residue and hosting-SKU cost-opener SEO copy.

---

## BLOCKER

### B1 — `app/terms/page.tsx` §5 "The Service: Hawiyat Composer" still describes Composer as an LLM optimization layer
- **What's wrong:** Lines 175–209 define the core product as *"Hawiyat Composer is an AI optimization layer. It does not train, host, or operate the underlying AI models. Instead, it sits between you and Frontier Model providers, making your interactions with those models faster, cheaper, and more effective."* Section 5.2 details "Input Optimization … prompt engineering, context window management, token optimization" and §7.3 covers "Subscription Plans … monthly usage quota." This is the literal reseller/optimizer identity the rebrand exists to kill (GC1: never sell "cheap Claude" or "LLM optimization" — sell the execution layer; `product-marketing.md` §2: ❌ An LLM cost optimizer).
- **Why it matters:** It's a live, in-nav page a prospect can read. Any visitor who reaches it gets an internal contradiction: every marketing page says "execution layer," the legal contract says "AI optimization layer … faster, cheaper." It also encodes subscription/quota/API-key economics that don't match the DZD per-run layer being sold.
- **How to fix:** Rewrite §5.1/§5.2/§7.3 to execution-layer framing: Composer decides the best way to accomplish each task (task → plan → route → execute → evaluate), models are routes chosen by quality/latency/cost, runs carry your context, results are evaluated, billing is in DZD; rename to "Hawiyat AI Composer" and drop "optimization layer," "cheaper," "token optimization," and credit-quota mechanics.

---

## IMPORTANT

### I1 — `app/api/chat/route.ts` (HawiyatBot) system prompt re-sells the reseller product
- **What's wrong:** The whole bot persona is the pre-rebrand product: *"You are Hawiyat Composer v1.7 … routing and caching gateway for AI coding tools"*; plans presented as *"PRO … 2x Claude credits with Hawiyat Composer caching"*, *"MAX 5X … 5x Claude capacity"*, *"MAX 20X … 20x Claude capacity"*; marketing lines *"Cut AI Costs with Caching," "Simple tasks get routed to cheaper models automatically," "cost optimization on our own cloud in Algeria"*, plus Claude Code/Cursor tooling framing.
- **Why it matters:** Today it is orphaned — `rg "/api/chat"` finds no caller in `app/` or `components/` — so it is not user-reachable yet. But it is a live route, `GEMINI_API_KEY` is in `.env`, and `AGENTS.md` documents HawiyatBot/`api/chat` as part of the site; the moment it's wired to a chat widget it will answer visitors with the exact credit-multiplier / cost-optimizer identity the rebrand removed. It's also a live endpoint today if hit directly.
- **How to fix:** Rewrite the system prompt to the execution layer: models as routes, per-task cost in DZD, "AI Composer access" (no credits/SKUs), task→plan→route→execute→evaluate, no "cheap/cut AI costs" openers.

### I2 — Legal metadata + privacy pages: naming and reseller-era phrasing
- **What's wrong:** `app/terms/layout.tsx:6` description: *"Terms of Use for the Hawiyat Composer platform: API keys, subscription plans, monthly quotas…"* (plain "Hawiyat Composer" + subscription/quota framing in search metadata). `app/privacy/page.tsx:68,123,155,276` use "Hawiyat Composer API gateway." `app/terms/page.tsx:114,316,363` repeat "Subscription plans … monthly usage quota."
- **Why it matters:** GC8 renames "Hawiyat Composer" → "Hawiyat AI Composer" everywhere; these legal surfaces are indexable and contradict the per-run DZD layer narrative.
- **How to fix:** Rename to "Hawiyat AI Composer" and swap subscription/quota phrasing for execution-layer wording (run-based, DZD) in the terms/privacy metadata and prose.

### I3 — `lib/data/services.ts` hosting-basic (and hosting-vip) SEO still leads with "cheap/affordable/pas cher"
- **What's wrong:** `hosting-basic` seo description *"Affordable web hosting in Algeria…"*, keywords include `cheap hosting algeria`, `hebergement pas cher algerie`, `affordable hosting dz` (lines 305–315), and `seoContent.whatIs/whyChoose` prose says *"cheap hosting priced in dinars"* / *"most affordable web hosting in Algeria"* (lines 342, 344). `hosting-vip` whyChoose says *"costs a fraction of international premium hosts"* (line 751). These `seoContent` blocks render on the live `/services/hosting-basic` and `/services/hosting-vip` pages.
- **Why it matters:** Not on the AI layer (these are commodity hosting SKUs), so it doesn't poison the execution-layer narrative — but the Task 9 Step 6 copy-review checklist explicitly prunes cost-opener terms ("hebergement pas cher algerie" is named), and "cheap hosting" as the *opener* violates DESIGN.md §Copy & Voice ("Save money NEVER first").
- **How to fix:** Rewrite hosting SEO copy to lead with managed/local/SSL/reliability/DZD, with cost as the closing point; drop `cheap hosting algeria` / `hebergement pas cher algerie` / `affordable hosting dz` keywords.

---

## MINOR

### M1 — GC8 naming residue: "Hawiyat Composer" (missing "AI") in remaining spots
- `app/about/page.tsx:225` caption *"Green Duty AI delivered via Hawiyat Composer"*; `app/privacy/page.tsx` (4×); `app/globals.css:606` comment. Legal pages covered in I1/I2.
- **Fix:** global rename to "Hawiyat AI Composer" (or "Composer" shorthand where a UI label).

### M2 — Services buy-surface tag/category badges use purple/violet "AI wrapper" gradients
- `components/services/services-catalog.tsx:174–183` and `app/services/[slug]/page.tsx:162–167` tag badges: `from-violet-500 to-purple-600`, `from-purple-500 to-violet-600`, etc.; catalog category badges (line 92–96) use cyan/teal/violet palette colors rather than tokens. DESIGN.md explicitly rejects "default purple AI gradient (that reads wrapper/product)".
- **Fix:** fold into the Task 8/9 token sweep → signal/ember token colors. Brand-implication only; not a positioning error.

### M3 — About page "Trusted by" heading not aligned with the "partners/customers" label policy
- `app/about/page.tsx:237` still says "Trusted by" for Itihad/ESTIN/IT Solutions, while the home proof band correctly labels "Partners & early customers" (marketing M4). **Fix:** align the about heading.

### M4 — `app/layout.tsx` keywords contain plain "hawiyat composer" and "llm gateway dz"
- Model-token keywords (`gpt-4o`, `claude 4`, `deepseek`, etc.) are fine as route keywords, but "hawiyat composer"/"llm gateway" are plain-name. **Fix:** rename to "Hawiyat AI Composer" during the Task 9 keyword prune. No cost-optimizer terms remain in layout keywords (already clean).

---

## Review-question answers (scope items 1–6)

1. **Positioning consistency:** PASS on all marketing pages (home, `/composer`, `/services`, `/services/[slug]`, `/about`, footer). No "cheap AI"/"LLM optimization"/reseller copy found in `app/components/lib` marketing surfaces. FAIL on the terms page (B1) and the orphaned HawiyatBot prompt (I1). Naming: "Hawiyat AI Composer" confirmed on home eyebrow, `/composer` H1 + metadata, services names (`Hawiyat AI Composer Pro/MAX 5X/MAX 20X`), `AI Composer access` (renamed from LLM Credit, slug kept), pricing MAX card, footer.
2. **Conversion flow:** Home order matches plan (Hero→Pricing→Proof→Algeria→FAQ→CTA→Newsletter). Enterprise card has the prefilled WhatsApp CTA (`wa.me/213559555951?text=Hello%2C…full stack…`) + `mailto:contact@hawiyat.org` fallback + "Custom pricing" label + "Book with the team" feature. Pricing-before-proof is **acceptable for this audience**: price-sensitive DZD/WhatsApp operators want the number immediately, the three-card layout is low-ask, the proof band directly follows, and the hero itself shows an execution (not a claim). Enterprise buyers see a pricing ask before proof, but the WhatsApp/mailto CTA keeps friction near zero.
3. **Proof & claims (GC5):** PASS. Home proof band renders `100+ clients`, `10+ resellers`, `100B+ tokens served`, `≈2.6M DZD` ARR — `≈` + `DZD` attached to ARR, all four founder-verified (amended GC5). `/composer` telemetry band renders `100+` clients + `≈2.6M DZD` (per Task 5 Step 6). No literal `TODO` anywhere in `app/`/`components/`. No forbidden stats (`50B`, `60+`, `300 Templates`, "10 Resellers"). Sourcing line present: *"Verified figures from the Hawiyat operations dashboard. Nothing else gets printed."* Partner logos labeled "Partners & early customers" (accurate per M4).
4. **Algeria band:** PASS — full trust payload present: DZD billing + CCP/Baridi Mob, Algiers HQ / Itihad Campus, "Registered Algerian société" + "official invoices (facturation)", model-ownership disclaimer ("does not claim an official partnership… models are routes on the layer"), Itihad + Label Projet Innovant, AR·FR·EN support, CTAs → WhatsApp + `/services`, mono eyebrow `BUILT AND SUPPORTED IN ALGERIA`.
5. **Copy-review criteria:** PASS on `/composer` and `/services/[slug]` samples. Execution-layer voice throughout (route/run/evaluate/bill-in-DZD), models explicitly "routes, never locks" / "routes, not SKUs", no credit-multiplier framing in services data ("measured in runs and tasks, not model credits" appears only as a disambiguation), cost as final proof point on the AI layer. The only cost-opener copy left is on commodity hosting SKUs (I3).
6. **Enterprise full-stack narrative:** PASS. `/composer` has the "ONE CONTRACT — The whole stack. One contract." section (Composer + n8n + Evolution API + Platform with WhatsApp CTA); home Enterprise card carries the full-stack + prefilled WhatsApp CTA; `/services` H1/sub describe the stack "under one contract."

---

## Cross-checks run (evidence)

- `rg "LLM Credit|Claude Code|openai credits|10 USD|and Claude"` → only hits in `app/api/chat/route.ts` (I1). Services data clean.
- `rg "cheap|cheapest|pas cher|affordable"` → `lib/data/services.ts` hosting entries only (I3) + terms line 181 (B1) + chat route (I1).
- `rg "50B|60\+|300 Templates|10 Resellers"` → **zero** in app/components/lib.
- `rg "TODO"` in `app/` `components/` → **zero** (no literal TODO renders).
- `rg "Hawiyat Composer(?! AI)"` → terms/privacy/about/chat/globals.css comment only (B1/I1/I2/M1).
- `rg "2x Claude|5x Claude|20x Claude|model credits"` → chat route (I1) + "not in model credits" disclaimers in services data (clean).
- `rg "reduce ai costs|llm caching|vps pas cher|hebergement pas cher"` → only `hebergement pas cher algerie` in hosting-basic keywords (I3).
- Removed routes: `/schedule`, `/ai-algeria`, `/cyber-security`, `/guides`, `/bootcamp`, `/templates` absent from nav/footer/sitemap; `next.config.mjs` has `/hawiyat-composer`→`/composer` and `/ai-algeria`→`/` permanent redirects; `/dcma`→`/dmca` retained. Sitemap covers `/composer` + all 8 service slugs, no removed routes.
- No `bi-*` Bootstrap icons, no raw `bg-[#…]` in components, both fonts (Space Grotesk + JetBrains Mono) in layout, lucide only.
