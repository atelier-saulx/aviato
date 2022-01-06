import React, { useContext, useEffect, useState } from 'react'
import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { themes } from './theme'

const COLOR_MODE_KEY = 'colorMode'

type ColorMode = 'light' | 'dark'

type SimpleThemeContextValue = {
  colorMode: ColorMode
  setColorMode: (newValue: ColorMode) => void
}

export const SimpleThemeContext = React.createContext<SimpleThemeContextValue>({
  colorMode: 'light',
  setColorMode: () => {},
})

function baseSetColorMode(newValue: ColorMode): void {
  document.documentElement.classList.remove(themes.dark)
  document.documentElement.classList.remove(themes.light)
  document.documentElement.classList.add(themes[newValue])
}

const SimpleThemeProvider: React.FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState<ColorMode>('light')

  useEffect(() => {
    let initialColorMode = localStorage.getItem(COLOR_MODE_KEY) as ColorMode
    if (!initialColorMode) {
      const root = document.documentElement
      initialColorMode = root.classList.contains(themes.dark) ? 'dark' : 'light'
    }

    rawSetColorMode(initialColorMode)
    baseSetColorMode(initialColorMode)
  }, [])

  const contextValue: SimpleThemeContextValue = React.useMemo(() => {
    function setColorMode(newValue: ColorMode): void {
      localStorage.setItem(COLOR_MODE_KEY, newValue)
      baseSetColorMode(newValue)
      rawSetColorMode(newValue)
    }

    return {
      colorMode,
      setColorMode,
    }
  }, [colorMode, rawSetColorMode])

  return (
    <SimpleThemeContext.Provider value={contextValue}>
      {children}
    </SimpleThemeContext.Provider>
  )
}

export const useThemeContext: () => SimpleThemeContextValue = () => {
  return useContext(SimpleThemeContext)
}

export interface ThemeProviderProps {
  children: React.ReactNode
  isNextProject?: boolean
}

export function ThemeProvider({
  isNextProject = false,
  children,
}: ThemeProviderProps) {
  if (!isNextProject) {
    return <SimpleThemeProvider>{children}</SimpleThemeProvider>
  }

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
