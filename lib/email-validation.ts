import { domainToASCII } from "node:url"

import blocklist from "@/lib/data/disposable-domains.json"

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

const MAX_EMAIL_LENGTH = 254
const MAX_LOCAL_LENGTH = 64
const MAX_DOMAIN_LENGTH = 253

/** Must match LABEL_RE in scripts/sync-disposable-domains.ts. */
const LABEL_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/

/**
 * RFC 5322 dot-atom, restricted to printable ASCII. Rejects quoted local parts,
 * consecutive dots, and leading/trailing dots in one expression.
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
  return source
    .map((tld) => tld.trim().toLowerCase().replace(/^\./, ""))
    .filter(Boolean)
})()

const BLOCKED_DOMAINS: ReadonlySet<string> = new Set(
  Array.isArray(blocklist.domains) ? blocklist.domains.map((d) => d.toLowerCase()) : []
)

export const BLOCKLIST_META = Object.freeze({
  count: BLOCKED_DOMAINS.size,
  commit: blocklist.commit ?? null,
  source: blocklist.source ?? null,
})

export type EmailCheck =
  | { ok: true; email: string; domain: string }
  | { ok: false; reason: "invalid" | "too_long" }
  | { ok: false; reason: "blocked"; domain: string; matched: string }

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

  // Bracketed IP literals ("[1.2.3.4]") and any percent-encoding are not
  // domains we can block or deliver to.
  if (domain.includes("[") || domain.includes("]") || domain.includes("%")) return null

  domain = domain.replace(/\.+$/, "")
  if (!domain || domain.length > MAX_DOMAIN_LENGTH) return null

  // IDNA / UTS 46 to ASCII. Returns "" on failure (never throws for a string).
  const ascii = domainToASCII(domain)
  if (!ascii) return null

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

  return { local, domain }
}

function isExemptDomain(domain: string): boolean {
  if (EXEMPT_TLDS.length === 0) return false
  const tld = domain.slice(domain.lastIndexOf(".") + 1)
  return EXEMPT_TLDS.includes(tld)
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
 * The single entry point used by the API route.
 *
 * `email` is returned lowercased so repeat submissions from the same mailbox do
 * not create case-variant rows. The local part is preserved verbatim otherwise
 * (no `+tag` stripping and no Gmail dot folding) — that would change the
 * customer's actual delivery address.
 */
export function checkEmail(raw: unknown): EmailCheck {
  if (typeof raw !== "string") return { ok: false, reason: "invalid" }

  const trimmed = raw.trim()
  if (!trimmed) return { ok: false, reason: "invalid" }
  if (trimmed.length > MAX_EMAIL_LENGTH) return { ok: false, reason: "too_long" }

  const parsed = parseEmail(trimmed)
  if (!parsed) return { ok: false, reason: "invalid" }

  const email = `${parsed.local.toLowerCase()}@${parsed.domain}`

  if (isExemptDomain(parsed.domain)) {
    return { ok: true, email, domain: parsed.domain }
  }

  const matched = isBlockedDomain(parsed.domain)
  if (matched) {
    return { ok: false, reason: "blocked", domain: parsed.domain, matched }
  }

  return { ok: true, email, domain: parsed.domain }
}

/**
 * Canonical key for the per-address rate limit.
 *
 * Without this, `email:${raw}` gives an attacker a fresh bucket per variant:
 * `a+1@gmail.com`, `A@x.com`, and `a@x.com ` are three separate keys. Plus-tag
 * stripping and Gmail dot-folding are safe HERE because they only decide
 * whether two submissions are "the same person" — the stored address is never
 * altered by this function.
 */
export function toRateLimitKey(email: string): string {
  const trimmed = email.trim().toLowerCase()
  const at = trimmed.lastIndexOf("@")
  if (at <= 0) return trimmed

  let local = trimmed.slice(0, at)
  const domain = trimmed.slice(at + 1).replace(/\.+$/, "")

  // Subaddress delimiter (RFC 5233). Not universal, but the overwhelmingly
  // common convention and the right default for abuse bucketing.
  const plus = local.indexOf("+")
  if (plus > 0) local = local.slice(0, plus)

  // Dots are ignored for consumer Gmail only. They are meaningful on Google
  // Workspace/custom domains, where jane.doe@ and janedoe@ can be two people.
  if (domain === "gmail.com" || domain === "googlemail.com") {
    local = local.replace(/\./g, "")
  }

  return `${local}@${domain}`
}

/** Common typos, so a mistake produces a suggestion instead of a dead end. */
const TYPO_MAP: Readonly<Record<string, string>> = {
  "gmial.com": "gmail.com",
  "gmai.com": "gmail.com",
  "gmil.com": "gmail.com",
  "gmal.com": "gmail.com",
  "gnail.com": "gmail.com",
  "gmail.con": "gmail.com",
  "gmail.cm": "gmail.com",
  "gmail.co": "gmail.com",
  "gmail.comm": "gmail.com",
  "hotmial.com": "hotmail.com",
  "hotmai.com": "hotmail.com",
  "hotmal.com": "hotmail.com",
  "hotmail.con": "hotmail.com",
  "outlok.com": "outlook.com",
  "outllok.com": "outlook.com",
  "outlook.con": "outlook.com",
  "yaho.com": "yahoo.com",
  "yahho.com": "yahoo.com",
  "yahoo.con": "yahoo.com",
  "iclould.com": "icloud.com",
  "iclod.com": "icloud.com",
  "protonmai.com": "protonmail.com",
  "protonmal.com": "protonmail.com",
}

/** Returns the corrected domain for a known typo, or null. */
export function suggestDomainFix(domain: string): string | null {
  return TYPO_MAP[domain.toLowerCase()] ?? null
}

/**
 * Guards against the silent-no-op class of bug: the repo builds with
 * `typescript.ignoreBuildErrors: true`, so a malformed or empty list would ship
 * without failing anything. Called once at module load.
 */
export function validateBlocklistOrWarn(): boolean {
  const probes = ["mailinator.com", "guerrillamail.com", "yopmail.com"]
  const missing = probes.filter((domain) => !BLOCKED_DOMAINS.has(domain))
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
