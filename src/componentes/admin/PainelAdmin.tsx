import Image from 'next/image'
import type { Document, Payload, ServerProps } from 'payload'

const rotasPrincipais = [
  {
    href: '/collections/produtos/create',
    rotulo: 'Nova oferta',
    texto: 'Produto, preço, loja e link de afiliado.',
  },
  {
    href: '/collections/avaliacoes/create',
    rotulo: 'Nova avaliação',
    texto: 'Avaliação editorial com SEO e produtos relacionados.',
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

const formatadorMetricas = new Intl.NumberFormat('pt-BR')

type ContagensMetricas = Array<number | null>

const consultaMetricasEmAndamento = new Map<string, Promise<ContagensMetricas>>()

const normalizarSegmentoRota = (valor: string) => valor.replace(/^\/+|\/+$/g, '')

const montarHref = (adminRoute: string, href: string) => {
  const rotaAdmin = normalizarSegmentoRota(adminRoute)
  const caminho = normalizarSegmentoRota(href)
  const segmentos = [rotaAdmin, caminho].filter(Boolean)

  return `/${segmentos.join('/')}`
}

const formatarContagem = (valor: number | null) =>
  valor === null ? '-' : formatadorMetricas.format(valor)

const descreverContagem = (valor: number | null) =>
  valor === null ? 'indisponível' : formatadorMetricas.format(valor)

const usuarioEhDocumento = (user: ServerProps['user']): user is Document =>
  Boolean(user && typeof user === 'object')

const obterChaveCacheMetricas = (user: ServerProps['user']) => {
  if (!usuarioEhDocumento(user)) {
    return null
  }

  const usuario = user as Document

  if (!('id' in usuario)) {
    return null
  }

  const id = usuario.id
  const colecao =
    'collection' in usuario && typeof usuario.collection === 'string'
      ? usuario.collection
      : 'usuarios'

  if (typeof id !== 'number' && typeof id !== 'string') {
    return null
  }

  return `${colecao}:${String(id)}`
}

const carregarContagens = async (
  payload: Payload,
  user: ServerProps['user'],
): Promise<ContagensMetricas> => {
  if (!usuarioEhDocumento(user)) {
    return metricas.map(() => null)
  }

  const usuario = user

  return Promise.all(
    metricas.map(async ({ colecao }) => {
      try {
        const resultado = await payload.count({
          collection: colecao,
          overrideAccess: false,
          user: usuario,
        })
        return resultado.totalDocs
      } catch {
        return null
      }
    }),
  )
}

const obterContagensComDedupe = async (payload: Payload, user: ServerProps['user']) => {
  const chaveCache = obterChaveCacheMetricas(user)

  if (!chaveCache) {
    return carregarContagens(payload, user)
  }

  const consultaAtual = consultaMetricasEmAndamento.get(chaveCache)

  if (consultaAtual) {
    return consultaAtual
  }

  const novaConsulta = carregarContagens(payload, user).finally(() => {
    consultaMetricasEmAndamento.delete(chaveCache)
  })

  consultaMetricasEmAndamento.set(chaveCache, novaConsulta)

  return novaConsulta
}

const obterPrimeiroNome = (user: ServerProps['user']) => {
  if (user && typeof user === 'object' && 'nome' in user && typeof user.nome === 'string') {
    return user.nome.trim().split(/\s+/)[0] || null
  }

  return null
}

export const LogoAdmin = () => (
  <div
    className="of4u-admin-logo of4u-admin-logo--full flex items-center gap-3"
    aria-label="Ofertas 4You"
  >
    <Image src="/favicon.svg" alt="" width={40} height={40} />
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
    <Image src="/favicon.svg" alt="" width={24} height={24} />
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
    <a className="of4u-admin-nav-site-link" href="/" target="_blank" rel="noopener noreferrer">
      Ver site
    </a>
  </div>
)

export const AcaoVerSiteAdmin = () => (
  <a className="of4u-admin-top-link" href="/" target="_blank" rel="noopener noreferrer">
    Ver site
  </a>
)

export const DashboardAdmin = async ({ payload, user }: ServerProps) => {
  const adminRoute = payload.config.routes.admin || '/admin'
  const primeiroNome = obterPrimeiroNome(user)
  const saudacao = primeiroNome ? `Olá, ${primeiroNome}` : 'Olá'

  const contagens = await obterContagensComDedupe(payload, user)

  return (
    <section className="of4u-admin-dashboard grid gap-4 md:gap-5" aria-label="Resumo do painel">
      <div className="of4u-admin-hero grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <span className="of4u-admin-eyebrow">Painel administrativo</span>
          <h1>{saudacao}</h1>
          <p>Gerencie ofertas, avaliações, lojas e parceiros em um fluxo mais direto.</p>
        </div>
        <a
          className="of4u-admin-hero-link"
          href={montarHref(adminRoute, '/collections/produtos/create')}
        >
          Nova oferta
        </a>
      </div>

      <div
        className="of4u-admin-stats grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="Indicadores principais"
      >
        {metricas.map((metrica, indice) => {
          const contagem = contagens[indice]

          return (
            <a
              className="of4u-admin-stat"
              href={montarHref(adminRoute, metrica.href)}
              aria-label={`${metrica.rotulo}: ${descreverContagem(contagem)}. Abrir lista.`}
              key={metrica.colecao}
            >
              <span>{metrica.rotulo}</span>
              <strong>{formatarContagem(contagem)}</strong>
            </a>
          )
        })}
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
