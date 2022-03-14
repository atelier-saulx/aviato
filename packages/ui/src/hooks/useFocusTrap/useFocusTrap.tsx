import { useCallback, useEffect, useRef } from 'react'
import { FOCUS_SELECTOR, focusable, tabbable } from './tabbable'
import { scopeTab } from './scopeTab'
import { createAriaHider } from './createAriaHider'
import { log } from '@aviato/utils'

export function useFocusTrap(
  isActive = true
): (instance: HTMLElement | null) => void {
  const ref = useRef<HTMLElement | null>()
  const restoreAria = useRef<Function | null>(null)

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (!isActive) {
        return
      }

      if (restoreAria.current) {
        restoreAria.current()
      }

      if (node) {
        const processNode = (_node: HTMLElement) => {
          restoreAria.current = createAriaHider(_node)

          let focusElement: HTMLElement = node.querySelector('[data-autofocus]')

          if (!focusElement) {
            const children = Array.from<HTMLElement>(
              node.querySelectorAll(FOCUS_SELECTOR)
            )
            focusElement =
              children.find(tabbable) || children.find(focusable) || null
            if (!focusElement && focusable(node)) focusElement = node
          }

          if (focusElement) {
            focusElement.focus()
          } else if (process.env.NODE_ENV === 'development') {
            log.global.warn(
              'Failed to find focusable element within provided node',
              node
            )
          }
        }

        // Delay processing the HTML node by a frame. This ensures focus is assigned correctly.
        setTimeout(() => {
          if (node.ownerDocument) {
            processNode(node)
          } else if (process.env.NODE_ENV === 'development') {
            log.global.warn('Ref node is not part of the dom', node)
          }
        })

        ref.current = node
      } else {
        ref.current = null
      }
    },
    [isActive]
  )

  useEffect(() => {
    if (!isActive) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && ref.current) {
        scopeTab(ref.current, event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive])

  return setRef
}
