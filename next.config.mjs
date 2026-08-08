/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Required for OpenNext/Cloudflare Workers: OpenNext patches the Prisma client
  // for the workerd runtime (WASM engine) when it is kept external to the bundle.
  serverExternalPackages: ['@prisma/client', '.prisma/client'],
  images: {
  
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
