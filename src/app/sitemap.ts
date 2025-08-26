import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${process.env.DOMAIN}/login`,
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 1,
    }
  ]
}