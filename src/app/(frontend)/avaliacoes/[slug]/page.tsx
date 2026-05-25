import type { Metadata } from 'next'
import Link from 'next/link'

import { AvisoAfiliado } from '@/componentes/AvisoAfiliado'
import { DadosEstruturados } from '@/componentes/DadosEstruturados'
import { PaginaSimples } from '@/componentes/PaginaSimples'
import {
  buscarAvaliacaoPorSlug,
  obterAltMidia,
  obterNomeRelacao,
  obterUrlMidia,
  type AvaliacaoResumo,
} from '@/dados/conteudoPublico'
import {
  caminhoImagemCompartilhamento,
  criarMetadataPagina,
  criarTituloDeSlug,
  criarUrlAbsoluta,
  nomeSite,
} from '@/utilitarios/seo'

type Propriedades = {
  params: Promise<{
    slug: string
  }>
}

function criarDadosEstruturadosAvaliacao(avaliacao: AvaliacaoResumo, nomeCategoria: string) {
  const caminho = `/avaliacoes/${avaliacao.slug}`
  const url = criarUrlAbsoluta(caminho)
  const urlImagem = obterUrlMidia(avaliacao.imagem)
  const altImagem = obterAltMidia(avaliacao.imagem) || avaliacao.titulo
  const imagem = criarUrlAbsoluta(urlImagem || caminhoImagemCompartilhamento)
  const perguntas = (avaliacao.perguntas_frequentes ?? []).filter(
    (item) => item.pergunta && item.resposta,
  )

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': criarUrlAbsoluta('/#organization'),
        name: nomeSite,
        url: criarUrlAbsoluta('/'),
        logo: criarUrlAbsoluta('/favicon.svg'),
      },
      {
        '@type': 'WebSite',
        '@id': criarUrlAbsoluta('/#website'),
        name: nomeSite,
        url: criarUrlAbsoluta('/'),
        inLanguage: 'pt-BR',
        publisher: {
          '@id': criarUrlAbsoluta('/#organization'),
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${url}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Início',
            item: criarUrlAbsoluta('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Guias',
            item: criarUrlAbsoluta('/avaliacoes'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: avaliacao.titulo,
            item: url,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: avaliacao.titulo,
        description: avaliacao.resumo,
        inLanguage: 'pt-BR',
        breadcrumb: {
          '@id': `${url}#breadcrumb`,
        },
        isPartOf: {
          '@id': criarUrlAbsoluta('/#website'),
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: imagem,
          caption: altImagem,
        },
        mainEntity: {
          '@id': `${url}#article`,
        },
      },
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: avaliacao.titulo,
        description: avaliacao.resumo,
        image: [imagem],
        author: {
          '@type': 'Organization',
          name: avaliacao.autor || nomeSite,
        },
        publisher: {
          '@id': criarUrlAbsoluta('/#organization'),
        },
        mainEntityOfPage: {
          '@id': `${url}#webpage`,
        },
        articleSection: nomeCategoria || undefined,
        datePublished: avaliacao.publicado_em ?? avaliacao.createdAt,
        dateModified: avaliacao.updatedAt ?? avaliacao.publicado_em ?? avaliacao.createdAt,
        timeRequired: avaliacao.tempo_leitura ? `PT${avaliacao.tempo_leitura}M` : undefined,
        inLanguage: 'pt-BR',
      },
      perguntas.length
        ? {
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: perguntas.map((item) => ({
              '@type': 'Question',
              name: item.pergunta,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.resposta,
              },
            })),
          }
        : undefined,
    ].filter(Boolean),
  }
}

export async function generateMetadata({ params }: Propriedades): Promise<Metadata> {
  const { slug } = await params
  const avaliacao = await buscarAvaliacaoPorSlug(slug)

  if (avaliacao) {
    const urlImagem = obterUrlMidia(avaliacao.imagem)

    return criarMetadataPagina({
      caminho: `/avaliacoes/${slug}`,
      titulo: avaliacao.titulo,
      descricao: avaliacao.resumo ?? 'Review, comparativo ou guia de compra do Ofertas 4You.',
      imagem: urlImagem
        ? {
            alt: obterAltMidia(avaliacao.imagem) || avaliacao.titulo,
            url: urlImagem,
          }
        : undefined,
      tipoOpenGraph: 'article',
    })
  }

  return criarMetadataPagina({
    caminho: `/avaliacoes/${slug}`,
    titulo: `Review em preparação: ${criarTituloDeSlug(slug)}`,
    descricao: 'Página de review aguardando publicação do artigo no Ofertas 4You.',
    noIndex: true,
  })
}

export default async function PaginaAvaliacao({ params }: Propriedades) {
  const { slug } = await params
  const avaliacao = await buscarAvaliacaoPorSlug(slug)

  if (!avaliacao) {
    return (
      <PaginaSimples
        titulo="Review em preparação"
        descricao={`Esta página já está pronta para receber o artigo publicado com o slug "${slug}".`}
      >
        <p>
          A estrutura editorial aceita comparativos, perguntas frequentes, produtos relacionados e
          chamadas para ofertas afiliadas ao final do conteúdo.
        </p>
        <AvisoAfiliado />
      </PaginaSimples>
    )
  }

  const nomeCategoria = obterNomeRelacao(avaliacao.categoria)

  return (
    <article className="paginaDetalhe artigoDetalhe">
      <DadosEstruturados
        dados={criarDadosEstruturadosAvaliacao(avaliacao, nomeCategoria)}
        id="jsonld-avaliacao"
      />
      <nav className="trilhaNavegacao" aria-label="Você está em">
        <Link href="/">Início</Link>
        <span>/</span>
        <Link href="/avaliacoes">Guias</Link>
      </nav>

      <header className="detalheHero detalheHeroTexto">
        <div>
          <p className="chapeu">{nomeCategoria || 'Guia de compra'}</p>
          <h1>{avaliacao.titulo}</h1>
          {avaliacao.resumo && <p>{avaliacao.resumo}</p>}
          <div className="linhaEtiquetas detalheEtiquetas">
            {nomeCategoria && <span>{nomeCategoria}</span>}
            {avaliacao.tempo_leitura && <span>{avaliacao.tempo_leitura} min de leitura</span>}
            {avaliacao.autor && <span>{avaliacao.autor}</span>}
          </div>
        </div>
      </header>

      <div className="detalheGrade">
        <section className="painelDetalhe">
          <h2>O que este guia ajuda a decidir</h2>
          <p>
            Este conteúdo organiza os critérios mais importantes para reduzir dúvida antes da
            compra. A ideia é comparar com mais clareza, sem depender só de preço, ficha técnica ou
            promessa comercial.
          </p>
          <ul>
            <li>Entender quais critérios realmente mudam a experiência de uso.</li>
            <li>Separar vantagem objetiva de detalhe que parece importante, mas pesa pouco.</li>
            <li>Chegar ao link de oferta com mais segurança sobre o que comparar.</li>
          </ul>
        </section>

        <section className="painelDetalhe">
          <h2>Critérios editoriais</h2>
          <p>
            Antes de recomendar uma próxima ação, o Ofertas 4You considera contexto de uso, preço,
            reputação do vendedor, garantias, limitações e sinais de qualidade.
          </p>
          <AvisoAfiliado />
        </section>
      </div>

      {avaliacao.perguntas_frequentes?.length ? (
        <section className="painelDetalhe blocoFaq">
          <h2>Perguntas frequentes</h2>
          {avaliacao.perguntas_frequentes.map((item) =>
            item.pergunta && item.resposta ? (
              <details key={item.pergunta}>
                <summary>{item.pergunta}</summary>
                <p>{item.resposta}</p>
              </details>
            ) : null,
          )}
        </section>
      ) : null}

      <section className="caixaProximoPasso">
        <div>
          <p className="chapeu">Depois da leitura</p>
          <h2>Veja ofertas com os critérios frescos na cabeça.</h2>
          <p>
            Use o guia como filtro: compare preço, loja, garantia e aderência ao seu uso antes de
            sair para comprar.
          </p>
        </div>
        <Link className="botaoPrimario" href="/ofertas">
          Ver ofertas selecionadas
        </Link>
      </section>
    </article>
  )
}
