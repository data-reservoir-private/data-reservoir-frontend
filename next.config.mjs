/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  images: {
    qualities: [50],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        hostname: "img.clerk.com",
        protocol: "https",
        pathname: "/**"
      },
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
        pathname: "/apify-apps/apify-static-assets/**"
      },
      {
        hostname: "localhost",
        port: "40000",
        protocol: "http",
        pathname: '/**/*'
      }
    ],
    imageSizes: [32, 48, 64, 72, 128, 256, 512]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;