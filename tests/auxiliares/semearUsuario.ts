import { getPayload } from 'payload'
import config from '../../src/payload.config.js'

export const usuarioTeste = {
  email: 'dev@payloadcms.com',
  password: 'test',
}

export async function semearUsuarioTeste(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'usuarios',
    where: {
      email: {
        equals: usuarioTeste.email,
      },
    },
  })

  await payload.create({
    collection: 'usuarios',
    data: usuarioTeste,
  })
}

export async function limparUsuarioTeste(): Promise<void> {
  const payload = await getPayload({ config })

  await payload.delete({
    collection: 'usuarios',
    where: {
      email: {
        equals: usuarioTeste.email,
      },
    },
  })
}
