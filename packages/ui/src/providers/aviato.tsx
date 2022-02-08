import React, { ReactNode } from 'react'
import { MenuProvider, ThemeProvider } from '~/providers'

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
