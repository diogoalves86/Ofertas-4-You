import type { Metadata } from 'next'
import Link from 'next/link'

import { AvisoAfiliado } from '@/componentes/AvisoAfiliado'
import { DadosEstruturados } from '@/componentes/DadosEstruturados'
import { PaginaSimples } from '@/componentes/PaginaSimples'
import {
  buscarProdutoPorSlug,
  obterAltMidia,
  obterNomeRelacao,
  obterUrlMidia,
  type ProdutoResumo,
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

const obterGuiaRelacionado = (slug: string, categoria: string) => {
  const indice = `${slug} ${categoria}`.toLowerCase()

  if (indice.includes('tv')) {
    return '/avaliacoes/como-escolher-tv-4k'
  }

  if (indice.includes('smartphone')) {
    return '/avaliacoes/smartphone-intermediario-ou-topo-antigo'
  }

  if (indice.includes('curso')) {
    return '/avaliacoes/como-avaliar-curso-online'
  }

  return '/avaliacoes'
}

const filtrarTextos = (itens: { texto?: string | null }[] | null | undefined) =>
  (itens ?? []).map((item) => item.texto).filter((texto): texto is string => Boolean(texto))

function criarDadosEstruturadosOferta({
  altImagem,
  destino,
  nomeCategoria,
  nomeLoja,
  pontosAtencao,
  produto,
  urlImagem,
  vantagens,
}: {
  altImagem: string
  destino: string
  nomeCategoria: string
  nomeLoja: string
  pontosAtencao: string[]
  produto: ProdutoResumo
  urlImagem: string
  vantagens: string[]
}) {
  const caminho = `/ofertas/${produto.slug}`
  const url = criarUrlAbsoluta(caminho)
  const imagem = criarUrlAbsoluta(urlImagem || caminhoImagemCompartilhamento)
  const destinoExterno = destino.startsWith('http')
  const oferta = destinoExterno
    ? {
        '@type': 'Offer',
        seller: nomeLoja
          ? {
              '@type': 'Organization',
              name: nomeLoja,
            }
          : undefined,
        url: destino,
      }
    : undefined

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
            name: 'Ofertas',
            item: criarUrlAbsoluta('/ofertas'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: produto.titulo,
            item: url,
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: produto.titulo,
        description: produto.resumo,
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
          '@id': `${url}#product`,
        },
      },
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name: produto.titulo,
        description: produto.resumo,
        image: [imagem],
        category: nomeCategoria || undefined,
        offers: oferta,
        review: {
          '@type': 'Review',
          '@id': `${url}#editorial-review`,
          author: {
            '@id': criarUrlAbsoluta('/#organization'),
          },
          publisher: {
            '@id': criarUrlAbsoluta('/#organization'),
          },
          name: produto.titulo,
          reviewBody: produto.resumo,
          reviewRating: produto.nota
            ? {
                '@type': 'Rating',
                ratingValue: produto.nota,
                bestRating: 5,
                worstRating: 1,
              }
            : undefined,
          positiveNotes: vantagens.length
            ? {
                '@type': 'ItemList',
                itemListElement: vantagens.map((vantagem, indice) => ({
                  '@type': 'ListItem',
                  position: indice + 1,
                  name: vantagem,
                })),
              }
            : undefined,
          negativeNotes: pontosAtencao.length
            ? {
                '@type': 'ItemList',
                itemListElement: pontosAtencao.map((ponto, indice) => ({
                  '@type': 'ListItem',
                  position: indice + 1,
                  name: ponto,
                })),
              }
            : undefined,
        },
      },
    ],
  }
}

export async function generateMetadata({ params }: Propriedades): Promise<Metadata> {
  const { slug } = await params
  const produto = await buscarProdutoPorSlug(slug)

  if (produto) {
    const urlImagem = obterUrlMidia(produto.imagem)

    return criarMetadataPagina({
      caminho: `/ofertas/${slug}`,
      titulo: produto.titulo,
      descricao: produto.resumo ?? 'Análise de produto com critérios de compra e link parceiro.',
      imagem: urlImagem
        ? {
            alt: obterAltMidia(produto.imagem) || produto.titulo,
            url: urlImagem,
          }
        : undefined,
    })
  }

  return criarMetadataPagina({
    caminho: `/ofertas/${slug}`,
    titulo: `Oferta em preparação: ${criarTituloDeSlug(slug)}`,
    descricao: 'Página de oferta aguardando publicação do produto no Ofertas 4You.',
    noIndex: true,
  })
}

export default async function PaginaOferta({ params }: Propriedades) {
  const { slug } = await params
  const produto = await buscarProdutoPorSlug(slug)

  if (!produto) {
    return (
      <PaginaSimples
        titulo="Oferta em preparação"
        descricao={`Esta página já está pronta para receber o produto publicado com o slug "${slug}".`}
      >
        <AvisoAfiliado />
        <p>
          Quando o produto for cadastrado no Payload, esta rota exibirá imagem, preço, loja
          parceira, vantagens, pontos de atenção e botão de afiliado.
        </p>
      </PaginaSimples>
    )
  }

  const nomeCategoria = obterNomeRelacao(produto.categoria)
  const nomeLoja = obterNomeRelacao(produto.loja)
  const urlImagem = obterUrlMidia(produto.imagem)
  const altImagem = obterAltMidia(produto.imagem) || produto.titulo
  const destino = produto.link_afiliado || obterGuiaRelacionado(produto.slug, nomeCategoria)
  const destinoExterno = destino.startsWith('http')
  const vantagens = filtrarTextos(produto.vantagens)
  const pontosAtencao = filtrarTextos(produto.desvantagens)
  const vantagensExibidas = vantagens.length
    ? vantagens
    : [
        'Compare o produto com sua necessidade real de uso antes de decidir pelo preço.',
        'Verifique loja, garantia e condições finais antes de avançar para o checkout.',
      ]
  const pontosAtencaoExibidos = pontosAtencao.length
    ? pontosAtencao
    : [
        'Preço, prazo, estoque e garantia podem mudar no site parceiro.',
        'Leia a página da loja antes de concluir a compra.',
      ]

  return (
    <article className="paginaDetalhe">
      <DadosEstruturados
        dados={criarDadosEstruturadosOferta({
          altImagem,
          destino,
          nomeCategoria,
          nomeLoja,
          pontosAtencao: pontosAtencaoExibidos,
          produto,
          urlImagem,
          vantagens: vantagensExibidas,
        })}
        id="jsonld-oferta"
      />
      <nav className="trilhaNavegacao" aria-label="Você está em">
        <Link href="/">Início</Link>
        <span>/</span>
        <Link href="/ofertas">Ofertas</Link>
      </nav>

      <header className="detalheHero">
        <div>
          <p className="chapeu">{nomeCategoria || 'Oferta analisada'}</p>
          <h1>{produto.titulo}</h1>
          {produto.resumo && <p>{produto.resumo}</p>}
          <div className="linhaEtiquetas detalheEtiquetas">
            {produto.selo && <span className="etiquetaDestaque">{produto.selo}</span>}
            {nomeLoja && <span>{nomeLoja}</span>}
            {produto.nota && <span>{produto.nota.toFixed(1)} / 5</span>}
          </div>
        </div>

        {urlImagem ? (
          <div className="detalheMidia">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={urlImagem} alt={altImagem} />
          </div>
        ) : null}
      </header>

      <AvisoAfiliado />

      <div className="detalheGrade">
        <section className="painelDetalhe">
          <h2>Quando essa opção faz sentido</h2>
          <p>
            Use esta análise para entender se a oferta combina com sua intenção de compra antes de
            comparar preço, reputação da loja e condições finais no checkout parceiro.
          </p>
          <ul>
            {vantagensExibidas.map((vantagem) => (
              <li key={vantagem}>{vantagem}</li>
            ))}
          </ul>
        </section>

        <section className="painelDetalhe">
          <h2>Pontos de atenção</h2>
          <p>
            Antes de avançar, confira os detalhes que costumam mudar a experiência real de compra.
          </p>
          <ul>
            {pontosAtencaoExibidos.map((ponto) => (
              <li key={ponto}>{ponto}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="caixaProximoPasso">
        <div>
          <p className="chapeu">Próximo passo</p>
          <h2>Compare com calma antes do clique final.</h2>
          <p>
            O Ofertas 4You não vende diretamente. A compra, pagamento, entrega, garantia e suporte
            acontecem no site parceiro.
          </p>
        </div>
        {destinoExterno ? (
          <a
            className="botaoPrimario"
            href={destino}
            rel="nofollow sponsored noopener noreferrer"
            target="_blank"
          >
            Ir para oferta parceira
          </a>
        ) : (
          <Link className="botaoPrimario" href={destino}>
            Ler guia relacionado
          </Link>
        )}
      </section>
    </article>
  )
}
