import type { CollectionConfig } from 'payload'

import { campoSlug } from '@/campos/campoSlug'
import { grupoSeo } from '@/campos/grupoSeo'

export const Avaliacoes: CollectionConfig = {
  slug: 'avaliacoes',
  labels: {
    singular: 'Avaliacao',
    plural: 'Avaliacoes',
  },
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'titulo',
    defaultColumns: ['titulo', 'categoria', 'destaque', 'publicado_em', '_status'],
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
      label: 'Titulo',
      required: true,
    },
    campoSlug('titulo'),
    {
      name: 'resumo',
      type: 'textarea',
      label: 'Resumo',
      required: true,
      maxLength: 240,
    },
    {
      name: 'conteudo',
      type: 'richText',
      label: 'Conteudo',
      required: true,
    },
    {
      name: 'categoria',
      type: 'relationship',
      label: 'Categoria',
      relationTo: 'categorias',
      required: true,
    },
    {
      name: 'produtos_relacionados',
      type: 'relationship',
      label: 'Produtos relacionados',
      relationTo: 'produtos',
      hasMany: true,
    },
    {
      name: 'imagem',
      type: 'relationship',
      label: 'Imagem principal',
      relationTo: 'midias',
    },
    {
      name: 'autor',
      type: 'text',
      label: 'Autor',
      defaultValue: 'Equipe Ofertas 4You',
    },
    {
      name: 'tempo_leitura',
      type: 'number',
      label: 'Tempo de leitura em minutos',
      min: 1,
    },
    {
      name: 'perguntas_frequentes',
      type: 'array',
      label: 'Perguntas frequentes',
      fields: [
        {
          name: 'pergunta',
          type: 'text',
          label: 'Pergunta',
          required: true,
        },
        {
          name: 'resposta',
          type: 'textarea',
          label: 'Resposta',
          required: true,
        },
      ],
    },
    {
      name: 'publicado_em',
      type: 'date',
      label: 'Publicado em',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
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
    grupoSeo,
  ],
}
