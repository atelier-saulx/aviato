import React from 'react'
import {
  ThemeProvider as NextThemeProvider,
  useTheme as useNextContext,
} from 'next-themes'

import { themes } from './theme'
import {
  ThemeProvider as ClientSideThemeProvider,
  useTheme as useClientSideContext,
} from './clientProvider'
import { ThemeProps } from './types'

let isSSR: boolean = false

export const useTheme: () => ThemeProps = () => {
  return isSSR ? (useNextContext() as any) : useClientSideContext()
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
        enableSystem={false}
        defaultTheme="light"
        storageKey={THEME_STORAGE_KEY}
        value={themes}
      >
        {children}
      </NextThemeProvider>
    )
  }

  return <ClientSideThemeProvider>{children}</ClientSideThemeProvider>
}

ThemeProvider.displayName = 'ThemeProvider'
