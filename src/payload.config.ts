import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { pt, ptTranslations } from '@payloadcms/translations/languages/pt'
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

const placeholdersBuild = {
  DATABASE_URL: 'postgres://localhost:5432/payload_build',
  PAYLOAD_SECRET: 'payload-build-placeholder-secret',
} as const

const estaGerandoBuild = () =>
  process.env.NEXT_PHASE === 'phase-production-build' && process.env.npm_lifecycle_event === 'build'

const obterVariavelAmbienteObrigatoria = (nome: 'DATABASE_URL' | 'PAYLOAD_SECRET') => {
  const valor = process.env[nome]

  if (!valor) {
    if (estaGerandoBuild()) {
      return placeholdersBuild[nome]
    }

    throw new Error(`Variável de ambiente obrigatória ausente: ${nome}`)
  }

  return valor
}

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    avatar: 'default',
    dateFormat: 'dd/MM/yyyy HH:mm',
    meta: {
      titleSuffix: '- Ofertas 4You',
    },
    components: {
      actions: ['@/componentes/admin/PainelAdmin#AcaoVerSiteAdmin'],
      beforeDashboard: ['@/componentes/admin/PainelAdmin#DashboardAdmin'],
      beforeNav: ['@/componentes/admin/PainelAdmin#MarcaNavegacaoAdmin'],
      afterNav: ['@/componentes/admin/PainelAdmin#RodapeNavegacaoAdmin'],
      providers: ['@/componentes/admin/ProvedorAcessibilidadeAdmin#ProvedorAcessibilidadeAdmin'],
      graphics: {
        Icon: '@/componentes/admin/PainelAdmin#IconeAdmin',
        Logo: '@/componentes/admin/PainelAdmin#LogoAdmin',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Produtos, Lojas, Categorias, Avaliacoes, Paginas, Midias, Usuarios],
  globals: [ConfiguracoesSite],
  editor: lexicalEditor(),
  i18n: {
    fallbackLanguage: 'pt',
    supportedLanguages: {
      pt,
    },
    translations: {
      pt: {
        ...ptTranslations,
        authentication: {
          ...ptTranslations.authentication,
          backToLogin: 'Voltar para entrar',
          checkYourEmailForPasswordReset:
            'Se o e-mail estiver associado a uma conta, você receberá instruções para redefinir sua senha em breve. Verifique também a caixa de spam.',
          emailNotValid: 'O e-mail informado não é válido',
          emailOrUsername: 'E-mail ou nome de usuário',
          emailSent: 'E-mail enviado',
          emailVerified: 'E-mail verificado com sucesso.',
          forgotPasswordEmailInstructions:
            'Informe seu e-mail abaixo. Você receberá instruções para criar uma nova senha.',
          forgotPasswordQuestion: 'Esqueceu a senha?',
          loggedOutSuccessfully: 'Sessão encerrada com sucesso.',
          login: 'Entrar',
          loginAttempts: 'Tentativas de entrada',
          loginUser: 'Entrar',
          logOut: 'Sair',
          logout: 'Sair',
          logoutSuccessful: 'Sessão encerrada com sucesso.',
          logoutUser: 'Sair',
          verifyYourEmail: 'Verifique seu e-mail',
        },
        general: {
          ...ptTranslations.general,
          backToDashboard: 'Voltar para o painel',
          clear: 'Limpar',
          clearAll: 'Limpar tudo',
          createNew: 'Criar novo',
          createNewLabel: 'Criar {{label}}',
          createdAt: 'Criado em',
          creatingNewLabel: 'Criando {{label}}',
          dashboard: 'Painel',
          email: 'E-mail',
          emailAddress: 'Endereço de e-mail',
          filters: 'Filtros',
          noResultsDescription:
            'Ainda não há itens cadastrados ou os filtros atuais não retornaram resultados.',
          noResultsFound: 'Nenhum resultado',
          perPage: '{{limit}} por página',
          save: 'Salvar',
          saveChanges: 'Salvar alterações',
          searchBy: 'Buscar por {{label}}',
          selectValue: 'Selecione uma opção',
          showAllLabel: 'Ver lista de {{label}}',
          updatedAt: 'Atualizado em',
        },
        fields: {
          ...ptTranslations.fields,
          addNewLabel: 'Adicionar {{label}}',
          editLink: 'Editar link',
          removeRelationship: 'Remover relação',
          showAll: 'Mostrar tudo',
        },
        upload: {
          ...ptTranslations.upload,
          fileName: 'Nome do arquivo',
          fileSize: 'Tamanho do arquivo',
          filesToUpload: 'Arquivos para carregar',
        },
      },
    },
  },
  secret: obterVariavelAmbienteObrigatoria('PAYLOAD_SECRET'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {
      connectionString: obterVariavelAmbienteObrigatoria('DATABASE_URL'),
    },
    prodMigrations: migrations,
  }),
  sharp,
  plugins: [],
})
