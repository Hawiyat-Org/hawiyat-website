# Implementation Plan: AI-Agent Readiness (67 → 80+) + Analytics Activation

## Overview

Two parallel workstreams for hawiyat.org (Next.js 15 App Router, production on Vercel as `hawiyat-website` → www.hawiyat.org):

- **Workstream A — is-agentic score.** Live report (2026-09-09) scores **67/100** ("Important blockers remain"; user saw 63 on an earlier cached scan). 25 eligible checks: Essential 48.9/80 (5/9 passed), Recommended 15.3/20 (10/16 passed), Bonus +3. Ten findings, all with concrete fixes (4 essential, 6 recommended). This plan does NOT overwrite the existing PageSpeed plan (`tasks/plan.md` — preserved; its Phase 4 Task 8 overlaps on robots/llms fetchability and should be reconciled at implementation time).
- **Workstream B — analytics.** `posthog-js@^1.414.0` is already installed, initialized in `instrumentation-client.ts`, and events are coded in 5 components — but **it is a no-op in production** (`.env` lacks `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`/`HOST`). Meta Pixel fires unconsented on every page; `app/privacy/page.tsx` §12 promises a consent banner that does not exist; no `@vercel/analytics`, no `.env.example`, Chatwoot token unused, orphaned `public/meta-pixel.js`.

## Architecture Decisions

- **Keep PostHog as the primary stack (no new vendor).** Rationale: already instrumented + CSP-allowlisted in `next.config.mjs`, 1M events/mo free, covers pageviews/sources/funnels via Web Analytics, custom events free — versus Plausible ($9/mo) or Vercel Web Analytics (Hobby: 50k events/mo, custom events Pro-only). Reconsider only if the founder wants a second, founder-readable visitor counter (then Plausible, not GA4 — no Google Ads evidence; Meta is the ads platform).
- **Additive agent files, never renames.** Add standard-path `llms-full.txt` alias alongside existing `llmsfull.txt` (back-compat for existing links); add explicit AI-bot rules to `robots.ts` (wildcard `*` stays).
- **Consent-first analytics.** Banner gates Meta Pixel + PostHog persistence; PostHog runs `cookieless_mode: 'on_reject'` so analytics still flows denied-EU-safe. This closes the privacy-page legal gap and the unconsented-Pixel issue in one task.
- **Publish a real OpenAPI spec for the one real API** (`POST /api/orders`). Fixes 4 findings at once (openapi-spec, json-error-responses, api-schema-analysis, function-calling-compat). No fake `.well-known/*` files (ard/mcp/api-catalog stay absent — N/A is excluded from scoring, fakes would be worse).
- **Vercel wiring via CLI.** Local repo is not linked (`vercel link` needed); env vars set per-environment (production vs preview). EU-vs-US PostHog host is a founder decision (EU Frankfurt recommended for FR-diaspora traffic).

## Dependency Graph

```
A1 robots AI-bot rules ─┐
A2 llms-full.txt alias ─┤ independent, ship first (quick wins)
A6 /contact page ───────┘
         │
A3 openapi.json ──→ A4 JSON error shape ──→ (unblocks 4 findings)
         │
A5 Vary: Accept ──→ A8 404 markdown body
A7 llms.txt when-to-use (independent)
         │
Checkpoint A: rescan `npx is-agentic hawiyat.org` (note 6h cache)

B1 vercel link + env ──→ B2 PostHog hardening ──→ B3 pageview + /ingest proxy
         │                        │
         └─→ B4 consent banner ────┘ (gates Pixel + PostHog persistence)
                        │
               B5 events + .env.example ──→ B6 dashboards + verify
Checkpoint B: events flowing in PostHog, banner verified EU-safe
```

## Task List

### Phase A1: Agentic quick wins (independent, parallelizable)

- [ ] Task A1: robots.ts explicit AI-crawler rules
- [ ] Task A2: standard-path llms-full.txt alias + link fixes
- [ ] Task A6: /contact trust-anchor page (500+ chars)

### Checkpoint: Quick wins live
- [ ] `curl /robots.txt` shows GPTBot/ClaudeBot rules; `/llms-full.txt` 200; `/contact` 200

### Phase A2: API discoverability (sequential: A3 → A4)

- [ ] Task A3: publish openapi.json for POST /api/orders
- [ ] Task A4: standardize JSON error shape ({code, message, resolution})

### Checkpoint: API surface
- [ ] Spec valid OpenAPI 3.x; error curl returns JSON with code/message/resolution

### Phase A3: Negotiation + recovery + guidance (A5 → A8; A7 independent)

- [ ] Task A5: Vary: Accept on markdown responses
- [ ] Task A8: agent-friendly 404 markdown body
- [ ] Task A7: llms.txt "When to use" section

### Checkpoint: Rescan
- [ ] `npx is-agentic hawiyat.org --json` shows score delta (allow 6h cache); all 10 findings re-checked

### Phase B1: Analytics foundation (B1 → B2 → B3; B4 after B2)

- [ ] Task B1: vercel link + PostHog env wiring (US-vs-EU decision)
- [ ] Task B2: PostHog init hardening (cookieless on_reject, identified_only)
- [ ] Task B3: PostHogPageView + /ingest proxy (CSP-safe)

### Checkpoint: Analytics flowing
- [ ] PostHog receives $pageview + existing custom events from production

### Phase B2: Consent + taxonomy + dashboards

- [ ] Task B4: consent banner gating Meta Pixel + PostHog (privacy §12 compliance)
- [ ] Task B5: event taxonomy completion + .env.example + third-party cleanup
- [ ] Task B6: dashboards (visitors, sources, funnels) + verification

### Checkpoint: Complete
- [ ] Banner verified (accept/deny paths); dashboards answer "how many users enter, from where, what they do"; human review before deploy

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| is-agentic score cached (6h) / methodology shifts → rescan shows stale score | Low | Note scan timestamp; re-check after 6h; track per-check pass/fail, not just headline score |
| EU↔US PostHog host migration loses history | Med | Founder decides before B1; default EU for new project, keep US only if history matters |
| /ingest proxy + CSP breaks events | Med | Keep `*.posthog.com` allowlist until proxy verified, then tighten; verify in preview first |
| Consent banner scope creep (CMP vendor vs first-party) | Med | First-party minimal banner tied to privacy §12 promise; no third-party CMP dependency |
| Overlap with PageSpeed plan (robots/llms Task 8, Meta Pixel TBT) | Low | Reconcile with `tasks/plan.md` at implementation; keep Pixel lazyOnload; no CSP weakening |
| Publishing .well-known fakes to chase bonus | Med | Forbidden: only real surfaces get catalog files; bonus is capped +5 anyway |

## Decisions (recorded 2026-09-09, plan approved)

- PostHog host: **US Cloud** (`https://us.i.posthog.com`) — preserves existing event history.
- Meta Pixel: **keep, gated behind the consent banner** (Task B4) — FB ads conversion retained, EU-safe.
- Second counter: **PostHog only** as source of truth — no Plausible/Vercel WA.
- Chatwoot (Task B5): **remove, do not wire.** `NEXT_PUBLIC_CHATWOOT_TOKEN` exists only in local env files (`env.example` never listed it) and is read by no code anywhere in the repo. Wiring a widget would add a third-party script, a CSP allowlist, and consent-banner scope (B4 covers only Meta Pixel + PostHog) with zero current usage. The instrumented WhatsApp widget (`whatsapp_contact_started`) stays the support channel. Action taken: token reference removed from `AGENTS.md`, `CLAUDE.md`, and local `.env`/`.dev.vars`. The `chatwoot` entry in `public/hawiyat_templates.json` is a hosted-product template offering, not the chat-widget token, and is kept.
- Remaining access needed at implementation: PostHog project access + `vercel link` auth.

## Open Questions (need human input before implementation)

- PostHog host: stay US (`us.i.posthog.com`, existing code default) or move EU Cloud (Frankfurt) for FR-diaspora/GDPR posture?
- Meta Pixel: keep (FB ads conversion) gated behind consent, or remove?
- Second visitor-counter (Plausible/Vercel WA) wanted, or PostHog alone as source of truth?
- Who owns the PostHog project (invite/access) and the Vercel project link (`vercel link` auth)?
- Contact page: which email/phone/address/response-time copy is canonical?

## Parallelization

- Safe to parallelize: A1, A2, A6, A7 (independent files); B5 taxonomy additions per component.
- Must be sequential: A3→A4 (spec before error-shape conformance proof); B1→B2→B3 (env before init before proxy verify); B4 after B2 (consent signal shared).
- Needs coordination: CSP edits (`next.config.mjs`) shared by B3 proxy + any new vendor script — single owner.
