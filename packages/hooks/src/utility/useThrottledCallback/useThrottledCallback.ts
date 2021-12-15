import { useCallback, useRef, useEffect } from 'react'

function isEventCheck(event) {
  return !!event
}

function useThrottledCallback(
  fn: Function,
  refs: any[] = [],
  frames: number = 1
): Function {
  const ref = useRef(null) as any

  const isMultiFrame = frames > 1

  useEffect(() => () => {
    if (ref.current) {
      global.cancelAnimationFrame(ref.current.timer)
      ref.current = false
    }
  })

  const handleMultiFrame = (event, data, target) => {
    let isEvent = false

    if (isEventCheck(event)) {
      if (!target) {
        target = event.currentTarget
      }

      if (event.persists) {
        event.persist()
      }

      isEvent = true
    }

    if (!ref.current) {
      const throttleAction = () => {
        ref.current.frames--
        if (ref.current.frames === 0) {
          if (isEvent) {
            event.currentTarget = target
          }
          ref.current = false
          fn(event, data)
        } else {
          ref.current.timer = global.requestAnimationFrame(throttleAction)
        }
      }

      ref.current = {
        timer: global.requestAnimationFrame(throttleAction),
        frames,
      }
    }
  }

  const handleSingleFrame = (event, data) => {
    let isEvent = false
    let target

    if (isEventCheck(event)) {
      isEvent = true
      target = event.currentTarget
      if (event.persists) {
        event.persist()
      }
    }

    if (!ref.current) {
      const action = () => {
        ref.current = false
        if (isEvent) {
          event.currentTarget = target
        }
        fn(event, data)
      }

      ref.current = {
        timer: global.requestAnimationFrame(action),
      }
    }
  }

  const throttledFn = useCallback((event, data, target) => {
    if (isMultiFrame) {
      return handleMultiFrame(event, data, target)
    } else {
      return handleSingleFrame(event, data)
    }
  }, refs)

  return throttledFn
}

export { useThrottledCallback }
