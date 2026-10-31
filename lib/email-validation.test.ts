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
  normalizeEmail,
  parseEmail,
  suggestDomainFix,
  toRateLimitKey,
  validateBlocklistFreshness,
  validateBlocklistOrWarn,
} from "@/lib/email-validation"
import {
  LABEL_RE,
  MAX_DOMAIN_LENGTH,
  MAX_EMAIL_LENGTH,
  MAX_LOCAL_LENGTH,
  isValidAsciiDomain,
} from "@/lib/domain-rules"
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
  // The per-part limits are checked before and after conversion, and again on the
  // combined address. Each check is load-bearing; this block pins the combined one.
  const punycodeLabel = "xn--tda" // domainToASCII("ü")

  it("rejects a domain that only exceeds 253 characters after IDNA conversion", () => {
    // 249 characters pre-IDNA (fits), 285 post-IDNA (does not). Without the
    // post-conversion length check this is accepted as a bogus host.
    const label = "ü".repeat(40)
    const domain = Array.from({ length: 6 }, () => label).join(".") + ".com"
    assert.ok(domain.length <= MAX_DOMAIN_LENGTH, "pre-IDNA length should fit")
    assert.equal(normalizeDomain(domain), null)
    assert.equal(checkEmail(`user@${domain}`).ok, false)
  })

  it("accepts a raw address of 254 characters whose post-IDNA form is exactly 254", () => {
    const domain = [a(63), a(63), a(53), "ü"].join(".")
    const ascii = normalizeDomain(domain)!
    assert.equal(ascii.length, 189)
    assert.equal(ascii, [a(63), a(63), a(53), punycodeLabel].join("."))
    assert.equal(64 + 1 + ascii.length, MAX_EMAIL_LENGTH)
    assert.equal(checkEmail(`${a(64)}@${domain}`).ok, true)
  })

  it("rejects a raw address under 254 characters whose post-IDNA form is 255", () => {
    // The address is only 249 characters as typed, so the top-level length gate
    // cannot catch this: only the post-conversion total check can. Without it,
    // parseEmail returns a 255-character address and normalizeEmail stores it.
    const domain = [a(63), a(63), a(54), "ü"].join(".")
    const ascii = normalizeDomain(domain)!
    assert.equal(ascii.length, 190)

    const address = `${a(64)}@${domain}`
    assert.equal(address.length, 249)
    assert.ok(address.length <= MAX_EMAIL_LENGTH, "the raw address fits the top-level cap")
    assert.equal(64 + 1 + ascii.length, MAX_EMAIL_LENGTH + 1)

    assert.equal(parseEmail(address), null)
    assert.equal(normalizeEmail(address), null)
    assert.equal(checkEmail(address).ok, false)
  })
})

const a = (n: number) => "a".repeat(n)

describe("normalizeDomain boundaries", () => {
  it("accepts a 63-character label and rejects a 64-character one", () => {
    // LABEL_RE allows {0,61} interior characters, i.e. 63 total.
    assert.equal(normalizeDomain(`${a(63)}.com`), `${a(63)}.com`)
    assert.equal(normalizeDomain(`${a(64)}.com`), null)
  })

  it("accepts a 253-character domain and rejects a 254-character one", () => {
    const atLimit = [a(63), a(63), a(63), a(61)].join(".")
    assert.equal(atLimit.length, MAX_DOMAIN_LENGTH)
    assert.equal(normalizeDomain(atLimit), atLimit)

    const overLimit = [a(63), a(63), a(63), a(62)].join(".")
    assert.equal(overLimit.length, MAX_DOMAIN_LENGTH + 1)
    assert.equal(normalizeDomain(overLimit), null)
  })

  it("accepts exactly two labels and rejects a single label", () => {
    assert.equal(normalizeDomain("a.b"), "a.b")
    assert.equal(normalizeDomain("example.co"), "example.co")
    assert.equal(normalizeDomain("com"), null)
    assert.equal(normalizeDomain("localhost"), null)
  })

  it("allows interior hyphens but not edge hyphens, in any label", () => {
    assert.equal(normalizeDomain("a-b.com"), "a-b.com")
    assert.equal(normalizeDomain("a--b.com"), "a--b.com")
    assert.equal(normalizeDomain("a.b-c.com"), "a.b-c.com")
    assert.equal(normalizeDomain("xn--bcher-kva.com"), "xn--bcher-kva.com")

    for (const input of ["-a.com", "a-.com", "a.-b.com", "a.b-.com"]) {
      assert.equal(normalizeDomain(input), null, input)
    }
  })

  it("rejects labels containing underscores or non-alphanumeric punctuation", () => {
    for (const input of ["_dmarc.example.com", "a_b.com", "exa!mple.com"]) {
      assert.equal(normalizeDomain(input), null, input)
    }
  })

  it("only ever returns legal labels", () => {
    for (const input of ["Example.COM", "ａ-b.c-d.co.uk", "münchen.de", "0-mailer.dynv6.net"]) {
      const out = normalizeDomain(input)
      assert.notEqual(out, null, input)
      for (const label of out!.split(".")) {
        assert.ok(LABEL_RE.test(label), `${input} produced illegal label ${label}`)
      }
    }
  })
})

describe("parseEmail boundaries", () => {
  it("accepts a 64-character local part and rejects a 65-character one", () => {
    assert.equal(MAX_LOCAL_LENGTH, 64)
    assert.notEqual(parseEmail(`${a(64)}@example.com`), null)
    assert.equal(parseEmail(`${a(65)}@example.com`), null)
  })

  it("accepts a 254-character address and rejects a 255-character one", () => {
    const fits = `${a(64)}@${[a(63), a(63), a(57), "com"].join(".")}`
    assert.equal(fits.length, MAX_EMAIL_LENGTH)
    assert.notEqual(parseEmail(fits), null)

    const overflows = `${a(64)}@${[a(63), a(63), a(58), "com"].join(".")}`
    assert.equal(overflows.length, MAX_EMAIL_LENGTH + 1)
    assert.equal(parseEmail(overflows), null)
  })

  it("trims surrounding whitespace but rejects whitespace anywhere inside", () => {
    assert.deepEqual(parseEmail("  user@example.com  "), { local: "user", domain: "example.com" })
    for (const input of ["user@ example.com", "us er@example.com", "user\t@example.com", "user@mailinator .com"]) {
      assert.equal(parseEmail(input), null, input)
    }
  })

  it("rejects non-ASCII local parts (ASCII-only mailbox rule)", () => {
    // The domain side is IDNA-normalized, the local side is not: accepting these
    // would store two distinct addresses that deliver to one mailbox.
    for (const local of ["ünicode", "josé", "用户", "😀", "user\u0301"]) {
      assert.equal(parseEmail(`${local}@example.com`), null, local)
    }
  })

  it("rejects a zero-width space hidden in the local part", () => {
    assert.equal(parseEmail("user\u200B@example.com"), null)
  })
})

describe("checkEmail whitespace and control handling", () => {
  it("is stable under surrounding whitespace", () => {
    const corpus = [
      "user@mailinator.com",
      "user@example.com",
      "etudiant@univ-alger.dz",
      "user@mailinator.com.",
      "USER@MAILINATOR.COM",
    ]
    const wrappers: Array<(s: string) => string> = [
      (s) => ` ${s}`,
      (s) => `${s} `,
      (s) => `\t${s}\n`,
      (s) => `\r\n  ${s}  \r\n`,
      (s) => `\u00A0${s}\u00A0`,
    ]
    for (const address of corpus) {
      const base = checkEmail(address)
      for (const wrap of wrappers) {
        const wrapped = wrap(address)
        assert.deepEqual(checkEmail(wrapped), base, `${JSON.stringify(wrapped)} diverged from ${address}`)
      }
    }
  })

  it("never turns a blocked address into an allowed one by padding it", () => {
    for (const pad of ["\t", "\n", "\r", "\u00A0", "\u3000", " "]) {
      const result = checkEmail(`user@mailinator.com${pad}`)
      assert.equal(result.ok, false, JSON.stringify(pad))
      assert.equal(!result.ok && result.reason, "blocked", JSON.stringify(pad))
    }
  })

  it("rejects control characters embedded in the domain", () => {
    for (const cp of ["\t", "\n", "\r", "\u00A0", "\u3000", "\v", "\f"]) {
      const result = checkEmail(`user@mailin${cp}ator.com`)
      assert.equal(result.ok, false, JSON.stringify(cp))
      assert.equal(!result.ok && result.reason, "invalid", JSON.stringify(cp))
    }
  })

  it("still blocks a domain whose zero-width space is stripped by IDNA", () => {
    // U+200B is Map-to-nothing under UTS 46, so normalization removes it and the
    // suffix walk still hits the entry. It must never become an allow.
    assert.deepEqual(checkEmail("user@mailin\u200Bator.com"), {
      ok: false,
      reason: "blocked",
      email: "user@mailinator.com",
      domain: "mailinator.com",
      matched: "mailinator.com",
    })
  })

  it("reports too_long in preference to invalid for an over-length non-address", () => {
    // Ordering matters: the route maps too_long -> field_too_long and invalid ->
    // invalid_email, so 255 characters of junk must not read as a format problem.
    const result = checkEmail(a(255))
    assert.equal(result.ok, false)
    assert.equal(!result.ok && result.reason, "too_long")
  })
})

describe("isBlockedDomain contract", () => {
  it("expects an already-normalized domain", () => {
    // The function performs no normalization of its own. checkEmail is the only
    // sanctioned path; this pins the coupling so a future caller that forgets to
    // normalize fails here instead of silently allowing every uppercase address.
    assert.equal(isBlockedDomain("MAILINATOR.COM"), null)
    assert.equal(isBlockedDomain("mailinator.com."), null)
    assert.equal(isBlockedDomain(" mailinator.com"), null)
    assert.equal(isBlockedDomain("mailinator.com"), "mailinator.com")
  })

  it("cannot match a single-label domain because no entry is single-label", () => {
    assert.equal(blocklist.domains.some((d) => !d.includes(".")), false)
    for (const tld of ["com", "net", "org", "dz", "app"]) {
      assert.equal(isBlockedDomain(tld), null, tld)
    }
  })

  it("does not match an entry embedded on the left of a longer host", () => {
    assert.equal(isBlockedDomain("com.mailinator"), null)
    assert.equal(isBlockedDomain("mailinator.com.evil.com"), null)
  })
})

describe("isExemptDomain", () => {
  it("matches on the last label only", () => {
    assert.equal(isExemptDomain("univ-alger.dz"), true)
    assert.equal(isExemptDomain("dz.example.com"), false)
    assert.equal(isExemptDomain("notdz.com"), false)
  })

  it("returns false when the exemption list is empty", () => {
    assert.equal(isExemptDomain("univ-alger.dz", []), false)
  })
})

describe("normalizeDomain is idempotent", () => {
  const sample = [
    "Example.COM",
    "MAILINATOR.COM.",
    "mailinator.com..",
    "ａ-b.c-d.co.uk",
    "ｇｍａｉｌ.com",
    "münchen.de",
    "xn--mnchen-3ya.de",
    "bücher.example",
    "0-mailer.dynv6.net",
    "a.b.c.d.example.com",
    "univ-alger.dz",
    "x.com",
    "EXAMPLE.co.UK",
    "foo.vercel.app",
  ]

  it("normalizing twice equals normalizing once, over the whole blocklist", () => {
    for (const input of [...sample, ...blocklist.domains]) {
      const once = normalizeDomain(input)
      const twice = once === null ? null : normalizeDomain(once)
      assert.equal(twice, once, `normalizeDomain(${JSON.stringify(input)}) is not idempotent`)
    }
  })

  it("returns only lowercase values without trailing dots", () => {
    for (const input of sample) {
      const out = normalizeDomain(input)
      if (out === null) continue
      assert.equal(out, out.toLowerCase())
      assert.equal(out.endsWith("."), false)
    }
  })
})

describe("toRateLimitKey is idempotent and non-colliding", () => {
  const addresses = [
    "a+1@gmail.com",
    "A@Example.COM",
    "  a@x.com  ",
    "j.a.n.e@gmail.com",
    "a+b@outlook.com",
    "a+b+1@outlook.com",
    "+tag@gmail.com",
    "a+b@company.com",
    "jane.doe@company.com",
    "user@mailinator.com",
    "USER@MAILINATOR.COM.",
    "u.ser+tag@mailinator.com",
    "etudiant@univ-alger.dz",
    "a@1.2.3.4",
    "a@b.com..",
    "a@b.com.",
    "no-at-sign",
    "@nolocal.com",
    "a@",
    "",
    "   ",
    "a@b@c.com",
  ]

  it("applying it twice equals applying it once", () => {
    for (const address of addresses) {
      const once = toRateLimitKey(address)
      assert.equal(toRateLimitKey(once), once, `toRateLimitKey(${JSON.stringify(address)}) is not idempotent`)
    }
  })

  it("always returns a lowercased, whitespace-free key without a trailing dot", () => {
    for (const address of addresses) {
      const key = toRateLimitKey(address)
      assert.equal(key, key.toLowerCase(), address)
      assert.equal(/\s/.test(key), false, `${JSON.stringify(address)} -> ${JSON.stringify(key)}`)
      assert.equal(key.endsWith("."), false, address)
    }
  })

  it("does not merge mailboxes that can be distinct people", () => {
    const distinct: Array<[string, string]> = [
      ["jane.doe@company.com", "janedoe@company.com"],
      ["a+b@company.com", "a@company.com"],
      ["a@gmx.de", "a+gmx.de"],
      ["a@outlook.com", "b@outlook.com"],
      ["a@x.com", "a@y.com"],
      ["a+1@company.com", "a+2@company.com"],
    ]
    for (const [left, right] of distinct) {
      assert.notEqual(toRateLimitKey(left), toRateLimitKey(right), `${left} collided with ${right}`)
    }
  })

  it("does merge variants of the same mailbox", () => {
    const same: Array<[string, string]> = [
      ["A@GMAIL.COM", "a@gmail.com"],
      ["a+1@gmail.com", "a@gmail.com"],
      ["a+1@gmail.com", "a+2@gmail.com"],
      ["j.a.n.e@gmail.com", "jane@gmail.com"],
      ["j.a.n.e@googlemail.com", "jane@googlemail.com"],
      ["a+b+c@outlook.com", "a@outlook.com"],
      ["  a@x.com  ", "a@x.com"],
      ["a@x.com.", "a@x.com"],
      ["a@x.com..", "a@x.com"],
    ]
    for (const [left, right] of same) {
      assert.equal(toRateLimitKey(left), toRateLimitKey(right), `${left} should match ${right}`)
    }
  })

  it("keeps a leading plus-sign local part intact", () => {
    // `plus > 0` guards this: index 0 is not a subaddress separator.
    assert.equal(toRateLimitKey("+tag@gmail.com"), "+tag@gmail.com")
  })
})

describe("TYPO_MAP invariants", () => {
  it("maps every typo to a domain that is not itself blocked", () => {
    for (const [typo, suggestion] of Object.entries(TYPO_MAP)) {
      assert.notEqual(isBlockedDomain(typo), null, `${typo} is not blocklisted, so its suggestion is dead code`)
      assert.equal(isBlockedDomain(suggestion), null, `suggestion ${suggestion} is itself blocklisted`)
    }
  })

  it("suggests a domain that checkEmail actually accepts", () => {
    for (const [typo, suggestion] of Object.entries(TYPO_MAP)) {
      const blocked = checkEmail(`user@${typo}`)
      assert.equal(blocked.ok, false, typo)
      assert.equal(!blocked.ok && blocked.reason, "blocked", typo)

      const fixed = checkEmail(`user@${suggestion}`)
      assert.equal(fixed.ok, true, `${suggestion} must be accepted, not merely unblocked`)
    }
  })

  it("suggests only well-formed lowercase domains in normal form", () => {
    for (const [typo, suggestion] of Object.entries(TYPO_MAP)) {
      assert.equal(suggestion, suggestion.toLowerCase())
      assert.equal(normalizeDomain(suggestion), suggestion, `${suggestion} is not in normal form`)
      assert.notEqual(normalizeDomain(typo), null, typo)
    }
  })
})

describe("blocklist contains no over-broad entries", () => {
  it("has no single-label entries", () => {
    for (const domain of blocklist.domains) {
      assert.ok(domain.includes("."), `${domain} is a single label and would block a whole TLD`)
    }
  })

  it("has no entries naming a delegated registry suffix", () => {
    // These are registries, not disposable providers: one entry here would reject
    // every registrant in the country. (co.cc is deliberately excluded: it is a
    // free-subdomain abuse source that is legitimately blocked.)
    const registries = new Set([
      "co.uk", "org.uk", "gov.uk", "ac.uk", "com.br", "gov.br", "com.au", "net.au",
      "co.jp", "ne.jp", "or.jp", "co.za", "com.tr", "com.mx", "com.ar", "co.in",
      "com.cn", "com.sg", "co.nz", "com.eg", "com.sa", "com.ma", "com.tn",
    ])
    for (const domain of blocklist.domains) {
      assert.equal(registries.has(domain), false, `${domain} would over-block a whole registry`)
    }
  })

  it("has no uppercase entries, trailing dots, whitespace, or duplicates", () => {
    const seen = new Set<string>()
    for (const domain of blocklist.domains) {
      assert.equal(domain, domain.toLowerCase(), `${domain} is not lowercase`)
      assert.equal(domain.endsWith("."), false, `${domain} has a trailing dot`)
      assert.equal(/\s/.test(domain), false, `${domain} contains whitespace`)
      assert.equal(seen.has(domain), false, `${domain} is duplicated`)
      seen.add(domain)
    }
  })

  it("has no .dz entries, so the exemption cannot hide a real entry", () => {
    const dzEntries = blocklist.domains.filter((d) => d === "dz" || d.endsWith(".dz"))
    assert.deepEqual(dzEntries, [], `.dz entries are unreachable through the exemption: ${dzEntries.join(", ")}`)
  })

  it("every entry is a valid multi-label host", () => {
    for (const domain of blocklist.domains) {
      for (const label of domain.split(".")) {
        assert.ok(LABEL_RE.test(label), `${domain} has illegal label ${JSON.stringify(label)}`)
      }
    }
  })

  it("does not block mainstream consumer, business, or Algerian providers", () => {
    const legitimate = [
      "gmail.com", "googlemail.com", "outlook.com", "hotmail.com", "live.com",
      "yahoo.com", "yahoo.fr", "icloud.com", "me.com", "proton.me", "protonmail.com",
      "fastmail.com", "yandex.com", "qq.com", "gmx.de", "web.de", "example.com",
      "hawiyat.org", "company.com", "djezzy.dz", "ooredoo.dz", "mobilis.dz",
      "univ-alger.dz", "edu.dz", "gov.dz",
    ]
    for (const domain of legitimate) {
      assert.equal(isBlockedDomain(domain), null, `${domain} is wrongly blocked`)
      assert.equal(checkEmail(`user@${domain}`).ok, true, `${domain} is wrongly rejected`)
    }
  })

  it("does not block an unlisted sibling or subdomain of a listed parent", () => {
    for (const domain of ["someone-real.dynv6.net", "myapp.vercel.app", "tenant.github.io"]) {
      assert.equal(isBlockedDomain(domain), null, domain)
    }
  })
})

describe("BLOCKLIST_META invariants", () => {
  it("is frozen at the top level and on its exempt-tld list", () => {
    assert.equal(Object.isFrozen(BLOCKLIST_META), true)
    assert.equal(Object.isFrozen(BLOCKLIST_META.exemptTlds), true)
  })

  it("count equals the loaded set size and the file's own count", () => {
    assert.equal(BLOCKLIST_META.count, new Set(blocklist.domains).size)
    assert.equal(BLOCKLIST_META.count, blocklist.count)
    assert.equal(BLOCKLIST_META.count, blocklist.domains.length)
  })

  it("pins a full 40-hex-character source commit and an https source", () => {
    assert.match(String(BLOCKLIST_META.commit), /^[0-9a-f]{40}$/)
    assert.match(String(BLOCKLIST_META.source), /^https:\/\//)
  })

  it("exposes exempt TLDs as plain lowercase labels", () => {
    assert.deepEqual([...BLOCKLIST_META.exemptTlds], ["dz"])
    for (const tld of BLOCKLIST_META.exemptTlds) {
      assert.match(tld, /^[a-z]{2,63}$/)
      assert.equal(tld.startsWith("."), false)
    }
  })

  it("keeps every exempt TLD unblockable end to end", () => {
    // The exemption must win even for an address the blocklist would otherwise
    // catch, which is what makes the .dz market protection real.
    for (const tld of BLOCKLIST_META.exemptTlds) {
      const result = checkEmail(`user@mailinator.${tld}`)
      assert.equal(result.ok, true, `mailinator.${tld} should be exempt`)
    }
  })
})

describe("normalizeEmail stores the canonical form the limiter keys on", () => {
  it("lowercases the whole address and normalizes the domain", () => {
    assert.equal(normalizeEmail("Jane.Doe+Order@Example.COM"), "jane.doe+order@example.com")
    assert.equal(normalizeEmail("USER@MAILINATOR.COM."), "user@mailinator.com")
    assert.equal(normalizeEmail("  a@b.com  "), "a@b.com")
  })

  it("returns null for anything unparseable", () => {
    for (const input of ["ünicode@example.com", "a@b@c.com", "", 42, null, undefined]) {
      assert.equal(normalizeEmail(input), null)
    }
  })

  it("agrees with the email checkEmail reports, and with the rate-limit key", () => {
    for (const input of ["Jane.Doe+orders@Example.com", "user@mailinator.com", "etudiant@univ-alger.dz"]) {
      const result = checkEmail(input)
      assert.ok(result.ok || result.reason === "blocked", input)
      if (result.ok || result.reason === "blocked") {
        assert.equal(normalizeEmail(input), result.email, input)
        assert.equal(toRateLimitKey(normalizeEmail(input)!), toRateLimitKey(input), input)
      }
    }
  })
})

describe("domain-rules agrees with the runtime validator", () => {
  // lib/domain-rules.ts carries the syntax rules used by the sync script. If the
  // two drift, the sync accepts entries the runtime rejects (or the reverse).
  const corpus = [
    "example.com", "a.co", "a.b", "com", "localhost", "1.2.3.4", "-a.com", "a-.com",
    "a.b-.com", "_dmarc.example.com", "a_b.com", "x.com/path", "a b.com",
    "mailinator.com.", "", ".", "a..b.com", `${a(63)}.com`, `${a(64)}.com`,
    [a(63), a(63), a(63), a(61)].join("."),
    [a(63), a(63), a(63), a(62)].join("."),
  ]

  it("accepts exactly the ASCII inputs normalizeDomain accepts", () => {
    for (const raw of corpus) {
      const prepared = raw.trim().toLowerCase().replace(/\.+$/, "")
      assert.equal(
        isValidAsciiDomain(prepared),
        normalizeDomain(raw) !== null,
        `disagreement on ${JSON.stringify(raw)}`
      )
    }
  })

  it("accepts every shipped blocklist entry, as the sync script requires", () => {
    const rejected = blocklist.domains.filter((d) => !isValidAsciiDomain(d) || d !== d.toLowerCase())
    assert.deepEqual(rejected, [], `the sync validator rejects shipped entries: ${rejected.slice(0, 5).join(", ")}`)
  })
})

describe("SELF_TEST_DOMAINS guard", () => {
  it("passes with the shipped list", () => {
    assert.equal(validateBlocklistOrWarn(), true)
  })

  it("blocks every self-test domain at the module level and through checkEmail", () => {
    assert.ok(SELF_TEST_DOMAINS.length > 0)
    for (const domain of SELF_TEST_DOMAINS) {
      assert.ok(domain.includes("."), domain)
      assert.equal(isBlockedDomain(domain), domain)
      assert.equal(checkEmail(`user@${domain}`).ok, false)
    }
  })
})

describe("blocklist freshness", () => {
  it("exposes the snapshot timestamp so staleness is observable", () => {
    // Without this field the list ages invisibly: blocking keeps succeeding,
    // just against providers nobody uses any more.
    assert.equal(typeof BLOCKLIST_META.fetchedAt, "string")
    assert.ok(!Number.isNaN(Date.parse(String(BLOCKLIST_META.fetchedAt))))
  })

  it("passes its freshness check against a generous limit", () => {
    assert.equal(validateBlocklistFreshness(3650), true)
  })

  it("fails its freshness check against a zero-day limit", () => {
    assert.equal(validateBlocklistFreshness(-1), false)
  })
})

describe("the exemption is code, not an environment variable", () => {
  it("has a fixed default that no env var can widen", () => {
    // A TLD-sized override is the wrong tool: a single wrongly-caught domain is
    // fixed through the allowlist table, without a deploy.
    assert.deepEqual([...BLOCKLIST_META.exemptTlds], ["dz"])
  })
})
