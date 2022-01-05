import React, { useCallback, useState } from 'react'
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes'
import { getCurrentTheme, themes } from './theme'
import { useHasLoaded } from '@aviato/hooks'
import { IconButton } from '~/components/Input/Button'

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

export const ToggleThemeButton = () => {
  const hasLoaded = useHasLoaded()
  const { setTheme, theme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  const toggleTheme = useCallback(() => {
    const targetTheme = getCurrentTheme() === 'light' ? 'dark' : 'light'

    setTheme(targetTheme)
    setCurrentTheme(targetTheme)
  }, [setTheme])

  if (!hasLoaded) {
    return null
  }

  return (
    <IconButton
      type="ghost"
      onClick={toggleTheme}
      icon={currentTheme === 'light' ? 'IconDark' : 'IconLight'}
    />
  )
}
