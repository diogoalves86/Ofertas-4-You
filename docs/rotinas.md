# Rotinas

O projeto possui um container separado chamado `cron-runner`.

## Objetivo

Executar rotinas agendadas sem misturar tarefas de importacao, atualizacao e integracao com o
servidor principal do site.

## O que existe hoje

Arquivo principal:

```txt
rotinas/cron.ts
```

Tarefa inicial:

```txt
rotinas/tarefas/atualizarOfertas.ts
```

A tarefa atual valida a comunicacao com a aplicacao pela rota interna `/saude` e deixa o ponto de
entrada pronto para integracoes futuras.

## Agendamento

O agendamento e configurado por:

```txt
CRON_ATUALIZAR_OFERTAS=0 */6 * * *
```

Por padrao, a rotina fica preparada para executar a cada 6 horas.

## Regras

- Nao ha automacao de navegador neste projeto inicial.
- O `cron-runner` nao possui dependencias de navegador.
- Rotinas futuras devem preferir APIs oficiais, Apify ou conectores externos.
- Atualizacoes de conteudo devem preferir a API do Payload em vez de escrita direta no banco.
