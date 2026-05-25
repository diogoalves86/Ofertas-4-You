import type { CollectionConfig } from 'payload'

export const Usuarios: CollectionConfig = {
  slug: 'usuarios',
  labels: {
    singular: 'Usuário',
    plural: 'Usuários',
  },
  admin: {
    group: 'Sistema',
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'nome',
      type: 'text',
      label: 'Nome',
    },
  ],
}
