import React, {
  CSSProperties,
  createContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

import { theme as LightTheme } from './theme.light'
import { theme as DarkTheme } from './theme.dark'

const createdConfig = createStitches({
  theme: LightTheme,
})

export type CSS = Stitches.CSS<typeof config>

export interface DefaultProps {
  css?: CSS
  style?: CSSProperties
}

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createdConfig

export { classNames } from './utils'

export const darkTheme = createTheme(DarkTheme)

export const themes = {
  light: 'light',
  dark: darkTheme.className,
}

export const COLOR_MODE_KEY = 'color-mode'

type ColorMode = 'light' | 'dark'

type ThemeContextValue = {
  colorMode: ColorMode
  setColorMode: (newValue: ColorMode) => void
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
