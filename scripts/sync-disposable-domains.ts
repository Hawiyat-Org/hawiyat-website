/**
 * Regenerates lib/data/disposable-domains.json from the upstream CC0 blocklist.
 *
 * Run manually before a release:
 *   pnpm sync:domains
 *
 * Why a committed file instead of an npm package or a runtime fetch:
 *   - The list becomes a reviewable git diff. A domain appearing from nowhere is
 *     visible in code review, which is our defence against the list-poisoning
 *     pattern (Jan 2026: a feed injected 33 legitimate company domains into a
 *     widely consumed list).
 *   - No network dependency and no third-party failure mode on the order path.
 *   - Deploys are pinned: `commit` records exactly which upstream revision is
 *     shipping, so "which list version blocked this customer?" is answerable.
 *
 * Source: https://github.com/disposable-email-domains/disposable-email-domains
 * Licence: CC0 1.0 (public domain).
 *
 * This script imports only lib/domain-rules.ts, which has no dependencies. It
 * must NOT import lib/email-validation.ts: that module imports the JSON this
 * script produces, so doing so would be circular on a cold checkout.
 */
import { existsSync, readFileSync } from "node:fs"
import { writeFile } from "node:fs/promises"
import { join } from "node:path"

import { isValidAsciiDomain } from "../lib/domain-rules"

const SOURCE_REPO = "https://github.com/disposable-email-domains/disposable-email-domains"
const SOURCE_URL = `${SOURCE_REPO}/raw/main/disposable_email_blocklist.conf`
const API_URL = "https://api.github.com/repos/disposable-email-domains/disposable-email-domains/commits/main"

const OUTPUT_PATH = join(process.cwd(), "lib", "data", "disposable-domains.json")

/** Sanity floors. An upstream bug or a truncated response must never ship. */
const MIN_ENTRIES = 5000
const MAX_BODY_BYTES = 5_000_000
const MAX_SHRINK = 0.05 // abort if the list lost more than 5%
const MAX_GROWTH = 0.1 // abort if the list grew more than 10% in one update

/**
 * Stricter than the runtime validator on purpose: the list is shipped in ASCII
 * with no trailing dots, so an entry that needs IDNA or FQDN normalization is
 * evidence the upstream feed changed shape. Fail the sync and look at it rather
 * than silently normalizing it into the list.
 */
function isValidUpstreamEntry(domain: string): boolean {
  return isValidAsciiDomain(domain) && domain === domain.toLowerCase()
}

function readExistingDomains(): string[] {
  if (!existsSync(OUTPUT_PATH)) return []
  try {
    const parsed = JSON.parse(readFileSync(OUTPUT_PATH, "utf8")) as { domains?: unknown }
    return Array.isArray(parsed.domains) ? (parsed.domains as string[]) : []
  } catch {
    return []
  }
}

async function fetchCommitSha(): Promise<string | null> {
  try {
    const response = await fetch(API_URL, {
      headers: { "User-Agent": "hawiyat-website/domain-sync", Accept: "application/vnd.github+json" },
    })
    if (!response.ok) return null
    const data = (await response.json()) as { sha?: string }
    return typeof data.sha === "string" ? data.sha : null
  } catch {
    // Non-fatal: the sync still produces a valid list, just without the pin.
    return null
  }
}

async function main() {
  // Resolve the commit BEFORE reading the content, then fetch that exact
  // revision. Reading the mutable `main` branch and resolving its SHA with a
  // second request leaves a window where a merge in between makes the recorded
  // SHA describe a different tree than the domains we write — provenance that
  // is wrong exactly when an incident review needs it.
  const commit = await fetchCommitSha()
  if (!commit) {
    throw new Error("Refusing to write: could not resolve the upstream commit SHA.")
  }

  const url = `${SOURCE_REPO}/raw/${commit}/disposable_email_blocklist.conf`
  const response = await fetch(url, {
    headers: { "User-Agent": "hawiyat-website/domain-sync" },
  })
  if (!response.ok) {
    throw new Error(`Upstream returned HTTP ${response.status} for ${url}`)
  }

  const contentType = response.headers.get("content-type") ?? ""
  if (!contentType.includes("text/plain") && !contentType.includes("octet-stream")) {
    throw new Error(`Refusing to write: unexpected content-type "${contentType}" for ${url}`)
  }

  // Cap the body: a hostile or misconfigured endpoint should not be able to
  // exhaust memory on the machine running the sync.
  const buffer = await response.arrayBuffer()
  if (buffer.byteLength > MAX_BODY_BYTES) {
    throw new Error(
      `Refusing to write: upstream body is ${buffer.byteLength} bytes (cap is ${MAX_BODY_BYTES}).`
    )
  }

  const text = new TextDecoder("utf-8").decode(buffer)
  const lines = text.split(/\r?\n/)

  const invalid: string[] = []
  const seen = new Set<string>()

  for (const line of lines) {
    const trimmed = line.trim().toLowerCase()
    if (!trimmed || trimmed.startsWith("#")) continue
    if (!isValidUpstreamEntry(trimmed)) {
      invalid.push(trimmed)
      continue
    }
    seen.add(trimmed)
  }

  // Fail hard rather than silently dropping entries: a malformed entry is
  // evidence the upstream data is not what we think it is.
  if (invalid.length > 0) {
    throw new Error(
      `Upstream contains ${invalid.length} invalid entr(ies); refusing to write.\n` +
        `First 10: ${invalid.slice(0, 10).join(", ")}`
    )
  }

  const domains = [...seen].sort()

  if (domains.length < MIN_ENTRIES) {
    throw new Error(`Refusing to write: only ${domains.length} domains (floor is ${MIN_ENTRIES}).`)
  }

  const previous = readExistingDomains()
  if (previous.length > 0) {
    if (domains.length < previous.length * (1 - MAX_SHRINK)) {
      throw new Error(
        `Refusing to write: list shrank from ${previous.length} to ${domains.length} ` +
          `(more than ${MAX_SHRINK * 100}%). Investigate before forcing.`
      )
    }
    if (domains.length > previous.length * (1 + MAX_GROWTH)) {
      throw new Error(
        `Refusing to write: list grew from ${previous.length} to ${domains.length} ` +
          `(more than ${MAX_GROWTH * 100}%). Review the diff before accepting.`
      )
    }
  }

  const payload = {
    source: SOURCE_REPO,
    sourceUrl: url,
    commit,
    fetchedAt: new Date().toISOString(),
    count: domains.length,
    domains,
  }

  // Pretty-printed so every domain is its own line: makes the git diff
  // reviewable, which is the entire point of committing the list.
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`, "utf8")

  const before = new Set(previous)
  const after = new Set(domains)
  const added = domains.filter((d) => !before.has(d))
  const removed = previous.filter((d) => !after.has(d))
  if (added.length > 0) console.log(`  added (${added.length}): ${added.slice(0, 40).join(", ")}${added.length > 40 ? ", …" : ""}`)
  if (removed.length > 0) console.log(`  removed (${removed.length}): ${removed.slice(0, 40).join(", ")}${removed.length > 40 ? ", …" : ""}`)

  const delta = previous.length > 0 ? domains.length - previous.length : 0
  console.log(
    `Wrote ${domains.length} domains to lib/data/disposable-domains.json ` +
      `(delta ${delta >= 0 ? "+" : ""}${delta}, commit ${commit?.slice(0, 12) ?? "unknown"})`
  )
}

main().catch((error) => {
  const cause = (error as { cause?: { message?: string; code?: string } })?.cause
  console.error(
    "Domain sync failed:",
    error instanceof Error ? error.message : error,
    cause ? `(cause: ${cause.code ?? ""} ${cause.message ?? ""})` : ""
  )
  process.exitCode = 1
})
