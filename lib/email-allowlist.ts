import { prisma } from "@/lib/prisma/prismaClient"

/**
 * Operator-managed exemptions from the disposable-domain blocklist.
 *
 * This is deliberately queried ONLY when a domain has already been blocked, so
 * the happy path costs zero database round trips. A blocked submission is rare,
 * and one primary-key lookup is far cheaper than caching an allowlist in
 * module scope (which on serverless would be per-instance and would delay an
 * unblock by the cache TTL anyway).
 *
 * Fail policy: a lookup failure returns false, i.e. the blocklist still applies.
 * An allowlist must deny by default; the alternative is that a database outage
 * silently disables the whole control.
 */
export async function isDomainAllowlisted(domain: string): Promise<boolean> {
  try {
    const row = await prisma.emailDomainAllowlist.findUnique({
      where: { domain: domain.toLowerCase() },
      select: { domain: true },
    })
    return row !== null
  } catch (error) {
    // Includes the "table does not exist yet" case, which must not take the
    // order endpoint down if the schema change has not been applied.
    console.error("Email allowlist lookup failed:", error)
    return false
  }
}
