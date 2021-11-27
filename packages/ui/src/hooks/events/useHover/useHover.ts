import { useState, useCallback, useRef } from 'react'
import { off, on } from '../../../utils'

function useHover<T extends HTMLElement>(): [
  (node?: T | null) => void,
  boolean
] {
  const [value, setValue] = useState(false)

  const handleMouseOver = useCallback(() => setValue(true), [])
  const handleMouseOut = useCallback(() => setValue(false), [])

  const ref = useRef<T>()

  const callbackRef = useCallback<(node?: null | T) => void>(
    (node) => {
      if (ref.current) {
        off(ref.current, 'mouseover', handleMouseOver)
        off(ref.current, 'mouseout', handleMouseOut)
      }

      ref.current = node ?? undefined

      if (ref.current) {
        on(ref.current, 'mouseover', handleMouseOver)
        on(ref.current, 'mouseout', handleMouseOut)
      }
    },
    [handleMouseOver, handleMouseOut]
  )

  return [callbackRef, value]
}

export { useHover }
