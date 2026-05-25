import type { CollectionConfig } from 'payload'

import { campoSlug } from '@/campos/campoSlug'
import { grupoSeo } from '@/campos/grupoSeo'

export const Produtos: CollectionConfig = {
  slug: 'produtos',
  labels: {
    singular: 'Produto',
    plural: 'Produtos',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Catálogo',
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'categoria', 'loja', 'destaque', '_status'],
  },
  versions: {
    drafts: {
      autosave: true,
    },
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
      required: true,
      maxLength: 220,
    },
    {
      name: 'descricao',
      type: 'richText',
      label: 'Descrição completa',
    },
    {
      name: 'categoria',
      type: 'relationship',
      label: 'Categoria',
      relationTo: 'categorias',
      required: true,
    },
    {
      name: 'loja',
      type: 'relationship',
      label: 'Loja parceira',
      relationTo: 'lojas',
      required: true,
    },
    {
      name: 'link_afiliado',
      type: 'text',
      label: 'Link de afiliado',
      required: true,
    },
    {
      name: 'preco',
      type: 'text',
      label: 'Preco',
    },
    {
      name: 'preco_promocional',
      type: 'text',
      label: 'Preco promocional',
    },
    {
      name: 'tipo_produto',
      type: 'select',
      label: 'Tipo de produto',
      required: true,
      defaultValue: 'fisico',
      options: [
        { label: 'Fisico', value: 'fisico' },
        { label: 'Digital', value: 'digital' },
        { label: 'Servico', value: 'servico' },
      ],
    },
    {
      name: 'imagem',
      type: 'relationship',
      label: 'Imagem principal',
      relationTo: 'midias',
    },
    {
      name: 'imagens',
      type: 'relationship',
      label: 'Galeria',
      relationTo: 'midias',
      hasMany: true,
    },
    {
      name: 'selo',
      type: 'text',
      label: 'Selo curto',
      admin: {
        description: 'Exemplo: Mais vendido, Oferta relampago, Melhor custo-beneficio.',
      },
    },
    {
      name: 'nota',
      type: 'number',
      label: 'Nota editorial',
      min: 0,
      max: 5,
    },
    {
      name: 'vantagens',
      type: 'array',
      label: 'Vantagens',
      fields: [
        {
          name: 'texto',
          type: 'text',
          label: 'Texto',
          required: true,
        },
      ],
    },
    {
      name: 'desvantagens',
      type: 'array',
      label: 'Pontos de atencao',
      fields: [
        {
          name: 'texto',
          type: 'text',
          label: 'Texto',
          required: true,
        },
      ],
    },
    {
      name: 'destaque',
      type: 'checkbox',
      label: 'Destaque na home',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'aviso_afiliado',
      type: 'checkbox',
      label: 'Exibir aviso de afiliado',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    grupoSeo,
  ],
}
