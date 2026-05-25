import type { GlobalConfig } from 'payload'

export const ConfiguracoesSite: GlobalConfig = {
  slug: 'configuracoes-site',
  label: 'Configuracoes do site',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'nome_site',
      type: 'text',
      label: 'Nome do site',
      defaultValue: 'Ofertas 4You',
      required: true,
    },
    {
      name: 'url_site',
      type: 'text',
      label: 'URL do site',
      defaultValue: 'https://ofertas4you.com.br',
    },
    {
      name: 'descricao_padrao',
      type: 'textarea',
      label: 'Descricao padrao',
      defaultValue:
        'Ofertas, reviews e guias de compra com curadoria para encontrar boas oportunidades em lojas parceiras.',
    },
    {
      name: 'aviso_afiliado_padrao',
      type: 'textarea',
      label: 'Aviso de afiliado',
      defaultValue:
        'O Ofertas 4You pode receber comissao quando voce compra por links indicados. Isso nao altera o preco final para voce.',
    },
    {
      name: 'redes_sociais',
      type: 'group',
      label: 'Redes sociais',
      fields: [
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok',
        },
      ],
    },
  ],
}
