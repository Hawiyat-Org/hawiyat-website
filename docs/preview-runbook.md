# Hawiyat Branch Previews — Runbook

Cloudflare Workers branch previews for the Hawiyat website (Next.js 14 → OpenNext).

## How it works

- Every pull request deploys `hawiyat-preview-<slug>` (slug = lowercase branch
  name, `[a-z0-9-]`, ≤40 chars) to `https://hawiyat-preview-<slug>.shmsaldynbwbst.workers.dev`
  via `.github/workflows/preview-deploy.yml` (deploy job) and comments
  `https://<slug>.preview.hawiyat.org`.
- `hawiyat-preview-router` maps `<slug>.preview.hawiyat.org` → the branch worker
  by hostname. Requires ONE wildcard DNS record (see below).
- Closing the PR deletes the branch worker (teardown job).

## Manual commands

```bash
# build the OpenNext worker (run inside tmux — takes ~3 min)
pnpm exec prisma generate
pnpm exec opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion

# deploy a branch worker manually (example slug: test)
pnpm exec wrangler deploy --name hawiyat-preview-test

# set a secret (repeat per secret; values from the main .env)
printf '%s' "$DATABASE_URL" | pnpm exec wrangler secret put DATABASE_URL --name hawiyat-preview-test

# delete a branch worker
pnpm exec wrangler delete --name hawiyat-preview-test
```

## One-time setup (already done 2026-08-08)

| Item | Value | Where |
|---|---|---|
| Router worker | `hawiyat-preview-router` (workers/preview-router/) | deployed |
| Zone route | `*.preview.hawiyat.org/*` → router (zone `afa54725…25d`) | deployed |
| Wildcard DNS | `AAAA *.preview.hawiyat.org → 100::` proxied | **dashboard, manual** |
| GH secrets | 10 set via gh (DB, SMTP, Telegram, account id) | repo settings |
| Missing secrets | `CLOUDFLARE_API_TOKEN` (Workers Scripts:Edit + Routes:Edit), `GEMINI_API_KEY` | user-created |

## Known issue: DB-backed endpoints on Workers

Pages render; `app/api/schedule/*` + `app/api/waitlist` currently fail on workerd
(`prisma:error t2 is not a constructor`). The schema was fixed (ADR-5) and the
Node path is proven — see `test/node-db-check.ts`:

```bash
set -a && source .env && set +a
pnpm exec tsx test/node-db-check.ts
```

The remaining gap is Prisma's pg driver under the workerd bundle. Options:
Hyperdrive (Workers Paid), per-request client + `maxUses: 1`, or accept
pages-only previews until resolved. See `docs/adr/2026-08-08-cloudflare-preview-decisions.md` (ADR-4).

## Known issue: theme-init script error (`__name is not defined`)

Browser smoke (Playwright/Chromium, 2026-08-08) on the deployed preview found a
client-side console error on every page:

```
ReferenceError: __name is not defined
```

It fires in the `next-themes` inline theme-init `<script>` in the document
`<head>`. The OpenNext build minifies that inline script with esbuild
`keepNames` but drops the `__name` helper definition (verified: the helper is
absent from the served HTML; `__name` is not in `next-themes` source nor app
code). Effect: the pre-hydration theme class isn't applied — a brief wrong-theme
flash until React hydrates.

**Verdict:** cosmetic, preview-only. Hydration and interactivity work (Next
router present, theme toggle functions). Vercel prod is unaffected (Next.js SWC
build does not produce `__name`). Tracked as an OpenNext build artifact.

## Troubleshooting

- **Preview 404s:** branch worker deleted? re-run deploy. Router down? re-deploy
  from `workers/preview-router/`.
- **Branded URL not resolving:** the wildcard DNS record is missing — check
  dashboard → hawiyat.org → DNS.
- **wrangler auth:** OAuth token is refreshed automatically by wrangler; raw API
  calls with the stored token fail after expiry — always use `wrangler` commands.
