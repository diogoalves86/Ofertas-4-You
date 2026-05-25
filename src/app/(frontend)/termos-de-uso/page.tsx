import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'

export const metadata: Metadata = {
  title: 'Termos de uso',
  description:
    'Termos de uso do Ofertas 4You para acesso a ofertas, reviews, guias e links afiliados.',
}

export default function PaginaTermosUso() {
  return (
    <PaginaSimples
      titulo="Termos de uso"
      descricao="Regras para navegar no Ofertas 4You, acessar conteudos, clicar em links afiliados e usar informacoes publicadas no site."
    >
      <p>
        Ultima atualizacao: 25 de maio de 2026. Ao acessar o Ofertas 4You, voce concorda com estes
        termos. Se nao concordar, recomendamos interromper o uso do site.
      </p>

      <h2>1. Sobre o Ofertas 4You</h2>
      <p>
        O Ofertas 4You publica ofertas, reviews, comparativos, guias editoriais e links para
        produtos, servicos, marketplaces, lojas, infoprodutos e plataformas parceiras.
      </p>
      <p>
        Nao vendemos diretamente os produtos anunciados, nao processamos pagamentos e nao somos
        responsaveis pelo estoque, entrega, garantia, suporte, reembolso ou atendimento das lojas e
        plataformas externas.
      </p>

      <h2>2. Conteudo editorial e informativo</h2>
      <p>
        Os conteudos publicados tem finalidade informativa e comercial. Fazemos esforcos para manter
        dados, precos, disponibilidade, condicoes, cupons e descricoes atualizados, mas essas
        informacoes podem mudar sem aviso nos sites parceiros.
      </p>
      <p>
        Antes de comprar, verifique sempre as condicoes finais diretamente no site da loja,
        marketplace ou plataforma responsavel.
      </p>

      <h2>3. Links afiliados e comissoes</h2>
      <p>
        Alguns links do Ofertas 4You sao links afiliados. Isso significa que podemos receber
        comissao quando voce clica em um link e conclui uma compra ou acao qualificada no site
        parceiro.
      </p>
      <p>
        Essa comissao nao deve alterar o preco final para voce. A relacao de compra ocorre entre
        voce e o parceiro externo.
      </p>

      <h2>4. Uso permitido do site</h2>
      <p>
        Voce deve usar o site de forma licita, respeitosa e compativel com sua finalidade. E
        proibido tentar invadir, explorar falhas, copiar conteudo em massa, interferir no
        funcionamento, fraudar metricas, usar robos abusivos ou praticar qualquer ato que prejudique
        o Ofertas 4You, parceiros ou outros visitantes.
      </p>

      <h2>5. Propriedade intelectual</h2>
      <p>
        Textos, organizacao editorial, identidade visual, layouts, componentes, imagens proprias,
        marcas e demais materiais do Ofertas 4You sao protegidos por direitos de propriedade
        intelectual. O uso pessoal e nao comercial do conteudo e permitido, desde que mantida a
        fonte e sem alteracao indevida.
      </p>
      <p>
        Marcas, nomes, imagens e materiais de terceiros pertencem aos respectivos titulares e podem
        aparecer apenas para identificacao de produtos, lojas ou ofertas.
      </p>

      <h2>6. Publicidade, medicao e cookies</h2>
      <p>
        O site pode usar cookies, pixels, tags e ferramentas de medicao para analytics, seguranca,
        afiliacao, campanhas, remarketing e medicao de conversao. O tratamento desses dados e
        explicado na politica de privacidade.
      </p>

      <h2>7. Isencao de garantias</h2>
      <p>
        O Ofertas 4You e fornecido no estado em que se encontra. Nao garantimos disponibilidade
        continua, ausencia de erros, manutencao de precos, validade de cupons, estoque ou resultado
        especifico com base nas informacoes publicadas.
      </p>

      <h2>8. Limitacao de responsabilidade</h2>
      <p>
        Na maxima extensao permitida pela lei, o Ofertas 4You nao sera responsavel por danos
        decorrentes de compras realizadas em sites de terceiros, falhas de parceiros, mudancas de
        oferta, indisponibilidade externa, decisao de compra do visitante ou uso indevido do site.
      </p>

      <h2>9. Alteracoes dos termos</h2>
      <p>
        Podemos atualizar estes termos a qualquer momento para refletir mudancas no site, nas
        parcerias, nas ferramentas usadas ou em exigencias legais. A versao publicada nesta pagina
        sera a referencia vigente.
      </p>
    </PaginaSimples>
  )
}
