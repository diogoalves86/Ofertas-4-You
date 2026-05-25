import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'

export const metadata: Metadata = {
  title: 'Politica de privacidade',
  description: 'Politica de privacidade inicial do Ofertas 4You.',
}

export default function PaginaPrivacidade() {
  return (
    <PaginaSimples
      titulo="Politica de privacidade"
      descricao="Esta pagina sera detalhada conforme as ferramentas de analytics, afiliacao e captura de dados forem definidas."
    >
      <p>
        A politica final deve refletir os cookies, pixels, ferramentas de medicao e programas de
        afiliados realmente usados no site.
      </p>
    </PaginaSimples>
  )
}
