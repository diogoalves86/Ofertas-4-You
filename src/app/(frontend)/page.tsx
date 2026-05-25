import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'

import { AvisoAfiliado } from '@/componentes/AvisoAfiliado'
import { CartaoAvaliacao } from '@/componentes/CartaoAvaliacao'
import { CartaoProduto } from '@/componentes/CartaoProduto'
import { DadosEstruturados } from '@/componentes/DadosEstruturados'
import { EntradaAnimada } from '@/componentes/EntradaAnimada'
import {
  buscarAvaliacoesRecentes,
  buscarProdutosDestaque,
  type AvaliacaoResumo,
  type ProdutoResumo,
} from '@/dados/conteudoPublico'
import {
  caminhoImagemCompartilhamento,
  criarMetadataPagina,
  criarUrlAbsoluta,
  descricaoPadrao,
  nomeSite,
} from '@/utilitarios/seo'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = criarMetadataPagina({
  caminho: '/',
  titulo: 'Guias, reviews e ofertas para comprar melhor',
  descricao: descricaoPadrao,
})

const etapasCuradoria = [
  {
    titulo: 'Busca com intenção',
    texto: 'Guias e reviews respondem dúvidas reais de quem está pesquisando antes de comprar.',
  },
  {
    titulo: 'Comparação honesta',
    texto: 'O conteúdo traduz ficha técnica, preço, reputação e pontos de atenção em critérios simples.',
  },
  {
    titulo: 'Próximo passo claro',
    texto: 'A oferta aparece depois do contexto, com transparência sobre links parceiros.',
  },
]

const trilhasCompra = ['TVs 4K', 'Smartphones', 'Cursos online', 'Casa conectada']

function criarDadosEstruturadosHome(produtos: ProdutoResumo[], avaliacoes: AvaliacaoResumo[]) {
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
        description: descricaoPadrao,
        inLanguage: 'pt-BR',
        publisher: {
          '@id': criarUrlAbsoluta('/#organization'),
        },
      },
      {
        '@type': 'WebPage',
        '@id': criarUrlAbsoluta('/#webpage'),
        url: criarUrlAbsoluta('/'),
        name: 'Guias, reviews e ofertas para comprar melhor',
        description: descricaoPadrao,
        inLanguage: 'pt-BR',
        isPartOf: {
          '@id': criarUrlAbsoluta('/#website'),
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: criarUrlAbsoluta(caminhoImagemCompartilhamento),
          width: 1200,
          height: 630,
        },
      },
      {
        '@type': 'ItemList',
        '@id': criarUrlAbsoluta('/#ofertas-destaque'),
        name: 'Ofertas em destaque',
        itemListElement: produtos.map((produto, indice) => ({
          '@type': 'ListItem',
          position: indice + 1,
          url: criarUrlAbsoluta(`/ofertas/${produto.slug}`),
          name: produto.titulo,
        })),
      },
      {
        '@type': 'ItemList',
        '@id': criarUrlAbsoluta('/#guias-recentes'),
        name: 'Guias recentes',
        itemListElement: avaliacoes.map((avaliacao, indice) => ({
          '@type': 'ListItem',
          position: indice + 1,
          url: criarUrlAbsoluta(`/avaliacoes/${avaliacao.slug}`),
          name: avaliacao.titulo,
        })),
      },
    ],
  }
}

export default async function PaginaInicial() {
  const [produtos, avaliacoes] = await Promise.all([
    buscarProdutosDestaque(6),
    buscarAvaliacoesRecentes(3),
  ])

  return (
    <>
      <DadosEstruturados dados={criarDadosEstruturadosHome(produtos, avaliacoes)} id="jsonld-home" />
      <section className="heroCuradoria">
        <Image
          alt=""
          className="heroImagem"
          fill
          priority
          sizes="100vw"
          src="/imagens/hero-curadoria-afiliada.webp"
        />
        <div className="heroCamada" />

        <div className="heroConteudo">
          <EntradaAnimada className="heroTexto">
            <p className="chapeu">Curadoria afiliada com intenção de compra</p>
            <h1>Ofertas, reviews e comparativos para comprar com mais segurança.</h1>
            <p>
              Um hub editorial para quem pesquisa antes de comprar: entenda o que realmente
              importa, compare opções e avance para a oferta com mais clareza.
            </p>
            <div className="acoesHero">
              <Link className="botaoPrimario" href="/ofertas">
                Ver ofertas selecionadas
              </Link>
              <Link className="botaoSecundario" href="/avaliacoes">
                Ler guias de compra
              </Link>
            </div>
          </EntradaAnimada>

        </div>
      </section>

      <AvisoAfiliado />

      <section className="secaoConteudo secaoMetodo">
        <div className="cabecaSecao cabecaSecaoAmpla">
          <div>
            <p className="chapeu">Do artigo ao checkout</p>
            <h2>Conteúdo pensado para tirar dúvidas, comparar opções e indicar o próximo passo.</h2>
          </div>
          <p>
            A experiência funciona como blog e vitrine: primeiro responde à dúvida, depois mostra
            caminhos de compra com contexto.
          </p>
        </div>

        <div className="gradeMetodo">
          {etapasCuradoria.map((etapa, indice) => (
            <EntradaAnimada className="cartaoMetodo" delay={indice * 0.05} key={etapa.titulo}>
              <span>{String(indice + 1).padStart(2, '0')}</span>
              <h3>{etapa.titulo}</h3>
              <p>{etapa.texto}</p>
            </EntradaAnimada>
          ))}
        </div>
      </section>

      <section className="secaoConteudo">
        <div className="cabecaSecao cabecaSecaoComTexto">
          <div>
            <p className="chapeu">Vitrine afiliada</p>
            <h2>Ofertas em destaque</h2>
          </div>
          <p>Produtos, cursos e oportunidades com contexto editorial antes do clique.</p>
          <Link href="/ofertas">Ver todas</Link>
        </div>
        <div className="gradeProdutos">
          {produtos.map((produto) => (
            <CartaoProduto key={produto.slug} produto={produto} />
          ))}
        </div>
      </section>

      <section className="secaoConteudo faixaEditorial">
        <div className="faixaEditorialInterna">
          <div>
            <p className="chapeu">Guias recentes</p>
            <h2>Reviews que ajudam a decidir, não só a clicar.</h2>
            <p>
              Cada pauta nasce de uma busca provável: melhores TVs, celular custo-benefício, curso
              confiável, cupom, comparação e dúvidas de meio de funil.
            </p>
            <div className="trilhasCompra" aria-label="Trilhas editoriais">
              {trilhasCompra.map((trilha) => (
                <span key={trilha}>{trilha}</span>
              ))}
            </div>
          </div>
          <Link className="botaoSecundarioClaro" href="/avaliacoes">
            Ver todos os guias
          </Link>
        </div>
        <div className="gradeAvaliacoes">
          {avaliacoes.map((avaliacao) => (
            <CartaoAvaliacao avaliacao={avaliacao} key={avaliacao.slug} />
          ))}
        </div>
      </section>

      <section className="secaoConteudo blocoConversao">
        <div>
          <p className="chapeu">Compra com contexto</p>
          <h2>Compare antes de seguir para Amazon, Mercado Livre, Shopee, Hotmart ou Monetizze.</h2>
        </div>
        <p>
          A estrutura separa conteúdo informativo, análise de produto e chamada afiliada para que
          cada recomendação tenha motivo, critério e transparência antes do clique final.
        </p>
      </section>
    </>
  )
}
