# Modelo de conteudo

O Payload CMS organiza o conteudo do Ofertas 4You em colecoes e configuracoes globais.

## Colecoes

### Usuarios

Usada para acesso ao painel administrativo em `/admin`.

Campos principais:

- `email`
- `password`
- `nome`

### Midias

Armazena imagens de produtos, posts, logos e banners.

Campos principais:

- `alt`
- arquivo enviado pelo Payload

### Categorias

Agrupa produtos e reviews.

Campos principais:

- `nome`
- `slug`
- `descricao`
- `tipo`
- `imagem`
- `seo`

### Lojas

Representa parceiros como Amazon, Mercado Livre, Shopee, Hotmart e Monetizze.

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

Produtos usam drafts para permitir edicao antes da publicacao.

### Avaliacoes

Representa reviews, comparativos e guias de compra.

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

Avaliacoes usam drafts para fluxo editorial.

### Paginas

Conteudo institucional gerenciavel no CMS.

Campos principais:

- `titulo`
- `slug`
- `resumo`
- `conteudo`
- `seo`

## Configuracoes globais

### Configuracoes do site

Campos principais:

- `nome_site`
- `url_site`
- `descricao_padrao`
- `aviso_afiliado_padrao`
- `redes_sociais`

## Regra editorial

Toda oferta deve ter link afiliado claro e loja parceira definida. Todo review deve poder apontar
para produtos relacionados ou chamadas de afiliado.
