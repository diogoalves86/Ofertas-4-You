import type { FieldHook } from 'payload'

import { criarSlug } from '@/utilitarios/criarSlug'

export const preencherSlug =
  (campoOrigem: string): FieldHook =>
  ({ siblingData, value }) => {
    if (typeof value === 'string' && value.trim().length > 0) {
      return criarSlug(value)
    }

    const dados = siblingData as Record<string, unknown>
    const valorOrigem = dados[campoOrigem]

    if (typeof valorOrigem === 'string') {
      return criarSlug(valorOrigem)
    }

    return value
  }
