# Ofertas 4You

Ofertas 4You e uma vitrine afiliada criada com Next.js, Payload CMS, Postgres e Docker Compose.
O site publica ofertas, reviews, comparativos e guias de compra, sempre direcionando o visitante
para lojas ou checkouts parceiros.

## Objetivo

- Exibir produtos fisicos e digitais com links de afiliado.
- Publicar reviews e artigos otimizados para SEO.
- Manter um painel administrativo para conteudo editorial.
- Rodar com containers na VPS, usando a porta externa `3002`.
- Separar rotinas agendadas em um container proprio chamado `cron-runner`.

## Estrutura principal

```txt
app                 Next.js + Payload CMS
postgres            banco Postgres interno
cron-runner         rotinas agendadas e integracoes
docs                documentacao viva do projeto
src/colecoes        colecoes do Payload em portugues
src/componentes     componentes publicos do site
rotinas             tarefas executadas pelo cron-runner
```

## Como subir com Docker Compose

1. Copie `.env.example` para `.env` quando estiver preparando outro ambiente.
2. Ajuste senhas, segredo do Payload e URL publica.
3. Suba os containers:

```bash
docker compose up -d --build
```

O site fica disponivel em:

```txt
http://localhost:3002
```

O painel administrativo fica em:

```txt
http://localhost:3002/admin
```

## Comandos uteis

```bash
npm run dev
npm run build
npm run lint
npm run generate:types
npm run generate:importmap
npm run rotinas:cron
```

## Documentacao do projeto

- [Arquitetura](docs/arquitetura.md)
- [Docker e VPS](docs/docker.md)
- [Modelo de conteudo](docs/modelo-de-conteudo.md)
- [SEO](docs/seo.md)
- [Rotinas](docs/rotinas.md)
- [Historico](docs/historico.md)

## Regra de manutencao

Toda mudanca relevante no produto deve atualizar tambem a documentacao relacionada. Isso inclui
alteracoes em colecoes do Payload, rotas publicas, containers, variaveis de ambiente, rotinas,
SEO e fluxos editoriais.
