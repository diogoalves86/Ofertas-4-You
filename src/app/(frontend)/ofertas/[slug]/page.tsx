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
    title: `Oferta ${slug}`,
    description: 'Detalhes da oferta e link para compra em loja parceira.',
  }
}

export default async function PaginaOferta({ params }: Propriedades) {
  const { slug } = await params

  return (
    <PaginaSimples
      titulo="Oferta em preparacao"
      descricao={`Esta pagina ja esta pronta para receber o produto publicado com o slug "${slug}".`}
    >
      <AvisoAfiliado />
      <p>
        Quando o produto for cadastrado no Payload, esta rota exibira imagem, preco, loja parceira,
        vantagens, pontos de atencao e botao de afiliado.
      </p>
    </PaginaSimples>
  )
}
