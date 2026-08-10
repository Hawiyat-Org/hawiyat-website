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
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://connect.facebook.net https://www.google-analytics.com https://www.googletagmanager.com https://app.chatwoot.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data: blob: https://*.facebook.com https://*.fbcdn.net https://app.chatwoot.com",
              "connect-src 'self' https://connect.facebook.net https://www.facebook.com https://*.facebook.com https://*.fbcdn.net https://*.on.aws https://app.chatwoot.com wss://app.chatwoot.com",
              "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://maps.google.com https://www.google.com/maps https://app.chatwoot.com",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
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
