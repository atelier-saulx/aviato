import { useRef } from 'react'
import { useDidUpdate } from '../useDidUpdate'

interface UseFocusReturn {
  isOpen: boolean
  transitionDuration: number
  shouldReturnFocus?: boolean
}

/**
 * Returns focus to the previous active element
 */
export function useFocusReturn({
  isOpen,
  transitionDuration,
  shouldReturnFocus = true,
}: UseFocusReturn) {
  const lastActiveElement = useRef<HTMLElement>()
  const returnFocus = () => {
    if (
      lastActiveElement.current &&
      'focus' in lastActiveElement.current &&
      typeof lastActiveElement.current.focus === 'function'
    ) {
      lastActiveElement.current?.focus()
    }
  }

  useDidUpdate(() => {
    let timeout = -1

    const clearFocusTimeout = (event: KeyboardEvent) => {
      if (event.code === 'Tab') {
        window.clearTimeout(timeout)
      }
    }

    document.addEventListener('keydown', clearFocusTimeout)

    if (isOpen) {
      lastActiveElement.current = document.activeElement as HTMLElement
    } else if (shouldReturnFocus) {
      timeout = window.setTimeout(returnFocus, transitionDuration + 10)
    }

    return () => {
      window.clearTimeout(timeout)
      document.removeEventListener('keydown', clearFocusTimeout)
    }
  }, [isOpen])

  return returnFocus
}
