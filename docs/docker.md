# Docker e VPS

O projeto deve rodar por Docker Compose na VPS da Hostinger.

## Servicos

```txt
app
postgres
cron-runner
```

## Portas

O container `app` escuta internamente em `3000`, mas o host expoe a aplicacao em `3002`.

```txt
host:3002 -> app:3000
```

O Postgres nao expoe porta no host. A comunicacao acontece pela rede interna do Docker:

```txt
app -> postgres:5432
cron-runner -> app:3000
cron-runner -> postgres:5432
```

## Variaveis principais

- `PORTA_APP`: porta externa do site, padrao `3002`.
- `POSTGRES_DB`: nome do banco.
- `POSTGRES_USER`: usuario do banco.
- `POSTGRES_PASSWORD`: senha do banco.
- `DATABASE_URL`: conexao interna usada pelo Payload.
- `PAYLOAD_SECRET`: segredo usado pelo Payload.
- `NEXT_PUBLIC_URL`: URL publica do site.
- `URL_INTERNA_APP`: URL usada pelo `cron-runner` para falar com o app.
- `CRON_ATUALIZAR_OFERTAS`: agendamento da rotina inicial.
- `EXECUTAR_ROTINAS_AO_INICIAR`: executa a rotina ao iniciar o container quando `true`.
- `DESABILITAR_PAYLOAD_PUBLICO`: quando `true`, o site publico usa conteudo fallback sem consultar o Payload.

## Volumes

- `postgres-dados`: dados persistentes do banco.
- `midias`: arquivos enviados pelo Payload.

## Subida inicial

```bash
docker compose up -d --build
```

As imagens copiam o `.npmrc` junto com `package.json` e `package-lock.json` para garantir que
`npm ci` use a mesma resolucao de dependencias dentro e fora do container.

## Banco e migracoes

O esquema do Payload em producao e criado pelas migracoes versionadas em `src/migrations`.
Quando o app inicializa o Payload em `NODE_ENV=production`, as migracoes configuradas em
`payload.config.ts` sao aplicadas automaticamente no Postgres, se ainda nao tiverem rodado.

Depois de subir um banco novo, acesse:

```txt
http://localhost:3002/admin/create-first-user
```

Essa tela cria o primeiro usuario administrativo. Depois disso, o painel principal fica em
`/admin`.

## Verificacao

```txt
http://localhost:3002/saude
```

Deve responder com status `ok`.
Tambem valida a conexao com o Payload/Postgres e retorna `503` quando o banco nao estiver pronto.
