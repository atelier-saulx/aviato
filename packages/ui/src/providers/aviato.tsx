import React, { ReactNode } from 'react'

import { ThemeProvider } from '~/providers'
import { OverlayPortal } from '~/components/Overlay'
import { DialogProvider } from '~/components/Overlay/Dialog'
import { ToastProvider } from '~/components/Feedback/Toast'

export interface AviatoProviderProps {
  children: ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <DialogProvider>
          {children}
          <OverlayPortal />
        </DialogProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
