# Hawiyat — Comprehensive Design System

> **The execution layer between frontier AI and your business.**
> This document defines the design language for the **Hawiyat AI Infrastructure Platform** — not a reseller, not an LLM optimizer: the model-independent, business-system-agnostic layer that decides *how* a business gets AI to work. The site must *show the execution happening*, not just claim it.

## Table of Contents
1. [Identity & Positioning](#identity--positioning)
2. [Design Tokens](#design-tokens)
3. [Palette](#palette)
4. [Typography](#typography)
5. [Spacing & Layout](#spacing--layout)
6. [Signature Element — The Execution Trace](#signature-element--the-execution-trace)
7. [Components Architecture](#components-architecture)
8. [Page Structure](#page-structure)
9. [Copy & Voice](#copy--voice)
10. [Interactive Behaviors](#interactive-behaviors)
11. [Animations & Effects](#animations--effects)
12. [Responsive Breakpoints](#responsive-breakpoints)
13. [Accessibility](#accessibility)
14. [Iconography](#iconography)
15. [Environment Configuration](#environment-configuration)
16. [File Structure Summary](#file-structure-summary)

---

## Identity & Positioning

**North star (from Vision Report):** *"Whatever AI exists tomorrow, businesses will need a layer that decides how to use it. That layer could be Hawiyat."*

**One-sentence definition:** Hawiyat is an AI infrastructure platform that sits between frontier AI models (GPT, Claude, Gemini, open models) and business systems (WhatsApp, CRM, ERP, email, databases, workflows) — and decides the best way to accomplish each task.

**What we are NOT (always render these as our counter in copy):**
- ❌ An agency (we are infrastructure, not services)
- ❌ An automation tool (we execute, not just compose)
- ❌ An LLM cost optimizer (cost is a *benefit*, Composer is an *engine*)
- ❌ A vendor wrapper (we are model-independent)

**What the visitor must say after leaving:** *"Hawiyat is the execution layer that runs my AI between any model and my systems."*

**Audience:** Algerian & North-African builders — dev teams, e-commerce operators, founders running customer support, sales & back-office on WhatsApp. Buyers are technical operators who already know ChatGPT/Claude/Gemini and WhatsApp.

**The website's single job:** convert belief that "AI in emerging markets is messy, fragmented and expensive" into "Hawiyat executes my AI — correctly and reliably, in DZD, close to home." (Cost is the *final proof point*, never the opener.)

**Visual metaphor = control plane.** The site looks like a system console for the AI era: pipelines, telemetry, verdict strips, task cards — not like a chat app mock. The power is in *evidence of execution*, so we show *execution*.

---

## Design Tokens

All values are CSS custom properties in `app/globals.css`, mirrored into Tailwind.

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--paper` | `#F7F6F3` | Page background |
| `--ink` | `#0B0F0E` | Primary text (near-black, green tint) |
| `--surface` | `#FDFCFA` | Cards, elevated panels |
| `--surface-dim` | `#EDEBE5` | Secondary wells, code blocks |
| `--border` | `#E4E2DC` | Hairlines, dividers |
| `--muted` | `#62665F` | Captions, secondary text |
| `--signal` | `#16A085` | Primary CTA **fill**, active states, "executing" (verdigris) |
| `--signal-text` | `#0B0F0E` | Text/icon **on a signal fill** (ink — ≈6:1, passes AA) |
| `--signal-contrast` | `#0C6A56` | `signal`-tinted surfaces / large text accents (≥18px) |
| `--signal-bg` | `#E6FFF7` | Signal-tinted surface, light mode |
| `--ember` | `#B06A21` | Secondary warm accent — **large text (≥18px), fills, icons** |
| `--ember-deep` | `#8C4D11` | Regular/small text on `--paper` in ember (passes 4.5:1) |
| `--danger` | `#C03E2B` | Errors |
| `--ok` | `#0E9F6E` | Success (distinct hue from signal) |

### Dark Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--paper` | `#0A0F0E` | Page background |
| `--ink` | `#EDF2EF` | Primary text |
| `--surface` | `#111817` | Cards, panels |
| `--surface-dim` | `#18211F` | Wells, code blocks, secondary |
| `--border` | `#242B28` | Hairlines |
| `--muted` | `#8FA09A` | Secondary text |
| `--signal` | `#2EE6B6` | CTA fill, pipelines, active states (bright verdigris) |
| `--signal-text` | `#00382C` | Text/icon **on a signal fill** (≈8:1, passes) |
| `--signal-contrast` | `#B6F7E4` | `signal`-tinted surface text (dark) |
| `--signal-bg` | `#0E241E` | Signal-tinted surface, dark mode |
| `--ember` | `#F2A23B` | Warm accent — large text, fills, icons |
| `--ember-deep` | `#FFC97A` | Small/secondary ember text on dark |
| `--danger` | `#F4684F` | Error |
| `--ok` | `#37D67A` | Success |

### Contrast & usage rules (hard)
- **CTA button in light mode:** `--signal` fill + `--signal-text` (ink) text. Do **not** use white text on `--signal` (fails AA).
- **CTA button in dark mode:** `--signal` fill + `--signal-text` (dark green).
- `--ember` in light mode is only for **large text (≥18px/bold), fills, and icons**. For small/regular ember text use `--ember-deep`.
- Accent colors (`--signal`, `--ember`) are for fills, large text, and UI accents — never for regular body copy. Body copy uses `--ink`/`--muted` only.
- Text on `--signal-bg` uses `--signal-contrast`.

### Brand Gradients
- **Night-pulse** (hero gradient): `#0B0F0E → #111817 → #0A0F0E` with a faint `signal` radial (`#16A085` at 8–12% opacity) — *cold control room heat*.
- **Execution line**: linear-gradient(90deg, `#16A085`, `#2EE6B6`) — used sparingly for the Trace, text-gradients, hover thermometers.

### Why this palette (design decision)
- No default purple "AI gradient" (that reads "wrapper/product"). 
- No acid-green-on-black (default #2 cliché). Verdigris `#16A085`/`#2EE6B6` is *inherited,* calm, infrastructure-like.
- Warm amber `ember` gives the "local Algeria / DZD / human warmth" counterpoint to pristine execution-green.
- Neutral paper tones with green undertone feel like printed schematics — sits under any model brand (Claude/GPT/Gemini) without clashing.

---

## Typography

**Two families only.**

| Role | Family | Variables | Notes |
|------|--------|-----------|-------|
| Display + Body | **Space Grotesk** | `--font-space` (weights 300–700) | Huge but humanist tech. Loaded `next/font`, keep. |
| Data, labels, pipeline, code, metadata | **JetBrains Mono** | `--font-mono` (weights 400–700) | NEW — add to `app/layout.tsx`. Telemetry = mono. |

- Remove legacy Ubuntu, Dancing Script, Playfair, Poly from **all** of: `app/layout.tsx` (next/font/imports), `app/globals.css` (@import lines + font-family fallbacks), `styles/globals.css` (dead duplicate — delete the file), `tailwind.config.js` (`poly`/`fontFamily`), and any component using `font-serif`.

### Type Scale
| Use | Size | Weight |
|-----|------|--------|
| Hero display | clamp(3rem, 7vw, 4.5rem) | 700, tight |
| H1 | 5xl (3rem) | 700 |
| H2 | 4xl (2.25rem) | 700 |
| H3 | 3xl (1.875rem) | 600 |
| H4 | 2xl (1.5rem) | 600 |
| Body Large | lg (1.125rem) | 400/500 |
| Body | base (1rem) | 400 |
| Small / caption | sm (0.875rem) | 400 |
| **Eyebrow** | xs mono uppercase, tracking-widest | e.g. `ROUTE / 03` |
| **Metadata strip** | xs mono, muted | e.g. `ctx 12k · cost 0.4 DZD · 212ms` |

Use **mono for everything measured** (numbers, tokens, status, labels, pasted system names like `claude-sonnet-4-5`). Grotesk for **talking**.

### Line heights
- Display: 1.05; H1–H4: 1.15–1.2; body: 1.6; mono metadata: 1.4.

---

## Spacing & Layout

- Base 4px. Common: 4,8,12,16,24,32,48,64,80,96,128.
- Section vertical rhythm: `py-24 md:py-32` for headline sections; `py-16` for supporting.
- Content container: `max-w-6xl/7xl`; hero full-bleed with centered core column.
- **Two-zone band** pattern: left sticky title column (aside, `md:w-5/12`) + right content column (cards). Used in engine + integrations.
- **Pipeline strip** pattern: 6 tiny columns (UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT) — as an eyebrow row over any section that needs "the loop" framing.
- Cards: `rounded-3xl`, `border border-border`, `bg-surface`, pad `p-6 md:p-8`.
- Buttons: `rounded-full px-6 py-3`, hover `scale-[1.03]`. Primary = `--signal` fill + `--signal-text` (light) / dark-green `--signal-text` (dark); secondary = outline `border` + `--ink` text.

---

## Signature Element — The Execution Trace

> **The one memorable, non-template element of the site.** A live horizontal pipeline that takes a *task packet* through the loop:

```
[TASK PACKET]
   │
   ▼
UNDERSTAND ─ PLAN ─ ROUTE ─ EXECUTE ─ EVALUATE ─ RESULT
   │          │       │         │         │
 model.cntrl tool.gw  model X   tools     quality
 ctx.12k     plan     + fallback  n8n      cost.0.4DZD
```

**Rendering behavior:**
- Hero: large console panel (the upgraded "AI Playground"): a vertical height ▓ queue with:
  - a task chip that *types in* e.g. `"Reply to order 1024 on WhatsApp in Arabic"`
  - a status line in mono (`ROUTE ▸ model: claude-sonnet-4-5 · ctx: docs/FAQ · tools:[EVO,CRM]`)
  - a progress "spark" traveling through the 6 mono stages with `signal` highlight past the current step
  - a footer mono telemetry strip (`tokens 1.2k · cost 0.4 DZD · Q 0.98 · 210ms · Reroutes from fallback`)
- Section transition: a thin 1px horizontal trace line with a travelling `signal` dot used as a divider.
- Loading/empty states in product UI reuse stages with spark marking.

**Why:** Chat bubbles are a cliché; a "routing table operating on your business" is visibly *Hawiyat*. It demonstrates the moat — execution intelligence — rather than stating it.

---

## Components Architecture

### 1. Header (`components/header.tsx`)
- Fixed, `z-50`, `backdrop-blur`, bg `--paper/70` border-bottom `--border`.
- Center nav (desktop): **Solutions** (→ `/`), **Composer** (→ `/composer` — during rebrand, legacy `/hawiyat-composer` until the redirect lands), **Security** (`/cyber-security`), **Services** (`/services`), **AI in Algeria** (`/ai-algeria`).
- Right: theme toggle (Sun/Moon) + primary CTA pill `**Start Building**` → `/composer` (legacy `/hawiyat-composer`).
- Mobile: slide panel, full-width links, CTA bottom.
- Hover on nav: `bg-surface-dim rounded-full`.

### 2. Hero Section (`components/hero-section.tsx`) — **The thesis**
- Full viewport, bg `--paper` + `hero gradient` + faint dots; signature panel below H1.
- H1: **"The layer that decides how your business uses AI."**
- Eyebrow (mono): `AI INFRASTRUCTURE · ALGIERS · MODEL-INDEPENDENT`
- Sub (max-w-2xl): "Hawiyat sits between frontier models and the systems you run — WhatsApp, CRM, ERP, email, workflows. One task in. The best model, context, tools and fallbacks out. Priced in DZD."
- CTAs: **Start building** (primary) · **See how it executes** (secondary outline, opens scrolled trace demo).
- Dashboard panel: **Execution Console** (see AIPlayground rework) with 3D perspective (keep GSAP dashboard effect).

### 3. AI Playground → **Execution Console** (`components/ai-playground.tsx`)
- Renamed semantically (keep filename for compat). Sidebar (250px, hidden mobile) w/ brand; nav items now: **Deployments, Agents, Composer, Docs & CLI**.
- Main panel = the trace panel above.
- Model selector dropdown: `Hawiyat (auto)`, `Claude Sonnet`, `GPT 4o`, `Gemini`, `Llama (open)` — each a small colored chip + mono name; toggle "Auto-route / Fixed". **Remove the legacy "Pablo" model** (current `ai-playground.tsx` still ships it) and its static nav items.
- Signup popup (after 3 runs): "Run your business on Hawiyat" + CTA. 

### 4. Trusted Brands (« proof ») (`components/trusted-brands.tsx`)
- `py-20`. Grid of 3–6 logos (Itihad/ESTIN/IT-Solutions + regional partners) with hover scale-110. Title: "Already running on Hawiyat" +
- Add second strip: metrics (verified only: `100+ clients`, `≈2.6M DZD ARR`, `p95 latency` placeholder, `DZD checkout`) as mono metadata. **Superseded by the plan's GC5 numbers policy — never render `+50B tokens` or `+60 clients` (unverified).**

### 5. "AI Execution Layer" (BenefitsSection rename, same click-id `solutions`)
- 4 cards, 350×540-ish, rounded-3xl, hover scale-[1.02].
- Cards (stage map — these 4 cards collapse the 6-stage trace; keep the numbering honest):
  1. **Understand** (`BrainCircuit` icon) — classifies intent & business context. *(trace: UNDERSTAND)*
  2. **Plan** — selects model, context, tools, workflow. *(trace: PLAN → ROUTE)*
  3. **Execute** — runs across models & tools with fallbacks. *(trace: EXECUTE)*
  4. **Evaluate & learn** — grades every outcome; execution intelligence accumulates. *(trace: EVALUATE → RESULT)*
- Title: **"HOW HAWIYAT EXECUTES A TASK"**; eyebrow mono `EXECUTION LOOP`.
- "Learn more →" → `/composer`.

### 6. Any Model. Any System (replaces additional Features) `id="platform"`
- 2-zone layout: sticky left "**One layer. Every model. Every system.**" + right column list of "wiring cards":
  - Models: GPT, Claude, Gemini, open models, future models (each chip).
  - Systems: WhatsApp, CRM, ERP, Email, Databases, n8n workflows, Internal APIs.
- Cards: `240px` full-height, hover `scale-[0.98]`, icon 4xl, "Route to →" arrow.

### 7. Telemetry / Metrics band
- Full-width `--surface-dim` with mono numbers (stat cards): tokens served, average cost/task, P95 latency, ROUTE success %, clients in DZ. *Numbers as design, not decoration.*

### 8. Composer Engine (`prebuilt-tools` rework) — 6 tools
1. Model Gateway — route by task/quality/cost.
2. Context Selector — pull the right CRM/env/FAQ context.
3. Tool Router — call WhatsApp, CRM, ERP, DB, n8n only when needed.
4. Reliability & Fallbacks — cascade between models on failure.
5. Guardrails & Evaluations — verdict + quality scores + logs.
6. Cost Controls — cache & compression, budgets in DZD.
Hover: `scale-[0.98]`; each card `Learn more →` `/composer`. (Consistent direction: interactive cards **shrink** `scale-[0.98]`, buttons/CTAs **grow** `scale-[1.03]`.)

### 9. Services Catalog (`app/services/` + `lib/data/services.ts`)
Present as **"Run your stack on Hawiyat"** with DZD pricing, categories updated to reflect infra reality. **Source of truth:** the `services` array in `lib/data/services.ts` (8 entries — n8n Hosting, Composer Pro, Hosting Basic, Evolution API, Composer MAX 5X/20X, Hosting VIP, LLM Credit). `components/services/services-catalog.tsx` renders the grid on `/services`; each service has a detail page at `/services/[slug]` (`app/services/[slug]/page.tsx`) with `service-order-form.tsx` + `service-plans.tsx`.
**Rebrand must de-resellerize this surface (validator C1/I5):**
- Rename services so **Composer (the engine) leads** and Claude/GPT are *routes inside it* — never "Composer + Claude Code" product names, never "2x Claude credit" features, never an "AI Subscription" category. The value is the execution layer; tokens/models are incidental.
- Re-categorize away from `AI Subscription` / `AI Tokens` → execution-layer categories (e.g. `AI Execution`, `Managed Systems`, `Cloud Runtime`).
- Order cards: Composer/execution first; n8n/Evolution/credits demoted to "systems you connect."
- Drop strikethrough/launch-price discount mechanics; replace with honest DZD pricing.
- Rewrite the "Why Choose Hawiyat" strip to lead with the execution layer (local support, DZD billing, model-agnostic, telemetry) not generic hosting ops.
- LLM Credit → reframe as "Composer access" (the layer is the product; tokens are incidental).

### 9b. Enterprise full-stack narrative (validator I7 — the revenue mitigation)
- Add one section (home) + copy on `/services` + `/schedule` framing **"one contract, the whole stack"**: Composer (execution) + n8n (workflow) + Evolution API (WhatsApp infra) + Platform (runtime) as a single full-service offer, with a "Schedule a meeting" CTA to `/schedule`. This is the stated mitigation for the 90%-Composer revenue concentration risk.

### 10. One Subscription / Comparison (keep, re-tag "Why not DIY")
- H2: "The fragments are the trap." vs Composer vs DIY (OpenAI+Claude+n8n+WhatsApp+DB). Highlight "Composer runs the layer".

### 11. Resources (`resources.tsx`) — "From the control room"
- 3 articles with category/date/title; images 350px, hover `scale-[1.3]`. Copy themes: "What is the Hawiyat execution layer?", "Routing every model on one control plane", "How Composer learns from every run".

### 12. FAQ (`faq.tsx`) — 5 Q:
1. "What is the Hawiyat execution layer?" (answer includes north-star line)
2. "Is Hawiyat tied to one AI model?" — No. Route by task.
3. "How do costs work?" — DZD, tokens, caches, an `approx N DZD/task`.
4. "Is my data used to train models?" No.
5. "How do I start?" Build → Composer → run a WhatsApp workflow.

### 12b. Pricing (`components/pricing.tsx`) — de-resellerize (validator C2)
- Current state sells "Hawiyat Composer + Claude Code … 2x/5x/20x Claude credits." **Rebrand must remove the credit-multiplication framing** — it reads as an LLM reseller.
- Price the **execution layer**: tiers by throughput/tasks and capability (e.g. `Starter` / `Growth` / `Scale`), with DZD pricing and a transparent "per-task cost" line (mono, e.g. `~0.4 DZD/task`). Claude/GPT/Gemini are listed as *available routes*, never as the SKU.
- Frame: "One engine. Every model. Never vendor-locked to a model." (Scoped to *models* — see §Copy & Voice; switching costs are a feature of the layer, not a threat to the customer.)
- Keep OrderForm integration.

### 13. CTA (`call-to-action.tsx`): **"Your first task, executed in 5 minutes."** CTA Start building.

### 14. Newsletter (`newsletter.tsx`): keep, success w/ waitlist number; subheading "Execution insights. No pitch spam."

### 15. Footer (`footer.tsx`): columns — The Layer (Composer, AI in Algeria, Services), Company (Support tel, GitHub), Legal (Terms, Privacy, DMCA). Social links (8). Copyright `© 2023–2026 Hawiyat`. *(No "Monitoring"/"Blog" links without real target pages — only link existing routes.)*

### 16. Chatwoot / WhatsApp widgets: keep positioning `bottom-6 right-6`.

### 17. Scroll animations (`scroll-animations.tsx`): keep GSAP reveal; add "trace-line" draw-on-scroll for signature.

### 18. Video modal: keep; embed updated demo "The execution trace".

### 19. Schedule (`/schedule`): keep; matches enterprise "Schedule a meeting" flows.

---

## Page Structure

### Home (`/`):
1. Header
2. Hero (execution console)
3. TrustedBrands / Metrics
4. Benefits (Execution loop)
5. Any Model. Any System.
6. Metrics band
7. Composer Engine (6)
8. Comparison ("Why not DIY")  — lands before buy-section for the technical audience
9. Services teaser (engine-first order, de-resellerized)
10. Enterprise full-stack ("one contract, the whole stack" → `/schedule`)
11. Resources
12. FAQ
13. CTA
14. Newsletter
15. Footer

### `/composer` — engine page (target; rename existing `/hawiyat-composer` w/ redirect during rebrand)
### `/ai-algeria` — regional positioning (revamp copy; scope = Algeria → North Africa / MENA, **not** "all-Africa")
### `/services` — catalog (revamp) + `/services/[slug]` detail pages (per-service plans, features, SEO/GEO)
### `/schedule` — keep
### `/about` + `/cyber-security` + `/guides/*` + Legal `/terms /privacy /dmca` — restyle only
> Note: `/templates` and `/bootcamp` routes were removed from the repo. Do not link to them in nav/footer/sitemap.

---

## Copy & Voice

- **Active voice, builder-to-builder.** "Route your task", "Run your pipeline", "Bill in DZD".
- **Specific > clever.** Use tokens, numbers, model names, systems — concrete.
- **No cheap.** "Save money" NEVER first; first is reliability + control. Money is the *final proof point*.
- **Naming things:** trace verbs for product surfaces:
  - "Composer" = execution engine; "Execution Console" = the UI.
  - A unit of work shipped by Hawiyat is a **"run"** — described as `task → plan → route → execute → evaluate`. (Keep it simple: a task packet in the Trace is "one run." Avoid introducing an unexplained vocabulary like "STAR/BATCH" unless the product UI defines it.)
- The hero carries the *layer* thesis implicitly ("The layer that decides how your business uses AI"); quote the north-star line verbatim once in a sub-line (hero or FAQ) so it is on record.
- Segment copy: e-commerce/WhatsApp bar; dev/agency bar; infra/devOps bar.

---

## Interactive Behaviors

- Theme switch persisted (`localStorage`) via next-themes `class`.
- Mobile menu: slide with `500ms`, Esc/close; body scroll lock.
- Hero trace: spark animates step→step on loop (respect reduced-motion: static).
- Model selector chips: popover with current "route".
- Form interactions unchanged (newsletter subscribe, schedule booking, services, forms).
- Hover scale table: buttons `1.03`, cards `1.02`, links translate-x-1, social scale-110.

## Animations & Effects

| Animation | Property | Duration | Easing |
|-----------|----------|----------|--------|
| reveal-up | opacity/transform | 0.8s | ease-out |
| trace-follow | left/dashoffset | 3s | linear infinite (mono stage dot) |
| fadeIn | opacity | .3s | ease |
| pulse | opacity | 2s | ease-in-out infinite (status) |
| scale-load | transform | 1s | ease-out (task card) |
| shrink | width | 1.2s | ease-in-out (progress bar) |

Special: motorized **spark-line** (signal → ember) used along horizontal rules under section eyebrows.
Use `.reveal-up` with `@media (prefers-reduced-motion: reduce){auto:none}`.

## Responsive Breakpoints

| BP | Width | Notes |
|----|-------|-------|
| xs | < 640 | 1 col; trace stacks vertical (stages up/down) |
| sm | ≥640 | panels stack, sidebars hide |
| md | 768 | 2-col cards; aside layout engages |
| lg | 1024 | full grip; sticky title aside; console panel right |
| xl | 1536 | max-w container |

Mobile: reduced H sizes, tap ≥44px, full-width buttons, hamburger, hidden sidebars.

## Accessibility

- Skip link; semantic `header/main/footer/nav`; aria on interactive.
- Contrast ≥ 4.5:1; focus ring `ring`; no data conveyed by color alone (add text labels to trace states).
- Reduced motion respected everywhere.
- resizable text ≥ 200%.

## Iconography
- **lucide-react** (all) + shadcn icon set. Replace `bi-*` from Bootstrap CDN.
- Icons: GitMerge, RefreshCw (route), BrainCircuit, Workflow, ShieldCheck, Gauge (cost), Layers (systems), MessageCircle (WhatsApp), Database, ServerCog, SquareTerminal (CLI).

## Environment Configuration  (unchanged, moved here)
```
DATABASE_URL=...
NEXT_PUBLIC_APP_NAME=Hawiyat
NEXT_PUBLIC_URL=https://www.hawiyat.org   # must match app/layout.tsx SITE_URL
NEXT_PUBLIC_APP_URL=https://app.hawiyat.org
NEXT_PUBLIC_DOCS_URL=https://docs.hawiyat.org
NEXT_PUBLIC_BLOG_URL=https://blog.hawiyat.org
NEXT_PUBLIC_CHATWOOT_TOKEN=...
NEXT_PUBLIC_ENTERPRISE_SCHEDULE_URL=https://www.hawiyat.org/schedule
GEMINI_API_KEY=...
```

## File Structure Summary
- `app/`: page.tsx, layout.tsx, globals.css, hawiyat-composer/, ai-algeria/, services/ (+`[slug]/page.tsx`), schedule/, about/, cyber-security/, guides/, terms/, privacy/, dmca/, api/…, robots.ts, sitemap.ts. (`templates/` & `bootcamp/` removed.)
- `components/`: header, footer, hero-section, ai-playground (execution console), execution-trace (new), trusted-brands, benefits-section, additional-features, build-ai-apps, prebuilt-tools, one-subscription, pricing, services (catalog + order-form + service-order-form + service-plans), resources, faq, call-to-action, newsletter, chatwoot-widget, whatsapp-widget, scroll-animations, video-modal, theme-provider
- `components/schedule/…`, `components/ui/` (shadcn)
- `lib/` (utils, seo, email-utils, auth, prisma, **data/services.ts**), `prisma/`, `public/` (logos, trust, assets, dots)

---

*Document Version 2.0*  
*Last Updated: August 8, 2026*  
*Project: Hawiyat — AI Infrastructure Platform (Execution Layer Between Models & Business)*