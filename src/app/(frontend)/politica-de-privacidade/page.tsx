import type { Metadata } from 'next'

import { PaginaSimples } from '@/componentes/PaginaSimples'
import { criarMetadataPagina } from '@/utilitarios/seo'

export const metadata: Metadata = criarMetadataPagina({
  caminho: '/politica-de-privacidade',
  titulo: 'Política de privacidade',
  descricao:
    'Entenda como o Ofertas 4You coleta, utiliza e protege dados de navegação, cookies e ferramentas de medição.',
})

export default function PaginaPrivacidade() {
  return (
    <PaginaSimples
      titulo="Política de privacidade"
      descricao="Explicamos como tratamos dados de navegação, cookies, tecnologias de medição, links afiliados e campanhas de mídia."
    >
      <p>
        Última atualização: 25 de maio de 2026. Esta política descreve as práticas do Ofertas 4You
        em relação aos dados coletados quando você acessa nossas páginas, ofertas, reviews, guias,
        links afiliados e campanhas.
      </p>

      <h2>1. Quais dados podemos coletar</h2>
      <p>
        Podemos coletar dados fornecidos diretamente por você, quando houver formulários, cadastros,
        newsletters, comentários, pesquisas, atendimento ou campanhas promocionais.
      </p>
      <p>
        Também podemos coletar dados de navegação, como páginas visitadas, horário de acesso, origem
        da visita, tipo de dispositivo, navegador, sistema operacional, endereço IP aproximado,
        identificadores de cookies, cliques, rolagens, interações com botões, eventos de conversão e
        desempenho das páginas.
      </p>

      <h2>2. Como usamos esses dados</h2>
      <p>
        Usamos os dados para operar o site, melhorar conteúdos, medir audiência, entender quais
        ofertas e reviews geram interesse, prevenir abuso, corrigir falhas, cumprir obrigações
        legais e avaliar resultados de campanhas em plataformas como Google Ads, Meta Ads, Microsoft
        Ads e outras redes de mídia.
      </p>
      <p>
        Também podemos usar dados agregados ou pseudonimizados para criar relatórios, público de
        remarketing, público semelhante, medição de conversões e otimização de campanhas, quando
        essas funcionalidades estiverem configuradas e permitidas pela legislação aplicável.
      </p>

      <h2>3. Cookies e tecnologias semelhantes</h2>
      <p>
        Cookies, pixels, tags, SDKs, armazenamento local e tecnologias semelhantes podem ser usados
        para lembrar preferências, medir audiência, registrar interações e apoiar campanhas
        publicitárias.
      </p>
      <p>
        O aviso de cookies exibido no site permite aceitar ou recusar cookies opcionais. Cookies
        estritamente necessários podem continuar sendo usados para segurança, funcionamento básico,
        preferência de consentimento e estabilidade da experiência.
      </p>

      <h2>4. Ferramentas de medição e publicidade</h2>
      <p>
        Podemos utilizar ferramentas como Google Analytics, Google Tag Manager, Google Ads,
        Microsoft Clarity, Microsoft Advertising, Meta Pixel, Meta Ads e outras plataformas de
        analytics, mapa de calor, gravação de sessão, atribuição, remarketing e medição de
        conversão.
      </p>
      <p>
        Essas ferramentas podem receber dados de navegação, eventos de interação e identificadores
        online para gerar estatísticas, medir campanhas, personalizar anúncios ou limitar a exibição
        de publicidade. Cada fornecedor trata dados conforme suas próprias políticas e
        configurações.
      </p>

      <h2>5. Links afiliados e lojas parceiras</h2>
      <p>
        O Ofertas 4You divulga links para marketplaces, lojas, plataformas digitais e programas de
        afiliados. Ao clicar nesses links, você pode ser direcionado para sites de terceiros, que
        possuem políticas de privacidade e termos próprios.
      </p>
      <p>
        Esses parceiros podem usar cookies e parâmetros de rastreamento para atribuir vendas, medir
        cliques, calcular comissões e confirmar conversões. A compra, o pagamento, a entrega, o
        suporte e a garantia são realizados diretamente pelo parceiro responsável.
      </p>

      <h2>6. Compartilhamento de dados</h2>
      <p>
        Podemos compartilhar dados com fornecedores de tecnologia, hospedagem, segurança, analytics,
        publicidade, afiliação, atendimento e automação, sempre conforme a finalidade descrita nesta
        política.
      </p>
      <p>
        Também poderemos compartilhar informações quando necessário para cumprir lei, ordem de
        autoridade competente, defesa de direitos, prevenção a fraude, investigação de uso indevido
        ou proteção do Ofertas 4You, de visitantes e de terceiros.
      </p>

      <h2>7. Seus controles e escolhas</h2>
      <p>
        Você pode gerenciar cookies pelo aviso exibido no site e também pelas configurações do seu
        navegador. A recusa de cookies opcionais pode reduzir a personalização, a medição e alguns
        recursos de análise, mas não deve impedir o acesso ao conteúdo principal.
      </p>
      <p>
        Caso queira alterar sua escolha depois, use o link &quot;Preferências de cookies&quot; no
        rodapé do site.
      </p>
      <p>
        Plataformas de terceiros também oferecem controles próprios, como preferências de anúncios,
        configurações de privacidade e opções de descadastramento. Recomendamos revisar as
        configurações da sua conta Google, Meta, Microsoft e de outros serviços que você usa.
      </p>

      <h2>8. Retenção e segurança</h2>
      <p>
        Mantemos dados pelo tempo necessário para cumprir as finalidades informadas, atender
        obrigações legais, resolver disputas, prevenir fraude, gerar relatórios históricos e
        proteger nossos direitos.
      </p>
      <p>
        Adotamos medidas técnicas e organizacionais razoáveis para proteger os dados contra acesso
        não autorizado, perda, alteração e uso indevido. Nenhum sistema, contudo, é totalmente imune
        a riscos.
      </p>

      <h2>9. Direitos do titular</h2>
      <p>
        Conforme a legislação aplicável, você pode solicitar confirmação de tratamento, acesso,
        correção, portabilidade, anonimização, bloqueio, exclusão, informações sobre
        compartilhamento e revisão de decisões automatizadas, quando cabível.
      </p>
      <p>
        Para pedidos de exclusão ou outros direitos relacionados a dados pessoais, consulte a página
        de exclusão de dados do Ofertas 4You.
      </p>

      <h2>10. Alterações desta política</h2>
      <p>
        Esta política pode ser atualizada para refletir novas ferramentas, mudanças no site,
        exigências legais ou ajustes operacionais. A versão publicada nesta página será a referência
        vigente.
      </p>
    </PaginaSimples>
  )
}
