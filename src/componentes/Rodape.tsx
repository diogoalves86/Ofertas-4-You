import Link from 'next/link'

import { BotaoPreferenciasCookies } from '@/componentes/BotaoPreferenciasCookies'

export function Rodape() {
  return (
    <footer className="rodape">
      <div>
        <strong>Ofertas 4You</strong>
        <p>Guias de compra, reviews e ofertas com links para lojas parceiras.</p>
      </div>
      <nav aria-label="Links institucionais">
        <Link href="/ofertas">Ofertas</Link>
        <Link href="/avaliacoes">Guias</Link>
        <Link href="/sobre">Sobre</Link>
        <Link href="/aviso-de-afiliado">Aviso de afiliado</Link>
        <Link href="/politica-de-privacidade">Privacidade</Link>
        <Link href="/termos-de-uso">Termos</Link>
        <Link href="/exclusao-de-dados">Exclusão de dados</Link>
        <BotaoPreferenciasCookies />
      </nav>
    </footer>
  )
}
