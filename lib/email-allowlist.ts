import { prisma } from "@/lib/prisma/prismaClient"

/**
 * Operator-managed exemptions from the disposable-domain blocklist.
 *
 * This is deliberately queried ONLY when a domain has already been blocked, so
 * the happy path costs zero database round trips.
 *
 * `domain` is the customer's actual host; `matched` is the blocklist entry that
 * caught it. Both are checked because the blocklist matches on a parent suffix:
 * the entry `0-mailer.dynv6.net` blocks `a.b.0-mailer.dynv6.net`, so an operator
 * who allowlists `dynv6.net` (or the matched entry itself) must actually take
 * effect. Looking up only the customer's full host would make those unblocks
 * silently no-ops.
 *
 * Fail policy: a lookup failure returns false, i.e. the blocklist still applies.
 * An allowlist must deny by default; the alternative is that a database outage
 * silently disables the whole control.
 */
export async function isDomainAllowlisted(domain: string, matched?: string): Promise<boolean> {
  const candidates = [domain.toLowerCase()]
  if (matched && matched.toLowerCase() !== candidates[0]) {
    candidates.push(matched.toLowerCase())
  }

  try {
    const row = await prisma.emailDomainAllowlist.findFirst({
      where: { domain: { in: candidates } },
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
