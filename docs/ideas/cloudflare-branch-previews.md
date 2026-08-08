# Cloudflare Branch Previews (Wrangler)

## Problem Statement

> How Might We give every Hawiyat branch a fully-functional preview on Cloudflare Workers (via Wrangler) — with branded URLs, full parity with the Vercel production app, and zero risk to production — so the team can validate the OpenNext/Cloudflare path before ever trusting it with prod?

The honest framing: Vercel already ships branch previews. The real goal is **de-risking a future Cloudflare migration** — previews are the vehicle, not the destination. Everything below serves that.

## Recommended Direction

**A: Canonical per-branch Workers** — one Worker per PR, full functional parity, auto-deploy + auto-teardown from GitHub Actions.

- Build: `@opennextjs/cloudflare@^2` (pin v2 — it targets Next.js 13.4–14; v3 requires Next 15/16) turns the app into a deployable Worker.
- DB: **Prisma driver adapter** (`@prisma/adapter-pg`) + a **Hyperdrive** binding pointing at the shared production PostgreSQL. This is the only way Prisma 6 runs on Workers; the default engine does not.
- Runtime: `nodejs_compat = "v2"` in `wrangler.toml` covers the Node APIs nodemailer, Gemini, and Prisma need.
- URLs: each branch deploys as Worker `hawiyat-preview-<slug>` routed to `<slug>.preview.hawiyat.com` (wildcard DNS on a CF-managed zone).
- CI: one GitHub Actions workflow — on `pull_request`: build → `wrangler deploy` → post GitHub **status check + comment with the URL**; on close/merge: `wrangler delete` + remove route.
- Env/secrets (`GEMINI_API_KEY`, email creds, `NEXT_PUBLIC_*`): set once per Worker via `wrangler secret` / env bindings; a `PREVIEW_MODE=true` flag distinguishes preview-created data.

Why A over the alternatives: B (router Worker in front) is gold-plating for an internal, no-auth audience — revisit only if previews go client-facing. C (single Worker, version-pinned routes) is fragile (version caps, shared secrets) and saves nothing.

## Key Assumptions to Validate

- [ ] **OpenNext v2 builds this app** — Next 14.2 + 10 Node-runtime API routes + Prisma + nodemailer. *Validate:* spike-build one branch (`opennextjs-cloudflare@^2`) before writing the workflow. Hardest dependency pin in the whole project.
- [ ] **Prod Postgres is reachable from Cloudflare** — Hyperdrive needs a working connection to the DB host from CF's network (public endpoint or tunnel). *Validate:* create the Hyperdrive binding and run one real query through it. **Biggest single risk.**
- [ ] **QA writes to prod DB are acceptable** — a tester creating a booking/order writes real rows. *Validate:* `PREVIEW_MODE=true` suffixes/flags preview-created data so it's filterable and deletable.
- [ ] **nodemailer behaves on workerd** — `nodejs_compat v2` covers net/tls, but email is the most likely misbehaver. *Validate:* spike; fallback = fetch-based send (Resend or similar) for previews only.
- [ ] **`*.preview.<zone>` wildcard DNS exists** — which zone (`hawiyat.cloud`?), is it CF-managed, who controls it.
- [ ] **The "why" is shared** — the team agrees this is a CF-readiness exercise. If nobody's evaluating Cloudflare for prod, this is infrastructure for its own sake.

## MVP Scope

- `wrangler.toml` (envs, `nodejs_compat`, Hyperdrive binding, route patterns) + OpenNext config pinned for Next 14.
- Prisma 6 driver adapter (`@prisma/adapter-pg`) wired through `lib/prisma/prismaClient.ts` (named-import convention preserved).
- `PREVIEW_MODE` env: data flagging + preview-only email stubbing.
- One GitHub Actions workflow: PR → build + deploy + status check + URL comment; close/merge → teardown.
- README runbook: manual `wrangler dev` / `deploy` / `delete` commands and troubleshooting.
- Spike gate before the workflow exists: OpenNext build succeeds → one route works end-to-end via Hyperdrive.

## Not Doing (and Why)

- **Per-branch databases (Neon branching)** — you chose shared prod DB; per-branch isolation is real orchestration cost with no internal-team payoff right now.
- **Auth/WAF on previews** — internal team, obscure branded subdomains; skip Cloudflare Access. Revisit if previews ever go client-facing (add a router Worker then).
- **Migrating production off Vercel** — out of scope by design; this is the dress rehearsal, not the show.
- **Cloudflare Pages** — Pages doesn't run the Node runtime routes (Prisma/nodemailer) without painful contortions; Workers + OpenNext is the supported path.
- **Slack notifications / audit logs / analytics on previews** — noise for an internal workflow; GitHub status check + comment is enough.
- **Monitoring parity on previews** — previews are throwaway; prod monitoring stays on Vercel for now.

## Open Questions

- Which DNS zone owns the app (`hawiyat.cloud`?), and is it already on Cloudflare? Wildcard subdomain needed.
- Branch convention: every PR, or only `feature/*`?
- Preview email behavior: real sends or stub until the nodemailer spike settles it?
- Workers plan: Hyperdrive is a **Paid-plan** feature (~$5/mo) — confirmed budget?

---

## Status (2026-08-08) — intent CONFIRMED and largely shipped

**What landed** (branch `feat/cloudflare-workers-migration`, all reviewed):
- Spike gate passed: full Next 14.2.33 app builds to a Worker (`@opennextjs/cloudflare` 1.20.2).
- Router + test branch worker deployed and live (pages 200 on the real edge).
- CI workflow (deploy/comment/teardown) committed.
- 10/12 GitHub secrets set via gh (missing `CLOUDFLARE_API_TOKEN`, `GEMINI_API_KEY` — user-created).
- **Schema bug found & fixed** (ADR-5): 6 booking models were missing from `schema.prisma` — the booking/schedule/waitlist endpoints were 500ing on Vercel prod too. Restored from Neon introspection; Node path proven.

**Still open:**
- Wildcard DNS record `*.preview.hawiyat.org` (AAAA `100::`, proxied) — one manual dashboard step (token is zone-read-only; wrangler has no DNS command).
- DB-backed endpoints on workerd: `prisma:error t2 is not a constructor` after the WASM engine fix — direct connection is one bundling bug from green; official production pattern is Hyperdrive (Workers Paid). See ADR-4.
- PR to `main` (fixes prod booking via the schema restore).

**Refinements vs the original one-pager:**
- Domain is `hawiyat.org` (not hawiyat.cloud); zone already on Cloudflare DNS, Free plan.
- Account: `hawiyat-team`, workers.dev subdomain `shmsaldynbwbst`.
- DB is Neon (pooled endpoint) — pooler question settled, no PgBouncer needed.
- Direct-connection test was correct to attempt; the repo schema bug (not Cloudflare) was the first real blocker.
