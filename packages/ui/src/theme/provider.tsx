import React from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { themes } from './theme'

export interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemeProvider
      disableTransitionOnChange
      attribute="class"
      defaultTheme="system"
      value={themes}
    >
      {children}
    </NextThemeProvider>
  )
}
