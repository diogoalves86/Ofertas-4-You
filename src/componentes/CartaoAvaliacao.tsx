import Link from 'next/link'

import { obterNomeRelacao, type AvaliacaoResumo } from '@/dados/conteudoPublico'

type Propriedades = {
  avaliacao: AvaliacaoResumo
}

export function CartaoAvaliacao({ avaliacao }: Propriedades) {
  const nomeCategoria = obterNomeRelacao(avaliacao.categoria)

  return (
    <article className="cartaoAvaliacao">
      <div className="linhaEtiquetas">
        {nomeCategoria && <span>{nomeCategoria}</span>}
        {avaliacao.tempo_leitura && <span>{avaliacao.tempo_leitura} min</span>}
      </div>

      <h3>
        <Link href={`/avaliacoes/${avaliacao.slug}`}>{avaliacao.titulo}</Link>
      </h3>
      {avaliacao.resumo && <p>{avaliacao.resumo}</p>}
      <Link className="linkLeitura" href={`/avaliacoes/${avaliacao.slug}`}>
        Ler review
      </Link>
    </article>
  )
}
