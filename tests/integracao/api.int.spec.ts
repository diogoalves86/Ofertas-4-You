import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('API', () => {
  beforeAll(async () => {
    const configuracaoPayload = await config
    payload = await getPayload({ config: configuracaoPayload })
  })

  it('busca usuarios', async () => {
    const usuarios = await payload.find({
      collection: 'usuarios',
    })
    expect(usuarios).toBeDefined()
  })
})
