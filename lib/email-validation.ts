import { domainToASCII } from "node:url"

import blocklist from "@/lib/data/disposable-domains.json"
import {
  LABEL_RE,
  MAX_DOMAIN_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_LOCAL_LENGTH,
  hasForbiddenDomainChars,
} from "@/lib/domain-rules"

/**
 * Server-side email validation and disposable-domain blocking.
 *
 * Failure policy: every normalization step FAILS CLOSED. An address whose domain
 * cannot be parsed is rejected rather than allowed, because the alternative is a
 * trivially bypassable control (e.g. `user@mailinator.com..` survives a naive
 * normalizer, converts to a non-empty but unmatchable host, and sails through).
 *
 * Design notes:
 * - Matching is SUFFIX based, not eTLD+1. ~14% of the upstream list is three or
 *   more labels and much of that sits under public-suffix private entries
 *   (`0-mailer.dynv6.net`), which registrable-domain extraction collapses to
 *   `dynv6.net` and therefore misses. The suffix walk also catches
 *   `foo.vercel.app` against an entry of `vercel.app`, which eTLD+1 cannot.
 * - Work is bounded by the 254-character email cap enforced before we get here:
 *   at most 127 Set lookups on already-validated ASCII.
 * - This module does no I/O. The allowlist check is the route's job.
 */

const LOCAL_RE = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*$/

/**
 * TLDs exempt from the blocklist. `.dz` is exempt because the list is
 * third-party and auto-updated: a single bad entry for `@univ-*.dz` or a
 * national ISP would silently reject an entire institution in our core market.
 * Override with EMAIL_BLOCKLIST_EXEMPT_TLDS (comma separated, no dots).
 */
const DEFAULT_EXEMPT_TLDS = ["dz"]

const EXEMPT_TLDS = (() => {
  const raw = process.env.EMAIL_BLOCKLIST_EXEMPT_TLDS
  const source = raw && raw.trim() ? raw.split(",") : DEFAULT_EXEMPT_TLDS
  return source.map((tld) => tld.trim().toLowerCase().replace(/^\./, "")).filter(Boolean)
})()

const BLOCKED_DOMAINS: ReadonlySet<string> = new Set(
  Array.isArray(blocklist.domains) ? blocklist.domains.map((d) => d.toLowerCase()) : []
)

export const BLOCKLIST_META = Object.freeze({
  count: BLOCKED_DOMAINS.size,
  commit: blocklist.commit ?? null,
  source: blocklist.source ?? null,
})

/**
 * Providers that implement RFC 5233 subaddressing with `+`. Restricting the
 * plus-strip to these avoids collapsing two genuinely different mailboxes
 * (`a+b@company.com` and `a@company.com` can be two people) into one
 * rate-limit bucket on servers that do not subaddress.
 */
const SUBADDRESSING_DOMAINS: ReadonlySet<string> = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "yahoo.com",
  "yahoo.fr",
  "icloud.com",
  "me.com",
  "protonmail.com",
  "proton.me",
  "fastmail.com",
  "yandex.com",
  "qq.com",
])

export type EmailCheck =
  | { ok: true; email: string; domain: string }
  | { ok: false; reason: "invalid" | "too_long" }
  | { ok: false; reason: "blocked"; email: string; domain: string; matched: string }

/**
 * Lowercases, strips FQDN trailing dots, converts IDN to A-labels, and validates
 * every label. Returns null when the input is not a usable domain.
 *
 * Trailing dots are stripped BEFORE the IDNA conversion on purpose:
 * `domainToASCII("mailinator.com..")` returns `"mailinator.com.."`, so converting
 * first would leave an unmatchable host.
 */
export function normalizeDomain(raw: string): string | null {
  if (typeof raw !== "string") return null

  let domain = raw.trim().toLowerCase()
  if (!domain) return null

  // Checked BEFORE conversion: domainToASCII truncates at these characters
  // rather than failing, so `a@x.com/path` would otherwise be accepted as
  // `a@x.com`. Bracketed IP literals and percent-encoding are rejected here too.
  if (hasForbiddenDomainChars(domain)) return null

  domain = domain.replace(/\.+$/, "")
  if (!domain || domain.length > MAX_DOMAIN_LENGTH) return null

  // IDNA / UTS 46 to ASCII. Returns "" on failure (never throws for a string).
  const ascii = domainToASCII(domain)
  if (!ascii) return null

  // Length must be re-checked AFTER conversion: punycode expands, so a domain
  // that fits pre-IDNA can exceed the RFC 5321 limit afterwards.
  if (ascii.length > MAX_DOMAIN_LENGTH) return null

  const labels = ascii.split(".")
  if (labels.length < 2) return null
  if (!labels.every((label) => LABEL_RE.test(label))) return null

  // An all-numeric TLD means we were handed an IP address, not a domain.
  if (/^\d+$/.test(labels[labels.length - 1])) return null

  return ascii
}

/**
 * Splits an address into local part and normalized domain, or null when it is
 * not a syntactically usable address.
 */
export function parseEmail(raw: unknown): { local: string; domain: string } | null {
  if (typeof raw !== "string") return null

  const trimmed = raw.trim()
  if (!trimmed || trimmed.length > MAX_EMAIL_LENGTH) return null
  if (/\s/.test(trimmed)) return null

  // Split on the LAST "@" so a quoted local part cannot smuggle a second one.
  const at = trimmed.lastIndexOf("@")
  if (at <= 0 || at === trimmed.length - 1) return null

  const local = trimmed.slice(0, at)
  const rawDomain = trimmed.slice(at + 1)

  if (local.length > MAX_LOCAL_LENGTH) return null
  if (!LOCAL_RE.test(local)) return null

  const domain = normalizeDomain(rawDomain)
  if (!domain) return null

  // Punycode expansion can push the whole address past the limit even when each
  // part individually fits.
  if (local.length + 1 + domain.length > MAX_EMAIL_LENGTH) return null

  return { local, domain }
}

/** True when `domain`'s TLD is on the exemption list. */
export function isExemptDomain(domain: string, exemptTlds: readonly string[] = EXEMPT_TLDS): boolean {
  if (exemptTlds.length === 0) return false
  const tld = domain.slice(domain.lastIndexOf(".") + 1)
  return exemptTlds.includes(tld)
}

/**
 * Walks every parent suffix of the domain and returns the first blocklist entry
 * that matches, or null. Never tests the bare TLD.
 */
export function isBlockedDomain(domain: string): string | null {
  const labels = domain.split(".")
  // i <= labels.length - 2 keeps at least two labels in the candidate.
  for (let i = 0; i <= labels.length - 2; i++) {
    const candidate = labels.slice(i).join(".")
    if (BLOCKED_DOMAINS.has(candidate)) return candidate
  }
  return null
}

/**
 * Lowercased `${local}@${domain}` for storage, or null when unparseable.
 * Used by the route so the stored address and the rate-limit key agree.
 */
export function normalizeEmail(raw: unknown): string | null {
  const parsed = parseEmail(raw)
  return parsed ? `${parsed.local.toLowerCase()}@${parsed.domain}` : null
}

/**
 * The single entry point used by the API route.
 *
 * `email` is returned lowercased so repeat submissions from the same mailbox do
 * not create case-variant rows. The local part is preserved verbatim otherwise
 * (no `+tag` stripping and no Gmail dot folding) — that would change the
 * customer's actual delivery address.
 *
 * The `blocked` variant also carries `email` so callers can store or allow the
 * address without re-parsing it.
 */
export function checkEmail(
  raw: unknown,
  options?: { exemptTlds?: readonly string[] }
): EmailCheck {
  if (typeof raw !== "string") return { ok: false, reason: "invalid" }

  const trimmed = raw.trim()
  if (!trimmed) return { ok: false, reason: "invalid" }
  if (trimmed.length > MAX_EMAIL_LENGTH) return { ok: false, reason: "too_long" }

  const parsed = parseEmail(trimmed)
  if (!parsed) return { ok: false, reason: "invalid" }

  const email = `${parsed.local.toLowerCase()}@${parsed.domain}`

  // Exemption is checked first: the market-protection decision outranks the
  // third-party list, and a .dz domain must never be rejected on its say-so.
  if (isExemptDomain(parsed.domain, options?.exemptTlds)) {
    return { ok: true, email, domain: parsed.domain }
  }

  const matched = isBlockedDomain(parsed.domain)
  if (matched) {
    return { ok: false, reason: "blocked", email, domain: parsed.domain, matched }
  }

  return { ok: true, email, domain: parsed.domain }
}

/**
 * Canonical key for the per-address rate limit.
 *
 * Without this, `email:${raw}` gives an attacker a fresh bucket per variant:
 * `a+1@gmail.com`, `A@x.com`, and `a@x.com ` are three separate keys. The
 * canonicalisation is safe HERE because it only decides whether two submissions
 * are "the same person" — the stored address is never altered by this function.
 */
export function toRateLimitKey(email: string): string {
  const trimmed = email.trim().toLowerCase()
  const at = trimmed.lastIndexOf("@")
  if (at <= 0) return trimmed

  let local = trimmed.slice(0, at)
  const domain = trimmed.slice(at + 1).replace(/\.+$/, "")

  // Only strip subaddress tags on providers known to support them, so two real
  // mailboxes (`a+b@` and `a@`) are not merged on servers that do not.
  if (SUBADDRESSING_DOMAINS.has(domain)) {
    const plus = local.indexOf("+")
    if (plus > 0) local = local.slice(0, plus)
  }

  // Dots are ignored for consumer Gmail only. They are meaningful on Google
  // Workspace/custom domains, where jane.doe@ and janedoe@ can be two people.
  if (domain === "gmail.com" || domain === "googlemail.com") {
    local = local.replace(/\./g, "")
  }

  return `${local}@${domain}`
}

/**
 * Common typos, so a mistake produces a suggestion instead of a dead end.
 *
 * Every key MUST be present in the blocklist — this map is only consulted on the
 * blocked path, so a key that is not blocklisted can never fire. The test suite
 * enforces that invariant.
 */
export const TYPO_MAP: Readonly<Record<string, string>> = {
  "gmial.com": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
}

/** Returns the corrected domain for a known typo, or null. */
export function suggestDomainFix(domain: string): string | null {
  return TYPO_MAP[domain.toLowerCase()] ?? null
}

/** Domains that must resolve as blocked, used by the self-test and the tests. */
export const SELF_TEST_DOMAINS = ["mailinator.com", "guerrillamail.com", "yopmail.com"] as const

/**
 * Guards against the silent-no-op class of bug: the repo builds with
 * `typescript.ignoreBuildErrors: true`, so a malformed or empty list would ship
 * without failing anything. Called once at module load.
 */
export function validateBlocklistOrWarn(): boolean {
  const missing = SELF_TEST_DOMAINS.filter((domain) => !BLOCKED_DOMAINS.has(domain))
  if (missing.length > 0) {
    console.error(
      `CRITICAL: disposable-domain blocklist self-test failed; missing: ${missing.join(", ")}. ` +
        `Loaded ${BLOCKED_DOMAINS.size} entries. Disposable email blocking is not working.`
    )
    return false
  }
  return true
}

validateBlocklistOrWarn()
