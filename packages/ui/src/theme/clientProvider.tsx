import React, { createContext, useContext, useEffect, useState } from 'react'
import { LocalStorage } from '@aviato/utils'
import { themes } from './theme'
import { THEME_STORAGE_KEY } from './provider'

type ColorMode = 'light' | 'dark'

export type ThemeProps = {
  theme: ColorMode
  setTheme: (newValue: ColorMode) => void
}

export const ThemeContext = createContext<ThemeProps>({
  theme: 'light',
  setTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

function baseSetColorMode(newValue: ColorMode): void {
  document.documentElement.classList.remove(themes.dark)
  document.documentElement.classList.remove(themes.light)
  document.documentElement.classList.add(themes[newValue])
}

export const ThemeProvider: React.FC = ({ children }) => {
  const [colorMode, rawSetColorMode] = useState<ColorMode>('light')

  useEffect(() => {
    let initialColorMode = LocalStorage.getItem(THEME_STORAGE_KEY) as ColorMode
    if (!initialColorMode) {
      const root = document.documentElement
      initialColorMode = root.classList.contains(themes.dark) ? 'dark' : 'light'
    }

    rawSetColorMode(initialColorMode)
    baseSetColorMode(initialColorMode)
  }, [])

  const contextValue: ThemeProps = React.useMemo(() => {
    function setTheme(newValue: ColorMode): void {
      LocalStorage.setItem(THEME_STORAGE_KEY, newValue)
      baseSetColorMode(newValue)
      rawSetColorMode(newValue)
    }

    return {
      theme: colorMode,
      setTheme,
    }
  }, [colorMode, rawSetColorMode])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
