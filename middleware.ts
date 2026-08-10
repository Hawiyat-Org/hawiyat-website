import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { checkRateLimit } from "@/lib/rate-limiter"

const GLOBAL_RATE_LIMIT = { maxRequests: 100, windowMs: 60 * 1000 }

// Known search engines and AI crawlers are exempt from the rate limit so they
// can index the site unimpeded. The human limiter below is untouched.
const CRAWLER_RE = /(googlebot|bingbot|slurp|duckduckbot|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claude-ai|claudebot|anthropic-ai|google-extended|ccbot|ia_archiver|yandex|baiduspider)/i

// Client IP resolution.
// SECURITY NOTE: `x-forwarded-for` is client-spoofable unless the proxy chain
// overwrites it. Vercel/Cloudflare set `x-real-ip` to the trusted proxy-resolved
// client IP; only fall back to the first XFF hop when a single trusted reverse
// proxy is the only entry point (our deployment model). The in-memory limiter
// is per-instance, so these limits are best-effort for horizontal scale.
function getClientIP(request: NextRequest): string {
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

export function middleware(request: NextRequest) {
  const UA = request.headers.get("user-agent") ?? ""
  if (CRAWLER_RE.test(UA)) return NextResponse.next()

  const ip = getClientIP(request)
  const result = checkRateLimit(ip, GLOBAL_RATE_LIMIT.maxRequests, GLOBAL_RATE_LIMIT.windowMs)

  if (!result.allowed) {
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later.", retryAfter: result.retryAfter },
      { status: 429 }
    )
    // Match the security headers next.config.mjs sends on normal responses, so
    // 429s (which bypass next.config headers) still carry HSTS/CSP/COOP/CORP.
    response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
    response.headers.set("X-Content-Type-Options", "nosniff")
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
    response.headers.set("X-Frame-Options", "DENY")
    response.headers.set("Cross-Origin-Opener-Policy", "same-origin")
    response.headers.set("Cross-Origin-Resource-Policy", "same-origin")
    response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|public/|api/health).*)",
  ],
}