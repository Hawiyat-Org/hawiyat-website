# V2 Completeness & Consistency Findings — Rebrand Implementation vs Spec

**Validator:** Completeness & Consistency specialist
**Date:** 2026-08-08
**HEAD audited:** `bd98188` (branch `rebrand/ai-infrastructure-identity`, working tree clean)
**Spec:** `docs/superpowers/specs/2026-08-08-ai-infrastructure-rebrand-design.md` (Approach A)
**Plan:** `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md` (GC5 binding — AMENDED: `+100 Clients`, `+10 Resellers`, `+100B Tokens Served` verified and MUST render)

## Verdict: PASS_WITH_CONDITIONS

Every **rendered** spec surface (§2–§8) is implemented and verified: `npx tsc --noEmit` clean, `pnpm build` succeeds, and the rendered route map is exactly the target IA. The rebrand cannot be called *complete* until one BLOCKER and the IMPORTANT items below are cleared — all are shipped but **non-rendered** surfaces (orphaned API route, AI-facing `llms.txt`, legal copy, copy-context doc).

---

## Verification performed (evidence)

| Gate | Result |
|---|---|
| `npx tsc --noEmit` | PASS (no errors) |
| `pnpm build` | PASS (routes: `/ /composer /services /services/[slug] /about /terms /privacy /dmca /dcma + /api/{chat,orders,subscribe,waitlist}`) |
| Removed routes | `app/schedule`, `app/api/schedule`, `app/cyber-security`, `app/guides`, `app/ai-algeria`, `app/hawiyat-composer` all deleted (dirs absent) |
| Deleted dead code | `styles/`, `test/`, `lib/helper.ts`, `lib/date-utils.ts`, `components/schedule/`, all 6 dispositioned home components, `our-numbers`, `ai-playground-dashboard`, `bootcamp-effects`, `registration-modal`, `floating-elements`, `services-teaser`, `testimonials`, `video-modal` — all absent |
| Raw-hex / `bi-*` / `font-serif` / Bootstrap | `rg "bi-|bg-[#|dark:bg-[#|font-serif|font-thin|Bootstrap" components app` → **zero** |
| Forbidden proof strings | `rg "50B|60\+|300 Templates|TODO" app components lib/data` → **zero** |
| Redirects | `/hawiyat-composer`→308 `/composer`, `/ai-algeria`→308 `/` in `next.config.mjs`; `/dcma`→`/dmca` `permanentRedirect` ✓ |
| Nav/footer/sitemap refs to removed routes | `components/header.tsx`, `footer.tsx`, `app/sitemap.ts` → **zero** |

---

## Spec → File Coverage Map

| Spec section | Requirement | Implemented state | Status |
|---|---|---|---|
| §2 IA | Target pages `/` `/composer` `/services(+slug)` `/about` `/terms` `/privacy` `/dmca` | All exist, all build | ✅ |
| §2 `/hawiyat-composer` | Perm redirect → `/composer` | `next.config.mjs:21` | ✅ |
| §2 `/cyber-security` | Delete; story folds into Composer Guardrails | Deleted; Guardrails & Evaluations on `/composer` (page.tsx:87-90) | ✅ |
| §2 `/guides` + `/guides/claude/*` | Delete | Deleted; sitemap `SECTIONS` import removed | ✅ |
| §2 `/ai-algeria` | Delete → content becomes home band | Deleted + redirect `/`; `components/algeria-band.tsx` carries full trust payload | ✅ |
| §2 `/schedule` | Delete page + API + Prisma models + components | All deleted; `Booking/BusinessHours/BlockedDate/VerificationCode` out of `schema.prisma`; Enterprise booking → WhatsApp feature | ✅ |
| §2 `/templates` `/bootcamp` | No links in nav/footer/sitemap | None | ✅ |
| §2 `/dcma` | Keep (redirect `/dmca`) | `app/dcma` permanentRedirect ✓ | ✅ |
| §3 Header | Composer·Services·About + `Start Building`→`/composer` + theme toggle | `components/header.tsx` ✓ | ✅ |
| §3 Footer | The Layer / Company / Legal; no dead links; lucide socials | `components/footer.tsx` ✓ | ✅ |
| §3 Widgets | Keep WhatsApp + Chatwoot; remove wiring for unused | WhatsApp on `/` ✓; Chatwoot component exists but is not mounted anywhere (pre-existing) | ⚠️ MINOR |
| §4.1 Hero | Exact H1, mono eyebrow, sub, CTAs, Execution Console | `hero-section.tsx` + `ai-playground.tsx` (Execution Console, Pablo removed, task packet, spark, telemetry) | ✅ |
| §4.2 Pricing | 3 cards: Pro / MAX switchable / Enterprise (custom pricing, WhatsApp prefilled, mailto fallback) | `components/pricing.tsx` ✓ | ✅ |
| §4.3 Proof band | Verified stats only; partners labeled accurately; no `+50B`/`+60`/`300` | `trusted-brands.tsx` renders `100+` `10+` `100B+` `≈2.6M DZD` (all GC5-verified post-amendment), label "Partners & early customers" | ✅ |
| §4.4 Algeria band | DZD, Algiers HQ, registered société, facturation, model-ownership disclaimer, Itihad + Label Projet Innovant, AR/FR/EN | `algeria-band.tsx` ✓ (incl. §disclaimer) | ✅ |
| §4.5 FAQ | 5 questions incl. north-star line | `components/faq.tsx` ✓ | ✅ |
| §4.6 CTA | "Your first task, executed in 5 minutes." | `call-to-action.tsx` headline ✓; primary CTA → `/services` (spec says → `/composer`; secondary → `/composer`) | ⚠️ MINOR |
| §5 `/composer` | H1/sub, execution loop (large trace), Any Model·Any System, 6 capabilities, telemetry (verified only), enterprise full-stack, Why-not-DIY, CTA→`/services` | `app/composer/page.tsx` — all 8 sections present, telemetry renders only `100+` + `≈2.6M DZD` | ✅ |
| §6 `/services` | Renames, categories, ordering, no strikethrough, Why-Choose strip, H1 + metadata + JSON-LD execution naming | `lib/data/services.ts` (Pro/MAX5X/MAX20X/llm-credit→"AI Composer access", `AI Execution`/`Managed Systems`/`Cloud Runtime`), `services-catalog.tsx` (CARD_ORDER engine-first, guarded `originalPrice`), `services/layout.tsx` metadata + ItemList use "Hawiyat AI Composer"/"AI Composer access"/"n8n Hosting"/"Evolution API"/"Application Hosting" | ✅ |
| §7 `/about` | Restyle: no `bi-*`, no raw hex, no purple, no `font-serif`; execution copy | `app/about/page.tsx` (lucide, tokens, no `bg-[#…]`) | ✅ |
| §8.1 globals.css | Token set light+dark, collision handling | `:root`/`.dark` tokens installed; shadcn `--border`/`--muted` renamed `--border-shadcn`/`--muted-shadcn`; hex `--border` drives borders via `@layer base` `border-border` | ✅ |
| §8.2 tailwind | Token map, `poly` removed, `--font-mono` added | `tailwind.config.js` (rgb-channel variants; `muted-ink` distinct key; shadcn `muted` object preserved) | ✅ |
| §8.3 layout | JetBrains Mono, no Bootstrap CDN/legacy fonts, SITE_URL, execution metadata, keywords pruned | `app/layout.tsx` ✓ (no `reduce ai costs`/`llm caching`/`vps pas cher`/`hebergement pas cher` in keywords) | ✅ |
| §8.4/8.5 sweeps | `bi-*`→lucide; raw hex→tokens | Zero hits (gray-`*` scales remain in header/footer — MINOR token-conformance) | ⚠️ MINOR |
| §8.6 Signature | ExecutionTrace + trace-line reveal, reduced-motion, keep dashboard 3D | `execution-trace.tsx` (exact spec: no `showTelemetry`, `text-muted-ink`), `scroll-animations.tsx` (reveal-up + `.trace-line` + `#dashboard`) | ✅ |
| §8.7/8.8 Prisma | Reconcile schema, restore Waitlist, minimal seed, remove orphan APIs | `schema.prisma` (Order/EmailSubscription/Waitlist/BootcampRegistration), `lib/prisma/seed.ts` no-op, `/api/bootcamp/register`+`/api/templates` removed | ✅ |
| §9 Rename | "Hawiyat AI Composer" everywhere (copy, metadata, services, composer, console, FAQ, footer, sitemap) | All enumerated surfaces ✓ | ✅ |
| §10 Out of scope | Guides/tickets/booking → dashboard; mock console; no guide governance | Respected | ✅ |
| GC6 gates | tsc + build after every task | Both green at HEAD | ✅ |
| GC5 proof policy | 4 verified stats render, no TODO/50B/60/300 | `trusted-brands.tsx` + `/composer` telemetry ✓ | ✅ |

---

## Findings by severity

### BLOCKER

**B1 — `app/api/chat/route.ts` (HawiyatBot system prompt) still ships the reseller product.**
- *What:* The `POST` handler's system prompt (lines 31–76) describes "Hawiyat Composer" as "Hawiyat's routing and caching gateway for AI coding tools" and instructs the bot to answer with "2x Claude credits", "5x Claude capacity", "20x Claude capacity", "Cut AI Costs with Caching", "Routes simple tasks to cheaper models automatically to cut AI costs", "cost optimization", "reduce token spend". GET returns platform "routing and caching gateway for AI coding tools".
- *Why it contradicts:* Plan GC1 (hard): *never sell "cheap Claude" or "LLM optimization"* — this prompt is verbatim the old identity the rebrand exists to eliminate. GC8 renames (`Hawiyat Composer`→`Hawiyat AI Composer`, no credit-multiplier framing) and Task 9 Step 3's copy audit (`rg "2x|5x|20x Claude|credit"`) are violated. It was touched by commit `f547cca` ("update system prompt… for Hawiyat Composer") and left reseller-shaped. Orphaned (no component imports `/api/chat`), but the endpoint is shipped, builds, and would emit incorrect product/pricing to any caller.
- *Fix:* Rewrite the prompt to execution-layer positioning per `.agents/product-marketing.md`: Hawiyat AI Composer = the execution layer between frontier models and business systems; a unit of work is a **run** (task→plan→route→execute→evaluate); pricing = Pro 6,000 / MAX 5X 15,000 / MAX 20X 30,000 DA/month (no "credits"/"capacity multiplier"); drop all cost-optimizer/caching-reseller language. Re-run Task 9 Step 3 audit.

### IMPORTANT

**I1 — `public/llms.txt` (AI-facing file) still references deleted routes + old identity.**
- *What:* Lists `/ai-algeria`, `/hawiyat-composer`, `/guides/claude`, `/cyber-security` (all deleted → now redirect/404), header "AI infrastructure, subscriptions, automation, hosting", Composer described as "Gateway, caching, and routing for compatible coding tools".
- *Why:* Spec §2 IA + plan GC9 (do not leave indexed URLs 404ing — this file actively points crawlers/AI at removed routes); contradicts the execution-layer identity on an AI-search surface (ai-seo). Not in any plan file list → unowned gap.
- *Fix:* Rewrite to current IA: `/`, `/composer`, `/services`, `/about`, `/terms`, `/privacy`, `/dmca`; execution-layer description; Composer = "the AI execution engine".

**I2 — Legal pages still carry old product name + reseller subscription framing.**
- *What:* `app/terms/page.tsx:179` — "Hawiyat Composer is an **AI optimization layer**" (direct GC1 violation); `app/terms/page.tsx` defines "The subscription tier you select (e.g., Starter, Growth, Scale, Team, Coding)" (97, 102), "Team and Coding subscription plans" (363), "Billing: per-usage or subscription" (320); `app/terms/layout.tsx:6` metadata "Terms of Use for the Hawiyat Composer platform: API keys, subscription plans, monthly quotas"; `app/privacy/page.tsx:68,123,155,276` "Hawiyat Composer API".
- *Why:* Spec §9 rename applies to "copy" on the site; terms/privacy are shipped copy describing a product that no longer exists (Composer is Pro/MAX tiers, not Starter/Growth/Scale/Team/Coding with monthly quotas). GC1 hard rule.
- *Fix:* Rename to "Hawiyat AI Composer", replace the "AI optimization layer" definition with the execution-layer definition, and align tier/quota language to Pro/MAX/Enterprise (or keep legal text generic). Run T9 S3 (`rg "subscription|credit|Claude"`).

**I3 — `.agents/product-marketing.md` is stale vs the amended GC5.**
- *What:* Proof table (§4) omits the two newly-verified stats and line 74 still lists `"10 Resellers"` under **FORBIDDEN**.
- *Why:* Plan GC5 amendment (binding, HEAD bd98188): `+10 Resellers`, `+100B Tokens Served` are **verified and must be rendered** (already rendered on the proof band). The copy-context doc now contradicts the binding number policy; any future copy written from it would omit verified stats.
- *Fix:* Add rows `10+ resellers` and `100B+ tokens served` (source: founder confirmation / dashboard reconciliation) and remove `"10 Resellers"` from the forbidden list. Keep `+50B tokens` and `+60 clients` forbidden.

### MINOR

**M1 — `app/about/page.tsx:225`**: "Green Duty  AI delivered via **Hawiyat Composer**" — missing "AI" (GC8 rename) + double space. Fix to "Green Duty — AI delivered via Hawiyat AI Composer".

**M2 — `app/globals.css:606`**: dead comment "Very slow spin for Hawiyat Composer logo" — cosmetic; delete or update to `Hawiyat AI Composer`.

**M3 — Home CTA destination:** spec §4.6 says "Your first task, executed in 5 minutes." → `/composer`; implemented primary CTA → `/services` (secondary → `/composer`). Defensible funnel choice (pricing is the conversion target) but deviates from the spec line. Align if strict spec compliance is required.

**M4 — Header/footer not token-complete:** `header.tsx` uses `bg-white/60`, `text-gray-600/900`, `dark:bg-white/5`; `footer.tsx` uses `text-gray-700`; page body uses shadcn `--background` (white/near-black), not `--paper`. No raw-hex/`bi-*` violations (acceptance gates pass), but DESIGN.md §Palette specifies paper/ink tokens for these surfaces. Legacy `--hero-gradient`/`.hero-bg-gradient` retained on `body`/`main` (allowed by plan T2 Step 2c). Sweep for the next design pass.

**M5 — Chatwoot widget not mounted:** `components/chatwoot-widget.tsx` is clean and retained (spec §3 "keep"), but no layout/page imports it — the chat bubble doesn't render. Pre-existing, not a rebrand regression; confirm intended deployment.

---

## Contradictions explicitly requested by the reviewer — all clear

- `/services/layout.tsx` metadata + JSON-LD ItemList: ✅ execution naming only ("Hawiyat AI Composer", "AI Composer access", "n8n Hosting", "Evolution API", "Application Hosting"); no "Claude Code"/"LLM Credit" (prev BLOCKER B1 now fixed).
- Home order: ✅ Hero→Pricing→Proof→Algeria→FAQ→CTA→Newsletter→Footer (matches lean spec exactly).
- `/composer` page sections: ✅ all 8 present.
- "Hawiyat AI Composer" naming: ✅ on all pages, services data, metadata, footer, sitemap, header, console. Residual plain "Hawiyat Composer": only B1 (chat), I2 (legal), M1/M2 (about/globals comment), I1 (llms.txt) — all flagged above.
- Deleted routes in nav/footer/sitemap: ✅ none (only redirect sources in `next.config.mjs`).
- Proof-band numbers: ✅ all 4 GC5-verified stats render; no literal TODO; no `+50B`/`+60`/`300 Templates`.
