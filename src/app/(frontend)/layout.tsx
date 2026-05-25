import type { Metadata } from 'next'
import React from 'react'

import { Cabecalho } from '@/componentes/Cabecalho'
import { ConsentimentoCookies } from '@/componentes/ConsentimentoCookies'
import { ProvedorAnimacoes } from '@/componentes/ProvedorAnimacoes'
import { Rodape } from '@/componentes/Rodape'
import {
  caminhoImagemCompartilhamento,
  criarUrlAbsoluta,
  descricaoPadrao,
  nomeSite,
  urlSite,
} from '@/utilitarios/seo'

import './styles.css'

export const metadata: Metadata = {
  title: {
    default: nomeSite,
    template: `%s | ${nomeSite}`,
  },
  applicationName: nomeSite,
  category: 'shopping',
  description: descricaoPadrao,
  metadataBase: new URL(urlSite),
  alternates: {
    canonical: criarUrlAbsoluta('/'),
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: nomeSite,
    description: descricaoPadrao,
    url: criarUrlAbsoluta('/'),
    siteName: nomeSite,
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: criarUrlAbsoluta(caminhoImagemCompartilhamento),
        width: 1200,
        height: 630,
        alt: 'Curadoria de ofertas, reviews e guias de compra do Ofertas 4You',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: 'summary_large_image',
    title: nomeSite,
    description: descricaoPadrao,
    images: [criarUrlAbsoluta(caminhoImagemCompartilhamento)],
  },
  other: {
    'msapplication-TileColor': '#08775d',
    'theme-color': '#08775d',
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
