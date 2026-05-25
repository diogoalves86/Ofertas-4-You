import { expect, test, type Page } from '@playwright/test'

import { entrarAdmin } from '../auxiliares/entrarAdmin'
import { limparUsuarioTeste, semearUsuarioTeste, usuarioTeste } from '../auxiliares/semearUsuario'

const urlPublica = 'http://localhost:3002'

test.describe('Painel administrativo', () => {
  let pagina: Page

  test.beforeAll(async ({ browser }) => {
    await semearUsuarioTeste()

    const contexto = await browser.newContext()
    pagina = await contexto.newPage()

    await entrarAdmin({ pagina, usuario: usuarioTeste })
  })

  test.afterAll(async () => {
    await limparUsuarioTeste()
  })

  test('navega para o painel', async () => {
    await pagina.goto(`${urlPublica}/admin`)
    await expect(pagina).toHaveURL(`${urlPublica}/admin`)
    const artefatoPainel = pagina.locator('span[title="Dashboard"]').first()
    await expect(artefatoPainel).toBeVisible()
  })

  test('navega para lista de usuarios', async () => {
    await pagina.goto(`${urlPublica}/admin/collections/usuarios`)
    await expect(pagina).toHaveURL(`${urlPublica}/admin/collections/usuarios`)
    const artefatoLista = pagina.locator('h1', { hasText: 'Usuarios' }).first()
    await expect(artefatoLista).toBeVisible()
  })

  test('navega para criacao de usuario', async () => {
    await pagina.goto(`${urlPublica}/admin/collections/usuarios/create`)
    await expect(pagina).toHaveURL(/\/admin\/collections\/usuarios\/[a-zA-Z0-9-_]+/)
    const campoEmail = pagina.locator('input[name="email"]')
    await expect(campoEmail).toBeVisible()
  })
})
