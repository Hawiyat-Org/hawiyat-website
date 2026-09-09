/** @type {import('next').NextConfig} */
const nextConfig = {
  // PostHog's ingest API uses trailing slashes (POST /ingest/e/). Without this,
  // Next 308-redirects those to the non-slash path, which breaks event capture
  // for beacon transport. Canonical links and the sitemap keep SEO intact.
  skipTrailingSlashRedirect: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
  
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  async headers() {
    const isProd = process.env.NODE_ENV === "production"

    // Production: hardened allowlist CSP. 'unsafe-inline' must stay in script-src
    // because every page is statically prerendered and Next injects inline
    // __next_f hydration/flight scripts (no nonce at build time). unsafe-eval is
    // only needed by next dev HMR, hence the isProd gate.
    const csp = isProd
      ? [
          "default-src 'none'",
          "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://*.posthog.com",
          "style-src 'self'",
          "style-src-elem 'self' 'unsafe-inline'",
          "style-src-attr 'unsafe-inline'",
          "img-src 'self' data: blob: https://*.facebook.com https://*.fbcdn.net",
          "font-src 'self'",
          "connect-src 'self' https://connect.facebook.net https://www.facebook.com https://*.facebook.com https://*.fbcdn.net https://*.on.aws https://us.i.posthog.com",
          "worker-src 'self' blob:",
          "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://maps.google.com https://www.google.com/maps",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
        ].join("; ")
      : // dev: lenient (Next HMR uses eval + inline)
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.posthog.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://us.i.posthog.com; worker-src 'self' blob:"

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Content-Security-Policy", value: csp },
        ],
      },
    ]
  },
  // Same-origin PostHog proxy. instrumentation-client.ts points posthog-js at
  // api_host "/ingest", and these rewrites forward those requests to the US
  // PostHog cluster (us.i.posthog.com, the recorded founder decision). The
  // browser only ever talks to this domain, so ad blockers that blacklist
  // *.posthog.com cannot drop the events. Static assets and the /array remote
  // config must go to the asset server and are listed before the catch-all;
  // see https://posthog.com/docs/advanced/proxy/nextjs.
  async rewrites() {
    return [
      { source: "/ingest", destination: "https://us.i.posthog.com/" },
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ]
  },
  async redirects() {
    return [
      { source: "/hawiyat-composer", destination: "/composer", permanent: true },
      { source: "/services", destination: "/pricing", permanent: true },
      { source: "/ai-algeria", destination: "/", permanent: true },
      // SEO quick-win batch Q1 (2026-09): /dcma served 200 as a duplicate of /dmca
      // (346 impressions); removed /templates 404'd while holding 1,280 impressions.
      // statusCode: 301 (not permanent:true) — Next.js permanent:true emits 308.
      { source: "/dcma", destination: "/dmca", statusCode: 301 },
      { source: "/templates", destination: "/pricing", statusCode: 301 },
      // Legacy service aliases — 301 per kanban W6 (Next.js permanent:true would emit 308)
      { source: "/services/hosting-basic", destination: "/services/hawiyat-cloud", statusCode: 301 },
      { source: "/services/hosting-vip", destination: "/services/hawiyat-cloud", statusCode: 301 },
      { source: "/services/composer-pro", destination: "/services/composer", permanent: true },
      // Unregistered soft-404 slugs (SEO audit v3, 2026-08-16): redirect to their real targets.
      // Claude Code is an integration, not a SKU (0xkatana) — /services/claude-code and its
      // -algeria variant go to /composer, never a sales page.
      { source: "/services/n8n-hosting-algeria", destination: "/services/n8n-hosting", statusCode: 301 },
      { source: "/services/ai-provider-algeria", destination: "/services/composer", statusCode: 301 },
      { source: "/services/claude-code-algeria", destination: "/composer", statusCode: 301 },
      { source: "/services/claude-code", destination: "/composer", statusCode: 301 },
    ]
  },
}

export default nextConfig
