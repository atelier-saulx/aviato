import React, { ReactNode } from 'react'

import { MenuProvider } from './menuProvider'
import { ThemeProvider } from './themeProvider'

export interface AviatoProviderProps {
  children: ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  return (
    <ThemeProvider>
      <MenuProvider>{children}</MenuProvider>
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
