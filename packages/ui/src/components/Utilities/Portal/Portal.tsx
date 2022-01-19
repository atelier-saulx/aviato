import React, { ReactNode, ReactPortal, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useIsomorphicEffect } from '@aviato/hooks'

export interface PortalProps {
  children: ReactNode
  zIndex?: number
  target?: HTMLElement | string
  className?: string
}

export function Portal({
  children,
  zIndex = 1,
  target,
}: PortalProps): ReactPortal {
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
