# Segurança

Este documento registra decisões de segurança do Ofertas 4You que precisam ser preservadas em
mudanças futuras.

## Variáveis sensíveis

- `.env` e arquivos `.env.*` reais não devem ser versionados.
- `.env.example` deve conter apenas placeholders.
- `PAYLOAD_SECRET` e `DATABASE_URL` são obrigatórios em runtime.
- `PAYLOAD_SECRET` deve ser forte e único por ambiente.
- `DATABASE_URL` deve apontar para a rede interna do Docker em produção, usando o host `postgres`.
- Não imprima valores completos de segredos, URLs de banco, tokens ou senhas em logs.

Durante `next build`, `payload.config.ts` usa placeholders não sensíveis se `PAYLOAD_SECRET` ou
`DATABASE_URL` não estiverem disponíveis. Isso evita embutir segredos reais na imagem Docker. Esses
placeholders só devem valer durante o build; em runtime a aplicação deve falhar se as variáveis
obrigatórias estiverem ausentes.

## Admin Payload

- O admin fica em `/admin` e depende da autenticação do Payload.
- Requisições sem sessão para `/admin` devem exibir login, não o dashboard personalizado.
- Links do painel que abrem nova aba devem usar `rel="noopener noreferrer"`.
- O dashboard não deve usar e-mail como fallback de saudação. Se `nome` não existir, use saudação
  genérica.

## Métricas do dashboard

As métricas do dashboard usam a Local API do Payload com:

```txt
overrideAccess: false
user: usuário logado
```

Isso garante que as contagens respeitem as regras de acesso das coleções. A implementação deduplica
consultas simultâneas por usuário apenas enquanto a consulta está em andamento. Não mantenha cache
persistente de resultado entre requisições, porque uma mudança ou revogação de permissão precisa
valer no próximo carregamento.

## Conteúdo e injeção

- Textos exibidos no admin devem ser renderizados pelo React, sem `dangerouslySetInnerHTML`.
- URLs internas do admin devem ser montadas com normalização de barras.
- Links afiliados externos na frente pública devem usar `rel="nofollow sponsored noopener noreferrer"`.
- JSON-LD público deve continuar passando por serialização segura em `src/utilitarios/seo.ts`.

## Checklist antes de publicar

```bash
npm run lint
npx tsc --noEmit
npm run build
docker compose up -d --build app
```

Depois de subir o container:

- `/saude` deve retornar `status: ok` e `banco: ok`.
- `/admin` sem sessão não deve renderizar `.of4u-admin-dashboard`.
- O serviço `app` não deve usar os placeholders de build em runtime.
