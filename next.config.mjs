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
          "script-src 'self' 'unsafe-inline' https://connect.facebook.net https://app.chatwoot.com",
          "style-src 'self'",
          "style-src-attr 'unsafe-inline'",
          "img-src 'self' data: blob: https://*.facebook.com https://*.fbcdn.net https://app.chatwoot.com",
          "font-src 'self'",
          "connect-src 'self' https://connect.facebook.net https://www.facebook.com https://*.facebook.com https://*.fbcdn.net https://*.on.aws https://app.chatwoot.com wss://app.chatwoot.com",
          "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://maps.google.com https://www.google.com/maps https://app.chatwoot.com",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "frame-ancestors 'none'",
        ].join("; ")
      : // dev: lenient (Next HMR uses eval + inline)
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'"

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
      { source: "/services/hosting-basic", destination: "/services/hawiyat-cloud", permanent: true },
      { source: "/services/hosting-vip", destination: "/services/hawiyat-cloud", permanent: true },
    ]
  },
}

export default nextConfig
