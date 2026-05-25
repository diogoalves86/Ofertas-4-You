import type { Field } from 'payload'

import { preencherSlug } from './preencherSlug'

export const campoSlug = (campoOrigem: string): Field => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  index: true,
  label: 'Slug',
  hooks: {
    beforeValidate: [preencherSlug(campoOrigem)],
  },
  admin: {
    description: 'Identificador usado na URL publica.',
    position: 'sidebar',
  },
})
