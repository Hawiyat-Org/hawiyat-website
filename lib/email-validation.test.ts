import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  BLOCKLIST_META,
  SELF_TEST_DOMAINS,
  TYPO_MAP,
  checkEmail,
  isBlockedDomain,
  isExemptDomain,
  normalizeDomain,
  parseEmail,
  suggestDomainFix,
  toRateLimitKey,
  validateBlocklistOrWarn,
} from "@/lib/email-validation"
import blocklist from "@/lib/data/disposable-domains.json"

describe("blocklist integrity", () => {
  it("loads a plausible number of domains", () => {
    assert.ok(BLOCKLIST_META.count >= 5000, `expected >= 5000, got ${BLOCKLIST_META.count}`)
  })

  it("contains the canonical disposable providers", () => {
    assert.equal(validateBlocklistOrWarn(), true)
  })

  it("pins the upstream revision it was generated from", () => {
    assert.match(String(BLOCKLIST_META.commit), /^[0-9a-f]{40}$/)
  })

  it("includes multi-label entries that eTLD+1 matching would miss", () => {
    assert.ok(BLOCKLIST_META.count > 0)
    assert.equal(isBlockedDomain("0-mailer.dynv6.net"), "0-mailer.dynv6.net")
  })

  it("self-test domains are present", () => {
    for (const domain of SELF_TEST_DOMAINS) {
      assert.equal(isBlockedDomain(domain), domain)
    }
  })

  it("the file's own count matches the loaded set", () => {
    assert.equal(blocklist.domains.length, BLOCKLIST_META.count)
    assert.equal(blocklist.count, BLOCKLIST_META.count)
  })

  it("contains no entries that would over-block a whole registry or public suffix", () => {
    const suffixes = new Set(["co.uk", "com.br", "gov.uk", "com.au", "co.jp", "gmail.com", "outlook.com"])
    for (const domain of blocklist.domains) {
      assert.equal(suffixes.has(domain), false, `${domain} would over-block`)
      assert.equal(domain.split(".").length >= 2, true, `${domain} has fewer than 2 labels`)
    }
  })
})

describe("normalizeDomain fails closed", () => {
  const rejected = [
    "[1.2.3.4]",
    "mail..com",
    ".mailinator.com",
    "1.2.3.4",
    "localhost",
    "",
    "   ",
    "mailinator%2Ecom",
    "evil.com:8080",
    "a b.com",
    "-leading.com",
    "trailing-.com",
    // domainToASCII truncates at these instead of failing, so they are rejected
    // before conversion: `x.com/path` would otherwise be accepted as `x.com`.
    "x.com/path",
    "x.com?y=1",
    "x.com#frag",
    "x.com\\path",
  ]

  for (const input of rejected) {
    it(`rejects ${JSON.stringify(input)}`, () => {
      assert.equal(normalizeDomain(input), null)
    })
  }

  it("strips every trailing dot (FQDN form)", () => {
    assert.equal(normalizeDomain("mailinator.com.."), "mailinator.com")
    assert.equal(normalizeDomain("MAILINATOR.COM."), "mailinator.com")
  })

  it("converts fullwidth input to ASCII", () => {
    assert.equal(normalizeDomain("ｇｍａｉｌ.com"), "gmail.com")
  })

  it("keeps a valid ordinary domain intact", () => {
    assert.equal(normalizeDomain("Example.COM"), "example.com")
  })
})

describe("parseEmail", () => {
  it("splits on the last @ and preserves the local part", () => {
    assert.deepEqual(parseEmail("Jane.Doe+orders@Example.com"), {
      local: "Jane.Doe+orders",
      domain: "example.com",
    })
  })

  const rejected = [
    "a@b@c.com",
    "@example.com",
    "jane@",
    "no-at-sign.com",
    "jane doe@example.com",
    "jane..doe@example.com",
    ".jane@example.com",
    "jane.@example.com",
    "ünicode@example.com",
  ]

  for (const input of rejected) {
    it(`rejects ${JSON.stringify(input)}`, () => {
      assert.equal(parseEmail(input), null)
    })
  }
})

describe("isBlockedDomain uses suffix matching", () => {
  it("matches an exact entry", () => {
    assert.equal(isBlockedDomain("mailinator.com"), "mailinator.com")
  })

  it("matches a subdomain of an entry", () => {
    assert.equal(isBlockedDomain("a.b.c.d.e.mailinator.com"), "mailinator.com")
  })

  it("matches a multi-label entry under a private public-suffix", () => {
    // dynv6.net is a private PSL entry, so registrable-domain extraction with
    // allowPrivateDomains:false collapses 0-mailer.dynv6.net to dynv6.net and
    // misses the listed entry entirely. The suffix walk must catch it.
    assert.equal(isBlockedDomain("0-mailer.dynv6.net"), "0-mailer.dynv6.net")
    assert.equal(isBlockedDomain("a.b.0-mailer.dynv6.net"), "0-mailer.dynv6.net")
  })

  it("does not over-block an unlisted sibling on the same private suffix", () => {
    // Only specific dynv6.net subdomains are listed; the parent is not.
    assert.equal(isBlockedDomain("someone-real.dynv6.net"), null)
  })

  it("does not block ordinary domains", () => {
    assert.equal(isBlockedDomain("gmail.com"), null)
    assert.equal(isBlockedDomain("example.com"), null)
  })

  it("never matches on the bare TLD", () => {
    assert.equal(isBlockedDomain("com"), null)
  })
})

describe("checkEmail", () => {
  it("accepts an ordinary address", () => {
    const result = checkEmail("Jane.Doe+orders@Example.com")
    assert.equal(result.ok, true)
    assert.equal(result.ok && result.email, "jane.doe+orders@example.com")
    assert.equal(result.ok && result.domain, "example.com")
  })

  it("accepts an address on an exempt .dz domain", () => {
    const result = checkEmail("etudiant@univ-alger.dz")
    assert.equal(result.ok, true)
  })

  it("blocks a listed domain", () => {
    const result = checkEmail("user@mailinator.com")
    assert.deepEqual(result, {
      ok: false,
      reason: "blocked",
      email: "user@mailinator.com",
      domain: "mailinator.com",
      matched: "mailinator.com",
    })
  })

  const blockedVariants = [
    "user@MAILINATOR.COM.",
    "user@mailinator.com..",
    "user@mailinator\u200B.com",
    "user@a.b.c.d.e.mailinator.com",
    "user@yopmail.com",
    "user@guerrillamail.com",
    "user+tag@mailinator.com",
  ]

  for (const input of blockedVariants) {
    it(`blocks the variant ${JSON.stringify(input)}`, () => {
      const result = checkEmail(input)
      assert.equal(result.ok, false)
      assert.equal(!result.ok && result.reason, "blocked")
    })
  }

  it("reports unparseable domains as invalid, not as blocked", () => {
    for (const input of ["user@[1.2.3.4]", "user@mail..com", "user@mailinator", "a@b@c.com"]) {
      const result = checkEmail(input)
      assert.equal(result.ok, false)
      assert.equal(!result.ok && result.reason, "invalid")
    }
  })

  it("reports over-length input as too_long", () => {
    const result = checkEmail(`${"a".repeat(250)}@example.com`)
    assert.equal(result.ok, false)
    assert.equal(!result.ok && result.reason, "too_long")
  })

  it("rejects non-string input without throwing", () => {
    for (const input of [undefined, null, 42, {}, []]) {
      const result = checkEmail(input)
      assert.equal(result.ok, false)
      assert.equal(!result.ok && result.reason, "invalid")
    }
  })
})

describe("toRateLimitKey", () => {
  it("collapses plus-tag variants", () => {
    assert.equal(toRateLimitKey("a+1@gmail.com"), toRateLimitKey("a+2@gmail.com"))
  })

  it("collapses case and whitespace variants", () => {
    assert.equal(toRateLimitKey("  A@Example.COM "), toRateLimitKey("a@example.com"))
  })

  it("collapses Gmail dot variants", () => {
    assert.equal(toRateLimitKey("j.a.n.e@gmail.com"), toRateLimitKey("jane@gmail.com"))
    assert.equal(toRateLimitKey("j.a.n.e@googlemail.com"), toRateLimitKey("jane@googlemail.com"))
  })

  it("does NOT fold dots on non-Gmail domains", () => {
    assert.notEqual(toRateLimitKey("jane.doe@company.com"), toRateLimitKey("janedoe@company.com"))
  })

  it("does NOT merge plus-tagged mailboxes on providers without subaddressing", () => {
    // On a server that does not implement RFC 5233 these can be two real people.
    assert.notEqual(toRateLimitKey("a+b@company.com"), toRateLimitKey("a@company.com"))
  })

  it("strips plus-tags on providers that do subaddress", () => {
    assert.equal(toRateLimitKey("a+b@outlook.com"), toRateLimitKey("a@outlook.com"))
  })
})

describe("suggestDomainFix", () => {
  it("recognises common typos", () => {
    assert.equal(suggestDomainFix("gmial.com"), "gmail.com")
    assert.equal(suggestDomainFix("hotmial.com"), "hotmail.com")
  })

  it("returns null for domains it does not know", () => {
    assert.equal(suggestDomainFix("example.com"), null)
  })

  it("only maps domains that are actually blocklisted", () => {
    // The suggester is consulted only on the blocked path, so a key that is not
    // in the blocklist can never fire. This pins that coupling.
    for (const key of Object.keys(TYPO_MAP)) {
      assert.notEqual(isBlockedDomain(key), null, `${key} is not on the blocklist; its suggestion is dead`)
    }
  })
})

describe("the .dz exemption outranks the blocklist", () => {
  it("treats .dz as exempt", () => {
    assert.equal(isExemptDomain("univ-alger.dz"), true)
    assert.equal(isExemptDomain("example.com"), false)
  })

  it("exempts a domain even when the blocklist would catch it", () => {
    // No .dz domain is on the list, so inject a TLD that is, to prove the
    // ordering of the exemption and the blocklist check. If these two branches
    // were swapped, this test fails.
    const result = checkEmail("user@mailinator.com", { exemptTlds: ["com"] })
    assert.equal(result.ok, true)
  })

  it("still blocks the same domain when the exemption does not apply", () => {
    const result = checkEmail("user@mailinator.com", { exemptTlds: ["dz"] })
    assert.equal(result.ok, false)
    assert.equal(!result.ok && result.reason, "blocked")
  })
})

describe("length limits survive punycode expansion", () => {
  it("rejects a domain that only exceeds the limit after IDNA conversion", () => {
    // 6 labels of 40 non-ASCII characters: 249 chars pre-IDNA (fits), 285
    // post-IDNA (does not). The pre-conversion length check alone lets this
    // through, so the post-conversion check is what makes it fail closed.
    const label = "ü".repeat(40)
    const domain = Array.from({ length: 6 }, () => label).join(".") + ".com"
    assert.ok(domain.length <= 253, "pre-IDNA length should fit")
    assert.equal(normalizeDomain(domain), null)
  })

  it("rejects an address that only exceeds 254 characters after IDNA conversion", () => {
    const local = "a".repeat(64)
    const label = "ü".repeat(40)
    const domain = Array.from({ length: 6 }, () => label).join(".") + ".com"
    const result = checkEmail(`${local}@${domain}`)
    assert.equal(result.ok, false)
  })
})
