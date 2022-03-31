import { useEffect, useRef, useState, useReducer, RefObject } from 'react'

export type Target = (EventTarget | Element | Node) & {
  rect?: DOMRect
}

export type PosCalculation = (
  targetRect: DOMRect,
  elementRect: DOMRect,
  positionProps: PositionProps
) => number

export type MaxMinCalculation = (
  value: number,
  targetRect: DOMRect,
  elementRect: DOMRect,
  positionProps: PositionProps,
  position: Position
) => number

export type SelectTarget = (t: Target) => Target

export type PositionProps = {
  width?: string | number | undefined
  position?: 'left' | 'right' | 'top' | 'bottom'
  placement?: 'center' | 'left' | 'right'
  variant?: 'over' | 'detached'
  offset?: { x: number; y: number }
  selectTarget?: SelectTarget
}

export type Position = {
  containerWidth?: number
  y?: number
  x?: number
  bottom?: number
  width?: number | string
  spaceOnTop?: boolean
  correctedY?: number
  elementRect?: DOMRect
  targetRect?: DOMRect
  minWidth?: number | string
  position?: 'left' | 'right' | 'top' | 'bottom'
  placement?: 'center' | 'left' | 'right'
}

const selectSelf: SelectTarget = (t) => t

const xCalculation: PosCalculation = (rect, elemRect, { position }) => {
  let x = rect.left === undefined ? rect.x : rect.left

  if (position === 'left') {
    x -= rect.width + 10
  }

  if (position === 'right') {
    x += rect.width + 10
  }

  return x
}

const yCalculation: PosCalculation = (rect, elementRect, posProps) => {
  const y = (rect.top === undefined ? rect.y : rect.top) + rect.height + 10

  if (
    posProps.position === 'left' ||
    posProps.position === 'right' ||
    posProps.variant === 'over'
  ) {
    return y - (rect.height + 10)
  }

  return y
}

const maxYCalculation: MaxMinCalculation = (y, targetRect, elementRect) => {
  const maxH = innerHeight - 30
  if (y + elementRect.height > maxH) {
    const over = y + elementRect.height - maxH
    return y - over
  }
  return y
}

const maxXCalculation: MaxMinCalculation = (
  x,
  targetRect,
  elementRect,
  posProps,
  pos
) => {
  let w = elementRect.width
  if (typeof pos.width === 'number') {
    w = pos.width
  }
  const maxW = innerWidth - 30
  if (posProps.placement === 'right') {
    const diff = pos.containerWidth - w
    if (x + diff < 15) {
      x = -1 * diff + 15
    }
  } else if (posProps.placement === 'center') {
    const diff = pos.containerWidth - w
    if (x + diff < 15) {
      x = (-1 * diff) / 2 + 15
    }
    const actualW = (-1 * diff) / 2 + pos.containerWidth
    if (x + actualW > maxW) {
      const over = x + actualW - maxW
      x = x - over + 12.5
    }
  } else {
    if (x + w > maxW) {
      const over = x + w - maxW
      x = x - over + 12.5
    }
  }
  if (x < 15) {
    return 15
  }
  return x
}

export type Resize = () => void

const getTargetRect = (target: Target, selectTarget: SelectTarget): DOMRect => {
  const t = selectTarget(target)
  // @ts-ignore
  if (t.getBoundingClientRect) {
    // @ts-ignore
    return t.getBoundingClientRect()
  }
  // @ts-ignore
  return { left: 0, top: 0, height: 0, width: 0, bottom: 0, right: 0 }
}

export default (
  target: Target,
  positionProps: PositionProps = {}
): [RefObject<HTMLDivElement>, Position | undefined, Resize] => {
  const { selectTarget = selectSelf } = positionProps

  if (positionProps.position === 'top') {
    console.warn('Top position is not supported yet')
  }

  if (
    (positionProps.position === 'left' || positionProps.position === 'right') &&
    positionProps.variant === 'over'
  ) {
    console.warn('Left/Right position + variant: over is not supported yet')
  }

  if (positionProps.position === 'left' && !positionProps.placement) {
    positionProps.placement = 'right'
  }

  if (positionProps.position === 'right' && !positionProps.placement) {
    positionProps.placement = 'left'
  }

  const elementRef: RefObject<HTMLDivElement> = useRef()
  const [position, setPosition] = useState<Position>({
    width: positionProps.width,
    position: positionProps.position,
    placement: positionProps.placement,
  })

  const [sizeForceUpdate, resize] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    const calcSize = () => {
      const rect = target.rect || getTargetRect(target, selectTarget)
      const elementRect = elementRef.current.getBoundingClientRect()
      const pos: Position = {
        position: positionProps.position,
        placement: positionProps.placement,
        width: positionProps.width,
      }
      pos.elementRect = elementRect
      pos.targetRect = rect

      pos.containerWidth = rect.width

      const calcedX = xCalculation(rect, elementRect, positionProps)

      const calcedY = yCalculation(rect, elementRect, positionProps)

      pos.x = maxXCalculation(calcedX, rect, elementRect, positionProps, pos)

      pos.y = maxYCalculation(calcedY, rect, elementRect, positionProps, pos)

      pos.bottom = null

      if (pos.y < rect.top) {
        pos.spaceOnTop = true
        const windowHeight = innerHeight

        if (15 + elementRef.current.scrollHeight > rect.top) {
          if (elementRect.height > windowHeight - 40) {
            pos.bottom = null
          }
        } else {
          if (
            positionProps.position === 'left' ||
            positionProps.position === 'right'
          ) {
            pos.bottom = windowHeight - (rect.top + rect.height)
          } else {
            pos.bottom = windowHeight - rect.top + 15
          }
        }
        pos.y = 15
      } else {
        pos.spaceOnTop = false
      }
      setPosition(pos)
    }
    calcSize()
    addEventListener('resize', calcSize)
    return () => {
      removeEventListener('resize', calcSize)
    }
  }, [target, sizeForceUpdate])

  return [elementRef, position, resize]
}
