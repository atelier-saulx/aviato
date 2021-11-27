import { useState, useCallback, EventHandler, SyntheticEvent } from 'react'

export type Hover = [
  {
    onMouseDown: EventHandler<SyntheticEvent>
    onMouseUp: EventHandler<SyntheticEvent>
    onMouseEnter: EventHandler<SyntheticEvent>
    onMouseLeave: EventHandler<SyntheticEvent>
    onDragStart: EventHandler<SyntheticEvent>
  },
  boolean,
  boolean
]

function useHover(onHover?: EventHandler<SyntheticEvent>): Hover {
  const [isHover, setHover] = useState(false)
  const [isActive, setActive] = useState(false)

  const handleMouseOver = useCallback((e) => {
    setHover(true)
    if (onHover) {
      onHover(e)
    }
  }, [])

  const handleMouseOut = useCallback(() => setHover(false), [])
  const handleDown = useCallback(() => setActive(true), [])
  const handleUp = useCallback(() => setActive(false), [])

  return [
    {
      onMouseDown: handleDown,
      onMouseUp: handleUp,
      onMouseEnter: handleMouseOver,
      onMouseLeave: handleMouseOut,
      onDragStart: handleMouseOut,
    },
    isHover,
    isActive,
  ]
}

export { useHover }
