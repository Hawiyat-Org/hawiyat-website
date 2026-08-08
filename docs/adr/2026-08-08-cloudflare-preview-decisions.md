# ADR — Cloudflare Branch Previews (2026-08-08)

Status: Accepted (context: `docs/plans/2026-08-07-cloudflare-branch-previews.md`)

## ADR-1: Per-branch Workers + router for branded URLs

**Decision:** Each PR deploys its own app Worker (`hawiyat-preview-<slug>` on the
account `workers.dev` subdomain). A single router Worker (`hawiyat-preview-router`)
maps `<slug>.preview.hawiyat.org` → `hawiyat-preview-<slug>.<subdomain>.workers.dev`
by hostname, behind one manual wildcard DNS record (`*.preview.hawiyat.org`, AAAA
`100::` proxied).

**Why:** The account OAuth token is `zone: read` only (verified: DNS record create
returns 10000 even with a freshly refreshed token), so per-branch DNS is
impossible to automate. One wildcard record + a hostname-deriving router gives
branded URLs with zero per-branch DNS. Workers.dev subdomain is enabled on the
account (`shmsaldynbwbst`), which is why branch workers are reachable there.

**Trade-off:** The router is a single point for preview traffic and must be
deployed before any preview URL works. Router is 2.3 KiB, dependency-free,
pass-through proxy; upstream fetch failure returns 404 (no SSRF surface — target
derived only from hostname slug + fixed subdomain).

## ADR-2: Prisma requires the pg driver adapter on Workers

**Decision:** `lib/prisma/prismaClient.ts` constructs `PrismaClient` with
`@prisma/adapter-pg` (`new PrismaPg({ connectionString: process.env.DATABASE_URL })`).
Named export `prisma` and the `globalForPrisma` singleton preserved.

**Why:** The default Prisma query engine is a native binary that cannot run on
workerd. The driver adapter (pure JS via `pg`) is required even for a direct
connection. Version-locking matters: `@prisma/adapter-pg` must match
`@prisma/client`'s major (both pinned to 6.19.0; the 7.x adapter is
type-incompatible).

## ADR-3: OpenNext + Prisma needs `serverExternalPackages`

**Decision:** `next.config.mjs` adds
`serverExternalPackages: ['@prisma/client', '.prisma/client']`.

**Why:** Per OpenNext's Prisma how-to, this lets OpenNext patch the generated
client for the workerd runtime at its "code patches" step. Without it the bundle
loads the native binary engine (openssl-detection failure at runtime).

## ADR-4: Direct-connection test — status: BLOCKED (documented)

**Decision:** Attempt direct Prisma → Neon pooled endpoint on workerd (Free plan,
no Hyperdrive). Result: pages work; DB-backed endpoints still fail on workerd with
`prisma:error t2 is not a constructor` after the engine was switched to WASM.

**Evidence chain (root causes found in order):**
1. Binary engine can't run on workerd → WASM engine required.
2. WASM engine requires the `.wasm` in the bundle → OpenNext patch (ADR-3) makes
   it load; wasm is base64-inlined in the bundle (verified `AGFzbQ` magic present).
3. Delegates materialize (different error) → engine/adapter init throws
   `t2 is not a constructor` (pg/node-postgres or WASM glue under the workerd
   bundle).
4. **The schema itself was ALSO broken** (see ADR-5) — fixed separately.

**Node path is PROVEN working** (tsx check: businessHours 7 rows, waitlist
1,025,568, bookings 8 against the real Neon DB). The remaining gap is purely the
workerd bundling of the pg driver/WASM engine.

**Options for unblocking (not yet chosen):**
- Hyperdrive + Workers Paid ($5/mo) — the official Prisma + CF production pattern.
- Per-request clients with `maxUses: 1` (OpenNext docs pattern) + further bundling
  surgery on pg.
- Accept pages-only previews; DB features only in Node (Vercel) until resolved.

## ADR-5: Repo bug found — schema.prisma was missing the booking models

**Decision (FIXED, commit `84e59e6`):** Restored 6 models + `BookingStatus` enum to
`prisma/schema.prisma` matching the Neon DB introspection:
`VerificationCode`, `BlockedDate`, `Booking`, `BusinessHours`, `Service`,
`Waitlist` (PascalCase + `@@map` to snake_case/PascalCase tables, `@default(cuid())`
ids). Additive only.

**Why:** The routes (`app/api/schedule/*`, `app/api/waitlist`) use
`prisma.booking`, `prisma.businessHours`, etc., but the schema only had Order,
EmailSubscription, BootcampRegistration — every booking/schedule/waitlist endpoint
500'd on ANY runtime (Vercel included). **This fix repairs prod booking too.**

**Open issue (out of scope, flagged):** the Neon DB is MISSING the tables
`orders`, `email_subscriptions`, `bootcamp_registrations` that the existing 3
models map to — those endpoints are also broken in prod. Needs a migration or a
decision to drop the features.

## ADR-6: CI workflow secret handling

**Decision:** All `wrangler secret put` steps pass secrets via step `env:` +
`printf '%s' "$VAR"` (never `echo "${{ secrets.X }}"` — shell-interpolation
footgun for values containing `$`/backticks). Secret names aligned to the app's
real env: DATABASE_URL, GEMINI_API_KEY, SMTP_HOST/PORT/SECURE/USER/PASS/FROM,
TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID. Deploy job: `contents: read` +
`pull-requests: write`; teardown has `contents: read`.

## ADR-7: Deployment facts (verified via wrangler/API, 2026-08-08)

- Account: hawiyat-team `86afaa372f06c7516c563e152faff79b`, OAuth (m_kara@estin.dz).
- Zone: hawiyat.org `afa547257ab2165693d6e3ad31357d25`, Free plan, on CF DNS.
- workers.dev subdomain: `shmsaldynbwbst` (enabled).
- OAuth token scopes: `zone (read)` only → DNS records and API-token creation are
  NOT possible via this token (verified 10000/9109). GitHub repo secrets set via
  `gh` (10 of 12; missing CLOUDFLARE_API_TOKEN + GEMINI_API_KEY = user-created).
- Prior art on account: `cloudflare-nextjs` (Jan 2026, next-on-pages style) —
  untouched; `hawiyat-compose-usage-page` (active) — untouched.
- DB: Neon pooled endpoint (`*-pooler.eu-west-2.aws.neon.tech`), same as main env.

## ADR-8: `--dangerouslyUseUnsupportedNextVersion` in all preview builds

**Decision:** The OpenNext build step always passes
`--dangerouslyUseUnsupportedNextVersion`. The site pins Next.js 14.2.32/33 (past
its support window); the flag mirrors prod and upgrading Next is a separate task.
