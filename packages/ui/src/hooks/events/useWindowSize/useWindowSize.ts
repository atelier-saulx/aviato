import { useEffect } from 'react'
import { useRafState } from '~/hooks/state/useRafState'
import { isClient, off, on } from '~/utils'

function useWindowSize(initialWidth = Infinity, initialHeight = Infinity) {
  const [state, setState] = useRafState<{ width: number; height: number }>({
    width: isClient ? window.innerWidth : initialWidth,
    height: isClient ? window.innerHeight : initialHeight,
  })

  useEffect((): (() => void) | void => {
    if (isClient) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }

      on(window, 'resize', handler)

      return () => {
        off(window, 'resize', handler)
      }
    }
  }, [])

  return state
}

export { useWindowSize }
