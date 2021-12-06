import { darkTheme } from './index'
import React, { createContext, useEffect, useMemo, useState } from 'react'

export const COLOR_MODE_KEY = 'color-mode'

type ColorMode = 'light' | 'dark'

type ThemeContextValue = {
  colorMode: ColorMode
  setColorMode: (newValue: ColorMode) => void
}

const themes = {
  light: 'light',
  dark: darkTheme.className,
}

export const ThemeContext = createContext<ThemeContextValue>({
  colorMode: 'light',
  setColorMode: () => {},
})

export const ThemeProvider: React.FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState<ColorMode>('light')

  useEffect(() => {
    const root = document.documentElement
    const initialColorMode = root.classList.contains(themes.dark)
      ? 'dark'
      : 'light'

    rawSetColorMode(initialColorMode)
  }, [])

  const contextValue: ThemeContextValue = useMemo(() => {
    function setColorMode(newValue: ColorMode): void {
      document.documentElement.classList.remove(themes[colorMode])
      document.documentElement.classList.add(themes[newValue])
      localStorage.setItem(COLOR_MODE_KEY, newValue)
      rawSetColorMode(newValue)
    }

    return {
      colorMode,
      setColorMode,
    }
  }, [colorMode, rawSetColorMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
