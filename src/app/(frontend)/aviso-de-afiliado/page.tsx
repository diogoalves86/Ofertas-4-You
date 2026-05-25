import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'
import { criarMetadataPagina } from '@/utilitarios/seo'

export const metadata: Metadata = criarMetadataPagina({
  caminho: '/aviso-de-afiliado',
  titulo: 'Aviso de afiliado',
  descricao: 'Entenda como os links afiliados funcionam no Ofertas 4You.',
})

export default function PaginaAvisoAfiliado() {
  return (
    <PaginaSimples
      titulo="Aviso de afiliado"
      descricao="Alguns links publicados no Ofertas 4You podem gerar comissão quando uma compra é concluída no site parceiro."
    >
      <p>
        A compra acontece fora do Ofertas 4You, diretamente em marketplaces, plataformas digitais
        ou checkouts parceiros. A comissão não altera o preço final para o visitante.
      </p>
    </PaginaSimples>
  )
}
