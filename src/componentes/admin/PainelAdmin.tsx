import Image from 'next/image'
import type { Document, Payload, ServerProps, Where } from 'payload'

const rotasPrincipais = [
  {
    href: '/collections/avaliacoes/create',
    rotulo: 'Nova avaliação',
    texto: 'Avaliação editorial com SEO e produtos relacionados.',
    acao: 'Criar',
  },
  {
    href: '/collections/lojas/create',
    rotulo: 'Nova loja',
    texto: 'Cadastre a origem da oferta antes de relacionar produtos.',
    acao: 'Criar',
  },
  {
    href: '/collections/categorias/create',
    rotulo: 'Nova categoria',
    texto: 'Organize ofertas e avaliações para navegação e SEO.',
    acao: 'Criar',
  },
  {
    href: '/collections/midias',
    rotulo: 'Biblioteca de mídias',
    texto: 'Imagens para ofertas, lojas, categorias e páginas.',
    acao: 'Abrir',
  },
]

type MetricaPainel = {
  colecao: 'produtos' | 'avaliacoes' | 'lojas' | 'categorias'
  descricao: string
  href: string
  rotulo: string
  where?: Where
}

const metricas: MetricaPainel[] = [
  {
    colecao: 'produtos',
    descricao: 'publicados',
    href: '/collections/produtos',
    rotulo: 'Produtos',
    where: {
      _status: {
        equals: 'published',
      },
    },
  },
  {
    colecao: 'avaliacoes',
    descricao: 'publicadas',
    href: '/collections/avaliacoes',
    rotulo: 'Avaliações',
    where: {
      _status: {
        equals: 'published',
      },
    },
  },
  {
    colecao: 'lojas',
    descricao: 'cadastradas',
    href: '/collections/lojas',
    rotulo: 'Lojas',
  },
  {
    colecao: 'categorias',
    descricao: 'cadastradas',
    href: '/collections/categorias',
    rotulo: 'Categorias',
  },
]

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

const descreverRotuloParaAcao = (rotulo: string) => rotulo.toLocaleLowerCase('pt-BR')

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
    metricas.map(async ({ colecao, where }) => {
      try {
        const resultado = await payload.count({
          collection: colecao,
          overrideAccess: false,
          user: usuario,
          ...(where ? { where } : {}),
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
              aria-label={`${metrica.rotulo}: ${descreverContagem(contagem)} ${metrica.descricao}. Abrir lista de ${descreverRotuloParaAcao(metrica.rotulo)}.`}
              key={metrica.colecao}
            >
              <span>{metrica.rotulo}</span>
              <strong>{formatarContagem(contagem)}</strong>
              <em>{metrica.descricao}</em>
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
            <em>{rota.acao}</em>
          </a>
        ))}
      </div>
    </section>
  )
}
