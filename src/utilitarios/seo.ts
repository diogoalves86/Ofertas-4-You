import type { Metadata } from 'next'

export const nomeSite = 'Ofertas 4You'

export const descricaoPadrao =
  'Guias de compra, reviews e ofertas com curadoria afiliada para ajudar você a comparar melhor antes de comprar.'

export const caminhoImagemCompartilhamento = '/imagens/og-ofertas4you.webp'

export const urlSite = (process.env.NEXT_PUBLIC_URL || 'https://ofertas4you.com.br').replace(
  /\/$/,
  '',
)

export function criarUrlAbsoluta(caminho = '/') {
  return new URL(caminho, `${urlSite}/`).toString()
}

export function criarJsonLdSeguro(dados: unknown) {
  return JSON.stringify(dados).replace(/</g, '\\u003c')
}

export function criarTituloDeSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((parte) => parte.charAt(0).toUpperCase() + parte.slice(1))
    .join(' ')
}

type OpcoesMetadata = {
  caminho: string
  descricao?: string
  imagem?: {
    alt?: string | null
    height?: number
    url: string
    width?: number
  }
  noIndex?: boolean
  titulo: string
  tipoOpenGraph?: 'article' | 'website'
}

export function criarMetadataPagina({
  caminho,
  descricao = descricaoPadrao,
  imagem,
  noIndex = false,
  titulo,
  tipoOpenGraph = 'website',
}: OpcoesMetadata): Metadata {
  const url = criarUrlAbsoluta(caminho)
  const tituloSocial = titulo.includes(nomeSite) ? titulo : `${titulo} | ${nomeSite}`
  const imagemSocial = {
    alt: imagem?.alt ?? 'Curadoria de ofertas, reviews e guias de compra do Ofertas 4You',
    height: imagem?.height ?? 630,
    url: criarUrlAbsoluta(imagem?.url ?? caminhoImagemCompartilhamento),
    width: imagem?.width ?? 1200,
  }

  return {
    title: titulo,
    description: descricao,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: tituloSocial,
      description: descricao,
      url,
      siteName: nomeSite,
      locale: 'pt_BR',
      type: tipoOpenGraph,
      images: [imagemSocial],
    },
    robots: noIndex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : {
          index: true,
          follow: true,
        },
    twitter: {
      card: 'summary_large_image',
      title: tituloSocial,
      description: descricao,
      images: [
        {
          alt: imagemSocial.alt,
          url: imagemSocial.url,
        },
      ],
    },
  }
}
