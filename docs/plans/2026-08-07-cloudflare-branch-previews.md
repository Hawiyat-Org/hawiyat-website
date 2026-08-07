# Cloudflare Branch Previews — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Fresh implementer subagent per task, then spec-compliance review, then code-quality review, then mark complete. All long-running commands (build, dev, deploy) run in named tmux sessions via the `interactive_bash` tool — never inline blocking.

**Goal:** Fully-working branch-preview deployment of the Hawiyat website on Cloudflare Workers (Wrangler + OpenNext), on the `hawiyat-team` account under `*.preview.hawiyat.org`, running the SAME env as the main site (real `DATABASE_URL`, real keys, direct connection — no Hyperdrive/PgBouncer), built so the same pipeline can later become production.

**Architecture:** Per-branch Next.js app Workers (`hawiyat-preview-<slug>` on `workers.dev`) + one small router Worker (`hawiyat-preview-router`) at a single manual wildcard DNS record `*.preview.hawiyat.org`. The router maps `<slug>.preview.hawiyat.org` → `hawiyat-preview-<slug>.<account-subdomain>.workers.dev` by hostname — giving branded per-branch URLs with **zero per-branch DNS work** and a minimal CI token (Workers:Edit only). App built with `@opennextjs/cloudflare@^2` (v2 is required: v3 targets Next 15/16, this repo is Next 14.2.32). Prisma switches to the **driver adapter** (`@prisma/adapter-pg`) because the default Prisma engine is a native binary that cannot run on workerd — even for a "direct connection" test. Teardown = `wrangler delete` on PR close.

**Tech Stack:** Next.js 14.2.32 (App Router) • pnpm 11 • Prisma 6.16.2 (adapter-pg) • `@opennextjs/cloudflare@^2` • wrangler 4.112.0 • GitHub Actions • PostgreSQL (direct, no pooler) • nodemailer • `@google/generative-ai`

---

## Verified Context (collected 2026-08-07, read-only checks)

- Account: **hawiyat-team** (`86afaa372f06c7516c563e152faff79b`), OAuth logged in as m_kara@estin.dz.
- Zone: **hawiyat.org** active on Cloudflare DNS, **Free plan** (all 12 zones on account are Free → **no Hyperdrive**).
- Token scopes: `zone (read)` only — no DNS write → wildcard DNS is a **one-time manual step** (Task 11).
- **No** `preview.*` DNS records exist yet.
- **Prior art:** Worker `cloudflare-nextjs` (Jan 2026, `nodejs_compat` + ASSETS/IMAGES — a static next-on-pages-style deploy). **Do NOT touch or delete it**; reference only.
- Worker `hawiyat-compose-usage-page` is actively used (updated 2026-08-06) — leave untouched.
- Repo: no `wrangler.*` config, no `.github/workflows`, no `.env` file (only `env.example`). Real env values come from the main site's env ("same stuff") → GH secrets (Task 13).
- Prisma convention (AGENTS.md, non-negotiable): **named import** `import { prisma } from '@/lib/prisma/prismaClient'`. Must be preserved through the adapter change.

---

## Skills to Use (verified installed — mapped to phases)

### Primary: agent-skills plugin set (user requirement — "focus on agent skills")

| Skill | Phase(s) | Why |
|---|---|---|
| `agent-skills:context-engineering` | session start, before Task 1 | REQUIRED. Sets up rules/context (AGENTS.md conventions: named prisma import, path aliases, pnpm) so every subagent gets lean, correct context. |
| `agent-skills:source-driven-development` | Task 4 (spike gate) | Verify the correct `@opennextjs/cloudflare` version pin against OFFICIAL docs (Context7 / OpenNext docs) instead of guessing — this decides the whole build. |
| `agent-skills:planning-and-task-breakdown` | execution start | Sanity-check task ordering + the A/B/C parallel-track split before dispatch. |
| `agent-skills:incremental-implementation` | every implementer subagent | Multi-file changes (wrangler.toml, prismaClient.ts, router, workflow) done in small verified steps with commits — never one big write. |
| `agent-skills:git-workflow-and-versioning` | all tasks | Commit-per-task discipline on the worktree branch; correct branch/commit hygiene for the PR. |
| `agent-skills:ci-cd-and-automation` | Task 11 | The GitHub Actions workflow (deploy/comment/teardown) IS CI/CD setup — use this skill to author it correctly. |
| `agent-skills:debugging-and-error-recovery` | Tasks 4, 7, 13 (conditional) | Systematic root-cause on the known risk zones (OpenNext/Next 14, Prisma on workerd, nodemailer). Primary debug skill; `superpowers/systematic-debugging` as cross-check. |
| `agent-skills:code-review-and-quality` | Tasks 6, 8, 11, 15 | Multi-axis review (correctness/architecture/security/performance) in the two-stage subagent review loop + final gate. |
| `agent-skills:security-and-hardening` | Tasks 8, 11 | Router worker accepts arbitrary Host header (SSRF-ish surface) + workflow secrets handling — harden both, don't just make them work. |
| `agent-skills:documentation-and-adrs` | Task 14 | Runbook in README + record decisions (Prisma-adapter-required, router-for-DNS-free-URLs, direct-connection test) as ADRs so the prod-migration follow-up inherits them. |

### Supporting: superpowers + builtin (complements the above)

| Skill | Phase(s) | Why |
|---|---|---|
| `superpowers/writing-plans` | authoring | Produced this plan. |
| `superpowers/subagent-driven-development` | all execution | REQUIRED by user: fresh implementer subagent per task + spec review + code-quality review per task. **Speed mode: full two-stage review only on risk-bearing tasks (4, 6, 8, 11); single spec-check pass elsewhere.** |
| `superpowers/using-git-worktrees` | Task 1 | Isolated worktree/branch so preview work never touches `main`. |
| `superpowers/dispatching-parallel-agents` | Tasks 3→4, 8, 11 | PARALLEL TRACKS: router (Track B) and workflow (Track C) run while the app spike gate (Track A) runs — disjoint file sets, no conflicts. |
| `superpowers/verification-before-completion` | Phase 5, every "done" claim | Evidence before assertions: curl outputs, build exit 0, URL serves. |
| `playwright` (builtin) | Task 13 | REQUIRED by user ("ponytail" = Playwright). Smoke-test the deployed preview URL in a real browser: renders, no JS errors, booking + chat flows. |
| `superpowers/requesting-code-review` | Tasks 6, 8, 11, 15 | REQUIRED by user ("review"). Structured code-review template for the reviewer subagents. |
| `review-work` (builtin) | Task 15 | REQUIRED by user ("review"). Post-implementation 5-agent review (goal, quality, security, QA, context) before PR. |
| `superpowers/finishing-a-development-branch` | Task 15 | Decide merge/PR/cleanup at the end. |

**NOT available (do not attempt to load):** `nextjs-developer`, `shadcn-ui` — referenced in AGENTS.md but not installed. **No tmux skill exists** — tmux sessions are managed with the `interactive_bash` (tmux) tool, convention below.

### Tmux session convention (user requirement)

| Session name | Used for | Log file |
|---|---|---|
| `preview-build` | `opennextjs-cloudflare build`, `pnpm build` | `/tmp/opencode/preview-build.log` |
| `preview-dev` | `wrangler dev` local testing | `/tmp/opencode/preview-dev.log` |
| `preview-router` | router Worker `wrangler dev`/`deploy` | `/tmp/opencode/preview-router.log` |
| `preview-deploy` | `wrangler deploy`/`secret put`/`delete` | `/tmp/opencode/preview-deploy.log` |

Rule: create with `interactive_bash` (`new-session -d -s <name>`), run command with output teed to its log (`command 2>&1 | tee /tmp/opencode/<name>.log`), verify from the log, then `kill-session -t <name>` (or leave running for `wrangler dev`).

---

## Execution Mode: SPEED (user requirement — parallel tracks, slimmed reviews)

Serial prologue (fast, ~2 min): Task 1 (worktree) → Task 2 (facts + workers.dev subdomain) → Task 3 (deps).

Then **three parallel tracks** (disjoint file sets — no subagent conflicts):

```
Track A (app pipeline): Task 4 SPIKE GATE → 5 wrangler.toml → 6 Prisma adapter → 7 local test
Track B (router):       Task 8 router code → 9 deploy + manual wildcard DNS
Track C (CI):           Task 11 workflow → 12 secrets
```

Tracks B and C have NO dependency on Track A's build result — they run while Task 4's OpenNext build is in the tmux session. Merge point: **Task 10** (manual first deploy; needs A done) then **Task 13** E2E (needs A+B+C). Task 14 (docs) runs last; Task 15 (final review) gates the PR.

**Review slimming (speed vs. rigor trade-off, per task risk):**
- Full two-stage review (spec-compliance then code-quality subagents) ONLY on: Task 4 (spike gate), Task 6 (Prisma adapter — riskiest code), Task 8 (router), Task 11 (workflow).
- Single spec-check pass (implementer self-check + `verification-before-completion` evidence) on: Tasks 3, 5, 7, 9, 10, 12, 14 — these are command/config tasks; a quality-review subagent adds latency without catching anything meaningful.
- Task 15 `review-work` (5 parallel review agents) is the final quality gate before PR — never skipped.

Parallel-dispatch rule: use `superpowers/dispatching-parallel-agents` for the three tracks; each implementer subagent receives its full task text (never the plan file), and the track-to-file-set mapping is enforced so no two subagents touch the same file.

---

## Task 1: Create worktree + feature branch

**Files:** none (git)

**Step 1** — Load `superpowers/using-git-worktrees`, create isolated worktree:
```bash
git worktree add ../hawiyat-website-cf-preview -b feature/cloudflare-branch-previews
```
Expected: worktree created, branch checked out. All subsequent tasks work in this worktree.

**Step 2** — Verify: `git -C ../hawiyat-website-cf-preview status` → `On branch feature/cloudflare-branch-previews`.

**Step 3** — Commit (empty init not needed; commit happens per-task from Task 2 onward).

---

## Task 2: Verify account facts + discover workers.dev subdomain

**Files:** none

**Step 1** — Confirm login + account (tmux not needed, fast):
```bash
wrangler whoami
```
Expected: shows `hawiyat-team` / `86afaa372f06c7516c563e152faff79b`.

**Step 2** — Discover the account workers.dev subdomain (needed by the router worker):
```bash
TOKEN=$(grep -oP 'oauth_token\s*=\s*"\K[^"]+' ~/.config/.wrangler/config/default.toml)
curl -s "https://api.cloudflare.com/client/v4/accounts/86afaa372f06c7516c563e152faff79b/workers/subdomain" \
  -H "Authorization: Bearer $TOKEN"
```
Expected: `{"result":{"subdomain":"<something>"}}` → record `WORKERS_SUBDOMAIN=<something>` (used in Task 10 as `env.WORKERS_SUBDOMAIN`). If it errors, the subdomain was never set — `wrangler deploy` of any scratch worker first, or set via dashboard. **If the subdomain is unset, this is a blocker for Task 10; resolve before proceeding.**

**Step 3** — Record values in a session note (do NOT commit): `ACCOUNT_ID`, `ZONE_ID=afa547257ab2165693d6e3ad31357d25`, `WORKERS_SUBDOMAIN`.

---

## Task 3: Install build tooling

**Files:** Modify `package.json`, `pnpm-lock.yaml`

**Step 1** — Add the OpenNext Cloudflare adapter (pin v2 line for Next 14):
```bash
pnpm add -D @opennextjs/cloudflare@^2
```
Expected: `@opennextjs/cloudflare@2.x.x` added to devDependencies. (wrangler 4.112.0 already global; also add as dev dep for CI parity: `pnpm add -D wrangler@^4`.)

**Step 2** — Verify the CLI exists:
```bash
pnpm exec opennextjs-cloudflare --version
```
Expected: prints a version (v2.x).

**Step 3** — Commit:
```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add @opennextjs/cloudflare and wrangler for CF preview builds"
```

---

## Task 4: SPIKE GATE — OpenNext build on Next 14

**Files:** none (build artifacts: `.open-next/` — gitignore it)

**Step 1** — Run the OpenNext build in tmux session `preview-build` (this is the long-running command):
```bash
interactive_bash: new-session -d -s preview-build
interactive_bash: send-keys -t preview-build "cd ../hawiyat-website-cf-preview && pnpm exec opennextjs-cloudflare build 2>&1 | tee /tmp/opencode/preview-build.log" Enter
```
Expected (verify from log): `.open-next/worker.js` + `.open-next/assets/` produced, exit 0.

**GATE:** If the build fails on Next 14 (OpenNext v2 is the correct line for 14.x, but pin a 2.x minor that supports 14.2.32 if the first resolves to a 3.x by mistake), STOP. Load `superpowers/systematic-debugging`, diagnose, and either pin `@opennextjs/cloudflare@2.<working-minor>` or record the blocker for the user. **Do not proceed past this task with a broken build.**

**Step 2** — Gitignore build output: add `.open-next/` to `.gitignore`. Commit.

**Step 3** — Commit:
```bash
git add .gitignore
git commit -m "chore: ignore opennext build output"
```

---

## Task 5: Scaffold wrangler.toml (preview worker config)

**Files:** Create `wrangler.toml` (repo root)

**Step 1** — Write complete file (values from Task 2; `NAME` is the default — real branch deploys override with `--name`):
```toml
# Hawiyat branch-preview worker — OpenNext build output
name = "hawiyat-preview"
main = ".open-next/worker.js"
compatibility_date = "2026-08-01"
compatibility_flags = ["nodejs_compat"]
account_id = "86afaa372f06c7516c563e152faff79b"

# OpenNext static assets (built by opennextjs-cloudflare build)
assets = { directory = ".open-next/assets", binding = "ASSETS" }

# Non-secret, build-visible vars — SAME values as main site env
[vars]
NEXT_PUBLIC_APP_NAME = "Hawiyat"
NEXT_PUBLIC_URL = "https://hawiyat.org"
NEXT_PUBLIC_CHATWOOT_TOKEN = "<from main env>"

# Secrets are NOT stored here. They are set per-branch at deploy time:
#   echo "<value>" | wrangler secret put DATABASE_URL --name hawiyat-preview-<slug>
# Required secrets (same names as main env): DATABASE_URL, GEMINI_API_KEY,
# SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM
```

**Step 2** — Verify parse: `wrangler deploy --dry-run --outdir /tmp/opencode/cf-dry-run` in tmux `preview-build`.
Expected: dry-run succeeds (no network deploy).

**Step 3** — Commit `wrangler.toml`.

---

## Task 6: Prisma driver adapter (the key code change)

**Files:** Modify `lib/prisma/prismaClient.ts`, Modify `package.json`

**Why:** The default Prisma 6 engine is a native binary — it cannot execute on workerd. `@prisma/adapter-pg` makes Prisma talk Postgres through `pg` (pure JS, runs under `nodejs_compat`), which is what makes the "direct connection" test possible at all. Named export `prisma` MUST be preserved (AGENTS.md).

**Step 1** — Install adapter:
```bash
pnpm add @prisma/adapter-pg
```

**Step 2** — Read the current `lib/prisma/prismaClient.ts`, then replace with (keeping the named-export convention):
```ts
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

function createClient(): PrismaClient {
  // Driver adapter: required to run Prisma on Cloudflare Workers (workerd).
  // Direct connection to the same DATABASE_URL as the main site — no pooler.
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
  return new PrismaClient({ adapter })
}

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```
(If the exact `PrismaPg` constructor signature differs in the installed 6.16.x — `new PrismaPg({ connectionString })` vs `new PrismaPg(connString)` — check `node_modules/@prisma/adapter-pg/dist/index.d.ts` and match it. Load `superpowers/systematic-debugging` only if something fails.)

**Step 3** — Verify all imports of `prisma` still work: `grep -rn "from '@/lib/prisma/prismaClient'" app/ lib/` → all are named imports `{ prisma }` (unchanged).

**Step 4** — Verify build still passes on Vercel-path: `pnpm build` (runs `prisma generate && next build`) in tmux `preview-build`.
Expected: exit 0. NOTE: if local dev has no `DATABASE_URL`, `createClient()` throws at first query only, not at import — build must still pass. If the build fails because `DATABASE_URL` is read at import time, the fix is to lazy-create the client on first use (do NOT put a fake URL in the file).

**Step 5** — Commit:
```bash
git add package.json pnpm-lock.yaml lib/prisma/prismaClient.ts
git commit -m "feat: use Prisma pg driver adapter for Workers compatibility"
```

---

## Task 7: Local run + smoke test (tmux session `preview-dev`)

**Files:** none

**Step 1** — Rebuild with OpenNext: `pnpm exec opennextjs-cloudflare build` (tmux `preview-build`, verify exit 0 from log).

**Step 2** — Start local dev server with real env (use the main .env values — same stuff):
```bash
interactive_bash: new-session -d -s preview-dev
interactive_bash: send-keys -t preview-dev "cd ../hawiyat-website-cf-preview && set -a && . <main-env-source> && set +a && pnpm exec wrangler dev --port 8787 2>&1 | tee /tmp/opencode/preview-dev.log" Enter
```
(`<main-env-source>` = the actual env file/export block the main site uses. The exact mechanism the team uses to load "the main .env" — shell export, dotenv file, or CI — is captured here; use whatever the main site uses so values are identical.)

**Step 3** — Smoke tests (curl):
```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8787/          # expect 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8787/services  # expect 200
curl -s http://localhost:8787/api/schedule/availability?date=2026-08-10   # expect 200 JSON (DB-backed)
```
Expected: pages 200; availability returns real data from the DB (proves Prisma adapter + direct connection works on workerd).

**Step 4** — If DB-backed endpoint fails: load `superpowers/systematic-debugging`; do NOT shotgun. Likely suspects, in order: (1) `PrismaPg` constructor signature, (2) workerd outbound TCP to the DB host being blocked/allowed, (3) connection exhaustion on the direct URL. Record findings; do not proceed to CI with a broken DB path unless the failure is understood and documented in the task log.

**Step 5** — Kill session: `interactive_bash: kill-session -t preview-dev`.

---

## Task 8: Router Worker (branded URLs without per-branch DNS)

**Files:** Create `workers/preview-router/wrangler.toml`, `workers/preview-router/src/index.ts`

**Why:** Per-branch workers live on `hawiyat-preview-<slug>.<subdomain>.workers.dev`. One wildcard DNS record (`*.preview.hawiyat.org`, created manually in Task 11) + this router gives branded URLs and keeps the CI token DNS-free.

**Step 1** — `workers/preview-router/wrangler.toml`:
```toml
name = "hawiyat-preview-router"
main = "src/index.ts"
compatibility_date = "2026-08-01"
compatibility_flags = ["nodejs_compat"]
account_id = "86afaa372f06c7516c563e152faff79b"

# One-time manual DNS (Task 11): wildcard AAAA 100:: proxied for *.preview.hawiyat.org
[vars]
WORKERS_SUBDOMAIN = "<from Task 2>"
```

**Step 2** — `workers/preview-router/src/index.ts` (complete):
```ts
export default {
  async fetch(request: Request, env: { WORKERS_SUBDOMAIN: string }): Promise<Response> {
    const url = new URL(request.url)
    const host = url.hostname.toLowerCase()
    const slug = host.split('.')[0]

    // Bare preview.hawiyat.org → internal landing
    if (slug === 'preview' || slug === 'www') {
      return new Response(
        'Hawiyat branch previews.<br/>URL pattern: <code>&lt;branch&gt;.preview.hawiyat.org</code>',
        { headers: { 'content-type': 'text/html; charset=utf-8' } },
      )
    }

    const target = `https://hawiyat-preview-${slug}.${env.WORKERS_SUBDOMAIN}.workers.dev${url.pathname}${url.search}`
    const headers = new Headers(request.headers)
    headers.delete('host') // target worker must see its own Host

    try {
      const upstream = await fetch(target, {
        method: request.method,
        headers,
        body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body,
      })
      return new Response(upstream.body, { status: upstream.status, headers: upstream.headers })
    } catch {
      return new Response('Preview not found for branch: ' + slug, { status: 404 })
    }
  },
} satisfies ExportedHandler
```

**Step 3** — Local check: `pnpm exec wrangler deploy --dry-run --outdir /tmp/opencode/router-dry-run` (cwd `workers/preview-router`).
Expected: dry-run OK.

**Step 4** — Commit both files.

---

## Task 9: Deploy router + manual wildcard DNS

**Files:** none (Cloudflare state)

**Step 1** — Deploy router in tmux `preview-router`:
```bash
cd workers/preview-router && wrangler deploy 2>&1 | tee /tmp/opencode/preview-router.log
```
Expected: `hawiyat-preview-router` deployed to `https://hawiyat-preview-router.<subdomain>.workers.dev`.

**Step 2** — MANUAL DNS (one-time, token has zone-read only — do in Cloudflare dashboard, zone `hawiyat.org`): create record
```
Type: AAAA   Name: *.preview   Content: 100::   Proxied: ON   TTL: Auto
```
Expected: `*.preview.hawiyat.org` resolves proxied (verified with `dig *.preview.hawiyat.org` → CF IP).

**Step 3** — Set route on the router worker for the wildcard pattern:
```bash
wrangler routes add "*.preview.hawiyat.org" --zone-id afa547257ab2165693d6e3ad31357d25
```
Expected: route added (uses existing `workers_routes (write)` scope — no DNS write needed since the record already exists).

**Step 4** — Verify routing: with any test branch worker live, `curl -s -o /dev/null -w "%{http_code}" https://foo.preview.hawiyat.org` → 404 page from router (proves DNS + route + router all wired; 404 because no `hawiyat-preview-foo` worker exists yet — expected at this point).

---

## Task 10: First real branch deploy (manual, tmux `preview-deploy`)

**Files:** none

**Step 1** — Build: `pnpm exec opennextjs-cloudflare build` (tmux `preview-build`, exit 0).

**Step 2** — Deploy with a test slug from the current branch:
```bash
slug=test
wrangler deploy --name hawiyat-preview-$slug 2>&1 | tee /tmp/opencode/preview-deploy.log
```
Expected: worker `hawiyat-preview-test` live at `https://hawiyat-preview-test.<subdomain>.workers.dev`.

**Step 3** — Put secrets on the test worker (same values as main env):
```bash
echo "$DATABASE_URL" | wrangler secret put DATABASE_URL --name hawiyat-preview-test
echo "$GEMINI_API_KEY" | wrangler secret put GEMINI_API_KEY --name hawiyat-preview-test
# ... SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM
```
Expected: each prints `Success`.

**Step 4** — Verify through the branded URL:
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://test.preview.hawiyat.org/          # 200
curl -s -o /dev/null -w "%{http_code}\n" https://test.preview.hawiyat.org/services  # 200
curl -s https://test.preview.hawiyat.org/api/schedule/availability?date=2026-08-10  # 200 JSON
```
Expected: all 200; DB-backed endpoint returns real data. This is the milestone: **branch preview + real DB + branded URL working end-to-end.**

**Step 5** — Teardown test worker: `wrangler delete --name hawiyat-preview-test`.

---

## Task 11: GitHub Actions workflow (the automation core)

**Files:** Create `.github/workflows/preview-deploy.yml`

**Step 1** — Write complete workflow:
```yaml
name: Cloudflare Branch Preview
on:
  pull_request:
    types: [opened, synchronize, reopened, closed]

jobs:
  deploy:
    if: github.event.action != 'closed'
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 11 }
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: pnpm }
      - run: pnpm install --frozen-lockfile
      - run: pnpm exec prisma generate
      - run: pnpm exec opennextjs-cloudflare build
      - name: Deploy branch worker
        id: deploy
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          REF: ${{ github.event.pull_request.head.ref }}
        run: |
          slug=$(echo "$REF" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | cut -c1-40)
          echo "slug=$slug" >> "$GITHUB_ENV"
          wrangler deploy --name "hawiyat-preview-$slug"
      - name: Set secrets on branch worker
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
        run: |
          echo "${{ secrets.DATABASE_URL }}" | wrangler secret put DATABASE_URL --name "hawiyat-preview-${{ env.slug }}"
          echo "${{ secrets.GEMINI_API_KEY }}" | wrangler secret put GEMINI_API_KEY --name "hawiyat-preview-${{ env.slug }}"
          echo "${{ secrets.SMTP_HOST }}" | wrangler secret put SMTP_HOST --name "hawiyat-preview-${{ env.slug }}"
          echo "${{ secrets.SMTP_PORT }}" | wrangler secret put SMTP_PORT --name "hawiyat-preview-${{ env.slug }}"
          echo "${{ secrets.SMTP_USER }}" | wrangler secret put SMTP_USER --name "hawiyat-preview-${{ env.slug }}"
          echo "${{ secrets.SMTP_PASS }}" | wrangler secret put SMTP_PASS --name "hawiyat-preview-${{ env.slug }}"
          echo "${{ secrets.EMAIL_FROM }}" | wrangler secret put EMAIL_FROM --name "hawiyat-preview-${{ env.slug }}"
      - name: Comment preview URL
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `Preview ready: https://${process.env.SLUG}.preview.hawiyat.org`,
            })
        env:
          SLUG: ${{ env.slug }}

  teardown:
    if: github.event.action == 'closed'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with: { version: 11 }
      - name: Delete branch worker
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          CLOUDFLARE_ACCOUNT_ID: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          REF: ${{ github.event.pull_request.head.ref }}
        run: |
          slug=$(echo "$REF" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | cut -c1-40)
          wrangler delete --name "hawiyat-preview-$slug" || true
```

**Step 2** — Validate YAML locally: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/preview-deploy.yml')); print('OK')"` (or actionlint if available).
Expected: prints `OK`.

**Step 3** — Commit.

---

## Task 12: CI secrets setup

**Files:** none (GitHub + Cloudflare state)

**Step 1** — Create a scoped Cloudflare API token (dashboard → My Profile → API Tokens → Create, template "Edit Cloudflare Workers"):
- Account: `hawiyat-team` — **Workers Scripts: Edit**, **Workers Routes: Edit** (no zone DNS needed thanks to the router).
Expected: token starts with the permissions above; copy it.

**Step 2** — Add GitHub Actions secrets to the repo:
`CLOUDFLARE_API_TOKEN` (from Step 1), `CLOUDFLARE_ACCOUNT_ID` (`86afaa372f06c7516c563e152faff79b`), `DATABASE_URL`, `GEMINI_API_KEY`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_FROM` — **all values copied from the main site env, identical.**

**Step 3** — Record in the task log which secrets were set (names only, never values).

---

## Task 13: End-to-end validation on a real PR

**Files:** none

**Step 1** — Push the branch, open a PR. Wait for the `deploy` job.
Expected: job green; bot comment with `https://<slug>.preview.hawiyat.org`.

**Step 2** — Smoke test with `playwright` skill (real browser):
- `https://<slug>.preview.hawiyat.org/` renders (no JS errors)
- `/services`, `/about` render
- Booking flow: check availability → request verification code → verify → booking created (writes REAL row to prod DB — flag `PREVIEW_MODE` not in scope; note data writes as expected behavior of the direct-connection test)

**Step 3** — Chat endpoint: send one message; expect Gemini reply (proves `GEMINI_API_KEY` + `@google/generative-ai` on workerd).

**Step 4** — Record PASS/FAIL per endpoint in the task log. For each FAIL: load `superpowers/systematic-debugging`, fix, redeploy, re-test. **verification-before-completion applies: no "it works" without the curl/browser evidence.**

**Step 5** — Close the PR; verify the `teardown` job deleted the worker (`wrangler deployments list` / 404 on the URL).
Expected: `https://<slug>.preview.hawiyat.org` → 404; no `hawiyat-preview-<slug>` worker remains.

---

## Task 14: Docs + runbook

**Files:** Modify `README.md`, Modify `docs/ideas/cloudflare-branch-previews.md`, Create `docs/plans/` is done (this file)

**Step 1** — Add a "Branch Previews (Cloudflare)" section to `README.md`: URL scheme, how a PR gets a preview, how to manually deploy (`wrangler deploy --name hawiyat-preview-<slug>` + `wrangler secret put ...`), how to teardown, where the router lives, the one-time DNS record.

**Step 2** — Update `docs/ideas/cloudflare-branch-previews.md`: mark intent as confirmed, add the verified findings (Free plan → no Hyperdrive; router introduced for DNS-free branded URLs; Prisma adapter required; prior-art `cloudflare-nextjs` worker noted), and the direct-connection test decision.

**Step 3** — Commit.

---

## Task 15: Final review + finish branch

**Files:** none

**Step 1** — Load `review-work` (builtin): 5 parallel review agents — goal/constraint verification, code quality, security (secrets in YAML/plan are placeholders only; token scope minimal), hands-on QA (re-run Task 13 smoke), context mining. All must pass.

**Step 2** — Load `superpowers/finishing-a-development-branch`: present merge / PR / cleanup options to the user; do NOT merge without explicit confirmation.

---

## Known Risks & Decision Points (record outcomes in the task logs)

1. **OpenNext v2 vs Next 14.2.32** — Task 4 gate; if the build fails, pin the working 2.x minor before anything else.
2. **Prisma direct-connection on workerd** — Task 7 Step 4: adapter signature, outbound TCP to the DB host, connection exhaustion under load. If the DB host blocks Cloudflare egress, record it — the follow-up is Hyperdrive (needs Workers Paid) or PgBouncer on the DB host, explicitly OUT of scope for this task.
3. **nodemailer on workerd** — Task 7/13; if SMTP fails, swap to a fetch-based send for previews only (recorded decision, not silent).
4. **Free plan limits** — 100k requests/day per worker; fine for internal QA. No Hyperdrive by design.

## Out of Scope (confirmed intent)

- DB pooling (Hyperdrive/PgBouncer) — only if the direct test forces it (then it's a new task + user decision)
- Production migration off Vercel — later, SAME pipeline
- Auth on previews — internal team
- Per-branch databases
- Cloudflare Pages
- Touching the existing `cloudflare-nextjs` / `hawiyat-compose-usage-page` workers
