# Security Audit Findings — Hawiyat Rebrand (v2)

- **Audit date:** 2026-08-08
- **Scope:** HEAD `bd98188` (branch `rebrand/ai-infrastructure-identity`)
- **Audited surface:** live API routes (`/api/orders`, `/api/subscribe`, `/api/waitlist`, `/api/chat`), `middleware.ts`, `next.config.mjs`, client components, secrets handling, post-rebrand regressions.

## Verdict: **PASS_WITH_CONDITIONS**

No BLOCKER findings. No exploitable data-breach or full-compromise path was identified in the current codebase. The main risks are **abuse of the live but orphaned `/api/chat` Gemini proxy (monetary DoS)**, **HTML injection into admin email via order fields**, and **bypassable rate limiting** (XFF spoofing + in-memory store). All four live endpoints should be rate-limited per-endpoint and bot-protected before launch.

---

## Findings

### BLOCKER

None.

---

### IMPORTANT

#### I-1. `/api/chat` — live, unauthenticated Gemini proxy with no endpoint-level rate limit (monetary DoS / orphaned post-rebrand)
- **File:** `app/api/chat/route.ts:18-28, 79-114`
- **Issue:** `/api/chat` is publicly POSTable, requires no auth, has no per-endpoint rate limit (only the global middleware limit), and forwards attacker-controlled `message` + full `conversation` history to `gemini-2.5-flash`. `message` and `conversation[]` have no length/count caps, so every request can carry a large prompt. The rebrand removed the client UI that consumed this endpoint (no component calls `/api/chat`), yet the endpoint remains live.
- **Exploit / what:** An attacker (or botnet, since the global limit is per-IP and bypassable per I-3) POSTs a large prompt to `/api/chat` in a loop and burns Gemini API credits on Hawiyat's key. With no shared store across serverless instances and spoofable `x-forwarded-for`, the 100 req/min global limit is not an effective cost control. This is a direct-money abuse vector (LLM Top 10: Unbounded Consumption; OWASP LLM10).
- **Fix:** (a) If the endpoint has no consumer, **delete it** (`git rm app/api/chat/route.ts`) — smallest surface. (b) If the bot is planned to return, add per-endpoint rate limiting (reuse `checkRateLimit` with e.g. 20 req/hr/IP), cap `message.length` (e.g. 2000) and `conversation.length` (e.g. 20), move the system prompt out of user-message history (use `systemInstruction` on `startChat`), and add a spending budget/alert on the Gemini key.

#### I-2. HTML injection into admin/customer emails via unencoded order fields
- **File:** `lib/email-utils.ts:85-124` (admin `htmlTemplate`), `lib/email-utils.ts:205-378` (customer confirmation), inputs flow from `app/api/orders/route.ts:40, 91-101` (`customerName`, `customerPhone`, `notes`, `serviceName`)
- **Issue:** User-controlled order fields are interpolated directly into HTML email templates with no HTML encoding (`juice()` only inlines CSS; it does not sanitize). The admin notification email is the high-value target: it renders attacker-controlled content in an email that appears to come from Hawiyat.
- **Exploit / what:** Submit an order with `notes: "<a href='https://evil.example/confirm-payment'>Confirm your payment here</a><img src='https://evil.example/pixel?id=...'>"` (or any HTML/CSS phishing payload). The admin opens the "New Order" email and sees attacker-controlled markup from a trusted sender — classic phishing/credential-harvest vector. Full email-format control also allows layout spam. (Injection via `customerName`/`customerPhone` also reaches the customer confirmation email, lower value.)
- **Fix:** HTML-encode every interpolated value (`notes`, `customerName`, `customerPhone`, `serviceName`) before inserting into `htmlTemplate` in both functions (e.g. a small `escapeHtml` helper: `& < > " '` → entities; `juice()` afterwards is fine). Also cap `notes` length server-side (`app/api/orders/route.ts`) as defense-in-depth.

#### I-3. Rate limiting is bypassable: spoofable `x-forwarded-for` + in-memory per-instance store
- **File:** `middleware.ts:23-35, 37-56`, `lib/rate-limiter.ts:68-80`, `app/api/orders/route.ts:49`
- **Issue:** Both the global limiter and the per-endpoint limiters trust the first value of the `x-forwarded-for` header as the client IP. If the app is deployed where the proxy does **not** overwrite/sanitize XFF (self-hosted Next.js behind a plain reverse proxy, or direct exposure), any client can send `x-forwarded-for: 1.2.3.4` and rotate values to reset the counter — trivially bypassing the 100 req/min global limit and the orders 5/hr limit. Separately, the stores are in-memory `Map`s that do not scale across serverless instances (Vercel), so limits are per-instance and unreliable at any meaningful traffic.
- **Exploit / what:** A bot loop POSTs `x-forwarded-for: <random IP>` with every request to `/api/subscribe` (no endpoint limit, see I-4) or `/api/chat` (cost, see I-1); the global limiter never trips because the key changes each request. Rate limiting is currently the only bot defense on all four endpoints.
- **Fix:** (a) Deploy behind a platform that overwrites XFF (Vercel/Cloudflare) **and** document that requirement; (b) use a shared store (Upstash Redis/Cloudflare KV) for rate limits in serverless; (c) as a hardening step, only trust XFF from the known proxy chain and fall back to `request.ip` from the platform. Fix is deployment-config + store swap; no code redesign needed.

#### I-4. `/api/subscribe` and `/api/waitlist` have no endpoint-level rate limiting or bot protection
- **File:** `app/api/subscribe/route.ts:4-49`, `app/api/waitlist/route.ts:15-87`
- **Issue:** These two email-capture endpoints have zero per-endpoint limits and no anti-bot control (honeypot, Cloudflare Turnstile, or challenge). They are only covered by the bypassable global middleware limit (I-3).
- **Exploit / what:** A scripted loop (spoofed XFF) can (a) pump an unbounded number of arbitrary/foreign emails into `email_subscriptions` and `waitlist` (DB bloat, poisoned newsletter/launch list, wasted sending), and (b) because there is no double opt-in, subscribe victim email addresses without consent (list-pumping abuse). The waitlist also stores attacker-controlled `ipAddress`/`userAgent` raw.
- **Fix:** Add per-endpoint `checkRateLimit` (e.g. 5/hr/IP) in both routes, add a hidden honeypot field on the forms, and consider Cloudflare Turnstile on the order + subscribe forms. Add double opt-in for `/api/subscribe` if list integrity matters.

---

### MINOR

#### M-1. 500 responses leak internal error details
- **File:** `app/api/orders/route.ts:158-162`, `app/api/chat/route.ts:146-149`
- **Issue:** The catch blocks return `details: errorMessage` (or `String(error)`) to the client. Prisma/SMTP/Gemini error messages can reveal schema, connection, or internal library details.
- **Exploit / what:** A malformed request that triggers a DB error returns internal diagnostics useful for reconnaissance.
- **Fix:** Return a generic `{ error: "Internal server error" }`; log the real error server-side only.

#### M-2. Email enumeration via subscribe (409) and waitlist (409 + position)
- **File:** `app/api/subscribe/route.ts:28-33`, `app/api/waitlist/route.ts:42-55`
- **Issue:** `/api/subscribe` returns 409 "already subscribed" for existing emails; `/api/waitlist` additionally returns the stored `position` of the target email.
- **Exploit / what:** An attacker can confirm whether a specific email is on the newsletter or waitlist and, for the waitlist, learn its exact queue position — a minor PII/information disclosure and a launch-timing leak (e.g. "how many people are ahead of competitor X's email").
- **Fix:** Return 200 with `{ success: true }` for existing entries (idempotent), or use a generic message that does not distinguish existing vs new. Do not return stored `position` for existing emails.

#### M-3. `/api/orders` — serviceId/serviceName not verified against the catalog; no field length caps
- **File:** `app/api/orders/route.ts:40-47, 91-101`
- **Issue:** `serviceId`/`serviceName` are accepted verbatim from the client (they also flow into emails, see I-2), and `customerName`/`notes` have no length limits. The payment method is correctly allowlisted.
- **Exploit / what:** Forged/fake orders with arbitrary service names pollute the orders table and admin notifications; oversized fields bloat the DB (and the emails).
- **Fix:** Validate `serviceId` against `lib/data/services.ts` (lookup the service server-side and take the canonical name from there); cap lengths (e.g. name ≤ 120, notes ≤ 2000).

#### M-4. `next.config.mjs` — `remotePatterns` hostname `**` allows any external image host
- **File:** `next.config.mjs:9-18`
- **Issue:** Any hostname is permitted for `next/image`. Today `unoptimized: true` means images are never fetched server-side, so there is no SSRF path — but if optimization is ever enabled, `**` would let a user-influenced image URL trigger server-side fetches to internal hosts (metadata-only SSRF), and any attacker-influenced image URL can inject tracking/pixel content into pages.
- **Exploit / what:** No current exploit; future-risk + supply of arbitrary third-party tracking pixels if image sources become content-driven.
- **Fix:** Restrict `remotePatterns` to the domains actually used (`hawiyat.org`, `*.amazonaws.com`/CDN if needed), and keep `unoptimized` until an allowlist is in place.

#### M-5. No security headers configured; build type/ESLint gates disabled
- **File:** `next.config.mjs:3-8, 19-25` (no `headers()` block)
- **Issue:** No `headers()` in `next.config.mjs` means no app-level CSP, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, or HSTS (rely on platform defaults). `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` remove quality gates that would catch injection/typo regressions. (AGENTS.md explicitly says to fix errors rather than rely on the ignore — recommend honoring that.)
- **Exploit / what:** No clickjacking/CSP protections of our own; degraded defense-in-depth for a page that embeds third-party scripts (Meta Pixel) and renders marketing forms.
- **Fix:** Add a `headers()` block (CSP with `frame-ancestors 'none'`/`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS when on HTTPS); re-enable TS/ESLint as build gates.

#### M-6. Waitlist stores raw IP + User-Agent as PII with no retention/consent note
- **File:** `app/api/waitlist/route.ts:31-36`, `prisma/schema.prisma:51-59`
- **Issue:** `ipAddress` (spoofable client-supplied) and `userAgent` are stored permanently alongside emails, with no retention policy or consent disclosure on the (removed) waitlist UI.
- **Exploit / what:** Regulatory exposure under Algerian/French privacy norms if the launch list is later processed; stored XFF can be trivially forged so it is not reliable evidence anyway.
- **Fix:** Store an IP hash or drop IP/UA; add a retention/deletion note in the privacy policy; do not rely on client-supplied XFF for recordkeeping.

#### M-7. Orphaned live endpoints after the rebrand
- **File:** `app/api/chat/route.ts`, `app/api/waitlist/route.ts`
- **Issue:** The rebrand removed the UI consumers for the chat bot and the waitlist (no component references `/api/chat` or `/api/waitlist`), but both routes remain deployed and publicly callable. `/api/waitlist` is also coupled to `prisma.waitlist`, and the dead `sendBootcampConfirmation` (bootcamp removed) remains in `lib/email-utils.ts:429-698`.
- **Exploit / what:** Widened attack surface for no product value: `/api/chat` costs real money (I-1); `/api/waitlist` leaks enumeration data (M-2).
- **Fix:** Delete routes with no consumers (or wire them back to UI), and remove dead email functions. Less code = less attack surface.

---

## Positive Observations

- **No secrets committed.** `.env` is gitignored and untracked; local `.env` holds only a localhost `DATABASE_URL`. `GEMINI_API_KEY`, `TELEGRAM_BOT_TOKEN/CHAT_ID`, `SMTP_*`, `WHATSAPP_*` are referenced only in server code (`app/api/*`, `lib/email-utils.ts`) — never in client components or `NEXT_PUBLIC_*`. The Meta Pixel ID is public by design. No Chatwoot token is currently in any committed file.
- **Server-side fetches are fixed-target, not SSRF-able.** Telegram, WhatsApp, and Gemini calls all use environment-configured hosts/URLs; there is no user-supplied-URL fetch anywhere.
- **`/api/orders` has dual rate limiting** (per-IP 5/hr + per-email 4/hr) — better than most marketing sites.
- **`/api/waitlist` uses Zod schema validation**, and `/api/orders`/`/api/subscribe` validate email format and the payment-method allowlist.
- **No user-controlled `dangerouslySetInnerHTML`.** All 6 usages are `application/ld+json` built from static repo data (layout schemas, `trusted-brands` partner list, hero schema).
- **No authz/IDOR surface** — there are no user accounts, sessions, or object-access endpoints; the deleted schedule/booking system (which had email-verification flows) is gone, reducing that class of risk.
- **Middleware covers the API surface** (`/api/health` exclusion only) and includes Map cleanup.

## Recommendations (proactive)

1. Before launch, resolve I-1/I-4: per-endpoint rate limits + Turnstile/honeypot on `/api/orders`, `/api/subscribe`, `/api/chat`. A Redis/Upstash-backed limiter if deploying to serverless.
2. Decide the fate of `/api/chat` and `/api/waitlist` explicitly (wire up or delete); add a Gemini spend alert on the API key.
3. Add a `security.txt` + `headers()` security policy in `next.config.mjs` (CSP, HSTS, frame-ancestors, nosniff, referrer-policy).
4. Add a monthly `pnpm audit`/Dependabot scan; current lockfile (next 14.2.32, prisma 6.x) is recent, but `gsap: latest` and `@radix-ui/react-slot: latest` pin nothing.
5. Consider an HTML-encoding utility module in `lib/` and reuse it in email templates + any future render of user text.
6. Log rate-limit hits at warn level to observe abuse without adding sensitive fields (no PII in logs).
