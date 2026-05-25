import type { Page } from '@playwright/test'
import { expect } from '@playwright/test'

export interface OpcoesEntradaAdmin {
  pagina: Page
  urlServidor?: string
  usuario: {
    email: string
    password: string
  }
}

export async function entrarAdmin({
  pagina,
  urlServidor = 'http://localhost:3002',
  usuario,
}: OpcoesEntradaAdmin): Promise<void> {
  await pagina.goto(`${urlServidor}/admin/login`)

  await pagina.fill('#field-email', usuario.email)
  await pagina.fill('#field-password', usuario.password)
  await pagina.click('button[type="submit"]')

  await pagina.waitForURL(`${urlServidor}/admin`)

  const artefatoPainel = pagina.locator('span[title="Dashboard"]')
  await expect(artefatoPainel).toBeVisible()
}
