import { useEffect, useRef, useState, useReducer, RefObject } from 'react'

export type Align = 'flex-start' | 'center' | 'flex-end'

export type Target = (Element | Node) & {
  rect?: ClientRect
}

export type PosCalculation<T = number> =
  | ((targetRect: ClientRect, elementRect: ClientRect, align: Align) => T)
  | T

export type MaxMinCalculation<T = number> =
  | ((
      value: T,
      elementRect: ClientRect,
      align: Align,
      targetRect: ClientRect,
      position: Position
    ) => T)
  | T

export type SelectTarget = (t: Target) => Target

export type PositionProps = {
  selectTarget?: SelectTarget
  width?: PosCalculation<string | number>
  x?: PosCalculation
  y?: PosCalculation
  maxY?: MaxMinCalculation
  maxX?: MaxMinCalculation
  align?: Align
}

export type PositionPropsFn = PositionProps & {
  target: Target
}

export type PositionPropsFnOptional = PositionProps & {
  target?: Target
}

export type Position = {
  containerWidth?: number
  y?: number
  x?: number
  bottom?: number
  width?: number | string
  spaceOnTop?: boolean
  correctedY?: number
  elementRect?: ClientRect
  targetRect?: ClientRect
  minWidth?: number | string
}

const selectSelf: SelectTarget = (t) => t

// @ts-ignore
const xCalculation: PosCalculation = ({ left, x }) => {
  return left === undefined ? x : left
}

// @ts-ignore
const yCalculation: PosCalculation = ({ top, height, y }) =>
  (top === undefined ? y : top) + height + 10

const maxYCalculation: MaxMinCalculation = (y, elem) => {
  const maxH = global.innerHeight - 30
  if (y + elem.height > maxH) {
    const over = y + elem.height - maxH
    return y - over
  }
  return y
}

const maxXCalculation: MaxMinCalculation = (x, elem, align, _rect, pos) => {
  let w = elem.width
  if (typeof pos.width === 'number') {
    w = pos.width
  }
  const maxW = global.innerWidth - 30
  if (align === 'flex-end') {
    const diff = pos.containerWidth - w
    if (x + diff < 15) {
      x = -1 * diff + 15
    }
  } else if (align === 'center') {
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

const getTargetRect = (
  target: Target,
  selectTarget: SelectTarget
): ClientRect => {
  const t = selectTarget(target)
  // @ts-ignore
  if (t.getBoundingClientRect) {
    // @ts-ignore
    return t.getBoundingClientRect()
  }
  // @ts-ignore
  return { left: 0, top: 0, height: 0, width: 0, bottom: 0, right: 0 }
}

export default ({
  target,
  selectTarget = selectSelf,
  width = 'auto',
  x = xCalculation,
  y = yCalculation,
  maxY = maxYCalculation,
  maxX = maxXCalculation,
  align = 'center',
}: PositionPropsFn): [
  RefObject<HTMLDivElement>,
  Position | undefined,
  Resize
] => {
  const elementRef: RefObject<HTMLDivElement> = useRef()
  const [position, setPosition] = useState<Position>()
  const [sizeForceUpdate, resize] = useReducer((x) => x + 1, 0)
  useEffect(() => {
    const calcSize = () => {
      const rect = target.rect || getTargetRect(target, selectTarget)
      const elementRect = elementRef.current.getBoundingClientRect()
      const pos: Position = {}
      pos.elementRect = elementRect
      pos.targetRect = rect

      pos.width =
        typeof width === 'function' ? width(rect, elementRect, align) : width

      pos.containerWidth = rect.width

      const calcedX = typeof x === 'function' ? x(rect, elementRect, align) : x
      const calcedY = typeof y === 'function' ? y(rect, elementRect, align) : y

      pos.x =
        typeof maxX === 'function'
          ? maxX(calcedX, elementRect, align, rect, pos)
          : Math.min(maxX, calcedX)

      pos.y =
        typeof maxY === 'function'
          ? maxY(calcedY, elementRect, align, rect, pos)
          : Math.min(maxY, calcedY)

      pos.bottom = null

      if (pos.y < rect.top) {
        pos.spaceOnTop = true
        const windowHeight = global.innerHeight

        if (15 + elementRef.current.scrollHeight > rect.top) {
          if (elementRect.height > windowHeight - 40) {
            pos.bottom = null
          }
        } else {
          pos.bottom = windowHeight - rect.top + 15
        }
        pos.y = 15
      } else {
        pos.spaceOnTop = false
      }
      setPosition(pos)
    }
    calcSize()
    global.addEventListener('resize', calcSize)
    return () => {
      global.removeEventListener('resize', calcSize)
    }
  }, [target, sizeForceUpdate])

  return [elementRef, position, resize]
}
