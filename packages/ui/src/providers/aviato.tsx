import React, { ReactNode } from 'react'

import { ThemeProvider } from '~/providers'
import { OverlayPortal } from '~/components/Overlay'

export interface AviatoProviderProps {
  children: ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  return (
    <ThemeProvider>
      {children}
      <OverlayPortal />
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
