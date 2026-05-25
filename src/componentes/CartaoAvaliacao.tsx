import Link from 'next/link'

import { CartaoAnimado } from '@/componentes/CartaoAnimado'
import { obterNomeRelacao, type AvaliacaoResumo } from '@/dados/conteudoPublico'

type Propriedades = {
  avaliacao: AvaliacaoResumo
}

export function CartaoAvaliacao({ avaliacao }: Propriedades) {
  const nomeCategoria = obterNomeRelacao(avaliacao.categoria)

  return (
    <CartaoAnimado className="cartaoAvaliacao">
      <div className="linhaEtiquetas">
        {nomeCategoria && <span>{nomeCategoria}</span>}
        {avaliacao.tempo_leitura && <span>{avaliacao.tempo_leitura} min de leitura</span>}
      </div>

      <h3>
        <Link href={`/avaliacoes/${avaliacao.slug}`}>{avaliacao.titulo}</Link>
      </h3>
      {avaliacao.resumo && <p>{avaliacao.resumo}</p>}
      <div className="rodapeAvaliacao">
        {avaliacao.autor && <span>{avaliacao.autor}</span>}
        <Link className="linkLeitura" href={`/avaliacoes/${avaliacao.slug}`}>
          Ler guia
        </Link>
      </div>
    </CartaoAnimado>
  )
}
