# Arquitetura

O Ofertas 4You usa uma arquitetura simples para comecar bem organizado e crescer sem trocar a
base tecnica.

## Visao geral

```txt
Visitante
  |
  v
app:3000 dentro do container
  |-- site publico Next.js
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

Na VPS, o container `app` e exposto pela porta `3002`. As portas `3000` e `3001` do host nao sao
usadas pelo projeto.

## Aplicacao

A aplicacao combina:

- Next.js para as paginas publicas, SEO, sitemap e robots.
- Payload CMS para administracao de usuarios, produtos, reviews, lojas, categorias e midias.
- Postgres como banco persistente.

## Padrao de nomes

Arquivos, pastas, variaveis, funcoes, componentes e colecoes criados pelo projeto devem usar
portugues do Brasil. Excecoes sao nomes exigidos por ferramentas, como `package.json`,
`Dockerfile`, `README.md`, `page.tsx`, `layout.tsx`, `route.ts`, `payload.config.ts` e similares.

## Rotas publicas iniciais

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
- `/saude`

## Decisoes iniciais

- O Ofertas 4You nao processa compras diretamente.
- Produtos fisicos direcionam para marketplaces parceiros.
- Produtos digitais podem direcionar para checkouts como Hotmart e Monetizze.
- Conteudo editorial e uma parte central do produto, nao apenas apoio da vitrine.
- O `cron-runner` nao usa automacao de navegador.
