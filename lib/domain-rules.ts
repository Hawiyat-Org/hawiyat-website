/**
 * Domain syntax rules shared by the validator and the blocklist sync script.
 *
 * This module MUST NOT import anything, including the generated blocklist JSON.
 * The sync script needs these rules in order to produce that JSON, so a shared
 * module that depended on the JSON would be circular.
 */

export const MAX_EMAIL_LENGTH = 254
export const MAX_LOCAL_LENGTH = 64
export const MAX_DOMAIN_LENGTH = 253

/** A single DNS label: alphanumeric, may contain hyphens, not at either end. */
export const LABEL_RE = /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/

/**
 * Characters that must never reach IDNA conversion.
 *
 * `domainToASCII` is implemented on top of WHATWG host parsing, which TRUNCATES
 * at these characters instead of failing: `domainToASCII("x.com/path")` returns
 * `"x.com"`. Accepting that would silently store an address the customer did not
 * type, and would let a path or query string ride along with the host.
 */
const FORBIDDEN_DOMAIN_CHARS = /[[\]%\\/?#\s]/

export function hasForbiddenDomainChars(domain: string): boolean {
  return FORBIDDEN_DOMAIN_CHARS.test(domain)
}

/**
 * True when `domain` is a syntactically valid, at-least-two-label ASCII host.
 * Expects an already-normalized (lowercased, trailing dots stripped) value.
 */
export function isValidAsciiDomain(domain: string): boolean {
  if (!domain || domain.length > MAX_DOMAIN_LENGTH) return false
  if (hasForbiddenDomainChars(domain)) return false

  const labels = domain.split(".")
  if (labels.length < 2) return false
  if (!labels.every((label) => LABEL_RE.test(label))) return false

  // An all-numeric TLD means we were handed an IP address, not a domain.
  return !/^\d+$/.test(labels[labels.length - 1])
}
