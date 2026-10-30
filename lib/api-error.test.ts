import assert from "node:assert/strict"
import { describe, it } from "node:test"

import { orderErrorMessage, parseOrderResponse, type ParsedOrderError } from "@/lib/api-error"

const json = (body: unknown, status: number): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  })

const raw = (body: string, status: number, contentType = "text/html"): Response =>
  new Response(body, { status, headers: { "content-type": contentType } })

async function catchError(promise: Promise<unknown>): Promise<ParsedOrderError> {
  try {
    await promise
  } catch (error) {
    assert.ok(error instanceof Error, "expected an Error to be thrown")
    return error as ParsedOrderError
  }
  assert.fail("expected the promise to reject, but it resolved")
}

describe("orderErrorMessage", () => {
  it("reads the route's object envelope", () => {
    const result = orderErrorMessage({
      error: {
        code: "disposable_email",
        message: "Temporary or disposable email addresses can't be used for orders.",
        resolution: "Use a permanent address.",
      },
    })
    assert.deepEqual(result, {
      message:
        "Temporary or disposable email addresses can't be used for orders. Use a permanent address.",
      code: "disposable_email",
    })
  })

  it("appends the resolution when it adds information", () => {
    const result = orderErrorMessage({
      error: { message: "Invalid email format.", resolution: "Provide a valid email address." },
    })
    assert.equal(result.message, "Invalid email format. Provide a valid email address.")
  })

  it("does not repeat a resolution that duplicates the message", () => {
    const result = orderErrorMessage({
      error: { message: "Invalid email format.", resolution: "Invalid email format." },
    })
    assert.equal(result.message, "Invalid email format.")
  })

  it("falls back to the resolution when the message is empty", () => {
    assert.equal(orderErrorMessage({ error: { message: "", resolution: "Try again." } }).message, "Try again.")
    assert.equal(orderErrorMessage({ error: { message: "   ", resolution: "Try again." } }).message, "Try again.")
  })

  it("handles middleware's string envelope", () => {
    // middleware.ts returns { error: "<string>" }, unlike the route's object.
    const result = orderErrorMessage({ error: "Too many requests" })
    assert.deepEqual(result, { message: "Too many requests" })
  })

  it("ignores a blank string envelope so the status fallback applies", () => {
    assert.equal(
      orderErrorMessage({ error: "   " }, 429).message,
      "Too many requests. Please wait a moment and try again."
    )
    assert.equal(
      orderErrorMessage({ error: "" }, 500).message,
      "Something went wrong on our side. Please try again in a few moments."
    )
  })

  it("keeps the code even when the object envelope carries no text", () => {
    assert.deepEqual(orderErrorMessage({ error: { code: "internal_error" } }, 500), {
      message: "Something went wrong on our side. Please try again in a few moments.",
      code: "internal_error",
    })
  })

  it("returns the status fallback for a null payload", () => {
    assert.deepEqual(orderErrorMessage(null, 500), {
      message: "Something went wrong on our side. Please try again in a few moments.",
    })
  })

  it("returns the status fallback for an empty body", () => {
    assert.deepEqual(orderErrorMessage({}, 400), { message: "Something went wrong. Please try again." })
  })

  it("returns the status fallback for a body with no error key", () => {
    assert.deepEqual(orderErrorMessage({ success: false }, 400), {
      message: "Something went wrong. Please try again.",
    })
  })

  it("uses the 429 fallback text", () => {
    assert.equal(orderErrorMessage(null, 429).message, "Too many requests. Please wait a moment and try again.")
  })

  it("uses the 413 fallback text", () => {
    assert.equal(
      orderErrorMessage(null, 413).message,
      "That submission was too large. Please shorten your notes and try again."
    )
  })

  it("uses the 5xx fallback text for every server status", () => {
    const expected = "Something went wrong on our side. Please try again in a few moments."
    for (const status of [500, 502, 503, 504, 599]) {
      assert.equal(orderErrorMessage(null, status).message, expected, `status ${status}`)
    }
  })

  it("uses the generic fallback for 4xx statuses other than 429 and 413", () => {
    for (const status of [400, 401, 403, 404, 409, 422]) {
      assert.equal(
        orderErrorMessage(null, status).message,
        "Something went wrong. Please try again.",
        `status ${status}`
      )
    }
  })

  it("never renders an envelope as [object Object]", () => {
    // The exact regression this module exists to fix: the three forms used to do
    // `new Error(data.error)`, stringifying the object.
    const envelopes: unknown[] = [
      { error: { code: "a", message: "b", resolution: "c" } },
      { error: { code: "a" } },
      { error: "plain" },
      {},
      null,
      undefined,
      { error: null },
      { error: 42 },
      { error: [] },
    ]
    for (const envelope of envelopes) {
      const { message } = orderErrorMessage(envelope, 400)
      assert.equal(typeof message, "string")
      assert.ok(message.length > 0, `empty message for ${JSON.stringify(envelope)}`)
      assert.notEqual(message, "[object Object]", `stringified envelope for ${JSON.stringify(envelope)}`)
    }
  })
})

describe("parseOrderResponse", () => {
  it("returns the parsed body for a 201 with a valid payload", async () => {
    const body = {
      success: true,
      order: { id: "ord_123", status: "PENDING", createdAt: "2026-10-30T10:00:00.000Z" },
    }
    const result = await parseOrderResponse<typeof body>(json(body, 201))
    assert.deepEqual(result, body)
  })

  it("returns the parsed body for a 200", async () => {
    const body = { success: true, order: { id: "ord_456" } }
    assert.deepEqual(await parseOrderResponse<typeof body>(json(body, 200)), body)
  })

  it("throws the route's message and code on a 400", async () => {
    const error = await catchError(
      parseOrderResponse(
        json(
          {
            error: {
              code: "disposable_email",
              message: "Temporary or disposable email addresses can't be used for orders.",
              resolution: "Use a permanent address you will keep access to.",
            },
          },
          400
        )
      )
    )
    assert.equal(
      error.message,
      "Temporary or disposable email addresses can't be used for orders. Use a permanent address you will keep access to."
    )
    assert.equal(error.code, "disposable_email")
  })

  it("propagates the code so callers can branch on it", async () => {
    const error = await catchError(
      parseOrderResponse(json({ error: { code: "rate_limited_ip", message: "Too many orders." } }, 429))
    )
    assert.equal(error.code, "rate_limited_ip")
    assert.equal(error.message, "Too many orders.")
  })

  it("reads middleware's string envelope on a 429", async () => {
    const error = await catchError(parseOrderResponse(json({ error: "Too many requests" }, 429)))
    assert.equal(error.message, "Too many requests")
    assert.equal(error.code, undefined)
  })

  it("uses the 429 fallback when the body is unreadable", async () => {
    const error = await catchError(parseOrderResponse(raw("<html>too many</html>", 429)))
    assert.equal(error.message, "Too many requests. Please wait a moment and try again.")
  })

  it("uses the 5xx fallback when an upstream proxy returns HTML", async () => {
    const error = await catchError(parseOrderResponse(raw("<html><body>502 Bad Gateway</body></html>", 502)))
    assert.equal(error.message, "Something went wrong on our side. Please try again in a few moments.")
    assert.equal(error.code, undefined)
  })

  it("uses the generic fallback for an empty body on a 400", async () => {
    const error = await catchError(parseOrderResponse(new Response(null, { status: 400 })))
    assert.equal(error.message, "Something went wrong. Please try again.")
  })

  it("does not leak a raw SyntaxError from a JSON parse failure", async () => {
    const error = await catchError(parseOrderResponse(raw("{ not json", 500, "application/json")))
    assert.ok(!/JSON|Unexpected token|position/i.test(error.message), `leaked parse detail: ${error.message}`)
    assert.equal(error.message, "Something went wrong on our side. Please try again in a few moments.")
  })

  it("throws for a 2xx whose body is an empty object", async () => {
    // `{}` is an object, so a naive guard returns it and the caller then
    // dereferences data.order.id on undefined.
    const error = await catchError(parseOrderResponse(json({}, 200)))
    assert.match(error.message, /could not read the server's response/i)
  })

  it("throws for a 2xx whose body has no order id", async () => {
    for (const body of [{ success: true }, { success: false }, { order: {} }, { order: null }]) {
      const error = await catchError(parseOrderResponse(json(body, 201)))
      assert.match(error.message, /could not read the server's response/i, JSON.stringify(body))
    }
  })

  it("throws a readable error for a 2xx with a non-JSON body", async () => {
    const error = await catchError(parseOrderResponse(raw("<!doctype html><html></html>", 200)))
    assert.match(error.message, /could not read the server's response/i)
  })

  it("throws a readable error for a 204 with no body", async () => {
    const error = await catchError(parseOrderResponse(new Response(null, { status: 204 })))
    assert.match(error.message, /could not read the server's response/i)
  })

  it("throws a readable error for a 2xx whose body is JSON null", async () => {
    const error = await catchError(parseOrderResponse(raw("null", 200, "application/json")))
    assert.match(error.message, /could not read the server's response/i)
  })
})
