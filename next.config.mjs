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
