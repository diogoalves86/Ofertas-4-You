import type { Metadata } from 'next'

import { AvisoAfiliado } from '@/componentes/AvisoAfiliado'
import { PaginaSimples } from '@/componentes/PaginaSimples'

type Propriedades = {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: Propriedades): Promise<Metadata> {
  const { slug } = await params

  return {
    title: `Review ${slug}`,
    description: 'Review, comparativo ou guia de compra do Ofertas 4You.',
  }
}

export default async function PaginaAvaliacao({ params }: Propriedades) {
  const { slug } = await params

  return (
    <PaginaSimples
      titulo="Review em preparacao"
      descricao={`Esta pagina ja esta pronta para receber o artigo publicado com o slug "${slug}".`}
    >
      <p>
        A estrutura editorial aceita comparativos, perguntas frequentes, produtos relacionados e
        chamadas para ofertas afiliadas ao final do conteudo.
      </p>
      <AvisoAfiliado />
    </PaginaSimples>
  )
}
