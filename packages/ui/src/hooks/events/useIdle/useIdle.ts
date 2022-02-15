import { useEffect, useState } from 'react'
import { off, on, Milliseconds, throttle } from '@aviato/utils'

const defaultEvents = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel',
]

const oneMinute: Milliseconds = (60 * 1000) as Milliseconds

function useIdle(
  milliseconds: number = oneMinute,
  initialState: boolean = false,
  events: string[] = defaultEvents
): boolean {
  const [state, setState] = useState<boolean>(initialState)

  useEffect(() => {
    let mounted = true
    let timeout: any
    let localState: boolean = state

    const set = (newState: boolean) => {
      if (mounted) {
        localState = newState
        setState(newState)
      }
    }

    const onEvent = throttle(50, () => {
      if (localState) {
        set(false)
      }

      clearTimeout(timeout)
      timeout = setTimeout(() => set(true), milliseconds)
    })

    const onVisibility = () => {
      if (!document.hidden) {
        onEvent()
      }
    }

    for (let index = 0; index < events.length; index++) {
      on(window, events[index], onEvent)
    }

    on(document, 'visibilitychange', onVisibility)

    timeout = setTimeout(() => set(true), milliseconds)

    return () => {
      mounted = false

      for (let index = 0; index < events.length; index++) {
        off(window, events[index], onEvent)
      }

      off(document, 'visibilitychange', onVisibility)
    }
  }, [milliseconds, events])

  return state
}

export { useIdle }
