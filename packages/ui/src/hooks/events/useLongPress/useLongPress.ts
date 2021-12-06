import { useCallback, useRef } from 'react'
import { isTouchEvent, off, on } from '@aviato/utils'

type LongpressOptions = {
  isPreventDefault?: boolean
  delay?: number
}

function preventDefault(event: Event) {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}

function useLongPress(
  callback: (event: TouchEvent | MouseEvent) => void,
  { delay = 300, isPreventDefault = true }: LongpressOptions = {}
) {
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const target = useRef<EventTarget>()

  const start = useCallback(
    (event: TouchEvent | MouseEvent) => {
      // Prevent ghost click on mobile devices
      if (isPreventDefault && event.target) {
        on(event.target, 'touchend', preventDefault, { passive: false })
        target.current = event.target
      }
      timeout.current = setTimeout(() => callback(event), delay)
    },
    [callback, delay, isPreventDefault]
  )

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current)

    if (isPreventDefault && target.current) {
      off(target.current, 'touchend', preventDefault)
    }
  }, [isPreventDefault])

  return {
    onMouseDown: (event: any) => start(event),
    onTouchStart: (event: any) => start(event),
    onMouseUp: clear,
    onMouseLeave: clear,
    onTouchEnd: clear,
  } as const
}

export { useLongPress }
