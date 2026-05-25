import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'

type Propriedades = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Propriedades): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `Categoria ${slug}`,
    description: 'Ofertas e reviews organizados por categoria.',
  }
}

export default async function PaginaCategoria({ params }: Propriedades) {
  const { slug } = await params

  return (
    <PaginaSimples
      titulo="Categoria em preparacao"
      descricao={`A categoria "${slug}" sera preenchida automaticamente com produtos e reviews publicados.`}
    />
  )
}
