import Link from 'next/link'

const linksNavegacao = [
  { href: '/ofertas', rotulo: 'Ofertas' },
  { href: '/avaliacoes', rotulo: 'Reviews' },
  { href: '/categorias/tecnologia', rotulo: 'Categorias' },
  { href: '/aviso-de-afiliado', rotulo: 'Afiliado' },
]

export function Cabecalho() {
  return (
    <header className="cabecalho">
      <Link className="marca" href="/">
        <span className="marcaSimbolo">4Y</span>
        <span>
          <strong>Ofertas 4You</strong>
          <small>curadoria afiliada</small>
        </span>
      </Link>

      <nav className="navegacao" aria-label="Navegacao principal">
        {linksNavegacao.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.rotulo}
          </Link>
        ))}
      </nav>
    </header>
  )
}
