import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'
import { criarMetadataPagina } from '@/utilitarios/seo'

export const metadata: Metadata = criarMetadataPagina({
  caminho: '/exclusao-de-dados',
  titulo: 'Exclusão de dados',
  descricao: 'Instrução para solicitar exclusão de dados pessoais tratados pelo Ofertas 4You.',
})

export default function PaginaExclusaoDados() {
  return (
    <PaginaSimples
      titulo="Exclusão de dados"
      descricao="Veja como solicitar a exclusão de dados pessoais associados ao seu uso do Ofertas 4You."
    >
      <p>
        Última atualização: 25 de maio de 2026. Esta página serve como canal de orientação para
        pedidos de exclusão de dados pessoais tratados pelo Ofertas 4You.
      </p>

      <h2>1. Quando solicitar</h2>
      <p>
        Você pode solicitar a exclusão de dados pessoais que tenha fornecido ao Ofertas 4You por
        formulários, cadastros, campanhas, comentários, atendimento, newsletters ou outras
        interações futuras do site.
      </p>
      <p>
        Dados de navegação coletados por ferramentas de terceiros, como Google, Meta, Microsoft e
        redes de afiliados, também podem estar sujeitos aos controles e prazos dessas plataformas.
      </p>

      <h2>2. Como fazer o pedido</h2>
      <p>
        Envie uma solicitação pelo canal oficial de privacidade do Ofertas 4You informado no site,
        nas campanhas ou nos perfis oficiais. Enquanto um e-mail dedicado não estiver publicado, use
        os canais oficiais da marca e inclua o assunto &quot;Exclusão de dados pessoais&quot;.
      </p>
      <p>Para agilizar a análise, inclua:</p>
      <ul>
        <li>nome completo, quando aplicável;</li>
        <li>e-mail ou identificador usado na interação com o site;</li>
        <li>descrição do dado ou da interação que deseja excluir;</li>
        <li>comprovação mínima de titularidade, se necessária para sua segurança.</li>
      </ul>

      <h2>3. O que acontece depois</h2>
      <p>
        Avaliaremos o pedido, confirmaremos a identidade quando necessário e removeremos ou
        anonimizaremos os dados pessoais elegíveis dentro dos prazos previstos pela legislação
        aplicável.
      </p>
      <p>
        Alguns dados podem ser mantidos quando houver obrigação legal, necessidade de prevenção a
        fraude, exercício regular de direitos, segurança, registros contábeis, cumprimento de ordem
        de autoridade competente ou outra base legal aplicável.
      </p>

      <h2>4. Dados em plataformas de terceiros</h2>
      <p>
        Se você deseja excluir ou limitar dados tratados por Google, Meta, Microsoft, lojas,
        marketplaces, plataformas de afiliação ou outros parceiros, recomendamos usar também as
        ferramentas de privacidade oferecidas diretamente por esses serviços.
      </p>

      <h2>5. Cookies no seu navegador</h2>
      <p>
        Você pode apagar cookies e dados locais diretamente nas configurações do seu navegador. Ao
        fazer isso, preferências do site, incluindo o registro do consentimento de cookies, podem
        ser removidas.
      </p>
      <p>
        Para mudar apenas a escolha de cookies opcionais neste site, use o link &quot;Preferências
        de cookies&quot; no rodapé.
      </p>
    </PaginaSimples>
  )
}
