# Todo — AI-Agent Readiness + Analytics Activation

Gate (every task): `npx tsc --noEmit` exit 0 · `pnpm lint` 0 errors · `pnpm build` succeeds · no em dashes · no a11y/CSP/identity regressions · existing `tasks/plan.md` (PageSpeed) untouched.
Rescan command: `npx is-agentic hawiyat.org --json` (note: cached snapshot, ~6h freshness).

## Phase A1: Agentic quick wins (parallel)

- [ ] Task A1: robots.ts explicit AI-crawler rules
  - Description: Add named User-agent rules (GPTBot, ClaudeBot, OAI-SearchBot, PerplexityBot, Google-Extended, CCBot) allowing `/` and disallowing `/api/`, `/admin/`, `/_next/` to `app/robots.ts`, keeping the `*` rule and sitemap/host.
  - Acceptance criteria:
    - [ ] `curl -s https://www.hawiyat.org/robots.txt` contains GPTBot and ClaudeBot stanzas
    - [ ] `/api/` still disallowed for all listed agents
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: curl robots.txt shows named rules + sitemap line
  - Dependencies: None
  - Files likely touched:
    - `app/robots.ts`
  - Estimated scope: XS (1 file)

- [ ] Task A2: standard-path llms-full.txt alias + link fixes
  - Description: Serve the full agent file at the spec path `/llms-full.txt` (route aliasing the `public/llmsfull.txt` content), fix `public/llms.txt` links to reference it, and advertise it in `app/layout.tsx` `<head>` alongside the existing llms.txt alternate link.
  - Acceptance criteria:
    - [ ] `curl -s -o /dev/null -w "%{http_code}" https://www.hawiyat.org/llms-full.txt` → 200
    - [ ] Old `/llmsfull.txt` still 200 (back-compat)
    - [ ] llms.txt links resolve (no 404s)
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: curl both paths 200; view-source shows both alternate links
  - Dependencies: None
  - Files likely touched:
    - `app/llms-full.txt/route.ts` (new)
    - `public/llms.txt`
    - `app/layout.tsx`
  - Estimated scope: S (2-3 files)

- [ ] Task A6: /contact trust-anchor page (500+ chars)
  - Description: Add `app/contact/page.tsx` (via `createMetadata`) with real contact content: email, phone/WhatsApp, Algiers address, languages, response-time expectations; link it from footer so crawlers and agents find it.
  - Acceptance criteria:
    - [ ] `/contact` returns 200 with ≥500 chars of contact info
    - [ ] Linked from footer (or layout nav)
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: curl /contact 200; footer contains /contact link
  - Dependencies: None
  - Files likely touched:
    - `app/contact/page.tsx` (new)
    - `components/footer.tsx`
  - Estimated scope: S (2 files)

### Checkpoint: Quick wins live
- [ ] robots.txt shows named AI rules; /llms-full.txt 200; /contact 200

## Phase A2: API discoverability (A3 → A4)

- [ ] Task A3: publish openapi.json for POST /api/orders
  - Description: Publish a valid OpenAPI 3.x spec at `/openapi.json` describing `POST /api/orders` (request schema, 200/400/429/500 responses with JSON error refs, operationId, descriptions). This one artifact resolves 4 findings (openapi-spec, json-error-responses discovery, api-schema-analysis, function-calling-compat).
  - Acceptance criteria:
    - [ ] `/openapi.json` returns 200 and parses as OpenAPI 3.x (`jq .openapi`)
    - [ ] Spec documents POST /api/orders with typed schemas + operationId
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: curl + jq validate; npx is-agentic finding #2 re-checked
  - Dependencies: None (unblocks A4)
  - Files likely touched:
    - `app/openapi.json/route.ts` (new)
  - Estimated scope: S (1-2 files)

- [ ] Task A4: standardize JSON error shape
  - Description: Conform all API error responses to `{ error: { code, message, resolution } }` in the orders route (and any future routes), matching the published spec's error refs.
  - Acceptance criteria:
    - [ ] `POST /api/orders` with `{}` returns JSON with error.code + error.message + error.resolution (not bare string, not HTML)
    - [ ] 429 path returns the same shape
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: curl POST {} and inspect JSON shape
  - Dependencies: A3
  - Files likely touched:
    - `app/api/orders/route.ts`
    - `app/openapi.json/route.ts`
  - Estimated scope: S (1-2 files)

### Checkpoint: API surface
- [ ] Spec valid; error curl returns code/message/resolution JSON

## Phase A3: Negotiation + recovery + guidance

- [ ] Task A5: Vary: Accept on markdown responses
  - Description: Send `Vary: Accept` (plus existing encodings) on markdown-serving responses (`/pricing.md`, `/llms*.txt`) so the markdown-negotiation check passes; set `Content-Type: text/markdown; charset=utf-8` explicitly in the route handler(s).
  - Acceptance criteria:
    - [ ] `curl -sI -H "Accept: text/markdown" https://www.hawiyat.org/pricing.md` includes `Vary: Accept`
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: curl -I shows Vary + markdown content-type
  - Dependencies: None (pairs with A8)
  - Files likely touched:
    - `middleware.ts` and/or markdown route handler(s)
    - `next.config.mjs` (headers, if that is where Vary is set)
  - Estimated scope: S (1-2 files)

- [ ] Task A8: agent-friendly 404 markdown body
  - Description: When a nonexistent path is requested with `Accept: text/markdown`, return the real 404 status with a short markdown body (apology + links to `/`, `/sitemap.xml`, `/llms.txt`, `/contact`); HTML 404 (`app/not-found.tsx`) unchanged.
  - Acceptance criteria:
    - [ ] `curl -s -o /dev/null -w "%{http_code}" https://www.hawiyat.org/definitely-not-a-page` → 404
    - [ ] Same URL with `Accept: text/markdown` returns markdown body with recovery links
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: both curl variants above
  - Dependencies: A5 (shared Vary/negotiation approach)
  - Files likely touched:
    - `middleware.ts` or `app/[...not-found]/route.ts` (new)
    - `app/not-found.tsx` (read-only reference)
  - Estimated scope: M (2-3 files)

- [ ] Task A7: llms.txt "When to use" section
  - Description: Add an explicit "When to use Hawiyat (for agents)" section to `public/llms.txt`: best-fit use cases (Algeria billing in DZD, WhatsApp/CRM execution, model-agnostic routing) and how an agent should direct the user (composer page, pricing.md, contact), satisfying the agent-instruction check.
  - Acceptance criteria:
    - [ ] llms.txt contains a when-to-use section naming use cases + next-step links
  - Verification:
    - [ ] Build succeeds: `pnpm build` (static file, trivially)
    - [ ] Manual check: curl llms.txt shows the section
  - Dependencies: None
  - Files likely touched:
    - `public/llms.txt`
  - Estimated scope: XS (1 file)

### Checkpoint: Rescan
- [ ] `npx is-agentic hawiyat.org --json` re-run; per-finding pass/fail recorded (allow 6h cache)
- [ ] Review with human before proceeding to Phase B

## Phase B1: Analytics foundation (B1 → B2 → B3)

- [ ] Task B1: vercel link + PostHog env wiring
  - Description: Link the local repo to the Vercel `hawiyat-website` project (`vercel link`), then set `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` + `NEXT_PUBLIC_POSTHOG_HOST` for production (and preview). Host choice (US vs EU Frankfurt) per founder answer; record the decision in the plan.
  - Acceptance criteria:
    - [ ] `vercel env ls` shows both vars for production (values redacted in reports)
    - [ ] Host decision recorded (US or EU) with rationale
  - Verification:
    - [ ] Manual check: `vercel env ls` output; redeploy picks up vars
    - [ ] Manual check: production page source contains the PostHog host
  - Dependencies: Open question 1 answered (US vs EU)
  - Files likely touched: none (Vercel project config only)
  - Estimated scope: XS (no code)

- [ ] Task B2: PostHog init hardening
  - Description: Harden `instrumentation-client.ts`: `cookieless_mode: 'on_reject'`, `person_profiles: 'identified_only'`, keep `capture_exceptions: true`; keep defaults otherwise. No behavior change for denied-consent visitors (cookieless event flow preserved).
  - Acceptance criteria:
    - [ ] Denied-consent visitor still produces cookieless events; accepted visitor uses persistence
    - [ ] No PII (email/phone) sent in PostHog properties
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: PostHog debugger shows events with/without cookies per consent state
  - Dependencies: B1
  - Files likely touched:
    - `instrumentation-client.ts`
  - Estimated scope: XS (1 file)

- [ ] Task B3: PostHogPageView + /ingest proxy (CSP-safe)
  - Description: Add a `PostHogPageView` client component (Suspense) in the root layout for App Router soft-navigation pageviews, and add a `/ingest` rewrite proxy in `next.config.mjs` for adblocker resilience; keep `*.posthog.com` CSP entries until the proxy is verified, then tighten.
  - Acceptance criteria:
    - [ ] Client-side navigations (e.g. / → /composer) each emit $pageview
    - [ ] Events flow via `/ingest` (same-origin) in production
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: PostHog live events during navigation; no CSP console violations
  - Dependencies: B2
  - Files likely touched:
    - `components/posthog-pageview.tsx` (new)
    - `app/layout.tsx`
    - `next.config.mjs`
  - Estimated scope: M (3 files)

### Checkpoint: Analytics flowing
- [ ] PostHog receives $pageview + order/pricing/whatsapp events from production

## Phase B2: Consent + taxonomy + dashboards

- [ ] Task B4: consent banner gating Meta Pixel + PostHog
  - Description: Build a minimal first-party consent banner (accept/deny, persisted choice, re-open control) that gates the Meta Pixel `<Script>` and PostHog persistence; satisfies the `app/privacy/page.tsx` §12 promise. Keep Pixel `lazyOnload`; remove or gate the orphaned `public/meta-pixel.js` (delete if unused).
  - Acceptance criteria:
    - [ ] Denied: no fbq network calls, PostHog cookieless only
    - [ ] Accepted: Pixel PageView + full PostHog fire
    - [ ] Choice persists across reloads; banner re-openable
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: network tab for both paths; privacy page promise matches behavior
  - Dependencies: B2 (shared consent signal)
  - Files likely touched:
    - `components/consent-banner.tsx` (new)
    - `app/layout.tsx`
    - `public/meta-pixel.js` (delete or gate)
  - Estimated scope: M (3-4 files)

- [ ] Task B5: event taxonomy completion + .env.example + cleanup
  - Description: Add missing analytics events (pricing PRO/MAX/Enterprise toggle, MAX sub-tier select, service page view, outbound WhatsApp/CTA clicks) reusing the safe `track()` wrapper pattern from `credits-calculator.tsx`; create the missing `.env.example` (PostHog vars, Chatwoot, WhatsApp number); decide Chatwoot (wire it or remove the unused token).
  - Acceptance criteria:
    - [ ] Toggle/select events fire with service/tier props; no uncaught tracking errors (try/catch)
    - [ ] `.env.example` exists and matches required env; AGENTS.md claim becomes true
    - [ ] Chatwoot decision recorded (wired or token removed)
  - Verification:
    - [ ] Build succeeds: `pnpm build`
    - [ ] Manual check: PostHog live events for each new interaction
  - Dependencies: B3 (pageview/proxy pattern), B4 (consent gating applies to new events)
  - Files likely touched:
    - `components/pricing.tsx`
    - `components/services/service-order-form.tsx`
    - `components/whatsapp-widget.tsx`
    - `.env.example` (new)
    - `.env` (local only, never commit secrets)
  - Estimated scope: M (4-5 files)

- [ ] Task B6: dashboards + verification
  - Description: Build PostHog insights answering "how many users enter, from where, what they do": visitors/pageviews trend, top pages, referrers/UTM sources, order funnel (view → open → submit), pricing selection breakdown, WhatsApp contact rate. Verify end-to-end in production.
  - Acceptance criteria:
    - [ ] Dashboard answers: daily visitors, traffic sources, top pages, order conversion, plan mix
    - [ ] UTM guidance documented (how campaigns get attributed)
  - Verification:
    - [ ] Manual check: dashboard screenshots/URLs shared; test visit appears within minutes
  - Dependencies: B5
  - Files likely touched: none (PostHog project config) + optional `docs/analytics.md`
  - Estimated scope: S (config + short doc)

### Checkpoint: Complete
- [ ] All acceptance criteria met; dashboards live; human review before deploy
- [ ] Reconcile overlap with `tasks/plan.md` Phase 4 Task 8 (robots/llms) and Meta Pixel TBT decision
