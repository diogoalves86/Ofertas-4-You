# Modelo de conteúdo

O Payload CMS organiza o conteúdo do Ofertas 4You em coleções e configurações globais.

As labels do painel devem usar português do Brasil com acentos, para manter a experiência editorial
profissional no admin. Slugs e nomes técnicos continuam sem acentos, conforme exigido por rotas,
campos e integrações.

Campos do tipo array também devem definir `labels.singular` e `labels.plural` quando o plural
regular ficaria estranho. Isso mantém botões como "Adicionar vantagem", "Adicionar ponto de
atenção" e "Adicionar pergunta frequente" naturais no painel.

## Coleções

### Usuários

Usada para acesso ao painel administrativo em `/admin`.

Grupo no painel: Sistema.

Campos principais:

- `email`
- `password`
- `nome`

### Mídias

Armazena imagens de produtos, posts, logos e banners.

Grupo no painel: Editorial.

Campos principais:

- `alt`
- arquivo enviado pelo Payload

### Categorias

Agrupa produtos e reviews.

Grupo no painel: Catálogo.

Campos principais:

- `nome`
- `slug`
- `descricao`
- `tipo`
- `imagem`
- `seo`

### Lojas

Representa parceiros como Amazon, Mercado Livre, Shopee, Hotmart e Monetizze.

Grupo no painel: Catálogo.

Campos principais:

- `nome`
- `slug`
- `tipo`
- `url_base`
- `logo`
- `descricao`
- `ativa`
- `seo`

### Produtos

Representa ofertas afiliadas.

Grupo no painel: Catálogo.

Campos principais:

- `titulo`
- `slug`
- `resumo`
- `descricao`
- `categoria`
- `loja`
- `link_afiliado`
- `preco`
- `preco_promocional`
- `tipo_produto`
- `imagem`
- `imagens`
- `selo`
- `nota`
- `vantagens`
- `desvantagens`
- `destaque`
- `aviso_afiliado`
- `seo`

Produtos usam drafts para permitir edição antes da publicação.

Uso na frente pública:

- `titulo`, `slug` e `resumo` alimentam cards, H1, metadados e JSON-LD.
- `categoria` e `loja` aparecem como etiquetas de contexto.
- `imagem.alt` deve ser preenchido, pois é usado como texto alternativo e caption nos dados estruturados.
- `vantagens` alimenta a seção "Quando essa opção faz sentido".
- `desvantagens` alimenta a seção "Pontos de atenção". No admin, a label exibida para esse campo é
  "Pontos de atenção" para evitar uma leitura excessivamente negativa no fluxo editorial.
- `nota` alimenta a avaliação editorial no JSON-LD quando existir.
- `link_afiliado` define o CTA externo e é obrigatório no cadastro do Payload. A frente pública
  ainda mantém fallback para guia relacionado quando conteúdo legado ou fallback editorial não tiver
  link, evitando destino vazio.
- `destaque` controla a presença na home quando houver conteúdo publicado.

Regra de SEO: `Offer` só deve ser gerado quando `link_afiliado` apontar para uma URL externa real.
Não preencher preço, disponibilidade ou promessa comercial se a informação não estiver atualizada.

### Avaliações

Representa reviews, comparativos e guias de compra.

Grupo no painel: Editorial.

Campos principais:

- `titulo`
- `slug`
- `resumo`
- `conteudo`
- `categoria`
- `produtos_relacionados`
- `imagem`
- `autor`
- `tempo_leitura`
- `perguntas_frequentes`
- `publicado_em`
- `destaque`
- `seo`

Avaliações usam drafts para fluxo editorial.

Uso na frente pública:

- `titulo`, `slug` e `resumo` alimentam cards, H1, metadados e JSON-LD.
- `categoria`, `autor` e `tempo_leitura` aparecem como etiquetas do guia.
- `imagem.alt` deve ser preenchido quando houver imagem editorial.
- `perguntas_frequentes` alimenta a seção de FAQ e o JSON-LD `FAQPage`.
- `perguntas_frequentes` deve manter labels singular/plural configuradas para que o painel use
  "Adicionar pergunta frequente" em vez de uma pluralização automática estranha.
- `publicado_em`, `createdAt` e `updatedAt` podem alimentar datas de `Article` e sitemap.
- `produtos_relacionados` deve ser usado em evoluções futuras para CTAs mais específicos.

### Páginas

Conteúdo institucional gerenciável no CMS.

Grupo no painel: Editorial.

Campos principais:

- `titulo`
- `slug`
- `resumo`
- `conteudo`
- `seo`

## Conteúdo público inicial

O arquivo `src/dados/conteudoPublico.ts` contém conteúdo fallback para produtos e avaliações.
Ele é usado quando:

- o Payload não está disponível;
- `DESABILITAR_PAYLOAD_PUBLICO=true`;
- ainda não existem documentos publicados para a consulta.

Esse conteúdo inicial deve continuar coerente com a estratégia editorial, porque ele aparece em
desenvolvimento, pode ser usado em builds locais e serve como referência de copy para cadastros
reais no Payload.

Itens fallback atuais:

- TV 4K para sala clara.
- Smartphone intermediário.
- Curso digital com checkout parceiro.
- Guia de TVs 4K.
- Guia de smartphone intermediário versus topo antigo.
- Guia de curso online.

## Configurações globais

### Configurações do site

Aparece no grupo Sistema do painel.

Campos principais:

- `nome_site`
- `url_site`
- `descricao_padrao`
- `aviso_afiliado_padrao`
- `redes_sociais`

## Regra editorial

Toda oferta cadastrada no Payload deve ter loja parceira definida e link afiliado claro.
Todo review deve poder apontar para produtos relacionados, ofertas ou chamadas de afiliado.

Para manter confiança e SEO:

- usar acentos e português correto nas copies públicas;
- evitar prometer desconto, disponibilidade ou preço quando o dado não estiver atualizado;
- manter aviso de afiliado visível;
- preencher `alt` em imagens editoriais;
- publicar apenas slugs finais, estáveis e pesquisáveis.
