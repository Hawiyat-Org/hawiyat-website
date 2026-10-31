import type { ParsedOrderError } from "@/lib/api-error"

/**
 * Pure half of the toast helper.
 *
 * Kept free of any `sonner` / React import so it can be unit tested in plain
 * Node. Importing the toast host in a test pulls in a client component library
 * for no reason, and mocking it needs `--experimental-test-module-mocks`, whose
 * behaviour differs across Node versions (it broke on CI's Node 22).
 */

/**
 * Error toasts stay up much longer than Sonner's 4s default: a rejected order
 * usually asks the visitor to change something (the email address, the payment
 * method), and four seconds is not enough time to read the resolution and act.
 */
export const ERROR_TOAST_DURATION = 12_000

/** A stable id collapses a double submit into one toast instead of stacking. */
export const ERROR_TOAST_ID = "form-error"

export interface ErrorToastPayload {
  message: string
  description?: string
}

export interface ErrorToastOptions {
  id: string
  duration: number
  description?: string
}

/** Splits a thrown order error into a toast title and description. */
export function buildOrderErrorPayload(error: unknown): ErrorToastPayload {
  const message =
    error instanceof Error && error.message ? error.message : "Something went wrong"
  const resolution = (error as ParsedOrderError | null)?.resolution

  return typeof resolution === "string" && resolution.trim()
    ? { message, description: resolution.trim() }
    : { message }
}

/** The options object handed to Sonner. */
export function errorToastOptions(description?: string): ErrorToastOptions {
  return {
    id: ERROR_TOAST_ID,
    duration: ERROR_TOAST_DURATION,
    ...(description ? { description } : {}),
  }
}
