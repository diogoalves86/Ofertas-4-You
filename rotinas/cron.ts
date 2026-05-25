import cron from 'node-cron'

import { atualizarOfertas } from './tarefas/atualizarOfertas'

const agendamentoAtualizacao = process.env.CRON_ATUALIZAR_OFERTAS || '0 */6 * * *'
const executarAoIniciar = process.env.EXECUTAR_ROTINAS_AO_INICIAR === 'true'

const executarTarefa = async (nome: string, tarefa: () => Promise<void>) => {
  const inicio = new Date().toISOString()
  console.log(JSON.stringify({ evento: 'rotina_iniciada', nome, inicio }))

  try {
    await tarefa()
    console.log(JSON.stringify({ evento: 'rotina_finalizada', nome, inicio }))
  } catch (erro) {
    console.error(JSON.stringify({ evento: 'rotina_falhou', nome, erro: String(erro) }))
  }
}

if (!cron.validate(agendamentoAtualizacao)) {
  throw new Error(`Agendamento invalido para CRON_ATUALIZAR_OFERTAS: ${agendamentoAtualizacao}`)
}

console.log(
  JSON.stringify({
    evento: 'cron_runner_iniciado',
    agendamentoAtualizacao,
  }),
)

cron.schedule(agendamentoAtualizacao, () => {
  void executarTarefa('atualizar-ofertas', atualizarOfertas)
})

if (executarAoIniciar) {
  void executarTarefa('atualizar-ofertas', atualizarOfertas)
}

setInterval(() => undefined, 60_000)
