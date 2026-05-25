import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'
import { criarMetadataPagina } from '@/utilitarios/seo'

export const metadata: Metadata = criarMetadataPagina({
  caminho: '/sobre',
  titulo: 'Sobre',
  descricao: 'Conheça a proposta editorial e afiliada do Ofertas 4You.',
})

export default function PaginaSobre() {
  return (
    <PaginaSimples
      titulo="Sobre o Ofertas 4You"
      descricao="Uma vitrine editorial para encontrar ofertas, comparar produtos e acessar lojas parceiras com transparência."
    >
      <p>
        O Ofertas 4You combina curadoria de produtos, reviews, guias de compra e links afiliados.
        O objetivo é ajudar visitantes a decidir melhor antes de comprar.
      </p>
    </PaginaSimples>
  )
}
