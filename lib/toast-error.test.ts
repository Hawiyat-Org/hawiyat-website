import assert from "node:assert/strict"
import { describe, it } from "node:test"

import {
  ERROR_TOAST_DURATION,
  ERROR_TOAST_ID,
  buildOrderErrorPayload,
  errorToastOptions,
} from "@/lib/toast-payload"

/**
 * Contract tests for the toast helper used by all three order forms.
 *
 * These exercise the pure mapping — a short title, the resolution as the
 * description, and a duration long enough to act on a fixable 400 — rather than
 * `toast()` itself. Mocking `sonner` needs `--experimental-test-module-mocks`,
 * whose behaviour differs across Node versions and broke on CI.
 */
const orderError = () =>
  Object.assign(
    new Error("Temporary or disposable email addresses can't be used for orders."),
    {
      code: "disposable_email",
      resolution: "Use a permanent address you will keep access to.",
    }
  )

describe("buildOrderErrorPayload", () => {
  it("keeps the API message and the resolution apart", () => {
    assert.deepEqual(buildOrderErrorPayload(orderError()), {
      message: "Temporary or disposable email addresses can't be used for orders.",
      description: "Use a permanent address you will keep access to.",
    })
  })

  it("omits the description when the failure carries no resolution", () => {
    const payload = buildOrderErrorPayload(
      new Error("Too many requests. Please wait a moment and try again.")
    )
    assert.equal(payload.message, "Too many requests. Please wait a moment and try again.")
    assert.equal(payload.description, undefined)
  })

  it("still reports something readable when a non-Error is thrown", () => {
    for (const thrown of ["boom", null, undefined, 42, {}]) {
      assert.equal(buildOrderErrorPayload(thrown).message, "Something went wrong")
    }
  })

  it("ignores a blank or non-string resolution", () => {
    assert.equal(buildOrderErrorPayload(Object.assign(new Error("x"), { resolution: "   " })).description, undefined)
    assert.equal(buildOrderErrorPayload(Object.assign(new Error("x"), { resolution: 42 })).description, undefined)
  })
})

describe("errorToastOptions", () => {
  it("keeps errors on screen longer than Sonner's 4s default", () => {
    assert.ok(
      ERROR_TOAST_DURATION > 6000,
      "a 400 the visitor must fix would vanish before they can act on it"
    )
    assert.equal(errorToastOptions().duration, ERROR_TOAST_DURATION)
  })

  it("reuses one toast id so a double submit does not stack duplicates", () => {
    assert.equal(errorToastOptions().id, ERROR_TOAST_ID)
    assert.equal(ERROR_TOAST_ID, "form-error")
  })

  it("only sets a description when one is supplied", () => {
    assert.equal(errorToastOptions().description, undefined)
    assert.equal("description" in errorToastOptions(), false)
    assert.deepEqual(errorToastOptions("Do this next"), {
      id: ERROR_TOAST_ID,
      duration: ERROR_TOAST_DURATION,
      description: "Do this next",
    })
  })
})
