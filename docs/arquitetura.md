# Arquitetura

O Ofertas 4You usa uma arquitetura simples para começar bem organizado e crescer sem trocar a
base técnica.

## Visão geral

```txt
Visitante
  |
  v
app:3000 dentro do container
  |-- site público Next.js
  |-- painel Payload em /admin
  |-- API Payload em /api
  |
  v
postgres:5432 dentro da rede Docker

cron-runner
  |-- executa rotinas agendadas
  |-- consulta app pela URL interna http://app:3000
  |-- pode integrar APIs externas no futuro
```

Na VPS, o container `app` é exposto pela porta `3002`. As portas `3000` e `3001` do host não são
usadas pelo projeto.

## Aplicação

A aplicação combina:

- Next.js para as páginas públicas, SEO, sitemap, robots e metadados sociais.
- Payload CMS para administração de usuários, produtos, reviews, lojas, categorias e mídias.
- Postgres como banco persistente.
- Motion para transições suaves na experiência pública.
- Componentes próprios para personalizar o painel administrativo do Payload.

## Frente pública

A frente pública está organizada como um hub de conteúdo afiliado. O fluxo esperado é:

```txt
Busca orgânica
  -> home, oferta ou guia
  -> comparação editorial
  -> página de detalhe
  -> guia relacionado ou link parceiro
```

Rotas e responsabilidades:

- `/`: hero visual, proposta editorial, método de curadoria, ofertas em destaque, guias recentes e bloco de conversão.
- `/ofertas`: listagem de produtos físicos, produtos digitais e oportunidades com contexto.
- `/ofertas/[slug]`: página de detalhe da oferta, com vantagens, pontos de atenção, aviso de afiliado e próximo passo.
- `/avaliacoes`: listagem editorial de reviews, comparativos e guias.
- `/avaliacoes/[slug]`: página de guia, com critérios editoriais, FAQ e chamada para ofertas.
- `/categorias/[slug]` e `/lojas/[slug]`: rotas preparadas e marcadas como `noindex` enquanto não exibirem conteúdo real.

## Conteúdo público e fallback

O arquivo `src/dados/conteudoPublico.ts` centraliza a leitura pública de produtos e avaliações.
Ele tenta buscar documentos publicados no Payload e, se o CMS ou o banco não estiverem disponíveis,
retorna conteúdo editorial inicial.

Esse fallback é usado para:

- manter a home e as listagens navegáveis em desenvolvimento;
- permitir build local mesmo sem Postgres acessível;
- validar UX, SEO e dados estruturados antes de cadastrar conteúdo real.

A variável `DESABILITAR_PAYLOAD_PUBLICO=true` força esse comportamento.

## Painel administrativo

O Payload usa customizações em `src/payload.config.ts`, `src/componentes/admin/PainelAdmin.tsx`
e `src/app/(payload)/custom.scss`.

Customizações atuais:

- logo e ícone do Ofertas 4You no painel;
- ação "Ver site" no topo;
- dashboard com saudação, métricas de produtos, avaliações, lojas e categorias;
- atalhos para nova oferta, nova avaliação, biblioteca de mídias e configurações;
- rodapé de navegação com assinatura de curadoria afiliada;
- grupos de coleções no menu:
  - Catálogo: produtos, categorias e lojas;
  - Editorial: avaliações, mídias e páginas;
  - Sistema: usuários.

Sempre que componentes do painel forem alterados, rode `npm run generate:importmap` para manter
`src/app/(payload)/admin/importMap.js` alinhado.

## SEO e metadados

O utilitário `src/utilitarios/seo.ts` centraliza:

- nome do site e descrição padrão;
- URL pública baseada em `NEXT_PUBLIC_URL`;
- geração de URLs absolutas;
- metadata com canonical, Open Graph, Twitter Card e robots;
- serialização segura de JSON-LD.

O componente `src/componentes/DadosEstruturados.tsx` injeta JSON-LD por página.
O sitemap em `src/app/sitemap.ts` inclui páginas fixas, produtos e avaliações publicados.
O robots em `src/app/robots.ts` permite a frente pública e bloqueia `/admin` e `/api`.

## Assets públicos

As imagens em `public/imagens/` são usadas pelo hero, cards fallback e compartilhamento social.
O `next.config.ts` permite imagens locais de `/imagens/**` e mídias do Payload em
`/api/midias/file/**`.

## Padrão de nomes

Arquivos, pastas, variáveis, funções, componentes e coleções criados pelo projeto devem usar
português do Brasil. Exceções são nomes exigidos por ferramentas, como `package.json`,
`Dockerfile`, `README.md`, `page.tsx`, `layout.tsx`, `route.ts`, `payload.config.ts` e similares.

## Rotas públicas

- `/`
- `/ofertas`
- `/ofertas/[slug]`
- `/avaliacoes`
- `/avaliacoes/[slug]`
- `/categorias/[slug]`
- `/lojas/[slug]`
- `/sobre`
- `/aviso-de-afiliado`
- `/politica-de-privacidade`
- `/termos-de-uso`
- `/exclusao-de-dados`
- `/saude`

## Decisões de produto

- O Ofertas 4You não processa compras diretamente.
- Produtos físicos direcionam para marketplaces parceiros.
- Produtos digitais podem direcionar para checkouts como Hotmart e Monetizze.
- Conteúdo editorial é uma parte central do produto, não apenas apoio da vitrine.
- Cards não devem levar para páginas vazias: quando não houver link parceiro, a página de oferta aponta para um guia relacionado.
- Links afiliados externos devem usar `rel="nofollow sponsored noopener noreferrer"`.
- O `cron-runner` não usa automação de navegador.
