import { toast } from "sonner"

import { buildOrderErrorPayload, errorToastOptions } from "@/lib/toast-payload"

export {
  ERROR_TOAST_DURATION,
  ERROR_TOAST_ID,
  buildOrderErrorPayload,
  errorToastOptions,
  type ErrorToastOptions,
  type ErrorToastPayload,
} from "@/lib/toast-payload"

/** One entry point for form errors, so every surface reports failures alike. */
export function toastError(message: string, resolution?: string): void {
  toast.error(message, errorToastOptions(resolution))
}

/** Reports a rejected order, keeping the API's message and resolution apart. */
export function toastOrderError(error: unknown): void {
  const { message, description } = buildOrderErrorPayload(error)
  toastError(message, description)
}
