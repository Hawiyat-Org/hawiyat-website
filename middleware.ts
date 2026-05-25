import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const GLOBAL_RATE_LIMIT = { maxRequests: 100, windowMs: 60 * 1000 }

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

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }

  const realIP = request.headers.get("x-real-ip")
  if (realIP) {
    return realIP.trim()
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