/** @type {import('next').NextConfig} */
const nextConfig = {
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
  async redirects() {
    return [
      { source: "/hawiyat-composer", destination: "/composer", permanent: true },
      { source: "/ai-algeria", destination: "/", permanent: true },
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
