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
    caminho: `/lojas/${slug}`,
    titulo: `Loja em preparação: ${titulo}`,
    descricao: 'Página de loja aguardando publicação de ofertas no Ofertas 4You.',
    noIndex: true,
  })
}

export default async function PaginaLoja({ params }: Propriedades) {
  const { slug } = await params

  return (
    <PaginaSimples
      titulo="Loja parceira em preparação"
      descricao={`A loja "${slug}" será usada para agrupar ofertas e links afiliados.`}
    />
  )
}
