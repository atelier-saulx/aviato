import React from 'react'
import { useDimensions } from '../useDimensions'
import { Rect } from '~/utils'

/**
 * Reack hook to measure a component's dimensions.
 *
 * @param ref - ref of the component to measure
 * @param shouldObserve - if `true`, resize and scroll observers will be turned on
 */
export function useElementSize(
  ref: React.RefObject<HTMLElement>,
  shouldObserve: boolean = false,
  preciseNumbers: boolean = false
): Rect {
  const { borderBox } = useDimensions(ref, shouldObserve)
  const { top, right, bottom, left, width, height, x, y, center } = borderBox
  const { x: centerX, y: centerY } = center

  const getValue = (input: number) => {
    return preciseNumbers ? input : Math.ceil(input)
  }

  return {
    top: getValue(top),
    right: getValue(right),
    bottom: getValue(bottom),
    left: getValue(left),
    width: getValue(width),
    height: getValue(height),
    x: getValue(x),
    y: getValue(y),
    center: {
      x: getValue(centerX),
      y: getValue(centerY),
    },
  }
}
