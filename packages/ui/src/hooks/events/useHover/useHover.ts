import { useState, useCallback, useRef } from 'react'
import { off, on } from '~/utils'

type IsHovering = boolean
type IsActive = boolean

function useHover<Element extends HTMLElement>(): [
  (node?: Element | null) => void,
  IsHovering,
  IsActive
] {
  const [isHovering, setHoverState] = useState(false)
  const [isActive, setActiveState] = useState(false)

  const handleMouseOver = useCallback(() => setHoverState(true), [])
  const handleMouseOut = useCallback(() => setHoverState(false), [])

  const handleMouseDown = useCallback(() => setActiveState(true), [])
  const handleMouseUp = useCallback(() => setActiveState(false), [])

  const ref = useRef<Element>()

  const callbackRef = useCallback<(node?: null | Element) => void>(
    (node) => {
      if (ref.current) {
        off(ref.current, 'mouseenter', handleMouseOver)
        off(ref.current, 'mouseleave', handleMouseOut)
        off(ref.current, 'mousedown', handleMouseDown)
        off(ref.current, 'mouseup', handleMouseUp)
      }

      ref.current = node ?? undefined

      if (ref.current) {
        on(ref.current, 'mouseenter', handleMouseOver)
        on(ref.current, 'mouseleave', handleMouseOut)
        on(ref.current, 'mousedown', handleMouseDown)
        on(ref.current, 'mouseup', handleMouseUp)
      }
    },
    [handleMouseOver, handleMouseOut, handleMouseDown, handleMouseUp]
  )

  return [callbackRef, isHovering, isActive]
}

export { useHover }
