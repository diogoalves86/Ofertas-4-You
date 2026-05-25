import type { CollectionConfig } from 'payload'

import { campoSlug } from '@/campos/campoSlug'
import { grupoSeo } from '@/campos/grupoSeo'

export const Categorias: CollectionConfig = {
  slug: 'categorias',
  labels: {
    singular: 'Categoria',
    plural: 'Categorias',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Catálogo',
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'tipo', 'slug'],
  },
  fields: [
    {
      name: 'nome',
      type: 'text',
      label: 'Nome',
      required: true,
    },
    campoSlug('nome'),
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descricao',
    },
    {
      name: 'tipo',
      type: 'select',
      label: 'Tipo',
      required: true,
      defaultValue: 'ambos',
      options: [
        { label: 'Produtos', value: 'produtos' },
        { label: 'Avaliacoes', value: 'avaliacoes' },
        { label: 'Produtos e avaliacoes', value: 'ambos' },
      ],
    },
    {
      name: 'imagem',
      type: 'relationship',
      label: 'Imagem',
      relationTo: 'midias',
    },
    grupoSeo,
  ],
}
