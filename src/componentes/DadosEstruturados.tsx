import { criarJsonLdSeguro } from '@/utilitarios/seo'

type Propriedades = {
  dados: unknown
  id: string
}

export function DadosEstruturados({ dados, id }: Propriedades) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: criarJsonLdSeguro(dados) }}
      id={id}
      type="application/ld+json"
    />
  )
}
