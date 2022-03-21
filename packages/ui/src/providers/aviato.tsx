import React, { ReactNode } from 'react'

import { MenuProvider, ThemeProvider, OverlayProvider } from '~/providers'
import { ModalProvider } from '~/components/Overlay'

export interface AviatoProviderProps {
  children: ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  return (
    <ThemeProvider>
      <MenuProvider>
        <OverlayProvider>
          <ModalProvider>{children}</ModalProvider>
        </OverlayProvider>
      </MenuProvider>
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
