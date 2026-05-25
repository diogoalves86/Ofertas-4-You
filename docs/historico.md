# Histórico

## 2026-05-25

- Criada a base do projeto Ofertas 4You.
- Adicionado Next.js com Payload CMS.
- Configurado Postgres como banco principal.
- Configurado Docker Compose com `app`, `postgres` e `cron-runner`.
- Definida porta externa `3002`.
- Criadas coleções iniciais em português: usuários, mídias, categorias, lojas, produtos,
  avaliações e páginas.
- Criada configuração global do site.
- Criada home pública inicial com vitrine, reviews e aviso de afiliado.
- Criadas rotas públicas iniciais, sitemap, robots e rota de saúde.
- Criada documentação inicial do projeto.
- Validado lint e build local.
- Corrigida instalação Docker para copiar `.npmrc` antes de executar `npm ci`.
- Criada migração inicial do Payload e configurada aplicação automática em produção.
- Ajustada rota `/saude` para validar também a conexão com o Payload/Postgres.
- Repaginada a frente pública com experiência de hub editorial afiliado, hero visual, seção de
  método, cards de ofertas e guias recentes.
- Revisadas copies públicas com acentos, clareza editorial e linguagem de compra mais profissional.
- Adicionados assets públicos em `public/imagens/` para hero, cards fallback e compartilhamento
  social.
- Adicionado fallback editorial em `src/dados/conteudoPublico.ts` para manter home, listagens e
  detalhes navegáveis quando o Payload não estiver disponível.
- Criadas páginas úteis para `/ofertas/[slug]` e `/avaliacoes/[slug]`, evitando destino vazio ao
  clicar em cards.
- Personalizado o painel do Payload com branding, dashboard editorial, atalhos, métricas,
  agrupamento de coleções e CSS próprio.
- Adicionado helper central de SEO em `src/utilitarios/seo.ts`.
- Adicionado componente `DadosEstruturados` para JSON-LD e componente `EntradaAnimada` para
  transições suaves.
- Adicionados metadados canônicos, Open Graph e Twitter Card nas páginas públicas.
- Adicionados dados estruturados para home, listagens, ofertas, reviews, breadcrumbs, artigos e FAQ.
- Atualizado `sitemap.xml` para incluir produtos e avaliações publicados, além das rotas fixas.
- Atualizado `robots.txt` para bloquear `/admin` e `/api`, expor `Host` e apontar para o sitemap.
- Ajustados links afiliados externos para usar `rel="nofollow sponsored noopener noreferrer"`.
- Marcadas rotas placeholder sem conteúdo real como `noindex, follow`.
- Atualizada documentação de arquitetura, SEO, modelo de conteúdo e README para refletir a nova
  implementação.
- Atualizado o painel administrativo para usar Tailwind CSS v4 no admin, layout responsivo,
  navegação mais completa, métricas acessíveis e links internos normalizados.
- Reforçada a segurança do dashboard: métricas respeitam `overrideAccess: false` com o usuário
  logado, sem cache persistente de resultado entre requisições.
- Tornadas obrigatórias em runtime as variáveis `PAYLOAD_SECRET` e `DATABASE_URL`, com placeholders
  não sensíveis apenas durante `next build`.
- Adicionada documentação de segurança em `docs/seguranca.md`.
