import type React from 'react'

type Propriedades = {
  titulo: string
  descricao: string
  children?: React.ReactNode
}

export function PaginaSimples({ children, descricao, titulo }: Propriedades) {
  return (
    <section className="paginaSimples">
      <div className="cabecaPagina">
        <p className="chapeu">Ofertas 4You</p>
        <h1>{titulo}</h1>
        <p>{descricao}</p>
      </div>
      <div className="conteudoTexto">{children}</div>
    </section>
  )
}
