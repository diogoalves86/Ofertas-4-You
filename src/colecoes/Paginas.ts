import type { CollectionConfig } from 'payload'

import { campoSlug } from '@/campos/campoSlug'
import { grupoSeo } from '@/campos/grupoSeo'

export const Paginas: CollectionConfig = {
  slug: 'paginas',
  labels: {
    singular: 'Página',
    plural: 'Páginas',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Editorial',
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'slug', '_status'],
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título',
      required: true,
    },
    campoSlug('titulo'),
    {
      name: 'resumo',
      type: 'textarea',
      label: 'Resumo',
    },
    {
      name: 'conteudo',
      type: 'richText',
      label: 'Conteúdo',
    },
    grupoSeo,
  ],
}
