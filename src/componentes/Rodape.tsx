import Link from 'next/link'

export function Rodape() {
  return (
    <footer className="rodape">
      <div>
        <strong>Ofertas 4You</strong>
        <p>Reviews, comparativos e ofertas com links para lojas parceiras.</p>
      </div>
      <nav aria-label="Links institucionais">
        <Link href="/sobre">Sobre</Link>
        <Link href="/aviso-de-afiliado">Aviso de afiliado</Link>
        <Link href="/politica-de-privacidade">Privacidade</Link>
      </nav>
    </footer>
  )
}
