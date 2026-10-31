import assert from "node:assert/strict"
import { before, beforeEach, describe, it, mock } from "node:test"

/**
 * Contract tests for the toast helper used by all three order forms.
 *
 * Sonner is mocked because it needs a DOM; what matters here is the payload the
 * forms rely on — a short title, the resolution as the description, and a
 * duration long enough to act on a fixable 400.
 */

type ToastCall = { message: unknown; options: Record<string, unknown> }

const calls: ToastCall[] = []

before(() => {
  mock.module("sonner", {
    namedExports: {
      toast: {
        error: (message: unknown, options: Record<string, unknown> = {}) => {
          calls.push({ message, options })
          return "toast-id"
        },
      },
    },
  })
})

beforeEach(() => {
  calls.length = 0
})

// Imported after the mock is registered, so the helper binds to the fake.
const load = () => import("@/lib/toast-error")

describe("toastOrderError", () => {
  it("shows the API message as the title and the resolution as the description", async () => {
    const { toastOrderError } = await load()
    const error = Object.assign(
      new Error("Temporary or disposable email addresses can't be used for orders."),
      {
        code: "disposable_email",
        resolution: "Use a permanent address you will keep access to.",
      }
    )

    toastOrderError(error)

    assert.deepEqual(calls, [
      {
        message: "Temporary or disposable email addresses can't be used for orders.",
        options: {
          id: "form-error",
          description: "Use a permanent address you will keep access to.",
          duration: 12_000,
        },
      },
    ])
  })

  it("omits the description when the failure carries no resolution", async () => {
    const { toastOrderError } = await load()

    toastOrderError(new Error("Too many requests. Please wait a moment and try again."))

    assert.equal(calls.length, 1)
    assert.equal(calls[0].message, "Too many requests. Please wait a moment and try again.")
    assert.equal(calls[0].options.description, undefined)
  })

  it("still reports something readable when a non-Error is thrown", async () => {
    const { toastOrderError } = await load()

    toastOrderError("boom")

    assert.equal(calls[0].message, "Something went wrong")
  })

  it("keeps errors on screen longer than Sonner's 4s default", async () => {
    const { toastOrderError } = await load()

    toastOrderError(new Error("Invalid email format."))

    assert.ok(
      Number(calls[0].options.duration) > 6000,
      "a 400 the visitor must fix would vanish before they can act on it"
    )
  })

  it("reuses one toast id so a double submit does not stack duplicates", async () => {
    const { toastOrderError } = await load()

    toastOrderError(new Error("First failure"))
    toastOrderError(new Error("Second failure"))

    assert.deepEqual(
      calls.map((call) => call.options.id),
      ["form-error", "form-error"]
    )
  })
})

describe("toastError", () => {
  it("reports client-side validation without a description", async () => {
    const { toastError } = await load()

    toastError("You must accept the terms and conditions")

    assert.equal(calls[0].message, "You must accept the terms and conditions")
    assert.equal(calls[0].options.description, undefined)
  })
})
