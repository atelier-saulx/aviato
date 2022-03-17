import React, { ReactNode } from 'react'

import { MenuProvider, ThemeProvider } from '~/providers'
import { ModalProvider } from '~/components/Overlay'

export interface AviatoProviderProps {
  children: ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  return (
    <ThemeProvider>
      <MenuProvider>
        <ModalProvider>{children}</ModalProvider>
      </MenuProvider>
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
