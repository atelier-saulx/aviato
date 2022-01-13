import React from 'react'
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextTheme,
} from 'next-themes'
import { themes } from './theme'
import {
  ThemeProvider as CSRThemeProvider,
  useTheme as useCSRTheme,
  ThemeProps,
} from './clientProvider'

interface NextThemeProps {
  /** List of all available theme names */
  themes: string[]

  /** Forced theme name for the current page */
  forcedTheme?: string

  /** Update the theme */
  setTheme: (theme: string) => void

  /** Active theme name */
  theme?: string

  /** If `enableSystem` is true and the active theme is "system", this returns whether the system preference resolved to "dark" or "light". Otherwise, identical to `theme` */
  resolvedTheme?: string

  /** If enableSystem is true, returns the System theme preference ("dark" or "light"), regardless what the active theme is */
  systemTheme?: 'dark' | 'light'
}

let isSSR: boolean = false

export const useTheme: () => NextThemeProps | ThemeProps = () => {
  return isSSR ? useNextTheme() : useCSRTheme()
}

export interface ThemeProviderProps {
  isSSRApplication?: boolean
  children: React.ReactNode
}

export function ThemeProvider({
  isSSRApplication,
  children,
}: ThemeProviderProps) {
  if (isSSRApplication) {
    isSSR = true

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

  return <CSRThemeProvider>{children}</CSRThemeProvider>
}
