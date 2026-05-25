'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Propriedades = {
  children: ReactNode
  className: string
}

export function CartaoAnimado({ children, className }: Propriedades) {
  const reduzirMovimento = useReducedMotion()

  return (
    <motion.article
      className={className}
      whileHover={reduzirMovimento ? undefined : { y: -4 }}
      whileTap={reduzirMovimento ? undefined : { scale: 0.99 }}
    >
      {children}
    </motion.article>
  )
}
