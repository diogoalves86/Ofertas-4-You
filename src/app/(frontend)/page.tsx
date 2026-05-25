import Link from 'next/link'

import { AvisoAfiliado } from '@/componentes/AvisoAfiliado'
import { CartaoAvaliacao } from '@/componentes/CartaoAvaliacao'
import { CartaoProduto } from '@/componentes/CartaoProduto'
import { buscarAvaliacoesRecentes, buscarProdutosDestaque } from '@/dados/conteudoPublico'

export const dynamic = 'force-dynamic'

export default async function PaginaInicial() {
  const [produtos, avaliacoes] = await Promise.all([
    buscarProdutosDestaque(6),
    buscarAvaliacoesRecentes(3),
  ])

  return (
    <>
      <section className="vitrineInicial">
        <div className="chamadaPrincipal">
          <p className="chapeu">Curadoria afiliada para comprar melhor</p>
          <h1>Ofertas, reviews e comparativos em um so lugar.</h1>
          <p>
            Encontre oportunidades em marketplaces e produtos digitais com uma experiencia clara,
            rapida e feita para decisao de compra.
          </p>
          <div className="acoesHero">
            <Link className="botaoPrimario" href="/ofertas">
              Ver ofertas
            </Link>
            <Link className="botaoSecundario" href="/avaliacoes">
              Ler reviews
            </Link>
          </div>
        </div>

        <div className="painelDestaque">
          <span className="seloPainel">SEO + afiliados</span>
          <strong>Amazon, Mercado Livre, Shopee, Hotmart e Monetizze</strong>
          <p>Estrutura pronta para produtos fisicos, infoprodutos e guias editoriais.</p>
          <div className="metricasPainel">
            <span>
              <strong>100%</strong>
              responsivo
            </span>
            <span>
              <strong>CMS</strong>
              Payload
            </span>
            <span>
              <strong>SEO</strong>
              por pagina
            </span>
          </div>
        </div>
      </section>

      <AvisoAfiliado />

      <section className="secaoConteudo">
        <div className="cabecaSecao">
          <div>
            <p className="chapeu">Vitrine</p>
            <h2>Ofertas em destaque</h2>
          </div>
          <Link href="/ofertas">Ver todas</Link>
        </div>
        <div className="gradeProdutos">
          {produtos.map((produto) => (
            <CartaoProduto key={produto.slug} produto={produto} />
          ))}
        </div>
      </section>

      <section className="secaoConteudo faixaEditorial">
        <div className="cabecaSecao">
          <div>
            <p className="chapeu">Conteudo</p>
            <h2>Reviews e guias recentes</h2>
          </div>
          <Link href="/avaliacoes">Ver reviews</Link>
        </div>
        <div className="gradeAvaliacoes">
          {avaliacoes.map((avaliacao) => (
            <CartaoAvaliacao avaliacao={avaliacao} key={avaliacao.slug} />
          ))}
        </div>
      </section>
    </>
  )
}
