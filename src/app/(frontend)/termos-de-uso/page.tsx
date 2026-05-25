import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'
import { criarMetadataPagina } from '@/utilitarios/seo'

export const metadata: Metadata = criarMetadataPagina({
  caminho: '/termos-de-uso',
  titulo: 'Termos de uso',
  descricao:
    'Termos de uso do Ofertas 4You para acesso a ofertas, reviews, guias e links afiliados.',
})

export default function PaginaTermosUso() {
  return (
    <PaginaSimples
      titulo="Termos de uso"
      descricao="Regras para navegar no Ofertas 4You, acessar conteúdos, clicar em links afiliados e usar informações publicadas no site."
    >
      <p>
        Última atualização: 25 de maio de 2026. Ao acessar o Ofertas 4You, você concorda com estes
        termos. Se não concordar, recomendamos interromper o uso do site.
      </p>

      <h2>1. Sobre o Ofertas 4You</h2>
      <p>
        O Ofertas 4You publica ofertas, reviews, comparativos, guias editoriais e links para
        produtos, serviços, marketplaces, lojas, infoprodutos e plataformas parceiras.
      </p>
      <p>
        Não vendemos diretamente os produtos anunciados, não processamos pagamentos e não somos
        responsáveis pelo estoque, entrega, garantia, suporte, reembolso ou atendimento das lojas e
        plataformas externas.
      </p>

      <h2>2. Conteúdo editorial e informativo</h2>
      <p>
        Os conteúdos publicados têm finalidade informativa e comercial. Fazemos esforços para manter
        dados, preços, disponibilidade, condições, cupons e descrições atualizados, mas essas
        informações podem mudar sem aviso nos sites parceiros.
      </p>
      <p>
        Antes de comprar, verifique sempre as condições finais diretamente no site da loja,
        marketplace ou plataforma responsável.
      </p>

      <h2>3. Links afiliados e comissões</h2>
      <p>
        Alguns links do Ofertas 4You são links afiliados. Isso significa que podemos receber
        comissão quando você clica em um link e conclui uma compra ou ação qualificada no site
        parceiro.
      </p>
      <p>
        Essa comissão não deve alterar o preço final para você. A relação de compra ocorre entre
        você e o parceiro externo.
      </p>

      <h2>4. Uso permitido do site</h2>
      <p>
        Você deve usar o site de forma lícita, respeitosa e compatível com sua finalidade. É
        proibido tentar invadir, explorar falhas, copiar conteúdo em massa, interferir no
        funcionamento, fraudar métricas, usar robôs abusivos ou praticar qualquer ato que prejudique
        o Ofertas 4You, parceiros ou outros visitantes.
      </p>

      <h2>5. Propriedade intelectual</h2>
      <p>
        Textos, organização editorial, identidade visual, layouts, componentes, imagens próprias,
        marcas e demais materiais do Ofertas 4You são protegidos por direitos de propriedade
        intelectual. O uso pessoal e não comercial do conteúdo é permitido, desde que mantida a
        fonte e sem alteração indevida.
      </p>
      <p>
        Marcas, nomes, imagens e materiais de terceiros pertencem aos respectivos titulares e podem
        aparecer apenas para identificação de produtos, lojas ou ofertas.
      </p>

      <h2>6. Publicidade, medição e cookies</h2>
      <p>
        O site pode usar cookies, pixels, tags e ferramentas de medição para analytics, segurança,
        afiliação, campanhas, remarketing e medição de conversão. O tratamento desses dados é
        explicado na política de privacidade.
      </p>

      <h2>7. Isenção de garantias</h2>
      <p>
        O Ofertas 4You é fornecido no estado em que se encontra. Não garantimos disponibilidade
        contínua, ausência de erros, manutenção de preços, validade de cupons, estoque ou resultado
        específico com base nas informações publicadas.
      </p>

      <h2>8. Limitação de responsabilidade</h2>
      <p>
        Na máxima extensão permitida pela lei, o Ofertas 4You não será responsável por danos
        decorrentes de compras realizadas em sites de terceiros, falhas de parceiros, mudanças de
        oferta, indisponibilidade externa, decisão de compra do visitante ou uso indevido do site.
      </p>

      <h2>9. Alterações dos termos</h2>
      <p>
        Podemos atualizar estes termos a qualquer momento para refletir mudanças no site, nas
        parcerias, nas ferramentas usadas ou em exigências legais. A versão publicada nesta página
        será a referência vigente.
      </p>
    </PaginaSimples>
  )
}
