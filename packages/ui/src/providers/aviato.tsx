import React, { ReactNode } from 'react'

import { ThemeProvider } from '~/providers'
import { OverlayPortal } from '~/components/Overlay'
import { DialogProvider } from '~/components/Overlay/Dialog'

export interface AviatoProviderProps {
  children: ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  return (
    <ThemeProvider>
      <DialogProvider>
        {children}
        <OverlayPortal />
      </DialogProvider>
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
