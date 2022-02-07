import React, { useMemo, useState } from 'react'
import { MenuStateContext } from '~/components'
import { ThemeProvider } from '~/theme'

export interface AviatoProviderProps {
  children: React.ReactNode
}

export function AviatoProvider({ children }: AviatoProviderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const value = useMemo(() => ({ isMenuOpen, setIsMenuOpen }), [isMenuOpen])

  return (
    <ThemeProvider>
      <MenuStateContext.Provider value={value}>
        {children}
      </MenuStateContext.Provider>
    </ThemeProvider>
  )
}

AviatoProvider.displayName = 'AviatoProvider'
