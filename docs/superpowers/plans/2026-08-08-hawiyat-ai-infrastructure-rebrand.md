# Hawiyat AI-Infrastructure Rebrand & Design-System Overhaul — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shift Hawiyat's digital identity from a "cheap AI subscription / VPS reseller" to an **AI infrastructure platform — the execution layer between frontier models and business systems** — and apply the full design system across the site.

**Architecture:** Rewrite the brand on a "control-plane" visual language: a live *execution trace* as the signature element, dark-mineral + warm-paper palette with a single verdigris signal and warm amber accent, Space Grotesk + JetBrains Mono type, and story-driven sections that mirror the vision report's four-layer model (AI Core → Models → Execution → Business Systems). Priority: HR manual (AGENTS.md / DESIGN.md) first, then site implementation task-by-task.

**Tech Stack:** Next.js 15 (App Router) • React 18 • TypeScript • Tailwind CSS • Prisma/Postgres • shadcn/ui • Framer Motion (keep existing GSAP ScrollTrigger; consolidate) • lucide-react (drop Bootstrap Icons CDN).

---

## Strategic Context (from Vision Report + conversation)

- Hawiyat = **model-independent, business-system-agnostic** execution layer. 90% of revenue today is Composer (LLM-cost optimizer); the pivot is to position Composer as the **AI execution engine**: *task → classify → plan → select model → select context → select tools → execute → evaluate → return result*.
- The Moat = execution intelligence + evaluation data + workflow intelligence + switching costs — **not** n8n/Evolution/Docker (commodity).
- Geography: Algeria wedge → North Africa → MENA → global. Pricing in **DZD**, local support.
- Vision north star: *"Whatever AI exists tomorrow, businesses will need a layer that decides how to use it."*
- The website must *demonstrate* the vision, not just claim it.

---

## Global Constraints

1. **Positioning (copy hard rule):** Never sell "cheap Claude" or "LLM optimization." Sell *"Hawiyat executes your business task using the best combination of models, context, tools, and workflows — and learns from every run."*
2. **Model-agnostic:** Copy and visuals must feature GPT/Claude/Gemini/open models as interchangeable routes, never a single vendor.
3. **Palette is tokenized:** All colors come from a named token set below. No raw hex in components (audit & replace current `bg-[#14…]`, `#1a1a1a`, etc.).
4. **Fonts:** Exactly two families — Space Grotesk (display+body) and JetBrains Mono (labels/data/pipelines/code). Remove Ubuntu, Dancing Script, Playfair, Poly references from DESIGN.md and layout.
5. **Icons:** lucide-react via shadcn. Bootstrap Icons CDN is removed from DESIGN.md (must be stripped from `app/layout.tsx` + components during implementation).
6. **Dark mode** via `.dark` class (Tailwind `darkMode:'class'`), both modes fully supported.
7. **Signature element:** The **Execution Trace** — a live pipeline visualization (task enters → plan → route → execute → evaluate → result) used in the hero and as the section thread. This is the one memorable, non-templated element.
8. **Accessibility:** WCAG contrast ≥ 4.5:1, reduced-motion respected, keyboard-visible focus.
9. **Measurable outcome:** visitor can state *in one sentence* "Hawiyat is the execution layer between AI models and business." No claim in copy without a working equivalent in the product UI/panel.

---

## Part 0 — Contact the docs (this deliverable — DONE in this session)

### Phase A — Brand Vision System (executed TOP-DOWN)
- Define identity tokens, typography, palette, layout language, signature element, copy voice.
- Update `DESIGN.md` — complete rewrite per the system below.
- Update `AGENTS.md` — rewrite to reflect AI-first identity, new architecture clusters, commands unchanged, fonts/tokens noted, new pages.

### Phase B — Site implementation (later, after review)
- Apply to `app/`, `components/`, `app/globals.css`, `tailwind.config.js`.

---

## Design System (the "control-plane" identity)

### A. Design Tokens
- **Light (paper):** base `--paper: #F7F6F3`, ink `#0B0F0E`, surface `#FDFCFA`, border `#E4E2DC`, muted `#62665F`.
- **Dark (night):** base `--paper: #0A0F0E`, ink `#EDF2EF`, surface `#111817`, border `#242B28`, muted `#8FA09A`.
- **Signal (primary action/accent):** `--signal: #16A085` (light) / `#2EE6B6` (dark) — "execution verdigris".
- **Ember (secondary/warm/amber for local & cost):** `--ember: #B06A21` (light) / `#F2A23B` (dark).
- **Keo (tertiary, subtle per-model variance):** keep small; optional micro-accent `#7C4DDB`-avoid → not used. (Palette intentionally NOT the purple-gradient AI-default.)
- Semantic success/warn/danger from standard scale.

### B. Typography
- Display + Body: Space Grotesk 300–700 (load via `next/font` variable `--font-space`).
- Data/metadata/eyebrows/labels/pipeline: JetBrains Mono (add `--font-mono`).
- Type scale: hero 7xl, H1 5xl, H2 4xl, H3 3xl, H4 2xl, body lg/base, small, xs (divert default is fine); mono used at sm/xs for metadata.

### C. Signature — The Execution Trace
- A thin progress strip: `UNDERSTAND → PLAN → ROUTE → EXECUTE → EVALUATE → RESULT` with live mono metadata (model, ctx, cost, latency, quality).
- Used as: hero ambient, section transition thread, loading skeletor metaphor.
- Accompany a "task card" chip (e.g. "Customer support reply on WhatsApp").

### D. Layout language
- Generous whitespace (base 4, common 4..128), section padding py-20→py-32.
- Hero: dark/ink canvas with execution console mock; light mode conditionally swapped.
- Grid: 12-col with two-zone banding (title/sticky ASIDE + content), cards rounded-3xl / border token.
- Buttons: primary = solid pill with signal, hover scale-1.03; secondary outline.

### E. Copy voice
- Builders/mid-market; English primary. Tone: "The cloud that runs your AI operations." active voice, no "cheap", no "deploy super fast".
- Use concrete numbers (DZD, tokens, latency) as design elements, not decoration.

---

## Information Architecture (target)

- `/` — **Execution-layer hero + AI Core diagram + Composer engine + "Any model. Any system." + telemetry + pricing in DZD + testimonial + FAQ + CTA + newsletter**
- `/composer` — Composer execution engine detail (loop, cache, routing, eval) [rename path from `/hawiyat-composer` to `/composer` w/ redirect]
- `/ai-algeria` — all-Africa positioning (keep, revamp copy)
- `/services` — catalog of 5 + (n8n Hosting, Claude Code, WhatsApp API, Monitoring, Evolution API, Cloud) new DZD pricing model
- `/schedule` — booking (keep)
- `/templates` — keep
- `/about`, `/cyber-security`, `/guides/*`, legal — keep, styling refresh
- New dataset: company metrics/ops-str — this is a marketing site only; no new DB tables needed.

---

## Component task list (implementation, later phase)

- [ ] `token-engine` → `globals.css` mirrors tokens as CSS vars + Tailwind maping
- [ ] `hero-section` → Execution-Trace hero rework with console panel (retain GSAP dashboard 3D)
- [ ] `ai-playground` → becomes "Execution Console" (live pipeline, model chip, ctx/cost/latency), NOT a chat-only mock
- [ ] `benefits-section` → "AI Execution Layer" 4 cards (Understand/Plan/Execute; Cost/Fallbacks; Evaluations; Tiering)
- [ ] `prebuilt-tools` → "Composer Engine" 6 items ((Model Gateway, Context, Tools, Reliab., Eval, Cost Ctrl)
- [ ] `additional-features` → "Future-arrow" business systems integrations (WhatsApp, CRM, ERP, Email, DB, n8n, Agents)
- [ ] `one-subscription` → reposition as comparison vs DIY multi-tool (keep table)
- [ ] `pricing` → Composer plans in DZD + simple, transparent "never vendor-locked" messaging
- [ ] `resources`/`trusted-brands`/`faq`/`call-to-action`/`newsletter`/`footer`/`header` → restyle, refresh copy; header nav to new IA
- [ ] `header` nav items → new IA; theme toggle; get class names aligned to tokens
- [ ] Bootstrap Icons → lucide shadcn swap in `layout.tsx` + components

---

## Task List (this session, DONE below)

- [x] Dispatch 3 parallel research agents (codebase, DigitalOcean influence, AI-infra design trends)
- [x] Synthesize report + define identity
- [x] Write this plan to `docs/superpowers/plans/2026-08-08-hawiyat-ai-infrastructure-rebrand.md`
- [x] Rewrite `DESIGN.md` with the full design system + IA + copy + guidelines
- [x] Rewrite `AGENTS.md` for AI-infrastructure architecture (commands, conventions, token rules)

## Review gate
- User to review the two docs and this plan; then either:
  1. **Approve → implement** (tokens/globals.css first; then component remap in the task list above).
  2. **Adjust** → iterate docs until approved.