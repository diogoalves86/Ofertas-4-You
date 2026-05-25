import { NextResponse } from 'next/server'
import { getPayload } from 'payload'

import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    await payload.find({
      collection: 'usuarios',
      depth: 0,
      limit: 1,
    })

    return NextResponse.json({
      banco: 'ok',
      nome: 'Ofertas 4You',
      status: 'ok',
    })
  } catch {
    return NextResponse.json(
      {
        banco: 'indisponivel',
        nome: 'Ofertas 4You',
        status: 'erro',
      },
      { status: 503 },
    )
  }
}
