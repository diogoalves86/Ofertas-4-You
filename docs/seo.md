# SEO

SEO e um requisito central do Ofertas 4You.

## Base implementada

- Metadados globais no layout publico.
- `robots.txt` gerado pelo Next.js.
- `sitemap.xml` inicial com rotas fixas.
- Campos de SEO em produtos, avaliacoes, categorias, lojas e paginas.
- URLs amigaveis com `slug`.
- Rotas dedicadas para ofertas e reviews.

## Padroes de URL

```txt
/ofertas/[slug]
/avaliacoes/[slug]
/categorias/[slug]
/lojas/[slug]
```

## Conteudo recomendado

Reviews devem priorizar termos de busca com intencao de compra, por exemplo:

- melhores TVs 4K
- smartphone intermediario vale a pena
- comparativo de modelos
- melhor custo-beneficio
- review de produto especifico

## Aviso de afiliado

O aviso de afiliado deve ser claro e acessivel, sem atrapalhar a leitura. Ele aparece na estrutura
publica e tambem existe como configuracao global no Payload.

## Proximos passos planejados

- Gerar sitemap dinamico com produtos e avaliacoes publicados.
- Adicionar dados estruturados para produto, review, artigo e FAQ.
- Criar templates completos para paginas de produto e review.
- Revisar politica de privacidade quando analytics e pixels forem definidos.
