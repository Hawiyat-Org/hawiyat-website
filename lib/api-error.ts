/**
 * Shared parser for /api/orders responses.
 *
 * The route returns `{ error: { code, message, resolution } }`, but every form
 * used to do `new Error(data.error)`, which stringifies the object and renders
 * literally "[object Object]". No error message on this site has ever been
 * visible to a user because of that.
 *
 * `message` and `resolution` stay separate: `message` is the short summary a
 * toast uses as its title, `resolution` is the actionable follow-up a toast uses
 * as its description. Joining them produced one unreadable wall of text.
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
  /** Short, user-facing summary — a toast title. */
  message: string
  /** What the user can do about it — a toast description. */
  resolution?: string
  code?: string
}

export interface ParsedOrderError extends Error {
  /** What the user can do about the failure, when the route says. */
  resolution?: string
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
    return { message: error.trim() }
  }

  if (error && typeof error === "object") {
    const message = typeof error.message === "string" ? error.message.trim() : ""
    const resolution = typeof error.resolution === "string" ? error.resolution.trim() : ""

    // An empty message falls back to the resolution so the toast never renders
    // a blank title; the resolution is only kept when it adds information.
    const info: OrderErrorInfo = { message: message || resolution || fallbackForStatus(status) }
    if (message && resolution && resolution !== message) info.resolution = resolution
    if (error.code) info.code = error.code
    return info
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
    const { message, resolution, code } = orderErrorMessage(body, response.status)
    const error = new Error(message) as ParsedOrderError
    if (code) error.code = code
    if (resolution) error.resolution = resolution
    throw error
  }

  // A 2xx with an unreadable body would otherwise surface to the user as
  // "Cannot read properties of null (reading 'order')" — the same class of bug
  // as the [object Object] this module exists to fix. An empty object is just as
  // bad as null here, so the success path requires a usable order id.
  const order = (body as { order?: { id?: unknown } })?.order
  if (typeof order !== "object" || order === null || typeof order.id !== "string" || !order.id) {
    throw new Error(
      "We could not read the server's response. Please refresh and try again, or contact support if the problem continues."
    )
  }

  return body as T
}
