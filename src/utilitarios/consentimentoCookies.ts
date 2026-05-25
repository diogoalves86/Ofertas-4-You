export type DecisaoConsentimento = 'aceito' | 'recusado'

export type RegistroConsentimento = {
  data: string
  decisao: DecisaoConsentimento
  versao: 1
}

export const chaveConsentimentoCookies = 'ofertas4you:consentimento-cookies:v1'
export const eventoAbrirPreferenciasCookies = 'ofertas4you:abrirPreferenciasCookies'
export const eventoConsentimentoCookies = 'ofertas4you:consentimentoCookies'
export const semDecisaoCookies = 'sem'

declare global {
  interface Window {
    ofertas4YouConsentimentoCookies?: RegistroConsentimento
  }
}

export function ehRegistroConsentimento(valor: unknown): valor is RegistroConsentimento {
  if (!valor || typeof valor !== 'object') {
    return false
  }

  const registro = valor as Partial<RegistroConsentimento>

  return (
    registro.versao === 1 &&
    typeof registro.data === 'string' &&
    (registro.decisao === 'aceito' || registro.decisao === 'recusado')
  )
}

export function emitirAberturaPreferenciasCookies() {
  window.dispatchEvent(new Event(eventoAbrirPreferenciasCookies))
}
