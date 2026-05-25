import type { CollectionConfig } from 'payload'

export const Midias: CollectionConfig = {
  slug: 'midias',
  labels: {
    singular: 'Midia',
    plural: 'Midias',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Editorial',
    useAsTitle: 'alt',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      label: 'Texto alternativo',
      required: true,
    },
  ],
  upload: {
    staticDir: 'media',
  },
}
