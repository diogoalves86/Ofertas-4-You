# Rotinas

O projeto possui um container separado chamado `cron-runner`.

## Objetivo

Executar rotinas agendadas sem misturar tarefas de importação, atualização e integração com o
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

A tarefa atual valida a comunicação com a aplicação pela rota interna `/saude` e deixa o ponto de
entrada pronto para integrações futuras.

## Agendamento

O agendamento é configurado por:

```txt
CRON_ATUALIZAR_OFERTAS=0 */6 * * *
```

Por padrão, a rotina fica preparada para executar a cada 6 horas.

## Regras

- Não há automação de navegador neste projeto inicial.
- O `cron-runner` não possui dependências de navegador.
- Rotinas futuras devem preferir APIs oficiais, Apify ou conectores externos.
- Atualizações de conteúdo devem preferir a API do Payload em vez de escrita direta no banco.
