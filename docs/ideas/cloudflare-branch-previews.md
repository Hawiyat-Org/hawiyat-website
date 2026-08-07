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
