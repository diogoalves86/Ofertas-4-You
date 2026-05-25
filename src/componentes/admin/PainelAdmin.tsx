import Image from 'next/image'
import type { ServerProps } from 'payload'

const rotasPrincipais = [
  {
    href: '/collections/produtos/create',
    rotulo: 'Nova oferta',
    texto: 'Produto, preço, loja e link de afiliado.',
  },
  {
    href: '/collections/avaliacoes/create',
    rotulo: 'Nova avaliação',
    texto: 'Review editorial com SEO e produtos relacionados.',
  },
  {
    href: '/collections/midias',
    rotulo: 'Biblioteca de mídias',
    texto: 'Imagens para ofertas, lojas, categorias e páginas.',
  },
  {
    href: '/globals/configuracoes-site',
    rotulo: 'Configurações',
    texto: 'Nome, descrição, aviso de afiliado e redes sociais.',
  },
]

const metricas = [
  {
    colecao: 'produtos',
    href: '/collections/produtos',
    rotulo: 'Produtos',
  },
  {
    colecao: 'avaliacoes',
    href: '/collections/avaliacoes',
    rotulo: 'Avaliações',
  },
  {
    colecao: 'lojas',
    href: '/collections/lojas',
    rotulo: 'Lojas',
  },
  {
    colecao: 'categorias',
    href: '/collections/categorias',
    rotulo: 'Categorias',
  },
] as const

const montarHref = (adminRoute: string, href: string) => `${adminRoute}${href}`

const obterPrimeiroNome = (user: ServerProps['user']) => {
  if (user && typeof user === 'object' && 'nome' in user && typeof user.nome === 'string') {
    return user.nome.split(' ')[0]
  }

  if (user && typeof user === 'object' && 'email' in user && typeof user.email === 'string') {
    return user.email.split('@')[0]
  }

  return 'Diogo'
}

export const LogoAdmin = () => (
  <div
    className="of4u-admin-logo of4u-admin-logo--full flex items-center gap-3"
    aria-label="Ofertas 4You"
  >
    <Image src="/favicon.svg" alt="" width={40} height={40} priority />
    <span>
      <strong>Ofertas 4You</strong>
      <small>Painel de curadoria</small>
    </span>
  </div>
)

export const IconeAdmin = () => (
  <span
    className="of4u-admin-logo of4u-admin-logo--icon inline-flex items-center justify-center"
    aria-hidden="true"
  >
    <Image src="/favicon.svg" alt="" width={24} height={24} priority />
  </span>
)

export const MarcaNavegacaoAdmin = () => (
  <div className="of4u-admin-nav-brand">
    <LogoAdmin />
  </div>
)

export const RodapeNavegacaoAdmin = () => (
  <div className="of4u-admin-nav-footer">
    <span>Ofertas 4You</span>
    <strong>Curadoria afiliada</strong>
  </div>
)

export const AcaoVerSiteAdmin = () => (
  <a className="of4u-admin-top-link" href="/" target="_blank" rel="noreferrer">
    Ver site
  </a>
)

export const DashboardAdmin = async ({ payload, user }: ServerProps) => {
  const adminRoute = payload.config.routes.admin || '/admin'
  const primeiroNome = obterPrimeiroNome(user)

  const contagens = await Promise.all(
    metricas.map(async ({ colecao }) => {
      try {
        const resultado = await payload.count({ collection: colecao })
        return resultado.totalDocs
      } catch {
        return null
      }
    }),
  )

  return (
    <section className="of4u-admin-dashboard grid gap-4 md:gap-5" aria-label="Resumo do painel">
      <div className="of4u-admin-hero grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <span className="of4u-admin-eyebrow">Painel administrativo</span>
          <h1>Olá, {primeiroNome}</h1>
          <p>Curadoria, conteúdo e parceiros do Ofertas 4You em um fluxo mais direto.</p>
        </div>
        <a
          className="of4u-admin-hero-link"
          href={montarHref(adminRoute, '/collections/produtos/create')}
        >
          Criar oferta
        </a>
      </div>

      <div
        className="of4u-admin-stats grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Indicadores principais"
      >
        {metricas.map((metrica, indice) => (
          <a
            className="of4u-admin-stat"
            href={montarHref(adminRoute, metrica.href)}
            key={metrica.colecao}
          >
            <span>{metrica.rotulo}</span>
            <strong>{contagens[indice] ?? '-'}</strong>
          </a>
        ))}
      </div>

      <div
        className="of4u-admin-shortcuts grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4"
        aria-label="Atalhos principais"
      >
        {rotasPrincipais.map((rota) => (
          <a
            className="of4u-admin-shortcut"
            href={montarHref(adminRoute, rota.href)}
            key={rota.href}
          >
            <strong>{rota.rotulo}</strong>
            <span>{rota.texto}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
