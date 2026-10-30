/**
 * Shared parser for /api/orders responses.
 *
 * The route returns `{ error: { code, message, resolution } }`, but every form
 * used to do `new Error(data.error)`, which stringifies the object and renders
 * literally "[object Object]". No error message on this site has ever been
 * visible to a user because of that.
 *
 * middleware.ts is inconsistent with the route: it returns `{ error: "<string>" }`
 * for its own 429. Both shapes are handled here.
 */

interface OrderErrorDetail {
  code?: string
  message?: string
  resolution?: string
}

export interface OrderErrorInfo {
  message: string
  code?: string
}

export interface ParsedOrderError extends Error {
  code?: string
}

function fallbackForStatus(status: number): string {
  if (status === 429) return "Too many requests. Please wait a moment and try again."
  if (status === 413) return "That submission was too large. Please shorten your notes and try again."
  if (status >= 500) return "Something went wrong on our side. Please try again in a few moments."
  return "Something went wrong. Please try again."
}

/** Extracts a human-readable message from either error envelope. */
export function orderErrorMessage(payload: unknown, status = 0): OrderErrorInfo {
  const body = payload as { error?: OrderErrorDetail | string } | null | undefined
  const error = body?.error

  if (typeof error === "string" && error.trim()) {
    return { message: error }
  }

  if (error && typeof error === "object") {
    const message = typeof error.message === "string" ? error.message.trim() : ""
    const resolution = typeof error.resolution === "string" ? error.resolution.trim() : ""
    // Prefer the message; append the resolution only when it adds information.
    const combined =
      message && resolution && resolution !== message ? `${message} ${resolution}` : message || resolution
    if (combined) {
      return { message: combined, code: error.code }
    }
    return { message: fallbackForStatus(status), code: error.code }
  }

  return { message: fallbackForStatus(status) }
}

/**
 * Reads a response body defensively and throws a readable Error on failure.
 *
 * `response.json()` throws on a non-JSON body (for example an HTML 502 from the
 * platform), which used to surface as a raw SyntaxError to the user.
 */
export async function parseOrderResponse<T>(response: Response): Promise<T> {
  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (!response.ok) {
    const { message, code } = orderErrorMessage(body, response.status)
    const error = new Error(message) as ParsedOrderError
    if (code) error.code = code
    throw error
  }

  return body as T
}
