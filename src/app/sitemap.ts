import type { MetadataRoute } from 'next'

import { buscarTodasAvaliacoes, buscarTodosProdutos } from '@/dados/conteudoPublico'
import { urlSite } from '@/utilitarios/seo'

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

const obterDataValida = (data?: string | null) => {
  if (!data) {
    return undefined
  }

  const dataNormalizada = new Date(data)

  return Number.isNaN(dataNormalizada.getTime()) ? undefined : dataNormalizada
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dataAtualizacao = new Date('2026-05-25')
  const [produtos, avaliacoes] = await Promise.all([buscarTodosProdutos(), buscarTodasAvaliacoes()])

  const rotasBase = rotasFixas.map((rota) => ({
    url: `${urlSite}${rota}`,
    lastModified: dataAtualizacao,
    changeFrequency: rota === '' ? ('daily' as const) : ('weekly' as const),
    priority: rota === '' ? 1 : 0.7,
  }))

  const rotasProdutos = produtos.map((produto) => ({
    url: `${urlSite}/ofertas/${produto.slug}`,
    lastModified: obterDataValida(produto.updatedAt) ?? dataAtualizacao,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const rotasAvaliacoes = avaliacoes.map((avaliacao) => ({
    url: `${urlSite}/avaliacoes/${avaliacao.slug}`,
    lastModified:
      obterDataValida(avaliacao.updatedAt) ??
      obterDataValida(avaliacao.publicado_em) ??
      dataAtualizacao,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...rotasBase, ...rotasProdutos, ...rotasAvaliacoes]
}
