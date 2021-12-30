import { clamp, noop, off, on } from '@aviato/utils'
import { useEffect, useState, useRef } from 'react'

export interface UseMovePosition {
  x: number
  y: number
}

export const clampUseMovePosition = (position: UseMovePosition) => ({
  x: clamp({ min: 0, max: 1, value: position.x }),
  y: clamp({ min: 0, max: 1, value: position.y }),
})

interface useMoveHandlers {
  onScrubStart?(): void
  onScrubEnd?(): void
}

export function useMove<T extends HTMLElement = HTMLDivElement>(
  onChange: (value: UseMovePosition) => void,
  handlers?: useMoveHandlers
) {
  const ref = useRef<T>()
  const mounted = useRef<boolean>(false)
  const isSliding = useRef(false)
  const frame = useRef(0)
  const [isActive, setIsActive] = useState(false)
  const { onScrubStart = noop, onScrubEnd = noop } = handlers ?? {}

  useEffect(() => {
    mounted.current = true
  }, [])

  useEffect(() => {
    const onScrub = ({ x, y }: UseMovePosition) => {
      cancelAnimationFrame(frame.current)

      frame.current = requestAnimationFrame(() => {
        if (mounted.current && ref.current) {
          ref.current.style.userSelect = 'none'
          const rect = ref.current.getBoundingClientRect()

          if (rect.width && rect.height) {
            onChange({
              x: clamp({ value: (x - rect.left) / rect.width, min: 0, max: 1 }),
              y: clamp({ value: (y - rect.top) / rect.height, min: 0, max: 1 }),
            })
          }
        }
      })
    }

    const bindEvents = () => {
      on(document, 'mousemove', onMouseMove)
      on(document, 'mouseup', stopScrubbing)
      on(document, 'touchmove', onTouchMove)
      on(document, 'touchend', stopScrubbing)
    }

    const unbindEvents = () => {
      off(document, 'mousemove', onMouseMove)
      off(document, 'mouseup', stopScrubbing)
      off(document, 'touchmove', onTouchMove)
      off(document, 'touchend', stopScrubbing)
    }

    const startScrubbing = () => {
      if (!isSliding.current && mounted.current) {
        isSliding.current = true
        onScrubStart()
        setIsActive(true)
        bindEvents()
      }
    }

    const stopScrubbing = () => {
      if (isSliding.current && mounted.current) {
        isSliding.current = false
        onScrubEnd()
        setIsActive(false)
        unbindEvents()
      }
    }

    const onMouseDown = (event: MouseEvent) => {
      startScrubbing()
      onMouseMove(event)
    }

    const onMouseMove = (event: MouseEvent) => {
      return onScrub({ x: event.clientX, y: event.clientY })
    }

    const onTouchStart = (event: TouchEvent) => {
      startScrubbing()

      if (event?.cancelable) {
        event?.preventDefault()
      }

      onTouchMove(event)
    }

    const onTouchMove = (event: TouchEvent) => {
      if (event?.cancelable) {
        event?.preventDefault()
      }

      onScrub({
        x: event.changedTouches[0].clientX,
        y: event.changedTouches[0].clientY,
      })
    }

    on(ref.current, 'mousedown', onMouseDown, { passive: false })
    on(ref.current, 'touchstart', onTouchStart, { passive: false })

    return () => {
      if (ref.current) {
        off(ref.current, 'mousedown', onMouseDown)
        off(ref.current, 'touchstart', onTouchStart)
      }
    }
  }, [ref.current])

  return { ref, isActive }
}
