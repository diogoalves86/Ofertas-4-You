import type { Metadata } from 'next'

import { CartaoProduto } from '@/componentes/CartaoProduto'
import { buscarTodosProdutos } from '@/dados/conteudoPublico'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Ofertas',
  description: 'Produtos, servicos e infoprodutos selecionados pelo Ofertas 4You.',
}

export default async function PaginaOfertas() {
  const produtos = await buscarTodosProdutos()

  return (
    <section className="secaoConteudo faixaEditorial">
      <div className="cabecaSecao">
        <div>
          <p className="chapeu">Vitrine afiliada</p>
          <h1>Ofertas selecionadas</h1>
        </div>
      </div>
      <div className="gradeProdutos">
        {produtos.map((produto) => (
          <CartaoProduto key={produto.slug} produto={produto} />
        ))}
      </div>
    </section>
  )
}
