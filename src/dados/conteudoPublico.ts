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
  createdAt?: string | null
  id?: string | number
  titulo: string
  slug: string
  updatedAt?: string | null
  descricao?: unknown
  resumo?: string | null
  preco?: string | null
  preco_promocional?: string | null
  selo?: string | null
  nota?: number | null
  link_afiliado?: string | null
  loja?: RelacaoNomeada | string | number | null
  categoria?: RelacaoNomeada | string | number | null
  imagem?: MidiaResumo | string | number | null
  vantagens?: { texto?: string | null }[] | null
  desvantagens?: { texto?: string | null }[] | null
}

export type AvaliacaoResumo = {
  createdAt?: string | null
  id?: string | number
  titulo: string
  slug: string
  updatedAt?: string | null
  conteudo?: unknown
  resumo?: string | null
  autor?: string | null
  tempo_leitura?: number | null
  publicado_em?: string | null
  categoria?: RelacaoNomeada | string | number | null
  imagem?: MidiaResumo | string | number | null
  perguntas_frequentes?: { pergunta?: string | null; resposta?: string | null }[] | null
}

const produtosFallback: ProdutoResumo[] = [
  {
    titulo: 'Smart TV 4K para sala clara: o que avaliar antes de comprar',
    slug: 'smart-tv-4k-custo-beneficio',
    resumo:
      'Checklist prático para comparar painel, brilho, sistema, conexões e preço real em lojas parceiras.',
    preco_promocional: 'Guia + oferta',
    selo: 'Escolha guiada',
    nota: 4.7,
    loja: { nome: 'Marketplaces' },
    categoria: { nome: 'TVs' },
    imagem: {
      alt: 'Smart TV em ambiente de review editorial',
      url: '/imagens/fallback-tv.webp',
    },
    vantagens: [
      { texto: 'Ajuda a comparar brilho, painel e sistema antes de olhar apenas o preço.' },
      { texto: 'Boa pauta para quem pesquisa TVs para sala clara ou uso diário.' },
      { texto: 'Funciona bem como porta de entrada para reviews e ofertas sazonais.' },
    ],
    desvantagens: [
      { texto: 'Confira sempre medidas, entradas HDMI e garantia diretamente na loja.' },
      { texto: 'Preço e disponibilidade podem mudar rapidamente em marketplaces.' },
    ],
  },
  {
    titulo: 'Smartphone intermediário com melhor equilíbrio de preço',
    slug: 'smartphone-intermediario-comprar-melhor',
    resumo:
      'Comparação para decidir entre bateria, câmera, tela, desempenho e ofertas com bom histórico.',
    preco_promocional: 'Comparar opções',
    selo: 'Review prático',
    nota: 4.6,
    loja: { nome: 'Marketplace' },
    categoria: { nome: 'Smartphones' },
    imagem: {
      alt: 'Smartphone em cenário de comparação de compra',
      url: '/imagens/fallback-smartphone.webp',
    },
    vantagens: [
      { texto: 'Organiza os critérios que mais pesam: bateria, câmera, tela e desempenho.' },
      { texto: 'Ajuda a comparar intermediários atuais com modelos premium mais antigos.' },
      { texto: 'Boa opção para transformar dúvida de compra em shortlist objetiva.' },
    ],
    desvantagens: [
      { texto: 'Avalie política de troca, procedência e versão do aparelho antes da compra.' },
      { texto: 'Nem sempre o menor preço compensa se o vendedor tiver reputação baixa.' },
    ],
  },
  {
    titulo: 'Curso digital com boa proposta e checkout parceiro',
    slug: 'curso-digital-checkout-parceiro',
    resumo:
      'Análise de promessa, conteúdo, garantia, bônus e reputação antes de indicar o link de compra.',
    preco_promocional: 'Ver análise',
    selo: 'Produto digital',
    nota: 4.8,
    loja: { nome: 'Hotmart e Monetizze' },
    categoria: { nome: 'Cursos' },
    imagem: {
      alt: 'Curso digital em tela com materiais de estudo',
      url: '/imagens/fallback-curso.webp',
    },
    vantagens: [
      { texto: 'Prioriza promessa, grade de aulas, suporte e garantia antes do checkout.' },
      { texto: 'Ajuda a separar produto digital bem estruturado de oferta apenas apelativa.' },
      { texto: 'Permite trabalhar comparativos entre Hotmart, Monetizze e outros checkouts.' },
    ],
    desvantagens: [
      { texto: 'Verifique produtor, política de reembolso e atualidade do conteúdo.' },
      { texto: 'Bônus e depoimentos devem ser tratados como apoio, não como critério único.' },
    ],
  },
]

const avaliacoesFallback: AvaliacaoResumo[] = [
  {
    titulo: 'Melhores TVs 4K: como comparar sem cair só na ficha técnica',
    slug: 'como-escolher-tv-4k',
    resumo:
      'Um guia para transformar busca no Google em decisão: painel, brilho, sistema, conexões e preço real.',
    autor: 'Equipe Ofertas 4You',
    tempo_leitura: 7,
    categoria: { nome: 'TVs' },
    perguntas_frequentes: [
      {
        pergunta: 'Qual é o primeiro critério para escolher uma TV 4K?',
        resposta:
          'Comece pelo ambiente de uso. Em sala clara, brilho e tipo de painel pesam tanto quanto resolução e preço.',
      },
      {
        pergunta: 'Vale comprar TV só pelo menor preço?',
        resposta:
          'Não. Verifique sistema operacional, garantia, entradas, histórico de preço e reputação da loja.',
      },
    ],
  },
  {
    titulo: 'Smartphone intermediário ou topo antigo: qual vale mais a pena?',
    slug: 'smartphone-intermediario-ou-topo-antigo',
    resumo:
      'Comparativo pensado para quem já quer comprar, mas precisa entender os trade-offs antes do clique.',
    autor: 'Equipe Ofertas 4You',
    tempo_leitura: 6,
    categoria: { nome: 'Smartphones' },
    perguntas_frequentes: [
      {
        pergunta: 'Intermediário novo ou topo antigo: qual costuma valer mais?',
        resposta:
          'Depende do uso. Intermediários novos tendem a ganhar em bateria e atualizações; topos antigos podem entregar câmera e acabamento melhores.',
      },
      {
        pergunta: 'O que comparar antes de comprar smartphone?',
        resposta:
          'Compare bateria, tela, processador, câmera, armazenamento, garantia e reputação do vendedor.',
      },
    ],
  },
  {
    titulo: 'Como avaliar um curso online antes de confiar no checkout',
    slug: 'como-avaliar-curso-online',
    resumo:
      'Critérios para analisar promessa, suporte, garantia, aulas, bônus e sinais de qualidade do produtor.',
    autor: 'Equipe Ofertas 4You',
    tempo_leitura: 5,
    categoria: { nome: 'Cursos' },
    perguntas_frequentes: [
      {
        pergunta: 'Como saber se um curso online é confiável?',
        resposta:
          'Analise promessa, currículo, suporte, garantia, atualização do conteúdo e reputação do produtor.',
      },
      {
        pergunta: 'Bônus devem pesar na decisão?',
        resposta:
          'Bônus ajudam, mas o critério principal deve ser a qualidade do conteúdo central e a clareza da entrega.',
      },
    ],
  },
]

const buscarPayload = async () => {
  if (process.env.DESABILITAR_PAYLOAD_PUBLICO === 'true') {
    throw new Error('Payload desabilitado para renderização pública.')
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

export const obterAltMidia = (midia: MidiaResumo | string | number | null | undefined) => {
  if (midia && typeof midia === 'object' && 'alt' in midia) {
    return midia.alt ?? ''
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

export const buscarProdutoPorSlug = async (slug: string): Promise<ProdutoResumo | null> => {
  try {
    const payload = await buscarPayload()
    const resultado = await payload.find({
      collection: 'produtos',
      depth: 2,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
    })

    if (resultado.docs[0]) {
      return resultado.docs[0] as ProdutoResumo
    }
  } catch {
    // Se o Payload não estiver disponível, usamos o conteúdo editorial inicial.
  }

  return produtosFallback.find((produto) => produto.slug === slug) ?? null
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

export const buscarAvaliacaoPorSlug = async (slug: string): Promise<AvaliacaoResumo | null> => {
  try {
    const payload = await buscarPayload()
    const resultado = await payload.find({
      collection: 'avaliacoes',
      depth: 2,
      limit: 1,
      where: {
        and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
      },
    })

    if (resultado.docs[0]) {
      return resultado.docs[0] as AvaliacaoResumo
    }
  } catch {
    // Se o Payload não estiver disponível, usamos o conteúdo editorial inicial.
  }

  return avaliacoesFallback.find((avaliacao) => avaliacao.slug === slug) ?? null
}
