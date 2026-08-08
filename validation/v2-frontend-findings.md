# v2 Frontend / Design Audit Findings

Audit target: rebrand HEAD `bd98188` (execution-layer identity, "control-plane" UI).
Auditor: Frontend/Design pass against `DESIGN.md` v2.0 (§Palette, §Typography, §Spacing & Layout, §Signature Element, §Components Architecture, §Interactive Behaviors, §Accessibility, §Responsive) + `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand-implementation.md` (Global Constraints) + frontend best practices.
Method: code reading of the implemented surfaces; `npx tsc --noEmit` clean; `pnpm build` succeeds. No browser run — motion/contrast claims are computed, not measured.

## Verdict: FAIL

The rebrand's **core new surfaces are excellent** — home (`app/page.tsx`), `/composer`, the Execution Trace, hero/Execution Console, 3-card pricing, proof band, Algeria band, FAQ, CTA all use tokens, two-zone layout, mono telemetry, and the signature element correctly. But the audit's scope item 7 ("buttons/cards/badges look like one system across pages; no leftover legacy styling") **fails on three visible surfaces**: the global `Header` is 100% legacy (gray scales + black rounded-lg CTA), the services catalog/detail pages still carry forbidden purple tag gradients and non-token cards, and `/about` was never tokenized (black/white CTAs, `.btn`, 8xl `font-light` headings). Additionally, several hard accessibility requirements from DESIGN §13 and §Interactive Behaviors are unmet (reduced-motion handling, skip-link, FAQ focus ring, mobile-menu aria/scroll-lock, nested `<main>` landmarks).

---

## BLOCKER

### B1 — `Header` is fully legacy and contradicts DESIGN §1 + the token system (scope items 1, 7)
- **File:** `components/header.tsx`
- **What's wrong:** The entire header chrome uses raw Tailwind gray/black/white utilities instead of the Hawiyat token set: container `bg-white/60 dark:bg-surface-dim/50 ... border-gray-200/50 dark:border-white/10 rounded-xl` (L48); brand text `text-gray-900 dark:text-white` (L63); nav links `text-gray-600 dark:text-gray-300 ... hover:bg-gray-100 dark:hover:bg-transparent` + `rounded-md` (L71–88); theme + menu icon buttons `border-gray-200 dark:border-gray-700`, `text-gray-600 dark:text-gray-300` (L94–138); mobile CTA `bg-black dark:bg-white text-white dark:text-black rounded-lg` (L182), desktop CTA `bg-black ... rounded-lg` (L106). DESIGN §1 specifies: bg `--paper/70` + border-bottom `--border`, nav hover `bg-surface-dim rounded-full`, primary CTA pill `--signal` fill + `--signal-text`, `rounded-full px-6 py-3`.
- **Why:** The header is the persistent chrome on every page — it is the single most-visible contradiction to the identity. `bg-black`/`bg-white` CTAs and gray nav directly violate the CTA spec (Global Constraint 3) and break "one system across pages" (scope item 7). The whole page now looks token-built except the bar pinned at the top.
- **Fix:** Rebuild the header bar with tokens: `bg-paper/70 backdrop-blur border-b border-border` (or keep the floating pill, tokenized), nav links `text-ink hover:text-ink hover:bg-surface-dim rounded-full` in mono/grotesk, icon buttons `text-muted-ink hover:text-ink`, CTA `bg-signal text-signal-text rounded-full px-6 py-3 hover:scale-[1.03]`, mobile CTA identical. Reuse the pill/button language from `hero-section.tsx`.

---

## IMPORTANT

### I1 — Services catalog + detail + order surfaces still use the forbidden purple gradient + non-token cards (scope items 1, 7)
- **Files:** `components/services/services-catalog.tsx` (L163–183, 92–96), `app/services/[slug]/page.tsx` (L160–170), `components/services/service-order-form.tsx` (L24–35), `components/services/service-plans.tsx` (L45–54, 79, 45–46)
- **What's wrong:** Tag badges render `bg-gradient-to-r from-violet-500 to-purple-600` / `from-purple-500 to-violet-600` ("Popular"/"Pro") and a full rainbow of raw Tailwind palettes (`emerald/green/orange/red/yellow/amber/teal/blue/indigo`). Cards use `bg-white/40 dark:bg-secondary rounded-xl backdrop-blur` (catalog) vs the system `bg-surface rounded-3xl border-border`. `categoryStyles` uses raw `cyan/teal/violet` utilities (L92–96), and `service-plans.tsx` uses shadcn `bg-primary text-primary-foreground` badges + black `text-primary` Check icons instead of signal.
- **Why:** DESIGN §Brand Gradients explicitly bans the purple "AI gradient" ("reads wrapper/product"); scope item 7 bans leftover legacy styling. Because these are the `/services` conversion surface, they visually conflict with the execution-layer identity the catalog was de-resellerized to sell.
- **Fix:** Replace all tag gradients with token badges (`bg-signal-bg text-signal-contrast`, or `bg-surface-dim text-muted-ink` with `border border-border`; one `bg-signal text-signal-text` accent for the featured tier). Convert cards to `bg-surface border border-border rounded-3xl p-6` and `text-muted-ink`. Check icons → `text-signal`.

### I2 — `/about` was never tokenized (Task 8 restyle not present at HEAD)
- **File:** `app/about/page.tsx`
- **What's wrong:** CTA buttons use `bg-black dark:bg-white text-white dark:text-black rounded-xl` (L393, L46) and the legacy `.btn` class with `!rounded-lg !border-black dark:!border-white` (L38, L46); hero H1 uses `font-medium` + `font-light` (L26–27); the closing H2 is `text-7xl md:text-8xl ... font-light` (L380–382) — far above the DESIGN max display of 4.5rem and the wrong weights (display = 700); image wells use `bg-white dark:bg-black` (L144, 205, 220); a `🇩🇿` emoji in a chip (L24). A `commit "refactor: restyle about…"` exists in history but the current file is legacy.
- **Why:** `/about` is a linked, in-nav page. Black/white square CTAs and 8xl display contradict the pill + `--signal` CTA spec and the type scale (DESIGN §Typography), so the page reads as a different site.
- **Fix:** Per Task 8 Step 1: CTAs → `bg-signal text-signal-text rounded-full px-6 py-3 hover:scale-[1.03]`; headings → Space Grotesk 700 within the scale; `bg-white dark:bg-black` wells → `bg-surface-dim`/`bg-surface`; drop `font-light`/`font-medium` display treatment; remove the emoji.

### I3 — Reduced-motion is not fully respected: `.reveal-up` + `#dashboard` still animate (DESIGN §13, §Animations)
- **File:** `components/scroll-animations.tsx`
- **What's wrong:** Only the trace-line draw is gated by `prefersReducedMotion` (L21–38). The `gsap.set(".reveal-up", { opacity: 0, y: "100%" })` (L15–18) and the section reveal timelines (L56–76) run **unconditionally**, and the `#dashboard` 3D un-tilt scrub (L40–54) also runs unconditionally. So under `prefers-reduced-motion: reduce`, every `.reveal-up` element is hidden then scroll-animated, and the hero console still performs a scroll-linked transform.
- **Why:** DESIGN §Accessibility: "Reduced motion respected everywhere"; plan Task 3: "Respect prefers-reduced-motion (leave the element visible)." Scroll-triggered translate/rotate is precisely the motion reduced-motion users opt out of.
- **Fix:** When reduced-motion: `gsap.set(".reveal-up", { opacity: 1, y: 0 })`, skip the section timelines, and skip/neutralize the `#dashboard` scrub (leave `scale:1, rotateX:0` from the start). (Also note: initial `opacity:0` in CSS/GSAP means content is invisible until JS + ScrollTrigger fire — add a no-JS/`@media` fallback so server HTML is readable.)

### I4 — Skip link does not skip navigation (DESIGN §13 "Skip link")
- **File:** `app/layout.tsx` (skip link L207–213; `<main id="content">` L220–223 contains `<Header />`)
- **What's wrong:** The skip link targets `#content`, but the `Header` lives **inside** that `<main>`, so "Skip to content" lands on the nav itself. Keyboard users gain nothing.
- **Why:** The skip link exists (good) but is functionally ineffective; DESIGN requires a working skip-to-content.
- **Fix:** Move `<Header />` outside `<main id="content">` (header sibling), or retarget the skip link to the first in-content landmark/section (e.g. `#hero-section` / `main > section:first-of-type`).

### I5 — FAQ accordion removes the focus indicator (DESIGN §13 "focus ring")
- **File:** `components/faq.tsx` L60 (`focus:outline-none`)
- **What's wrong:** The accordion `<button>` sets `focus:outline-none` and provides no replacement `focus-visible` ring.
- **Why:** Keyboard/screen-reader users get no visible focus target — a direct WCAG 2.4.7 violation and contradicts DESIGN's "focus ring `ring`".
- **Fix:** Remove `focus:outline-none` or add `focus-visible:ring-2 focus-visible:ring-signal/60 focus-visible:ring-offset-2 rounded-2xl` on the button.

### I6 — Mobile menu lacks `aria-expanded` and body scroll-lock (DESIGN §Interactive Behaviors)
- **File:** `components/header.tsx` (hamburger L128–138; mobile panel L143–190)
- **What's wrong:** The toggle button has `aria-label="Toggle mobile menu"` but no `aria-expanded`/`aria-controls`; opening the menu does not lock body scroll (no `body.modal-open`/`overflow:hidden`), so the page scrolls behind the open panel. Esc-to-close is implemented (L14–26) and link-click closes (good).
- **Why:** DESIGN §Interactive: "Mobile menu: slide with 500ms, Esc/close; body scroll lock." Without scroll-lock, long pages scroll behind the fixed panel; without `aria-expanded`, AT users get no state signal.
- **Fix:** Add `aria-expanded={isMobileMenuOpen}` + `aria-controls="mobile-menu"` on the button, and toggle `document.body.style.overflow = isMobileMenuOpen ? "hidden" : ""` in the open/close effect.

### I7 — Nested `<main>` landmarks on services pages (a11y / semantics)
- **Files:** `app/services/page.tsx` (L14 `<main>`), `app/services/[slug]/page.tsx` (L136 `<main className="min-h-screen bg-background">`)
- **What's wrong:** The root layout already renders `<main id="content">` (app/layout.tsx L220). Both services pages render a **second** `<main>` inside it → nested `main` landmarks, invalid per ARIA and confusing to screen-reader navigation.
- **Why:** Screen readers expose both `main` regions; the detail page's `<main>` also reintroduces shadcn `bg-background` over the token body background. (Related: the header returns `null` on `/services/[slug]` (header.tsx L40), so detail pages lose the global nav entirely — only a back-link remains. Consider keeping the header and using a standard layout wrapper instead.)
- **Fix:** Change both inner `<main>`s to `<div>`/`<section>` (keep the H1), and restyle against tokens.

### I8 — Services catalog muted-text/card styling drifts from the token system (scope item 1)
- **Files:** `components/services/services-catalog.tsx` (L144 search `bg-white/80 dark:bg-secondary/80`, L216–228 `text-muted-foreground`, L222 `border-border/30`), `app/services/[slug]/page.tsx` (L203–208, L226–244 `text-muted-foreground`), `app/services/layout.tsx`/page metadata use shadcn default.
- **What's wrong:** The new surfaces use `text-muted-ink` (the Hawiyat warm `--muted`); the services surfaces use shadcn `text-muted-foreground` (neutral gray). In dark mode the two are visibly different hues (`#8FA09A` vs `hsl(0 0% 63%)` ≈ `#A1A1A1`). Cards/search also use `bg-white/* dark:bg-secondary` rather than `bg-surface`.
- **Why:** Scope item 1 mandates the muted token consistently; the muted text is a brand-consistency signal across the whole site.
- **Fix:** Migrate services surfaces to `text-muted-ink`, `bg-surface`, `bg-surface-dim` and `border-border` so muted text and card chrome match the home/composer surfaces.

---

## MINOR

- **M1 — Page background is not `--paper`.** `app/globals.css` sets `body { background-color: hsl(var(--background)) }` (white / `220 8% 11%`) and `app/layout.tsx` L206 applies the legacy `hero-bg-gradient` (`--hero-gradient: #fcfcfc` light / `#18181B` gradient dark) plus `text-black dark:text-white`. DESIGN §Palette: page background = `--paper`. Light mode renders a slightly cool white rather than warm paper `#F7F6F3`. Fix: `body { @apply bg-paper text-ink }`, delete `hero-bg-gradient`/`--hero-gradient`, keep a token-based hero glow.
- **M2 — Footer still uses legacy CSS-var classes + gray/black text.** `components/footer.tsx` uses `.footer-link` (globals `--footer-link` vars), `text-black dark:text-white` (L43), `text-gray-700 dark:text-gray-300` (L89), and `/logo.png` while the header uses `/logo.svg`. Columns/copy are correct per DESIGN §15. Fix: `text-ink`/`text-muted-ink`, tokenize `footer-link` or replace with utilities, unify the logo asset.
- **M3 — Pricing section vertical rhythm is tight and uses a legacy shadow token.** `components/pricing.tsx` L76 `pt-8 pb-10 md:pt-12 md:pb-16` (DESIGN §Spacing: headline sections `py-24 md:py-32`) and `shadow-gray-950/5` (L133). Also the Enterprise CTA (L221–229) uses `bg-ink text-paper dark:bg-paper dark:text-ink` instead of the `--signal` primary per Global Constraint 3 — readable and token-based, but a third CTA variant; consider `bg-signal text-signal-text` for spec conformance.
- **M4 — Newsletter heading semantics reversed.** `components/newsletter.tsx`: the mono eyebrow is an `<h2>` (L48) while the actual headline is a `<p>` (L52). Make the headline the `<h2>` and the eyebrow a `<p>`/span.
- **M5 — WhatsApp widget pulse not reduced-motion gated and uses raw green.** `components/whatsapp-widget.tsx`: `animate-ping`/`animate-pulse` rings run under `prefers-reduced-motion` (only `.marquee-track` is disabled in globals.css); `bg-green-500` is not a token (DESIGN has `--ok`/`--signal`; brand-green may be intentional). Fix: add the media-query guard, or accept the brand-green and document it.
- **M6 — `categoryStyles` and tag badges use raw Tailwind palette colors** (`cyan/teal/violet`, L92–96 catalog) — covered by I1 but also present as non-token text/bg colors that survive even after gradients are removed.
- **M7 — FAQ section uses legacy percentage padding.** `components/faq.tsx` L43 `p-[5%] px-[10%]`; inner `max-w-3xl` constrains it, but the section-level percentage padding is a legacy pattern inconsistent with `py-16 md:py-24 px-6` elsewhere. Fix: normalize to `py-16 md:py-24`.
- **M8 — Services H1 size/weight off-spec.** `app/services/page.tsx` L20 `text-4xl md:text-6xl font-semibold` vs DESIGN H1 = `5xl`/700. Also the decorative top gradient on `/services` (L15–17) is a shadcn-`foreground` alpha blur; acceptable but could use `bg-signal/…`.
- **M9 — `services/[slug]`/`services` pages inherit `bg-background`** (shadcn) and lose the token `--paper` background, compounding M1.

---

## PASS (verified)

- **Tokens installed:** `app/globals.css` has the full light+dark Hawiyat set (hex + RGB companions); `tailwind.config.js` maps all tokens including `muted-ink`, keeps shadcn `muted.foreground`; `@layer base` borders use the new `--border`. **No raw hex** (`bg-[#…]`) in any component; `text-muted`/`bg-muted` not used in components (services pages use shadcn `muted-foreground` — see I8).
- **Typography:** exactly Space Grotesk + JetBrains Mono in `app/layout.tsx`; no `font-serif`/`font-thin`, no Ubuntu/Dancing Script/Playfair/Poly; mono used for eyebrows, telemetry, model chips, metadata.
- **Signature element:** `ExecutionTrace` renders correctly in the hero (via `ai-playground.tsx`) and `/composer`, with `bg-signal`/`text-signal-text` stage highlight, mono telemetry strip, and reduced-motion static state in the console. The `.trace-line` draw-on-scroll GSAP reveal is present and correctly gated by reduced-motion.
- **Home lean order:** Hero → Pricing (Pro | MAX switchable w/ `aria-pressed` | Enterprise) → Proof band → Algeria band → FAQ → CTA → Newsletter → Footer matches the plan; `WhatsAppWidget` + `ScrollAnimations` retained; no links to removed routes in nav/footer/sitemap.
- **CTA contrast:** `bg-signal text-signal-text` primary buttons compute ≈6.1:1 (light) and ≈8.1:1 (dark) — passes AA; `text-signal-contrast` on `bg-surface` ≈6.3:1. One H1 per page.
- **Proof band:** `100+`, `10+`, `100B+ tokens`, `≈2.6M DZD` — all verified per GC5 amendment; `≈` + `DZD` attached; no literal `TODO` strings; strikethrough/`originalPrice`/`launchNote` removed from data (types remain, values gone).
- **Services data de-resellerized:** Composer tiers + "AI Composer access" naming, `AI Execution`/`Managed Systems`/`Cloud Runtime` categories, JSON-LD ItemList names correct, no "Claude Code"/"LLM Credit"/"OpenAI credits" strings.
- **A11y hits:** FAQ `aria-expanded`/`aria-controls`, pricing `aria-pressed`, newsletter input `aria-label`, image alt text present, tap targets ≈44px on new surfaces, Esc closes mobile menu.
- **Build hygiene:** `npx tsc --noEmit` clean; `pnpm build` succeeds (home `/`, `/composer`, `/services`, `/services/[slug]`, `/about` all static/SSG).
- **Redirects:** `/hawiyat-composer`→`/composer`, `/ai-algeria`→`/` (308) present in `next.config.mjs`.

## Priority order to close FAIL → PASS
1. Rebuild `Header` on tokens + signal pill CTA (B1).
2. Remove purple/rainbow tag gradients and tokenize services catalog/detail/form cards (I1, I8).
3. Restyle `/about` CTAs, type scale, and image wells (I2).
4. Fix reduced-motion in `scroll-animations.tsx` (I3).
5. A11y batch: skip link (I4), FAQ focus ring (I5), mobile-menu aria/scroll-lock (I6), nested `<main>` (I7).
6. Minor sweep M1–M9.

## Not fully assessed
- No browser run (visual/motion/contrast are code-inferred; LCP/CLS/INP not measured). `app/services/[slug]` order-form/detail modal focus traps not audited in depth.
