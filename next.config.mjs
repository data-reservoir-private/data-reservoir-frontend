/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https",
        pathname: "/apify-apps/apify-static-assets/**"
      }
    ],
    imageSizes: [32, 48, 64, 72, 128, 256, 512]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
