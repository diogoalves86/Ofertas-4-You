'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Propriedades = {
  children: ReactNode
  className?: string
  delay?: number
}

export function EntradaAnimada({ children, className, delay = 0 }: Propriedades) {
  const reduzirMovimento = useReducedMotion()

  return (
    <motion.div
      animate={reduzirMovimento ? undefined : { opacity: 1, y: 0 }}
      className={className}
      initial={reduzirMovimento ? false : { opacity: 0, y: 18 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}
