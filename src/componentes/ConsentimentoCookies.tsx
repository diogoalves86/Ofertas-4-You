'use client'

import Link from 'next/link'
import { useEffect, useSyncExternalStore } from 'react'

import {
  chaveConsentimentoCookies,
  ehRegistroConsentimento,
  eventoAbrirPreferenciasCookies,
  eventoConsentimentoCookies,
  semDecisaoCookies,
  type DecisaoConsentimento,
  type RegistroConsentimento,
} from '@/utilitarios/consentimentoCookies'

let preferenciasAbertas = false
let registroSessao: RegistroConsentimento | null = null

function obterRegistroConsentimentoSalvo(): RegistroConsentimento | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const registro = window.localStorage.getItem(chaveConsentimentoCookies)

    if (!registro) {
      return registroSessao
    }

    const registroParseado = JSON.parse(registro) as unknown

    if (!ehRegistroConsentimento(registroParseado)) {
      return registroSessao
    }

    return registroParseado
  } catch {
    return registroSessao
  }
}

function obterEstadoConsentimento() {
  const registro = obterRegistroConsentimentoSalvo()
  const decisao = registro?.decisao ?? semDecisaoCookies
  const estaAberto = preferenciasAbertas || !registro

  return `${estaAberto ? 'aberto' : 'fechado'}:${decisao}`
}

function assinarMudancasConsentimento(callback: () => void) {
  function abrirPreferencias() {
    preferenciasAbertas = true
    callback()
  }

  window.addEventListener('storage', callback)
  window.addEventListener(eventoConsentimentoCookies, callback)
  window.addEventListener(eventoAbrirPreferenciasCookies, abrirPreferencias)

  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(eventoConsentimentoCookies, callback)
    window.removeEventListener(eventoAbrirPreferenciasCookies, abrirPreferencias)
  }
}

function salvarConsentimento(decisao: DecisaoConsentimento) {
  const registro: RegistroConsentimento = {
    data: new Date().toISOString(),
    decisao,
    versao: 1,
  }

  registroSessao = registro

  try {
    window.localStorage.setItem(chaveConsentimentoCookies, JSON.stringify(registro))
  } catch {
    // O navegador pode bloquear armazenamento local; ainda comunicamos a escolha da sessao.
  }

  preferenciasAbertas = false
  window.ofertas4YouConsentimentoCookies = registro
  window.dispatchEvent(new CustomEvent(eventoConsentimentoCookies, { detail: registro }))
}

export function ConsentimentoCookies() {
  const estadoConsentimento = useSyncExternalStore(
    assinarMudancasConsentimento,
    obterEstadoConsentimento,
    () => `fechado:${semDecisaoCookies}`,
  )
  const [estado, decisaoAtual] = estadoConsentimento.split(':') as [
    'aberto' | 'fechado',
    DecisaoConsentimento | typeof semDecisaoCookies,
  ]
  const exibir = estado === 'aberto'
  const rotuloDecisao = decisaoAtual === 'aceito' ? 'aceitos' : 'recusados'

  useEffect(() => {
    const registro = obterRegistroConsentimentoSalvo()

    if (registro) {
      window.ofertas4YouConsentimentoCookies = registro
      return
    }

    delete window.ofertas4YouConsentimentoCookies
  }, [estadoConsentimento])

  function decidir(decisao: DecisaoConsentimento) {
    salvarConsentimento(decisao)
  }

  if (!exibir) {
    return null
  }

  return (
    <div className="modalCookies">
      <section
        aria-describedby="descricao-cookies"
        aria-labelledby="titulo-cookies"
        className="modalCookiesCaixa"
        role="dialog"
      >
        <div className="modalCookiesConteudo">
          <p className="chapeu">Privacidade</p>
          <h2 id="titulo-cookies">Cookies e medicao de navegacao</h2>
          <p id="descricao-cookies">
            Usamos cookies e tecnologias semelhantes para manter o site funcionando, medir
            audiencia, entender interacoes com ferramentas como Google Analytics e Microsoft Clarity
            e apoiar campanhas em plataformas como Google Ads e Meta Ads.
          </p>
          {decisaoAtual !== semDecisaoCookies ? (
            <p className="estadoCookies">Escolha atual: cookies opcionais {rotuloDecisao}.</p>
          ) : null}
          <Link href="/politica-de-privacidade">Ver politica de privacidade</Link>
        </div>

        <div className="modalCookiesAcoes">
          <button
            className="botaoCookiesSecundario"
            onClick={() => decidir('recusado')}
            type="button"
          >
            Recusar opcionais
          </button>
          <button className="botaoCookiesPrimario" onClick={() => decidir('aceito')} type="button">
            Aceitar cookies
          </button>
        </div>
      </section>
    </div>
  )
}
