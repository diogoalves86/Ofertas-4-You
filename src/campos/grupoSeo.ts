import type { Field } from 'payload'

export const grupoSeo: Field = {
  name: 'seo',
  type: 'group',
  label: 'SEO',
  admin: {
    position: 'sidebar',
  },
  fields: [
    {
      name: 'titulo',
      type: 'text',
      label: 'Título SEO',
      maxLength: 70,
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descrição SEO',
      maxLength: 160,
    },
    {
      name: 'imagem',
      type: 'relationship',
      label: 'Imagem social',
      relationTo: 'midias',
    },
  ],
}
