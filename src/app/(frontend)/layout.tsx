import type { Metadata } from 'next'
import React from 'react'

import { Cabecalho } from '@/componentes/Cabecalho'
import { ConsentimentoCookies } from '@/componentes/ConsentimentoCookies'
import { ProvedorAnimacoes } from '@/componentes/ProvedorAnimacoes'
import { Rodape } from '@/componentes/Rodape'

import './styles.css'

export const metadata: Metadata = {
  title: {
    default: 'Ofertas 4You',
    template: '%s | Ofertas 4You',
  },
  description:
    'Ofertas, reviews e guias de compra com curadoria afiliada para ajudar voce a comprar melhor.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:3002'),
  openGraph: {
    title: 'Ofertas 4You',
    description:
      'Reviews, comparativos e ofertas selecionadas em marketplaces e plataformas digitais.',
    siteName: 'Ofertas 4You',
    type: 'website',
  },
}

export default async function LayoutPublico(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="pt-BR">
      <body>
        <ProvedorAnimacoes>
          <Cabecalho />
          <main>{children}</main>
          <Rodape />
          <ConsentimentoCookies />
        </ProvedorAnimacoes>
      </body>
    </html>
  )
}
