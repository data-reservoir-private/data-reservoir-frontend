import type { MetadataRoute, Route } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/login',
      disallow: [
        '/dashboard',
        '/cygnus',
        '/export',
        '/farm-frenzy',
        '/hayday',
        '/nasi-goreng',
        '/pizza-frenzy',
        '/seasons',
        '/the-sims'
      ] as Route[],
    },
    sitemap: `https://${process.env.DOMAIN}/sitemap.xml`
  }
}