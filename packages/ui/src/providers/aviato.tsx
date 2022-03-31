import React, { ReactNode } from 'react'

// remove this OverlayProvider
import { MenuProvider, ThemeProvider, OverlayProvider } from '~/providers'
import { ModalProvider } from '~/components/Overlay'
import { Overlay } from '~/components/BasedUI/Overlay'

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
      <Overlay />
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
