import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'

export const metadata: Metadata = {
  title: 'Exclusao de dados',
  description: 'Instrucao para solicitar exclusao de dados pessoais tratados pelo Ofertas 4You.',
}

export default function PaginaExclusaoDados() {
  return (
    <PaginaSimples
      titulo="Exclusao de dados"
      descricao="Veja como solicitar a exclusao de dados pessoais associados ao seu uso do Ofertas 4You."
    >
      <p>
        Ultima atualizacao: 25 de maio de 2026. Esta pagina serve como canal de orientacao para
        pedidos de exclusao de dados pessoais tratados pelo Ofertas 4You.
      </p>

      <h2>1. Quando solicitar</h2>
      <p>
        Voce pode solicitar a exclusao de dados pessoais que tenha fornecido ao Ofertas 4You por
        formularios, cadastros, campanhas, comentarios, atendimento, newsletters ou outras
        interacoes futuras do site.
      </p>
      <p>
        Dados de navegacao coletados por ferramentas de terceiros, como Google, Meta, Microsoft e
        redes de afiliados, tambem podem estar sujeitos aos controles e prazos dessas plataformas.
      </p>

      <h2>2. Como fazer o pedido</h2>
      <p>
        Envie uma solicitacao pelo canal oficial de privacidade do Ofertas 4You informado no site,
        nas campanhas ou nos perfis oficiais. Enquanto um e-mail dedicado nao estiver publicado, use
        os canais oficiais da marca e inclua o assunto &quot;Exclusao de dados pessoais&quot;.
      </p>
      <p>Para agilizar a analise, inclua:</p>
      <ul>
        <li>nome completo, quando aplicavel;</li>
        <li>e-mail ou identificador usado na interacao com o site;</li>
        <li>descricao do dado ou da interacao que deseja excluir;</li>
        <li>comprovacao minima de titularidade, se necessaria para sua seguranca.</li>
      </ul>

      <h2>3. O que acontece depois</h2>
      <p>
        Avaliaremos o pedido, confirmaremos a identidade quando necessario e removeremos ou
        anonimizaremos os dados pessoais elegiveis dentro dos prazos previstos pela legislacao
        aplicavel.
      </p>
      <p>
        Alguns dados podem ser mantidos quando houver obrigacao legal, necessidade de prevencao a
        fraude, exercicio regular de direitos, seguranca, registros contabeis, cumprimento de ordem
        de autoridade competente ou outra base legal aplicavel.
      </p>

      <h2>4. Dados em plataformas de terceiros</h2>
      <p>
        Se voce deseja excluir ou limitar dados tratados por Google, Meta, Microsoft, lojas,
        marketplaces, plataformas de afiliacao ou outros parceiros, recomendamos usar tambem as
        ferramentas de privacidade oferecidas diretamente por esses servicos.
      </p>

      <h2>5. Cookies no seu navegador</h2>
      <p>
        Voce pode apagar cookies e dados locais diretamente nas configuracoes do seu navegador. Ao
        fazer isso, preferencias do site, incluindo o registro do consentimento de cookies, podem
        ser removidas.
      </p>
      <p>
        Para mudar apenas a escolha de cookies opcionais neste site, use o link &quot;Preferencias
        de cookies&quot; no rodape.
      </p>
    </PaginaSimples>
  )
}
