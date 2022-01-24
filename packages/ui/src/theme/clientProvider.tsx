import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  FunctionComponent,
} from 'react'
import { LocalStorage } from '@aviato/utils'

import { themes } from './theme'
import { THEME_STORAGE_KEY } from './provider'
import { ColorMode, ThemeProps } from './types'

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

export const ThemeProvider: FunctionComponent = ({ children }) => {
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

  const contextValue: ThemeProps = useMemo(() => {
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
