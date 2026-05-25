'use client'

import { MotionConfig } from 'motion/react'
import type { ReactNode } from 'react'

const transicaoPadrao = {
  duration: 0.32,
  ease: [0.22, 1, 0.36, 1],
} as const

type Propriedades = {
  children: ReactNode
}

export function ProvedorAnimacoes({ children }: Propriedades) {
  return (
    <MotionConfig reducedMotion="user" transition={transicaoPadrao}>
      {children}
    </MotionConfig>
  )
}
