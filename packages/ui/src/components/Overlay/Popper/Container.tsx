import React from 'react'
import { getZIndex } from '~/theme'
import { Portal } from '../../Utilities'

export interface PopperContainerProps {
  children: React.ReactNode
  zIndex?: number
  className?: string
  withinPortal?: boolean
}

export function PopperContainer({
  children,
  zIndex = getZIndex('Popover'),
  className,
  withinPortal = true,
}: PopperContainerProps) {
  if (withinPortal) {
    return (
      <Portal className={className} zIndex={zIndex}>
        {children}
      </Portal>
    )
  }

  return (
    <div className={className} style={{ position: 'relative', zIndex }}>
      {children}
    </div>
  )
}
