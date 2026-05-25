# SEO

SEO é um requisito central do Ofertas 4You. A estratégia do projeto é atrair visitantes por buscas
de meio de funil, educar a decisão com conteúdo editorial e só então encaminhar para ofertas ou
checkouts parceiros.

## Base implementada

- Metadados globais no layout público.
- Helper central em `src/utilitarios/seo.ts` para canonical, Open Graph, Twitter Card, robots e
  URLs absolutas.
- `robots.txt` gerado pelo Next.js, permitindo a frente pública e bloqueando `/admin` e `/api`.
- `sitemap.xml` dinâmico com rotas fixas, produtos e avaliações publicados.
- Campos de SEO em produtos, avaliações, categorias, lojas e páginas.
- URLs amigáveis com `slug`.
- Rotas dedicadas para ofertas e reviews.
- Imagem padrão de compartilhamento em `public/imagens/og-ofertas4you.webp`.
- Imagens contextuais de produto quando houver mídia cadastrada ou fallback público.

## Padrões de URL

```txt
/ofertas/[slug]
/avaliacoes/[slug]
/categorias/[slug]
/lojas/[slug]
```

As URLs canônicas usam `NEXT_PUBLIC_URL`, sem barra final duplicada. Em produção, o valor atual de
referência é:

```txt
https://ofertas4you.com.br
```

## Dados estruturados

O componente `DadosEstruturados` injeta JSON-LD seguro em páginas públicas. A estrutura atual é:

- Home:
  - `Organization`
  - `WebSite`
  - `WebPage`
  - `ItemList` para ofertas em destaque
  - `ItemList` para guias recentes
- `/ofertas`:
  - `CollectionPage`
  - `ItemList`
- `/avaliacoes`:
  - `CollectionPage`
  - `ItemList`
- `/ofertas/[slug]`:
  - `Organization`
  - `WebSite`
  - `BreadcrumbList`
  - `WebPage`
  - `Product`
  - `Review`
- `/avaliacoes/[slug]`:
  - `Organization`
  - `WebSite`
  - `BreadcrumbList`
  - `WebPage`
  - `Article`
  - `FAQPage`, quando houver perguntas frequentes

Regra importante: `Offer` só deve entrar no JSON-LD quando houver `link_afiliado` externo real.
Não gerar preço, disponibilidade ou oferta se o dado não vier de fonte confiável.

## Metadados sociais

Todas as páginas públicas devem ter:

- `title`
- `description`
- canonical absoluto
- `og:title`
- `og:description`
- `og:url`
- `og:image`
- `og:locale` como `pt_BR`
- Twitter Card `summary_large_image`

Guias publicados usam Open Graph do tipo `article`. Páginas de oferta usam imagem contextual
quando disponível; caso contrário, usam a imagem padrão de compartilhamento.

## Indexação

- Páginas publicadas devem usar `index, follow`.
- Páginas placeholder ou rotas ainda sem conteúdo real devem usar `noindex, follow`.
- `/admin` e `/api` ficam bloqueados no `robots.txt`.
- Links afiliados externos devem usar `rel="nofollow sponsored noopener noreferrer"` e abrir em
  nova aba.

## Conteúdo recomendado

Reviews e guias devem priorizar termos de busca com intenção de compra, por exemplo:

- melhores TVs 4K;
- smartphone intermediário vale a pena;
- comparativo de modelos;
- melhor custo-benefício;
- review de produto específico;
- curso online confiável;
- Hotmart vale a pena;
- produto digital com garantia.

## Padrão editorial

Cada conteúdo deve responder uma dúvida real antes de vender. Uma página forte para SEO deve ter:

- H1 específico e pesquisável;
- resumo claro nos primeiros parágrafos;
- critérios de decisão;
- vantagens e pontos de atenção;
- FAQ quando houver perguntas reais;
- próximo passo coerente: guia relacionado, listagem ou link parceiro;
- aviso de afiliado visível.

## Validação recomendada

Antes de publicar mudanças de SEO:

```bash
npm run lint
npm run build
```

Também é recomendado validar o HTML renderizado para confirmar:

- canonical absoluto;
- Open Graph e Twitter Card;
- JSON-LD válido;
- presença da URL no sitemap;
- ausência de `noindex` em páginas que devem ranquear.

## Próximos passos planejados

- Adicionar imagem editorial nos guias fallback para melhorar compartilhamento social.
- Criar renderização do conteúdo rico vindo do campo `conteudo` do Payload nas páginas de avaliação.
- Criar renderização da `descricao` rica do Payload nas páginas de oferta.
- Revisar política de privacidade quando analytics, pixels e plataformas de anúncios forem definidos.
