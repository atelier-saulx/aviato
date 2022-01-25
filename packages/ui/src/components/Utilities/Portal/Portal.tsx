import React, { ReactNode, ReactPortal, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIsomorphicEffect } from '~/hooks'
import { getZIndex } from '~/theme'

interface BasePortalProps {
  children: ReactNode
  zIndex?: number
  target?: HTMLElement | string
  className?: string
}

function BasePortal({
  children,
  zIndex = 1,
  target,
}: BasePortalProps): ReactPortal {
  const [mounted, setMounted] = useState(false)
  const ref = useRef<HTMLElement>()

  useIsomorphicEffect(() => {
    setMounted(true)

    ref.current = !target
      ? document.createElement('div')
      : typeof target === 'string'
      ? document.querySelector(target)
      : target

    if (!target) {
      document.body.appendChild(ref.current)
    }

    return () => {
      !target && document.body.removeChild(ref.current)
    }
  }, [target])

  if (!mounted) {
    return null
  }

  return createPortal(
    <div style={{ position: 'relative', zIndex }}>{children}</div>,
    ref.current
  )
}

export interface PopperContainerProps {
  /** PopperContainer children, for example, modal or popover */
  children: React.ReactNode

  /** Root element z-index property */
  zIndex?: number

  /** Whether to render the target element in a Portal */
  disablePortal?: boolean
}

export function Portal({
  children,
  zIndex = getZIndex('Popover'),
  disablePortal = true,
}: PopperContainerProps) {
  if (disablePortal) {
    return <div style={{ position: 'relative', zIndex }}>{children}</div>
  }

  return <BasePortal zIndex={zIndex}>{children}</BasePortal>
}
