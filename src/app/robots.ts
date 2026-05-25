import type { MetadataRoute } from 'next'

const urlSite = process.env.NEXT_PUBLIC_URL || 'http://localhost:3002'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin'],
    },
    sitemap: `${urlSite}/sitemap.xml`,
  }
}
