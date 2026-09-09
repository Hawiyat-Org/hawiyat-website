import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { checkRateLimit } from "@/lib/rate-limiter"

const GLOBAL_RATE_LIMIT = { maxRequests: 100, windowMs: 60 * 1000 }

// Known search engines and AI crawlers are exempt from the rate limit so they
// can index the site unimpeded. The human limiter below is untouched.
const CRAWLER_RE = /(googlebot|bingbot|slurp|duckduckbot|gptbot|oai-searchbot|chatgpt-user|perplexitybot|claude-ai|claudebot|anthropic-ai|google-extended|ccbot|ia_archiver|yandex|baiduspider)/i

// Agent-facing markdown files. They are no longer listed in the matcher's
// negative lookahead so middleware runs for them, but the branch below returns
// BEFORE the rate limiter: the paths stay exempt exactly as before, and the
// only thing added is the Vary: Accept negotiation header.
const MARKDOWN_FILE_RE = /^\/(?:pricing\.md|llms\.txt|llmsfull\.txt)$/

// Real top-level paths (static pages, route handlers and root agent files).
// A request to any other path will 404, so when such a request asks for
// markdown we answer with a markdown 404 instead of the HTML not-found page.
// Keep this list in sync when top-level routes are added or removed.
const KNOWN_PAGE_PATHS = new Set([
  "/",
  "/about",
  "/ai-api-algeria",
  "/ai.txt",
  "/blog",
  "/composer",
  "/contact",
  "/credits",
  "/dcma",
  "/dmca",
  "/faq",
  "/feed.xml",
  "/llms-full.txt",
  "/openapi.json",
  "/pricing",
  "/privacy",
  "/services",
  "/terms",
])

// Real dynamic subtrees: every /blog/<slug> and /services/<slug> maps to an
// existing route (page or static asset), so those paths are never treated as
// 404s from middleware. Unknown slugs still 404 at the page level.
const DYNAMIC_ROUTE_PREFIXES = ["/blog/", "/services/"]

const MARKDOWN_NOT_FOUND_BODY = `# 404: Page not found

That page does not exist on Hawiyat. The route was not found, so nothing ran
and nothing shipped.

## Where to go instead

- Home: /
- Sitemap: /sitemap.xml
- Machine-readable site guide: /llms.txt
- Full machine-readable guide: /llms-full.txt
- Contact: /contact
`

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

// Middleware-generated responses bypass the security headers next.config.mjs
// attaches to normal responses, so re-apply them here (429s and the markdown
// 404 below) so every response still carries HSTS/CSP/COOP/CORP.
function applySecurityHeaders(headers: Headers): void {
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")
  headers.set("X-Content-Type-Options", "nosniff")
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  headers.set("X-Frame-Options", "DENY")
  headers.set("Cross-Origin-Opener-Policy", "same-origin")
  headers.set("Cross-Origin-Resource-Policy", "same-origin")
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
}

function prefersMarkdown(request: NextRequest): boolean {
  const accept = request.headers.get("accept") ?? ""
  return accept
    .split(",")
    .some((part) => part.split(";")[0].trim().toLowerCase() === "text/markdown")
}

function isKnownRoute(pathname: string): boolean {
  const normalized = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname
  if (KNOWN_PAGE_PATHS.has(normalized)) return true
  return DYNAMIC_ROUTE_PREFIXES.some((prefix) => normalized.startsWith(prefix))
}

function isMarkdownNotFoundRequest(request: NextRequest): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false
  if (!prefersMarkdown(request)) return false
  const pathname = request.nextUrl.pathname
  // /api/* 404s stay on their default path; API errors are JSON, never markdown.
  if (pathname === "/api" || pathname.startsWith("/api/")) return false
  // Static assets served from public/ (images, icons, fonts, media) are real
  // files, not pages: never answer them with a markdown 404.
  if (/\.(?:png|jpe?g|gif|webp|avif|svg|ico|bmp|woff2?|ttf|otf|eot|mp3|mp4|webm|ogg|wav|pdf|zip|gz|css|js|map)$/i.test(pathname)) return false
  return !isKnownRoute(pathname)
}

function markdownNotFoundResponse(method: string): NextResponse {
  const response = new NextResponse(method === "HEAD" ? null : MARKDOWN_NOT_FOUND_BODY, {
    status: 404,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
    },
  })
  applySecurityHeaders(response.headers)
  return response
}

export function middleware(request: NextRequest) {
  // Markdown responses advertise content negotiation to agents. Returning
  // before the rate limiter keeps these agent files exempt (as the matcher
  // exclusion did previously); only the Vary header is added.
  if (MARKDOWN_FILE_RE.test(request.nextUrl.pathname)) {
    const response = NextResponse.next()
    response.headers.set("Vary", "Accept, Accept-Encoding")
    return response
  }

  // Agents that ask for markdown on a path that will 404 get the real 404
  // status with a short markdown recovery body instead of the HTML not-found
  // page. Like the markdown-file branch this returns before the crawler
  // exemption and the rate limiter, so agent 404 probes stay unthrottled.
  if (isMarkdownNotFoundRequest(request)) {
    return markdownNotFoundResponse(request.method)
  }

  const UA = request.headers.get("user-agent") ?? ""
  if (CRAWLER_RE.test(UA)) return NextResponse.next()

  const ip = getClientIP(request)
  const result = checkRateLimit(ip, GLOBAL_RATE_LIMIT.maxRequests, GLOBAL_RATE_LIMIT.windowMs)

  if (!result.allowed) {
    const response = NextResponse.json(
      { error: "Too many requests. Please try again later.", retryAfter: result.retryAfter },
      { status: 429 }
    )
    applySecurityHeaders(response.headers)
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Static/SEO/AI-agent endpoints are excluded from the rate limiter: crawler
    // and audit bursts (Lighthouse, PSI, LLM agents) must always be able to fetch
    // them. `/public/` matches URLs starting with /public/, NOT files served from
    // the public dir at root. Root markdown files (pricing.md / llms.txt /
    // llmsfull.txt) are NOT excluded here anymore: they now run through
    // middleware to get Vary: Accept (see MARKDOWN_FILE_RE) but return before
    // the rate limiter, so they stay exempt. `/ingest/*` is the PostHog same-origin
    // proxy: next.config.mjs rewrites it to us.i.posthog.com server-side, and the
    // middleware must not rate limit or intercept those event requests. /api/*
    // stays protected; only /api/health is exempt.
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public/|api/health|ingest).*)",
  ],
}