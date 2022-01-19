import React from 'react'
import { getZIndex } from '~/theme'
import { Portal } from '..'

export interface PopperContainerProps {
  children: React.ReactNode
  zIndex?: number
  className?: string
  withinPortal?: boolean
}

export function PopperContainer({
  children,
  zIndex = getZIndex('Popover'),
  withinPortal = true,
}: PopperContainerProps) {
  if (withinPortal) {
    return <Portal zIndex={zIndex}>{children}</Portal>
  }

  return <div style={{ position: 'relative', zIndex }}>{children}</div>
}
