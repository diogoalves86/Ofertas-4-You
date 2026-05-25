import type { Metadata } from 'next'

import { CartaoAvaliacao } from '@/componentes/CartaoAvaliacao'
import { buscarTodasAvaliacoes } from '@/dados/conteudoPublico'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Reviews',
  description: 'Reviews, comparativos e guias de compra publicados no Ofertas 4You.',
}

export default async function PaginaAvaliacoes() {
  const avaliacoes = await buscarTodasAvaliacoes()

  return (
    <section className="secaoConteudo faixaEditorial">
      <div className="cabecaSecao">
        <div>
          <p className="chapeu">Conteudo editorial</p>
          <h1>Reviews e guias de compra</h1>
        </div>
      </div>
      <div className="gradeAvaliacoes">
        {avaliacoes.map((avaliacao) => (
          <CartaoAvaliacao key={avaliacao.slug} avaliacao={avaliacao} />
        ))}
      </div>
    </section>
  )
}
