# Docker e VPS

O projeto deve rodar por Docker Compose na VPS da Hostinger.

## Serviços

```txt
app
postgres
cron-runner
```

## Portas

O container `app` escuta internamente em `3000`, mas o host expõe a aplicação em `3002`.

```txt
host:3002 -> app:3000
```

O Postgres não expõe porta no host. A comunicação acontece pela rede interna do Docker:

```txt
app -> postgres:5432
cron-runner -> app:3000
cron-runner -> postgres:5432
```

## Variáveis principais

- `PORTA_APP`: porta externa do site, padrão `3002`.
- `POSTGRES_DB`: nome do banco.
- `POSTGRES_USER`: usuário do banco.
- `POSTGRES_PASSWORD`: senha do banco.
- `DATABASE_URL`: conexão interna usada pelo Payload.
- `PAYLOAD_SECRET`: segredo usado pelo Payload.
- `NEXT_PUBLIC_URL`: URL pública do site. Também alimenta canonicals, Open Graph, Twitter Card,
  sitemap, robots e JSON-LD. Deve apontar para o domínio final em produção.
- `URL_INTERNA_APP`: URL usada pelo `cron-runner` para falar com o app.
- `CRON_ATUALIZAR_OFERTAS`: agendamento da rotina inicial.
- `EXECUTAR_ROTINAS_AO_INICIAR`: executa a rotina ao iniciar o container quando `true`.
- `DESABILITAR_PAYLOAD_PUBLICO`: quando `true`, o site público usa conteúdo fallback sem consultar
  o Payload. Útil para validar UX, SEO e build local sem Postgres disponível.

## Volumes

- `postgres-dados`: dados persistentes do banco.
- `midias`: arquivos enviados pelo Payload.

## Subida inicial

```bash
docker compose up -d --build
```

As imagens copiam o `.npmrc` junto com `package.json` e `package-lock.json` para garantir que
`npm ci` use a mesma resolução de dependências dentro e fora do container.

## Banco e migrações

O esquema do Payload em produção é criado pelas migrações versionadas em `src/migrations`.
Quando o app inicializa o Payload em `NODE_ENV=production`, as migrações configuradas em
`payload.config.ts` são aplicadas automaticamente no Postgres, se ainda não tiverem rodado.

Depois de subir um banco novo, acesse:

```txt
http://localhost:3002/admin/create-first-user
```

Essa tela cria o primeiro usuário administrativo. Depois disso, o painel principal fica em
`/admin`.

## Verificação

```txt
http://localhost:3002/saude
```

Deve responder com status `ok`.
Também valida a conexão com o Payload/Postgres e retorna `503` quando o banco não estiver pronto.
