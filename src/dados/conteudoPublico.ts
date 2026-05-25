import { getPayload } from 'payload'

import config from '@/payload.config'

export type MidiaResumo = {
  alt?: string | null
  url?: string | null
}

export type RelacaoNomeada = {
  nome?: string | null
  slug?: string | null
}

export type ProdutoResumo = {
  id?: string | number
  titulo: string
  slug: string
  resumo?: string | null
  preco?: string | null
  preco_promocional?: string | null
  selo?: string | null
  nota?: number | null
  link_afiliado?: string | null
  loja?: RelacaoNomeada | string | number | null
  categoria?: RelacaoNomeada | string | number | null
  imagem?: MidiaResumo | string | number | null
}

export type AvaliacaoResumo = {
  id?: string | number
  titulo: string
  slug: string
  resumo?: string | null
  autor?: string | null
  tempo_leitura?: number | null
  publicado_em?: string | null
  categoria?: RelacaoNomeada | string | number | null
  imagem?: MidiaResumo | string | number | null
}

const produtosFallback: ProdutoResumo[] = [
  {
    titulo: 'Smart TV 4K com bom custo-beneficio',
    slug: 'smart-tv-4k-custo-beneficio',
    resumo: 'Modelo de destaque para reviews, comparativos e ofertas sazonais em lojas parceiras.',
    preco_promocional: 'Ver oferta atual',
    selo: 'Curadoria',
    nota: 4.7,
    link_afiliado: '/ofertas',
    loja: { nome: 'Loja parceira' },
    categoria: { nome: 'TVs' },
  },
  {
    titulo: 'Smartphone intermediario para comprar melhor',
    slug: 'smartphone-intermediario-comprar-melhor',
    resumo: 'Espaco preparado para produtos da Amazon, Mercado Livre, Shopee e infoprodutos.',
    preco_promocional: 'Comparar opcoes',
    selo: 'Review',
    nota: 4.6,
    link_afiliado: '/avaliacoes',
    loja: { nome: 'Marketplace' },
    categoria: { nome: 'Smartphones' },
  },
  {
    titulo: 'Curso digital com checkout parceiro',
    slug: 'curso-digital-checkout-parceiro',
    resumo: 'Estrutura pronta para Hotmart, Monetizze e outros produtos digitais com link direto.',
    preco_promocional: 'Ir ao checkout',
    selo: 'Digital',
    nota: 4.8,
    link_afiliado: '/ofertas',
    loja: { nome: 'Produto digital' },
    categoria: { nome: 'Cursos' },
  },
]

const avaliacoesFallback: AvaliacaoResumo[] = [
  {
    titulo: 'Como escolher uma TV 4K sem pagar por recurso que voce nao usa',
    slug: 'como-escolher-tv-4k',
    resumo:
      'Guia editorial para comparar painel, brilho, sistema operacional, conectividade e preco real.',
    autor: 'Equipe Ofertas 4You',
    tempo_leitura: 7,
    categoria: { nome: 'TVs' },
  },
  {
    titulo: 'Smartphone intermediario ou topo antigo: qual vale mais a pena?',
    slug: 'smartphone-intermediario-ou-topo-antigo',
    resumo:
      'Comparativo pensado para capturar buscas de decisao e indicar ofertas afiliadas no momento certo.',
    autor: 'Equipe Ofertas 4You',
    tempo_leitura: 6,
    categoria: { nome: 'Smartphones' },
  },
]

const buscarPayload = async () => {
  if (process.env.DESABILITAR_PAYLOAD_PUBLICO === 'true') {
    throw new Error('Payload desabilitado para renderizacao publica.')
  }

  const configuracao = await config
  return getPayload({ config: configuracao })
}

export const obterNomeRelacao = (relacao: RelacaoNomeada | string | number | null | undefined) => {
  if (relacao && typeof relacao === 'object' && 'nome' in relacao) {
    return relacao.nome ?? ''
  }

  return ''
}

export const obterUrlMidia = (midia: MidiaResumo | string | number | null | undefined) => {
  if (midia && typeof midia === 'object' && 'url' in midia) {
    return midia.url ?? ''
  }

  return ''
}

export const buscarProdutosDestaque = async (limite = 6): Promise<ProdutoResumo[]> => {
  try {
    const payload = await buscarPayload()
    const resultado = await payload.find({
      collection: 'produtos',
      depth: 2,
      limit: limite,
      sort: '-updatedAt',
      where: {
        and: [{ destaque: { equals: true } }, { _status: { equals: 'published' } }],
      },
    })

    return resultado.docs.length > 0 ? (resultado.docs as ProdutoResumo[]) : produtosFallback
  } catch {
    return produtosFallback
  }
}

export const buscarAvaliacoesRecentes = async (limite = 3): Promise<AvaliacaoResumo[]> => {
  try {
    const payload = await buscarPayload()
    const resultado = await payload.find({
      collection: 'avaliacoes',
      depth: 2,
      limit: limite,
      sort: '-publicado_em',
      where: {
        _status: { equals: 'published' },
      },
    })

    return resultado.docs.length > 0 ? (resultado.docs as AvaliacaoResumo[]) : avaliacoesFallback
  } catch {
    return avaliacoesFallback
  }
}

export const buscarTodosProdutos = async (limite = 24): Promise<ProdutoResumo[]> => {
  try {
    const payload = await buscarPayload()
    const resultado = await payload.find({
      collection: 'produtos',
      depth: 2,
      limit: limite,
      sort: '-updatedAt',
      where: {
        _status: { equals: 'published' },
      },
    })

    return resultado.docs.length > 0 ? (resultado.docs as ProdutoResumo[]) : produtosFallback
  } catch {
    return produtosFallback
  }
}

export const buscarTodasAvaliacoes = async (limite = 24): Promise<AvaliacaoResumo[]> => {
  try {
    const payload = await buscarPayload()
    const resultado = await payload.find({
      collection: 'avaliacoes',
      depth: 2,
      limit: limite,
      sort: '-publicado_em',
      where: {
        _status: { equals: 'published' },
      },
    })

    return resultado.docs.length > 0 ? (resultado.docs as AvaliacaoResumo[]) : avaliacoesFallback
  } catch {
    return avaliacoesFallback
  }
}
