import type { Metadata } from 'next'

import { CartaoAvaliacao } from '@/componentes/CartaoAvaliacao'
import { DadosEstruturados } from '@/componentes/DadosEstruturados'
import { buscarTodasAvaliacoes, type AvaliacaoResumo } from '@/dados/conteudoPublico'
import { criarMetadataPagina, criarUrlAbsoluta } from '@/utilitarios/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  ...criarMetadataPagina({
    caminho: '/avaliacoes',
    titulo: 'Reviews, comparativos e guias de compra',
    descricao:
      'Guias de compra, reviews e comparativos para responder dúvidas e comparar opções antes de comprar.',
  }),
}

function criarDadosEstruturadosAvaliacoes(avaliacoes: AvaliacaoResumo[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': criarUrlAbsoluta('/avaliacoes#webpage'),
    url: criarUrlAbsoluta('/avaliacoes'),
    name: 'Reviews, comparativos e guias de compra',
    description:
      'Guias de compra, reviews e comparativos para responder dúvidas e comparar opções antes de comprar.',
    inLanguage: 'pt-BR',
    mainEntity: {
      '@type': 'ItemList',
      name: 'Lista de reviews e guias de compra',
      itemListElement: avaliacoes.map((avaliacao, indice) => ({
        '@type': 'ListItem',
        position: indice + 1,
        url: criarUrlAbsoluta(`/avaliacoes/${avaliacao.slug}`),
        name: avaliacao.titulo,
      })),
    },
  }
}

export default async function PaginaAvaliacoes() {
  const avaliacoes = await buscarTodasAvaliacoes()

  return (
    <section className="secaoConteudo paginaLista">
      <DadosEstruturados
        dados={criarDadosEstruturadosAvaliacoes(avaliacoes)}
        id="jsonld-avaliacoes"
      />
      <div className="cabecaSecao cabecaSecaoComTexto">
        <div>
          <p className="chapeu">Conteúdo editorial</p>
          <h1>Reviews, comparativos e guias de compra</h1>
        </div>
        <p>
          Conteúdos para quem já está pesquisando, quer responder dúvidas e precisa comparar antes
          de comprar.
        </p>
      </div>
      <div className="gradeAvaliacoes">
        {avaliacoes.map((avaliacao) => (
          <CartaoAvaliacao key={avaliacao.slug} avaliacao={avaliacao} />
        ))}
      </div>
    </section>
  )
}
