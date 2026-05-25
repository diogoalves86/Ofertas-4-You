import Link from 'next/link'

import { obterNomeRelacao, obterUrlMidia, type ProdutoResumo } from '@/dados/conteudoPublico'

type Propriedades = {
  produto: ProdutoResumo
}

export function CartaoProduto({ produto }: Propriedades) {
  const nomeLoja = obterNomeRelacao(produto.loja)
  const nomeCategoria = obterNomeRelacao(produto.categoria)
  const urlImagem = obterUrlMidia(produto.imagem)
  const destino = produto.link_afiliado || `/ofertas/${produto.slug}`
  const destinoExterno = destino.startsWith('http')

  return (
    <article className="cartaoProduto">
      <Link className="miniaturaProduto" href={`/ofertas/${produto.slug}`} aria-label={produto.titulo}>
        {urlImagem ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={urlImagem} alt={produto.titulo} />
        ) : (
          <span>{nomeCategoria || 'Oferta'}</span>
        )}
      </Link>

      <div className="conteudoCartao">
        <div className="linhaEtiquetas">
          {produto.selo && <span className="etiquetaDestaque">{produto.selo}</span>}
          {nomeLoja && <span>{nomeLoja}</span>}
        </div>

        <h3>
          <Link href={`/ofertas/${produto.slug}`}>{produto.titulo}</Link>
        </h3>
        {produto.resumo && <p>{produto.resumo}</p>}

        <div className="rodapeCartao">
          <strong>{produto.preco_promocional || produto.preco || 'Ver detalhes'}</strong>
          {produto.nota && <span>{produto.nota.toFixed(1)} / 5</span>}
        </div>

        <a
          className="botaoPrimario"
          href={destino}
          rel={destinoExterno ? 'nofollow sponsored noopener noreferrer' : undefined}
          target={destinoExterno ? '_blank' : undefined}
        >
          Ver oferta
        </a>
      </div>
    </article>
  )
}
