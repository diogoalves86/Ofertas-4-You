import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({
    nome: 'Ofertas 4You',
    status: 'ok',
  })
}
