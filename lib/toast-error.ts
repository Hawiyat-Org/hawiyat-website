import { toast } from "sonner"

import type { ParsedOrderError } from "@/lib/api-error"

/**
 * Error toasts stay up much longer than Sonner's 4s default: a rejected order
 * usually asks the visitor to change something (the email address, the payment
 * method), and four seconds is not enough time to read the resolution and act.
 */
const ERROR_TOAST_DURATION = 12_000

/** One entry point for form errors, so every surface reports failures alike. */
export function toastError(message: string, resolution?: string): void {
  toast.error(message, {
    // A stable id collapses a double submit into one toast instead of stacking
    // identical copies on top of each other.
    id: "form-error",
    description: resolution,
    duration: ERROR_TOAST_DURATION,
  })
}

/** Reports a rejected order, keeping the API's message and resolution apart. */
export function toastOrderError(error: unknown): void {
  const message = error instanceof Error && error.message ? error.message : "Something went wrong"
  toastError(message, (error as ParsedOrderError | null)?.resolution)
}
