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

**Visual metaphor = control plane, rendered minimal.** The home leads with a simple, calm statement of the thesis; the execution evidence (pipelines, telemetry, the Trace) lives on the **Composer page**, where the engine is explained. Home is quiet and confident; Composer shows the machinery. The power is in *evidence of execution*, so we show *execution* — on the page where we talk about it.

---

## Design Tokens

All values are CSS custom properties in `app/globals.css`, mirrored into Tailwind. **No raw hex in components** — always reference a token.

### Light Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--paper` | `#FAFAFA` | Page background |
| `--ink` | `#0A0A0A` | Primary text (black) |
| `--surface` | `#FFFFFF` | Cards, elevated panels |
| `--surface-dim` | `#F2F2F2` | Secondary wells, code blocks |
| `--border` | `#E5E5E5` | Hairlines, dividers |
| `--muted` | `#5C5C5C` | Captions, secondary text |
| `--signal` | `#0A0A0A` | Primary CTA **fill**, active states (ink-black) |
| `--signal-text` | `#FFFFFF` | Text/icon **on a signal fill** (white — passes AA) |
| `--signal-contrast` | `#1A1A1A` | `signal`-tinted surfaces / large text accents (≥18px) |
| `--signal-bg` | `#F0F0F0` | Signal-tinted surface, light mode |
| `--signal-hover` | `#262626` | Primary CTA hover fill |
| `--ember` | `#6B6B6B` | Secondary neutral accent — large text, fills, icons |
| `--ember-deep` | `#4A4A4A` | Regular/small text on `--paper` in ember (passes 4.5:1) |
| `--danger` | `#C03E2B` | Errors (the only chromatic red) |
| `--ok` | `#0E9F6E` | Success (the only chromatic green) |

### Dark Mode
| Token | Hex | Usage |
|-------|-----|-------|
| `--paper` | `#0A0A0A` | Page background |
| `--ink` | `#F5F5F5` | Primary text |
| `--surface` | `#141414` | Cards, panels |
| `--surface-dim` | `#1E1E1E` | Wells, code blocks, secondary |
| `--border` | `#2A2A2A` | Hairlines |
| `--muted` | `#A3A3A3` | Secondary text |
| `--signal` | `#FFFFFF` | Primary CTA fill (white) |
| `--signal-text` | `#0A0A0A` | Text/icon **on a signal fill** (black — passes AA) |
| `--signal-contrast` | `#E5E5E5` | `signal`-tinted surface text (dark) |
| `--signal-bg` | `#1C1C1C` | Signal-tinted surface, dark mode |
| `--signal-hover` | `#E2E2E2` | Primary CTA hover fill |
| `--ember` | `#B0B0B0` | Secondary neutral accent — large text, fills, icons |
| `--ember-deep` | `#D4D4D4` | Small/secondary ember text on dark |
| `--danger` | `#F4684F` | Errors |
| `--ok` | `#37D67A` | Success |

### Contrast & usage rules (hard)
- **CTA button in light mode:** `--signal` fill (black) + `--signal-text` (white) text, hover `--signal-hover`.
- **CTA button in dark mode:** `--signal` fill (white) + `--signal-text` (black).
- `--signal` **is the ink-black neutral** — never a colored accent. It makes the primary action read as the strongest, darkest thing on the page.
- `--ember` is a **neutral gray** secondary accent — for fills, large text, and icons that should read one step softer than signal. Never for regular body copy; body copy uses `--ink`/`--muted` only.
- Text on `--signal-bg` uses `--signal-contrast`.
- `--danger`/`--ok` are the **only chromatic tokens** on the site (errors/success). Everything else is a black-to-white gray scale.

### Brand Gradients
- No chromatic gradients. The monochrome palette is deliberately flat.
- **Hero background:** plain `--paper` with a faint dot grid (`--hero-bg-img`), masked to fade out toward the bottom. Calm, quiet, no color heat.
- **Trace-line:** a 1px `--signal` horizontal rule used as a section eyebrow divider on `/composer`.

### Why this palette (design decision)
- **Monochrome by design.** A full black-to-white gray scale with two token families (`signal` = ink-black CTA, `ember` = mid-gray secondary) reads as infrastructure — not a flashy "AI wrapper" product.
- No default purple "AI gradient" (that reads "wrapper/product"), no acid-green-on-black.
- Grays sit under any model brand (Claude/GPT/Gemini) without clashing — the palette itself says "model-independent".
- Only `--danger`/`--ok` carry color, so red/green always mean exactly one thing: error/success.
- The palette is the calm frame; the *execution evidence* (the Trace, telemetry) is the content that gets the attention.

---

## Typography

**Two families only.**

| Role | Family | Variables | Notes |
|------|--------|-----------|-------|
| Display + Body | **Space Grotesk** | `--font-space` (weights 300–700) | Huge but humanist tech. Loaded `next/font`, keep. |
| Data, labels, pipeline, code, metadata | **JetBrains Mono** | `--font-mono` (weights 400–700) | Telemetry = mono. |

- Keep Ubuntu, Dancing Script, Playfair, Poly **removed** from all of: `app/layout.tsx` (next/font/imports), `app/globals.css`, `tailwind.config.js`, and every component. No `font-serif`.

### Type Scale
| Use | Size | Weight |
|-----|------|--------|
| Hero display | text-5xl → 7xl (clamp-style, md/xl bumps) | 700, tight (`leading-[1.05]`) |
| H1 | 5xl (3rem) | 700 |
| H2 | 4xl (2.25rem) | 700 |
| H3 | 3xl (1.875rem) | 600 |
| H4 | 2xl (1.5rem) | 600 |
| Body Large | lg (1.125rem) | 400/500 |
| Body | base (1rem) | 400 |
| Small / caption | sm (0.875rem) | 400 |
| **Eyebrow** | xs mono uppercase, tracking-widest | e.g. `EXECUTION LOOP` |
| **Metadata strip** | xs mono, muted | e.g. `RUN 02 · COMPLETED` |

Use **mono for everything measured** (numbers, tokens, status, labels, pasted system names like `claude-sonnet-4-5`). Grotesk for **talking**.

### Line heights
- Display: 1.05; H1–H4: 1.15–1.2; body: 1.6; mono metadata: 1.4.

---

## Spacing & Layout

- Base 4px. Common: 4,8,12,16,24,32,48,64,80,96,128.
- Section vertical rhythm: `py-16 md:py-24` for headline sections; `py-16` for supporting.
- Content container: `max-w-6xl`; hero full-bleed with centered core column.
- Cards: `rounded-lg`, `border border-border`, `bg-surface`, pad `p-6 md:p-8`.
- Buttons: `rounded-lg px-6 py-3` (primary = `--signal` fill + `--signal-text` + hover `--signal-hover`; secondary = outline `border` + `--ink` text). Hover is `transition-colors` — **no scale**.
- Inputs: `rounded-md`.
- `rounded-full` reserved for **tiny pills/toggles** only (status chips, model chips, MAX tier switch, small badges). Not for cards or buttons.
- Radius scale: cards/buttons `rounded-lg`, inputs `rounded-md`, small `rounded-full` pills, `--radius: 0.375rem` (Tailwind `lg`).

---

## Signature Element — The Execution Trace

> **The one memorable, non-template element of the site.** A horizontal pipeline that takes a *task packet* through the loop:

```
[TASK PACKET]
   │
   ▼
UNDERSTAND ─ PLAN ─ ROUTE ─ EXECUTE ─ EVALUATE ─ RESULT
   │          │       │         │         │
 model.cntrl tool.gw  model X   tools     quality
 ctx.12k     plan     + fallback  n8n      cost.0.4DZD
```

**Rendering behavior (lives on `/composer` only):**
- The home hero is deliberately simple — no console panel. The Trace is the Composer page's centerpiece, rendered by `components/execution-trace.tsx` inside an "Every task becomes a run." section.
- The composer run shows a mono task chip (`task ▸ "Reply to order 1024 on WhatsApp in Arabic"`), a status line (`RUN 02 · COMPLETED`), the 6-stage pipeline with the current stage highlighted, and a footer mono telemetry strip (`route: auto · model: gpt-4o → claude-sonnet · ctx: docs/FAQ · 12k · tools: [whatsapp, crm] · cost: ~0.4 DZD · latency: 210ms · quality: 0.98`).
- A thin `trace-line` (1px `--signal`) draws in on scroll as a section-eyebrow divider throughout the composer page.

**Why:** Chat bubbles are a cliché; a "routing table operating on your business" is visibly *Hawiyat*. It demonstrates the moat — execution intelligence — rather than stating it.

---

## Components Architecture

> Current shipped component set (monochrome). Deleted during the redesign: `ai-playground.tsx`, `trusted-brands.tsx` (split), `newsletter.tsx`, `animated-text.tsx`, `animated-counter.tsx`, `benefits-section`, `additional-features`, `build-ai-apps`, `prebuilt-tools`, `one-subscription`, `resources`, `video-modal`.

### 1. Header (`components/header.tsx`)
- Fixed top pill, `z-50`, `backdrop-blur-xl`, bg `--paper/70` (dark `--surface-dim/50`), `rounded-2xl`, border-bottom `--border`. Mounted-guard theme toggle (no hydration mismatch).
- Desktop nav: **Composer** (`/composer`), **Services** (`/services`), **About** (`/about`).
- Right: theme toggle (Sun/Moon) + primary CTA pill **Start Building** → `/composer`.
- Mobile: slide panel, full-width links, CTA bottom. Esc/close + body scroll lock.
- Hover on nav: `hover:bg-surface-dim rounded-full`; no scale.

### 2. Hero Section (`components/hero-section.tsx`) — **The thesis**
- Simple centered column, `min-h-[80vh]`, `--paper` + faint dots (masked fade at bottom). **No console panel, no 3D, no GSAP.**
- Eyebrow (mono): `HAWIYAT AI COMPOSER · EXECUTION LAYER`
- H1: **"The layer that decides how your business uses AI."**
- Sub (max-w-xl): "The right model for every task, your systems connected, results you can verify — billed in DZD, supported from Algeria."
- CTAs: **Get Started** (primary → `/services`) · **How it works** (secondary → `/composer`).
- Keeps the WebPage JSON-LD block for AI search.

### 3. Partners Marquee (`components/partners-marquee.tsx`) — "Partners & early customers"
- Two identical logo rows in one track, animated `translateX(-50% → 0)` on a 26s loop (`marquee-track` in globals.css); pauses on hover; disabled under `prefers-reduced-motion`.
- Logos grayscale → full color on hover (`group-hover:grayscale-0`).
- **A11y:** the duplicate second track is `aria-hidden`, and its links carry `tabIndex={-1}` so keyboard users don't tab through invisible copies.
- Embeds an `ItemList` JSON-LD (partners as organizations) for search/AI crawlers.

### 4. Our Numbers (`components/our-numbers.tsx`) — stat band
- Static 4 verified stats: `100+` paying clients, `10+` resellers, `100B+` tokens executed, `≈2.6M DZD` ARR. Mono numerals. Proof stats: static mono numerals, or a smooth fast count-up on first view (~800ms ease-out, `prefers-reduced-motion` respected).

### 5. Pricing (`components/pricing.tsx`)
- 3 cards, `rounded-lg`, `bg-surface border border-border`, data from `lib/data/services.ts` (untouched).
- **PRO** (Composer Pro): outline button → OrderForm.
- **MAX**: switchable 5X/20X plain `aria-pressed` pill toggle (no spring animation), primary `bg-signal` button → OrderForm.
- **Enterprise**: `border-2 border-ink` "Custom pricing" card, prefilled WhatsApp link + mailto fallback.
- Flat monochrome — no ambient glow, no shadows, no `hover:scale`.

### 6. FAQ (`components/faq.tsx`) — 5 Q:
1. "What is the Hawiyat execution layer?" (answer includes north-star line)
2. "Is Hawiyat tied to one AI model?" — No. Route by task.
3. "How do costs work?" — DZD, tokens, caches, an `approx N DZD/task`.
4. "Is my data used to train models?" No.
5. "How do I start?" Build → Composer → run a WhatsApp workflow.

### 7. Call to Action (`components/call-to-action.tsx`)
- **"Your first task, executed in 5 minutes."** Primary **Start building** → `/services`, secondary **Meet Composer** → `/composer`.

### 8. Composer page (`app/composer/page.tsx`) — engine page
- Sections: hero → Execution loop (`ExecutionTrace` + 6 stage cards) → Any Model. Any System. (model chips + system cards) → Engine capabilities (6) → Telemetry band → Enterprise full-stack → Why not DIY comparison → final CTA.
- `ScrollAnimations` (GSAP reveal-up + trace-line draw) is mounted **here only**, not on home.

### 9. Footer (`components/footer.tsx`)
- Columns — **The Layer** (AI Composer, Services, About), **Company** (Support WhatsApp, Github), **Legal** (Terms, Privacy, DMCA). Social links (6). Copyright `© 2023–2026 Hawiyat`. *(No "Monitoring"/"Blog" links without real target pages — only link existing routes.)*

### 10. Services Catalog (`app/services/` + `lib/data/services.ts`)
- **Source of truth:** the `services` array in `lib/data/services.ts` (8 entries — n8n Hosting, Composer Pro, Hosting Basic, Evolution API, Composer MAX 5X/20X, Hosting VIP, LLM Credit, in `AI Execution` / `Managed Systems` / `Cloud Runtime` categories). `components/services/services-catalog.tsx` renders the grid; each service has a detail page at `/services/[slug]` with `service-order-form.tsx` + `service-plans.tsx`.
- **Composer (the engine) leads**; Claude/GPT are *routes inside it* — never "Composer + Claude Code" product names, never "2x Claude credit" features. Honest DZD pricing, no strikethrough discounts.

### 11. Algeria Band (`components/algeria-band.tsx`)
- Mounted on `/about` (société, facturation, DZD, Itihad / Label Projet Innovant). Not on home.

### 12. Widgets
- `whatsapp-widget.tsx`: keep positioning `bottom-6 right-6`.

### 13. Scroll animations (`components/scroll-animations.tsx`)
- GSAP reveal-up + `trace-line` draw-on-scroll, **used on `/composer` only**. Respects `prefers-reduced-motion` (elements stay visible). No `#dashboard` blocks remain.

---

## Page Structure

### Home (`/`):
1. Header
2. Hero (simple: title + subtitle + 2 CTAs)
3. Partners marquee
4. Our Numbers
5. Pricing (PRO / MAX switchable / Enterprise)
6. Testimonials
7. FAQ
8. CTA
9. Footer
*(no newsletter — removed)*

### `/composer` — engine page (redirect from legacy `/hawiyat-composer`; `/ai-algeria` → `/` redirect)
### `/services` — catalog + `/services/[slug]` detail pages (per-service plans, features, SEO/GEO)
### `/about` — includes the Algeria band
### Legal — `/terms`, `/privacy`, `/dmca`
> Note: `/templates`, `/bootcamp`, `/schedule`, `/cyber-security`, and `/guides` routes are **not** in the repo. Do not link to them in nav/footer/sitemap.

---

## Copy & Voice

- **Active voice, builder-to-builder.** "Route your task", "Run your pipeline", "Bill in DZD".
- **Specific > clever.** Use tokens, numbers, model names, systems — concrete.
- **No cheap.** "Save money" NEVER first; first is reliability + control. Money is the *final proof point*.
- **Naming things:** trace verbs for product surfaces:
  - "Composer" = execution engine; the **Execution Trace** (UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT with mono telemetry) is its signature UI, rendered on `/composer`.
  - A unit of work shipped by Hawiyat is a **"run"** — described as `task → plan → route → execute → evaluate`. (Keep it simple: a task packet in the Trace is "one run." Avoid introducing an unexplained vocabulary like "STAR/BATCH" unless the product UI defines it.)
- The hero carries the *layer* thesis implicitly ("The layer that decides how your business uses AI"); quote the north-star line verbatim once in a sub-line (hero or FAQ) so it is on record.
- Segment copy: e-commerce/WhatsApp bar; dev/agency bar; infra/devOps bar.

---

## Interactive Behaviors

- Theme switch persisted (`localStorage`) via next-themes `class`. Header toggle is **mounted-guard**: a same-size neutral placeholder until mounted, then Sun/Moon — no hydration mismatch, no CLS.
- Mobile menu: slide with `300ms`, Esc/close, body scroll lock.
- Marquee: infinite loop, pauses on hover, disabled under reduced-motion; duplicate track `aria-hidden` + `tabIndex={-1}`.
- MAX tier switch: plain `aria-pressed` pill toggle (no spring).
- Form interactions unchanged (order forms, schedule booking, services).
- **Minimal motion:** hover = color/background transitions only. No scale-on-hover, no typewriter, no spark-line.

## Animations & Effects

| Animation | Where | Property | Notes |
|-----------|-------|----------|-------|
| marquee | Partners row (home) | transform `translateX(-50% → 0)`, 26s linear infinite | CSS in globals.css; pauses on hover; off under reduced-motion |
| reveal-up | `/composer` only | opacity/transform 0.8s, stagger 0.2 | GSAP ScrollTrigger; reduced-motion keeps elements visible |
| trace-line | `/composer` only | scaleX 0→1, scroll-scrubbed | GSAP ScrollTrigger draw-on-scroll |

- **No motion on home beyond the marquee.** No hero console typewriter, no scroll-reveal dashboard, no spark-lines. Exception: the proof stats may run a smooth fast count-up on first view (~800ms ease-out, `prefers-reduced-motion` respected).
- All motion respects `@media (prefers-reduced-motion: reduce)`.

## Responsive Breakpoints

| BP | Width | Notes |
|----|-------|-------|
| xs | < 640 | 1 col; trace stacks vertical (stages up/down) |
| sm | ≥640 | panels stack, sidebars hide |
| md | 768 | 2-col cards; aside layout engages |
| lg | 1024 | full grip; sticky title aside |
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
```

## File Structure Summary
- `app/`: page.tsx, layout.tsx, globals.css, composer/, services/ (+`[slug]/page.tsx`), about/, privacy/, terms/, dmca/, api/…, robots.ts, sitemap.ts. (`hawiyat-composer` + `ai-algeria` redirect via next.config.mjs; `templates/` & `bootcamp/` removed.)
- `components/`: header, footer, hero-section, partners-marquee, our-numbers, pricing, faq, call-to-action, execution-trace (composer), scroll-animations (composer), algeria-band (about), whatsapp-widget, theme-provider
- `components/services/…` (catalog + order-form + service-order-form + service-plans), `components/ui/` (shadcn)
- `lib/` (utils, seo, email-utils, auth, prisma, **data/services.ts**), `prisma/`, `public/` (logos, trust, assets, dots)

---

*Document Version 3.0*  
*Last Updated: August 8, 2026*  
*Project: Hawiyat — AI Infrastructure Platform (Execution Layer Between Models & Business)*
