import { useCallback, useEffect, useRef } from 'react'

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void]

export function useTimeoutFn(
  fn: Function,
  milliseconds: number = 0
): UseTimeoutFnReturn {
  const ready = useRef<boolean | null>(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const callback = useRef(fn)

  const isReady = useCallback(() => ready.current, [])

  const set = useCallback(() => {
    ready.current = false
    timeout.current && clearTimeout(timeout.current)

    timeout.current = setTimeout(() => {
      ready.current = true
      callback.current()
    }, milliseconds)
  }, [milliseconds])

  const clear = useCallback(() => {
    ready.current = null
    timeout.current && clearTimeout(timeout.current)
  }, [])

  // Update ref when function changes
  useEffect(() => {
    callback.current = fn
  }, [fn])

  // Set on mount, clear on unmount
  useEffect(() => {
    set()

    return clear
  }, [milliseconds])

  return [isReady, clear, set]
}
