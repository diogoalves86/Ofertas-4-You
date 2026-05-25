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
    title: `Loja ${slug}`,
    description: 'Ofertas publicadas por loja parceira.',
  }
}

export default async function PaginaLoja({ params }: Propriedades) {
  const { slug } = await params

  return (
    <PaginaSimples
      titulo="Loja parceira em preparacao"
      descricao={`A loja "${slug}" sera usada para agrupar ofertas e links afiliados.`}
    />
  )
}
