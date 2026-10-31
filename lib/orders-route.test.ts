import assert from "node:assert/strict"
import { after, before, describe, it, mock } from "node:test"

/**
 * Route-level tests for POST /api/orders.
 *
 * Only @/lib/email-allowlist, @/lib/prisma/prismaClient and @/lib/email-utils are
 * mocked, because they are the boundaries that end at the database and at SMTP.
 * The rate limiter, the blocklist, the validation, and the ordering under test
 * are all exercised for real.
 *
 * Mocks MUST be registered before the route is imported, hence the dynamic import
 * in before(). A static import would be evaluated too early to be intercepted.
 */

type OrderCreateArgs = { data: Record<string, unknown> }
const created: OrderCreateArgs[] = []
const allowlistCalls: Array<[string, string | undefined]> = []
let allowlistResult = false

let POST: (request: Request) => Promise<Response>

const silence = () => {
  const originalError = console.error
  const originalWarn = console.warn
  console.error = () => {}
  console.warn = () => {}
  return () => {
    console.error = originalError
    console.warn = originalWarn
  }
}

let restore = () => {}

before(async () => {
  restore = silence()

  mock.module("@/lib/email-allowlist", {
    namedExports: {
      isDomainAllowlisted: async (domain: string, matched?: string) => {
        allowlistCalls.push([domain, matched])
        return allowlistResult
      },
    },
  })

  mock.module("@/lib/prisma/prismaClient", {
    namedExports: {
      prisma: {
        order: {
          create: async (args: OrderCreateArgs) => {
            created.push(args)
            return {
              id: `ord_${created.length}`,
              status: "PENDING",
              createdAt: new Date("2026-10-30T10:00:00.000Z"),
              ...args.data,
            }
          },
        },
      },
      default: {},
    },
  })

  mock.module("@/lib/email-utils", {
    namedExports: {
      escapeHtml: (s: string) => s,
      sendOrderNotification: async () => true,
      sendOrderConfirmation: async () => true,
      sendWhatsAppNotification: async () => true,
    },
  })

  ;({ POST } = (await import("@/app/api/orders/route")) as unknown as {
    POST: (request: Request) => Promise<Response>
  })
})

after(() => {
  restore()
})

// Every call gets its own address by default. EMAIL_RATE_LIMIT is 4/hour, so a
// shared default would make this suite break the moment a test is added.
let sequence = 0
const uniqueEmail = () => `jane${++sequence}@example.com`

const body = (overrides: Record<string, unknown> = {}) => ({
  serviceId: "composer-pro",
  serviceName: "Composer",
  customerName: "Jane Doe",
  customerEmail: uniqueEmail(),
  ...overrides,
})

const post = (payload: unknown, ip: string) =>
  POST(
    new Request("http://localhost/api/orders", {
      method: "POST",
      headers: { "content-type": "application/json", "x-real-ip": ip },
      body: typeof payload === "string" ? payload : JSON.stringify(payload),
    }) as never
  )

describe("POST /api/orders", () => {
  it("creates an order and returns 201 for a valid address", async () => {
    created.length = 0
    const response = await post(body(), "198.51.100.1")
    const json = (await response.json()) as { success: boolean; order: { id: string } }

    assert.equal(response.status, 201)
    assert.equal(json.success, true)
    assert.match(json.order.id, /^ord_/)
    assert.equal(created.length, 1)
  })

  it("stores the normalized address", async () => {
    created.length = 0
    await post(body({ customerEmail: "Jane.Doe+Orders@Example.COM." }), "198.51.100.2")
    assert.equal(created.length, 1)
    assert.equal(created[0].data.customerEmail, "jane.doe+orders@example.com")
  })

  it("never writes when the domain is blocked", async () => {
    created.length = 0
    const response = await post(body({ customerEmail: "user@mailinator.com" }), "198.51.100.3")
    const json = (await response.json()) as { error: { code: string } }

    assert.equal(response.status, 400)
    assert.equal(json.error.code, "disposable_email")
    assert.deepEqual(created, [], "a blocked address must not reach prisma.order.create")
  })

  it("checks email syntax before the limiters, so a typo does not cost the budget", async () => {
    const ip = "198.51.100.4"
    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await post(body({ customerEmail: "jane@x.com/path" }), ip)
      assert.equal(response.status, 400)
    }
    // 5 rejected attempts exhausted nothing: the same IP can still order.
    const response = await post(body(), ip)
    assert.equal(response.status, 201, "syntax rejections must not consume the 5/hour budget")
  })

  it("gives blocked attempts their own bucket", async () => {
    const ip = "198.51.100.5"
    for (let attempt = 0; attempt < 8; attempt++) {
      const response = await post(body({ customerEmail: `user${attempt}@mailinator.com` }), ip)
      assert.equal(response.status, 400)
    }
    const response = await post(body(), ip)
    assert.equal(response.status, 201, "8 blocked attempts must not lock the IP out of ordering")
  })

  it("allows an operator-allowlisted domain through", async () => {
    allowlistResult = true
    created.length = 0
    try {
      const response = await post(body({ customerEmail: "user@mailinator.com" }), "198.51.100.6")
      assert.equal(response.status, 201)
      assert.equal(created.length, 1)
    } finally {
      allowlistResult = false
    }
  })

  it("queries the allowlist with both the host and the matched entry", async () => {
    // Blocking is suffix-based, so an operator who allowlists the matched entry
    // must take effect. Looking up only the customer's host would be a no-op.
    allowlistCalls.length = 0
    await post(body({ customerEmail: "user@a.b.mailinator.com" }), "198.51.100.7")
    assert.deepEqual(allowlistCalls, [["a.b.mailinator.com", "mailinator.com"]])
  })

  it("does not query the allowlist for an allowed domain", async () => {
    allowlistCalls.length = 0
    await post(body(), "198.51.100.8")
    assert.deepEqual(allowlistCalls, [], "the happy path must cost zero database round trips")
  })

  it("does not query the allowlist for a syntax failure", async () => {
    allowlistCalls.length = 0
    await post(body({ customerEmail: "jane@x.com/path" }), "198.51.100.9")
    assert.deepEqual(allowlistCalls, [])
  })

  it("enforces the per-address budget on the canonical key", async () => {
    // EMAIL_RATE_LIMIT is 4/hour. Four variants of one Gmail mailbox must share a
    // bucket, so the fifth is rejected even from a fresh IP.
    const ip = "198.51.100.10"
    const variants = ["a+1@gmail.com", "A+2@GMAIL.COM", "a+3@gmail.com", "a+4@gmail.com"]
    for (const email of variants) {
      const response = await post(body({ customerEmail: email }), ip)
      assert.equal(response.status, 201, email)
    }
    const response = await post(body({ customerEmail: "a+5@gmail.com" }), ip)
    const json = (await response.json()) as { error: { code: string } }
    assert.equal(response.status, 429)
    assert.equal(json.error.code, "rate_limited_email")
  })

  it("enforces the per-IP budget across distinct addresses", async () => {
    const ip = "198.51.100.11"
    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await post(body({ customerEmail: `user${attempt}@example.org` }), ip)
      assert.equal(response.status, 201, `attempt ${attempt}`)
    }
    const response = await post(body({ customerEmail: "user5@example.org" }), ip)
    const json = (await response.json()) as { error: { code: string } }
    assert.equal(response.status, 429)
    assert.equal(json.error.code, "rate_limited_ip")
  })

  it("rejects a malformed JSON body with 400, not 500", async () => {
    const response = await post("not-json", "198.51.100.12")
    const json = (await response.json()) as { error: { code: string } }
    assert.equal(response.status, 400)
    assert.equal(json.error.code, "invalid_json")
  })

  it("rejects a malformed payment method without consuming the order budget", async () => {
    const ip = "198.51.100.13"
    for (let attempt = 0; attempt < 5; attempt++) {
      const response = await post(body({ preferredPayment: "BITCOIN" }), ip)
      assert.equal(response.status, 400)
    }
    const response = await post(body(), ip)
    assert.equal(response.status, 201, "a payment typo must not consume the 5/hour budget")
  })
})
