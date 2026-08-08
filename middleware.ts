import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const GLOBAL_RATE_LIMIT = { maxRequests: 100, windowMs: 60 * 1000 }

// Known search engines and AI crawlers are exempt from the rate limit so they
// can index the site unimpeded. The human limiter below is untouched.
const CRAWLER_RE = /(googlebot|bingbot|slurp|duckduckbot|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claude-ai|claudebot|anthropic-ai|google-extended|ccbot|ia_archiver|yandex|baiduspider)/i

const globalRateLimitStore = new Map<string, { count: number; resetTime: number }>()

let lastCleanup = Date.now()
const CLEANUP_INTERVAL = 60 * 1000

function cleanupExpiredEntries() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return

  for (const [key, entry] of globalRateLimitStore.entries()) {
    if (now > entry.resetTime) {
      globalRateLimitStore.delete(key)
    }
  }
  lastCleanup = now
}

// Client IP resolution.
// SECURITY NOTE: `x-forwarded-for` is client-spoofable unless the proxy chain
// overwrites it. Prefer the platform-provided `request.ip` when available (Vercel
// / Next.js behind Cloudflare set it to the trusted proxy-resolved client IP);
// only fall back to the first XFF hop, which is correct when a single trusted
// reverse proxy is the only entry point (our deployment model). The in-memory
// limiter is per-instance, so these limits are best-effort for horizontal scale.
function getClientIP(request: NextRequest): string {
  const platformIP = request.ip
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

function checkGlobalRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  cleanupExpiredEntries()

  const now = Date.now()
  const entry = globalRateLimitStore.get(ip)

  if (!entry || now > entry.resetTime) {
    const resetTime = now + GLOBAL_RATE_LIMIT.windowMs
    globalRateLimitStore.set(ip, { count: 1, resetTime })
    return { allowed: true }
  }

  if (entry.count >= GLOBAL_RATE_LIMIT.maxRequests) {
    const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }

  entry.count++
  return { allowed: true }
}

export function middleware(request: NextRequest) {
  const UA = request.headers.get("user-agent") ?? ""
  if (CRAWLER_RE.test(UA)) return NextResponse.next()

  const ip = getClientIP(request)
  const result = checkGlobalRateLimit(ip)

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later.", retryAfter: result.retryAfter },
      { status: 429 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|api/health).*)",
  ],
}