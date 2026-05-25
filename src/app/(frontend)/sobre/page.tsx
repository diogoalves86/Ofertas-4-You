import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheca a proposta editorial e afiliada do Ofertas 4You.',
}

export default function PaginaSobre() {
  return (
    <PaginaSimples
      titulo="Sobre o Ofertas 4You"
      descricao="Uma vitrine editorial para encontrar ofertas, comparar produtos e acessar lojas parceiras com transparencia."
    >
      <p>
        O Ofertas 4You combina curadoria de produtos, reviews, guias de compra e links afiliados.
        O objetivo e ajudar visitantes a decidir melhor antes de comprar.
      </p>
    </PaginaSimples>
  )
}
