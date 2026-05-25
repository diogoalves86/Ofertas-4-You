import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'

export const metadata: Metadata = {
  title: 'Politica de privacidade',
  description:
    'Entenda como o Ofertas 4You coleta, utiliza e protege dados de navegacao, cookies e ferramentas de medicao.',
}

export default function PaginaPrivacidade() {
  return (
    <PaginaSimples
      titulo="Politica de privacidade"
      descricao="Explicamos como tratamos dados de navegacao, cookies, tecnologias de medicao, links afiliados e campanhas de midia."
    >
      <p>
        Ultima atualizacao: 25 de maio de 2026. Esta politica descreve as praticas do Ofertas 4You
        em relacao aos dados coletados quando voce acessa nossas paginas, ofertas, reviews, guias,
        links afiliados e campanhas.
      </p>

      <h2>1. Quais dados podemos coletar</h2>
      <p>
        Podemos coletar dados fornecidos diretamente por voce, quando houver formularios, cadastros,
        newsletters, comentarios, pesquisas, atendimento ou campanhas promocionais.
      </p>
      <p>
        Tambem podemos coletar dados de navegacao, como paginas visitadas, horario de acesso, origem
        da visita, tipo de dispositivo, navegador, sistema operacional, endereco IP aproximado,
        identificadores de cookies, cliques, rolagens, interacoes com botoes, eventos de conversao e
        desempenho das paginas.
      </p>

      <h2>2. Como usamos esses dados</h2>
      <p>
        Usamos os dados para operar o site, melhorar conteudos, medir audiencia, entender quais
        ofertas e reviews geram interesse, prevenir abuso, corrigir falhas, cumprir obrigacoes
        legais e avaliar resultados de campanhas em plataformas como Google Ads, Meta Ads, Microsoft
        Ads e outras redes de midia.
      </p>
      <p>
        Tambem podemos usar dados agregados ou pseudonimizados para criar relatorios, publico de
        remarketing, publico semelhante, medicao de conversoes e otimizacao de campanhas, quando
        essas funcionalidades estiverem configuradas e permitidas pela legislacao aplicavel.
      </p>

      <h2>3. Cookies e tecnologias semelhantes</h2>
      <p>
        Cookies, pixels, tags, SDKs, armazenamento local e tecnologias semelhantes podem ser usados
        para lembrar preferencias, medir audiencia, registrar interacoes e apoiar campanhas
        publicitarias.
      </p>
      <p>
        O aviso de cookies exibido no site permite aceitar ou recusar cookies opcionais. Cookies
        estritamente necessarios podem continuar sendo usados para seguranca, funcionamento basico,
        preferencia de consentimento e estabilidade da experiencia.
      </p>

      <h2>4. Ferramentas de medicao e publicidade</h2>
      <p>
        Podemos utilizar ferramentas como Google Analytics, Google Tag Manager, Google Ads,
        Microsoft Clarity, Microsoft Advertising, Meta Pixel, Meta Ads e outras plataformas de
        analytics, mapa de calor, gravacao de sessao, atribuicao, remarketing e medicao de
        conversao.
      </p>
      <p>
        Essas ferramentas podem receber dados de navegacao, eventos de interacao e identificadores
        online para gerar estatisticas, medir campanhas, personalizar anuncios ou limitar a exibicao
        de publicidade. Cada fornecedor trata dados conforme suas proprias politicas e
        configuracoes.
      </p>

      <h2>5. Links afiliados e lojas parceiras</h2>
      <p>
        O Ofertas 4You divulga links para marketplaces, lojas, plataformas digitais e programas de
        afiliados. Ao clicar nesses links, voce pode ser direcionado para sites de terceiros, que
        possuem politicas de privacidade e termos proprios.
      </p>
      <p>
        Esses parceiros podem usar cookies e parametros de rastreamento para atribuir vendas, medir
        cliques, calcular comissoes e confirmar conversoes. A compra, o pagamento, a entrega, o
        suporte e a garantia sao realizados diretamente pelo parceiro responsavel.
      </p>

      <h2>6. Compartilhamento de dados</h2>
      <p>
        Podemos compartilhar dados com fornecedores de tecnologia, hospedagem, seguranca, analytics,
        publicidade, afiliacao, atendimento e automacao, sempre conforme a finalidade descrita nesta
        politica.
      </p>
      <p>
        Tambem poderemos compartilhar informacoes quando necessario para cumprir lei, ordem de
        autoridade competente, defesa de direitos, prevencao a fraude, investigacao de uso indevido
        ou protecao do Ofertas 4You, de visitantes e de terceiros.
      </p>

      <h2>7. Seus controles e escolhas</h2>
      <p>
        Voce pode gerenciar cookies pelo aviso exibido no site e tambem pelas configuracoes do seu
        navegador. A recusa de cookies opcionais pode reduzir a personalizacao, a medicao e alguns
        recursos de analise, mas nao deve impedir o acesso ao conteudo principal.
      </p>
      <p>
        Caso queira alterar sua escolha depois, use o link &quot;Preferencias de cookies&quot; no
        rodape do site.
      </p>
      <p>
        Plataformas de terceiros tambem oferecem controles proprios, como preferencias de anuncios,
        configuracoes de privacidade e opcoes de descadastramento. Recomendamos revisar as
        configuracoes da sua conta Google, Meta, Microsoft e de outros servicos que voce usa.
      </p>

      <h2>8. Retencao e seguranca</h2>
      <p>
        Mantemos dados pelo tempo necessario para cumprir as finalidades informadas, atender
        obrigacoes legais, resolver disputas, prevenir fraude, gerar relatorios historicos e
        proteger nossos direitos.
      </p>
      <p>
        Adotamos medidas tecnicas e organizacionais razoaveis para proteger os dados contra acesso
        nao autorizado, perda, alteracao e uso indevido. Nenhum sistema, contudo, e totalmente imune
        a riscos.
      </p>

      <h2>9. Direitos do titular</h2>
      <p>
        Conforme a legislacao aplicavel, voce pode solicitar confirmacao de tratamento, acesso,
        correcao, portabilidade, anonimizacao, bloqueio, exclusao, informacoes sobre
        compartilhamento e revisao de decisoes automatizadas, quando cabivel.
      </p>
      <p>
        Para pedidos de exclusao ou outros direitos relacionados a dados pessoais, consulte a pagina
        de exclusao de dados do Ofertas 4You.
      </p>

      <h2>10. Alteracoes desta politica</h2>
      <p>
        Esta politica pode ser atualizada para refletir novas ferramentas, mudancas no site,
        exigencias legais ou ajustes operacionais. A versao publicada nesta pagina sera a referencia
        vigente.
      </p>
    </PaginaSimples>
  )
}
