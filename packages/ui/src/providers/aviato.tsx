import React, { ReactNode } from 'react'

import { ThemeProvider } from '~/providers'
import { Overlay } from '~/components/BasedUI/Overlay'

export interface AviatoProviderProps {
  children: ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  return (
    <ThemeProvider>
      {children}
      <Overlay />
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
