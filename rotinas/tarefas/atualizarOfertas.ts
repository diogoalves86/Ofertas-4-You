const urlInternaApp = process.env.URL_INTERNA_APP || 'http://app:3000'

export async function atualizarOfertas() {
  const resposta = await fetch(`${urlInternaApp}/saude`)

  if (!resposta.ok) {
    throw new Error(`Aplicacao indisponivel: ${resposta.status}`)
  }

  console.log(
    JSON.stringify({
      evento: 'atualizacao_ofertas_reservada',
      mensagem: 'Ponto de entrada pronto para integracoes futuras com APIs e Apify.',
    }),
  )
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await atualizarOfertas()
}
