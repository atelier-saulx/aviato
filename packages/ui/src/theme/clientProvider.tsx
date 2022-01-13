import React, { createContext, useContext, useEffect, useState } from 'react'
import { LocalStorage } from '@aviato/utils'
import { themes } from './theme'

const COLOR_MODE_KEY = 'colorMode'

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
    let initialColorMode = LocalStorage.getItem(COLOR_MODE_KEY) as ColorMode
    if (!initialColorMode) {
      const root = document.documentElement
      initialColorMode = root.classList.contains(themes.dark) ? 'dark' : 'light'
    }

    rawSetColorMode(initialColorMode)
    baseSetColorMode(initialColorMode)
  }, [])

  const contextValue: ThemeProps = React.useMemo(() => {
    function setTheme(newValue: ColorMode): void {
      LocalStorage.setItem(COLOR_MODE_KEY, newValue)
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
