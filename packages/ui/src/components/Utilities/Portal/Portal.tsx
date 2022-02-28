import React, { ReactNode, ReactPortal, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIsomorphicEffect } from '~/hooks'
import { getZIndex } from '~/theme'

interface BasePortalProps {
  /**
   * Portal z-index hierachy
   */
  zIndex?: number

  /**
   * Target where portal will render it's children
   */
  target?: HTMLElement | string

  /**
   * Children - any React node
   */
  children: ReactNode
}

function BasePortal({
  zIndex = 1,
  target,
  children,
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

BasePortal.displayName = 'BasePortal'

export interface PortalProps {
  /**
   * Portal z-index hierachy
   */
  zIndex?: number

  /**
   * Target where portal will render it's children
   */
  target?: HTMLElement | string

  /**
   * Whether to render the target element in a Portal
   */
  disablePortal?: boolean

  /**
   * Children - any React node
   */
  children: ReactNode
}

export function Portal({
  target,
  zIndex = getZIndex('Popover'),
  disablePortal = true,
  children,
}: PortalProps) {
  if (disablePortal) {
    return <div style={{ position: 'relative', zIndex }}>{children}</div>
  }

  return (
    <BasePortal zIndex={zIndex} target={target}>
      {children}
    </BasePortal>
  )
}

Portal.displayName = 'Portal'
