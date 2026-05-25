# Ofertas 4You

Ofertas 4You é uma vitrine afiliada criada com Next.js, Payload CMS, Postgres e Docker Compose.
O site publica ofertas, reviews, comparativos e guias de compra, sempre direcionando o visitante
para lojas ou checkouts parceiros.

## Objetivo

- Exibir produtos físicos e digitais com links de afiliado.
- Publicar reviews e artigos otimizados para SEO.
- Manter um painel administrativo para conteúdo editorial.
- Rodar com containers na VPS, usando a porta externa `3002`.
- Separar rotinas agendadas em um container próprio chamado `cron-runner`.
- Combinar experiência de blog, guia de compra e vitrine para visitantes em meio de funil.

## Estrutura principal

```txt
app                 Next.js + Payload CMS
postgres            banco Postgres interno
cron-runner         rotinas agendadas e integrações
docs                documentação viva do projeto
public/imagens      imagens públicas usadas na vitrine e em compartilhamentos sociais
src/colecoes        coleções do Payload em português
src/componentes     componentes públicos do site
src/componentes/admin componentes personalizados do painel Payload
src/dados           leitura pública do Payload com fallback editorial
src/utilitarios     helpers compartilhados, incluindo SEO e URLs canônicas
rotinas             tarefas executadas pelo cron-runner
```

## Experiência pública

A frente pública foi desenhada como um hub editorial afiliado:

- Home com hero visual, proposta clara, trilha de curadoria, ofertas em destaque e guias recentes.
- Listagem de ofertas em `/ofertas`, com cards que levam para páginas de detalhe.
- Listagem de guias em `/avaliacoes`, com cards editoriais e tempo de leitura.
- Páginas de oferta em `/ofertas/[slug]`, com análise, vantagens, pontos de atenção e próximo passo.
- Páginas de guia em `/avaliacoes/[slug]`, com critérios editoriais, FAQ e chamada para ofertas.

Quando o Payload não está disponível, o site público usa o conteúdo inicial de
`src/dados/conteudoPublico.ts`. Isso permite validar UX, SEO e build sem depender do banco local.

## Painel administrativo

O painel do Payload foi personalizado para o fluxo editorial do projeto:

- branding do Ofertas 4You no logo e ícone;
- botão "Ver site" no topo e no rodapé da navegação, sempre com `noopener noreferrer`;
- dashboard com saudação, métricas e atalhos para criar oferta, criar avaliação, acessar mídias e
  editar configurações;
- métricas calculadas com as regras de acesso do Payload para o usuário logado;
- grupos de navegação para Catálogo, Editorial e Sistema;
- experiência responsiva para uso em desktop e smartphone;
- Tailwind CSS v4 importado no admin por `src/app/(payload)/custom.scss`, com `@source` apontando
  para `src/componentes/admin`;
- estilos próprios em `src/app/(payload)/custom.scss`.

As métricas do dashboard deduplicam apenas consultas simultâneas. Elas não mantêm cache persistente
entre requisições, para evitar mostrar contagens antigas após mudanças de permissão.

## Como subir com Docker Compose

1. Copie `.env.example` para `.env` quando estiver preparando outro ambiente.
2. Ajuste senhas, segredo do Payload e URL pública.
3. Suba os containers:

```bash
docker compose up -d --build
```

O site fica disponível em:

```txt
http://localhost:3002
```

O painel administrativo fica em:

```txt
http://localhost:3002/admin
```

## Comandos úteis

```bash
npm run dev
npm run devsafe
npm run build
npm run lint
npm run generate:types
npm run generate:importmap
npm run rotinas:cron
```

## SEO e compartilhamento

O projeto centraliza metadados em `src/utilitarios/seo.ts`, gera `robots.txt` e `sitemap.xml`
pelo Next.js e injeta JSON-LD com o componente `DadosEstruturados`.

As páginas públicas usam:

- canonical absoluto baseado em `NEXT_PUBLIC_URL`;
- Open Graph e Twitter Card com imagem de compartilhamento;
- `Organization`, `WebSite`, `WebPage`, `ItemList`, `BreadcrumbList`, `Product`, `Review`,
  `Article` e `FAQPage`, conforme o tipo de página;
- `rel="nofollow sponsored noopener noreferrer"` em links afiliados externos;
- `noindex, follow` em rotas placeholder sem conteúdo publicado.

## Documentação do projeto

- [Arquitetura](docs/arquitetura.md)
- [Docker e VPS](docs/docker.md)
- [Modelo de conteúdo](docs/modelo-de-conteudo.md)
- [SEO](docs/seo.md)
- [Rotinas](docs/rotinas.md)
- [Segurança](docs/seguranca.md)
- [Histórico](docs/historico.md)

## Regra de manutenção

Toda mudança relevante no produto deve atualizar também a documentação relacionada. Isso inclui
alterações em coleções do Payload, rotas públicas, containers, variáveis de ambiente, rotinas,
SEO e fluxos editoriais.
