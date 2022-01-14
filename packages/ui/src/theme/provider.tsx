import React from 'react'
import { themes } from './theme'
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextContext,
} from 'next-themes'
import {
  ThemeProvider as ClientSideThemeProvider,
  useTheme as useClientSideContext,
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
  return isSSR ? useNextContext() : useClientSideContext()
}

export const THEME_STORAGE_KEY = 'colorMode'

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
        storageKey={THEME_STORAGE_KEY}
        value={themes}
      >
        {children}
      </NextThemeProvider>
    )
  }

  return <ClientSideThemeProvider>{children}</ClientSideThemeProvider>
}
