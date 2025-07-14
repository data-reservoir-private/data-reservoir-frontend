import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: () => ([
    {
      source: "/api/:path*",
      headers: [
        { key: "Access-Control-Allow-Credentials", value: "true" },
        { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
        { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
        { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization, azureadtoken" },
      ]
    }
  ]),
  images: {
    remotePatterns: [
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