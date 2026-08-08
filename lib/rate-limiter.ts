type RateLimitEntry = {
  count: number
  resetTime: number
}

const rateLimitStore = new Map<string, RateLimitEntry>()

const CLEANUP_INTERVAL = 60 * 1000
let lastCleanup = Date.now()

function cleanupExpiredEntries() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return

  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key)
    }
  }
  lastCleanup = now
}

interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: Date
  retryAfter?: number
}

export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs: number
): RateLimitResult {
  cleanupExpiredEntries()

  const now = Date.now()
  const entry = rateLimitStore.get(key)

  if (!entry || now > entry.resetTime) {
    const resetTime = now + windowMs
    rateLimitStore.set(key, { count: 1, resetTime })
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: new Date(resetTime),
    }
  }

  if (entry.count >= maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
    return {
      allowed: false,
      remaining: 0,
      resetTime: new Date(entry.resetTime),
      retryAfter,
    }
  }

  entry.count++
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetTime: new Date(entry.resetTime),
  }
}

// Client IP resolution.
// SECURITY NOTE: `x-forwarded-for` is client-spoofable unless the proxy chain
// overwrites it. Prefer the platform-provided `request.ip` when available (the
// hosting proxy resolves the real client IP); only fall back to the first XFF
// hop, which is correct when a single trusted reverse proxy is the only entry
// point. The in-memory limiter is per-instance, so these limits are best-effort
// for horizontal scale — for serverless, move to a shared store (Redis/KV).
export function getClientIP(request: Request): string {
  const platformIP = (request as Request & { ip?: string }).ip
  if (platformIP) {
    return platformIP
  }

  const realIP = request.headers.get("x-real-ip")
  if (realIP) {
    return realIP.trim()
  }

  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  return "unknown"
}