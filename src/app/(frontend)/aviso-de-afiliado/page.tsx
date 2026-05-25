import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'

export const metadata: Metadata = {
  title: 'Aviso de afiliado',
  description: 'Entenda como os links afiliados funcionam no Ofertas 4You.',
}

export default function PaginaAvisoAfiliado() {
  return (
    <PaginaSimples
      titulo="Aviso de afiliado"
      descricao="Alguns links publicados no Ofertas 4You podem gerar comissao quando uma compra e concluida no site parceiro."
    >
      <p>
        A compra acontece fora do Ofertas 4You, diretamente em marketplaces, plataformas digitais
        ou checkouts parceiros. A comissao nao altera o preco final para o visitante.
      </p>
    </PaginaSimples>
  )
}
