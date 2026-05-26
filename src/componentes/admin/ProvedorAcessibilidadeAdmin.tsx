'use client'

import { useEffect, type ReactNode } from 'react'

const traduzirRotuloInterno = (elemento: Element) => {
  const rotulo = elemento.getAttribute('aria-label')

  if (!rotulo) {
    return
  }

  if (rotulo === 'Abrir Cardápio') {
    elemento.setAttribute('aria-label', 'Abrir menu')
    return
  }

  if (rotulo === 'Fechar Cardápio') {
    elemento.setAttribute('aria-label', 'Fechar menu')
    return
  }

  if (rotulo.startsWith('Notifications')) {
    elemento.setAttribute('aria-label', rotulo.replace('Notifications', 'Notificações'))
    return
  }

  if (rotulo === 'Close toast') {
    elemento.setAttribute('aria-label', 'Fechar notificação')
    return
  }

  if (rotulo === 'Edit link') {
    elemento.setAttribute('aria-label', 'Editar link')
    return
  }

  if (rotulo === 'Remove link') {
    elemento.setAttribute('aria-label', 'Remover link')
    return
  }

  if (rotulo === 'Insert Paragraph') {
    elemento.setAttribute('aria-label', 'Inserir parágrafo')
    return
  }

  if (rotulo === 'Drag to move') {
    elemento.setAttribute('aria-label', 'Arrastar para mover')
  }
}

const traduzirRotulosInternos = (raiz: ParentNode) => {
  if (raiz instanceof Element) {
    traduzirRotuloInterno(raiz)
  }

  raiz.querySelectorAll('[aria-label]').forEach(traduzirRotuloInterno)
}

export const ProvedorAcessibilidadeAdmin = ({ children }: { children?: ReactNode }) => {
  useEffect(() => {
    traduzirRotulosInternos(document)

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          traduzirRotuloInterno(mutation.target)
        }

        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            traduzirRotulosInternos(node)
          }
        })
      })
    })
    observer.observe(document.body, {
      attributeFilter: ['aria-label'],
      attributes: true,
      childList: true,
      subtree: true,
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return children
}
