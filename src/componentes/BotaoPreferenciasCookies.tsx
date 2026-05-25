'use client'

import { emitirAberturaPreferenciasCookies } from '@/utilitarios/consentimentoCookies'

export function BotaoPreferenciasCookies() {
  return (
    <button className="botaoLinkRodape" onClick={emitirAberturaPreferenciasCookies} type="button">
      Preferencias de cookies
    </button>
  )
}
