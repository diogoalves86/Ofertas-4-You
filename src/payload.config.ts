import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Avaliacoes } from './colecoes/Avaliacoes'
import { Categorias } from './colecoes/Categorias'
import { Lojas } from './colecoes/Lojas'
import { Midias } from './colecoes/Midias'
import { Paginas } from './colecoes/Paginas'
import { Produtos } from './colecoes/Produtos'
import { Usuarios } from './colecoes/Usuarios'
import { ConfiguracoesSite } from './globais/ConfiguracoesSite'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Usuarios, Midias, Categorias, Lojas, Produtos, Avaliacoes, Paginas],
  globals: [ConfiguracoesSite],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
})
