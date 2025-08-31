import createMDX from '@next/mdx'

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

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: 'one-dark-pro',
};
/** @type {import('rehype-katex').Options} */
const opt = {
  minRuleThickness: 0.1
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: ['remark-math'],
    rehypePlugins: [['rehype-katex', opt], ['rehype-pretty-code', options]]
  }
});

// Merge MDX config with Next.js config
export default withMDX(nextConfig);