import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'
import { criarMetadataPagina, criarTituloDeSlug } from '@/utilitarios/seo'

type Propriedades = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Propriedades): Promise<Metadata> {
  const { slug } = await params
  const titulo = criarTituloDeSlug(slug)

  return criarMetadataPagina({
    caminho: `/categorias/${slug}`,
    titulo: `Categoria em preparação: ${titulo}`,
    descricao: 'Página de categoria aguardando publicação de ofertas e reviews no Ofertas 4You.',
    noIndex: true,
  })
}

export default async function PaginaCategoria({ params }: Propriedades) {
  const { slug } = await params

  return (
    <PaginaSimples
      titulo="Categoria em preparação"
      descricao={`A categoria "${slug}" será preenchida automaticamente com produtos e reviews publicados.`}
    />
  )
}
