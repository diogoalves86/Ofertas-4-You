import type { Metadata } from 'next'

import { CartaoProduto } from '@/componentes/CartaoProduto'
import { DadosEstruturados } from '@/componentes/DadosEstruturados'
import { buscarTodosProdutos, type ProdutoResumo } from '@/dados/conteudoPublico'
import { criarMetadataPagina, criarUrlAbsoluta } from '@/utilitarios/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...criarMetadataPagina({
    caminho: '/ofertas',
    titulo: 'Ofertas selecionadas',
    descricao:
      'Produtos físicos, cursos e oportunidades selecionados para comparar antes de clicar em lojas e plataformas parceiras.',
  }),
}

function criarDadosEstruturadosOfertas(produtos: ProdutoResumo[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': criarUrlAbsoluta('/ofertas#webpage'),
    url: criarUrlAbsoluta('/ofertas'),
    name: 'Ofertas selecionadas',
    description:
      'Produtos físicos, cursos e oportunidades selecionados para comparar antes de clicar em lojas e plataformas parceiras.',
    inLanguage: 'pt-BR',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Lista de ofertas selecionadas',
      itemListElement: produtos.map((produto, indice) => ({
        '@type': 'ListItem',
        position: indice + 1,
        url: criarUrlAbsoluta(`/ofertas/${produto.slug}`),
        name: produto.titulo,
      })),
    },
  }
}

export default async function PaginaOfertas() {
  const produtos = await buscarTodosProdutos()

  return (
    <section className="secaoConteudo paginaLista">
      <DadosEstruturados
        dados={criarDadosEstruturadosOfertas(produtos)}
        id="jsonld-ofertas"
      />
      <div className="cabecaSecao cabecaSecaoComTexto">
        <div>
          <p className="chapeu">Vitrine afiliada</p>
          <h1>Ofertas selecionadas com contexto de compra</h1>
        </div>
        <p>
          Produtos físicos, cursos e oportunidades organizados para quem quer comparar antes de
          clicar no link parceiro.
        </p>
      </div>
      <div className="gradeProdutos">
        {produtos.map((produto) => (
          <CartaoProduto key={produto.slug} produto={produto} />
        ))}
      </div>
    </section>
  )
}
