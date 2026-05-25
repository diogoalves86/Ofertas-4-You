import type { CollectionConfig } from 'payload'

import { campoSlug } from '@/campos/campoSlug'
import { grupoSeo } from '@/campos/grupoSeo'

export const Lojas: CollectionConfig = {
  slug: 'lojas',
  labels: {
    singular: 'Loja',
    plural: 'Lojas',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Catálogo',
    useAsTitle: 'nome',
    defaultColumns: ['nome', 'tipo', 'ativa'],
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
      name: 'tipo',
      type: 'select',
      label: 'Tipo',
      required: true,
      defaultValue: 'marketplace',
      options: [
        { label: 'Marketplace', value: 'marketplace' },
        { label: 'Produto digital', value: 'produto_digital' },
        { label: 'Outro parceiro', value: 'outro' },
      ],
    },
    {
      name: 'url_base',
      type: 'text',
      label: 'URL principal',
    },
    {
      name: 'logo',
      type: 'relationship',
      label: 'Logo',
      relationTo: 'midias',
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descricao',
    },
    {
      name: 'ativa',
      type: 'checkbox',
      label: 'Ativa',
      defaultValue: true,
    },
    grupoSeo,
  ],
}
