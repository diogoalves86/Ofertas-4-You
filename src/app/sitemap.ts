import type { MetadataRoute } from 'next'

const urlSite = process.env.NEXT_PUBLIC_URL || 'http://localhost:3002'

const rotasFixas = [
  '',
  '/ofertas',
  '/avaliacoes',
  '/sobre',
  '/aviso-de-afiliado',
  '/politica-de-privacidade',
  '/termos-de-uso',
  '/exclusao-de-dados',
]

export default function sitemap(): MetadataRoute.Sitemap {
  return rotasFixas.map((rota) => ({
    url: `${urlSite}${rota}`,
    lastModified: new Date(),
    changeFrequency: rota === '' ? 'daily' : 'weekly',
    priority: rota === '' ? 1 : 0.7,
  }))
}
