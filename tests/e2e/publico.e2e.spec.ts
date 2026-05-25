import { expect, test } from '@playwright/test'

const urlPublica = 'http://localhost:3002'

test.describe('Site publico', () => {
  test('abre a pagina inicial', async ({ page }) => {
    await page.goto(urlPublica)

    await expect(page).toHaveTitle(/Ofertas 4You/)

    const titulo = page.locator('h1').first()

    await expect(titulo).toContainText('Ofertas, reviews e comparativos')
  })
})
