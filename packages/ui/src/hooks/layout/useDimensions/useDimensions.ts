import React from 'react'
import { useSafeLayoutEffect } from '../useSafeLayoutEffect'
import { BoxModel, getBox, defaultBox, off, on } from '@aviato/utils'

/**
 * Reack hook to measure a component's dimensions.
 *
 * @param ref - ref of the component to measure
 * @param shouldObserve - if `true`, resize and scroll observers will be turned on
 */
export function useDimensions(
  ref: React.RefObject<HTMLElement>,
  shouldObserve: boolean = false
): BoxModel {
  const [dimensions, setDimensions] = React.useState<BoxModel>(defaultBox)
  const rafId = React.useRef<number>()

  useSafeLayoutEffect(() => {
    if (!ref.current) return undefined

    const node = ref.current

    function measureDimensions() {
      rafId.current = requestAnimationFrame(() => {
        const boxModel = getBox(node)
        setDimensions(boxModel)
      })
    }

    measureDimensions()

    if (shouldObserve) {
      on(window, 'resize', measureDimensions)
      on(window, 'scroll', measureDimensions)
    }

    return () => {
      if (shouldObserve) {
        off(window, 'resize', measureDimensions)
        off(window, 'scroll', measureDimensions)
      }

      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [shouldObserve])

  return dimensions
}
