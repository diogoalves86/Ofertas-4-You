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
      label: 'Titulo SEO',
      maxLength: 70,
    },
    {
      name: 'descricao',
      type: 'textarea',
      label: 'Descricao SEO',
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
