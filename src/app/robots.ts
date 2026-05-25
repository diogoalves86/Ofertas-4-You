import type { MetadataRoute } from 'next'

import { urlSite } from '@/utilitarios/seo'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api'],
    },
    host: urlSite,
    sitemap: `${urlSite}/sitemap.xml`,
  }
}
