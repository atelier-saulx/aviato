import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  FunctionComponent,
  useCallback,
  useRef,
} from 'react'

import { LocalStorage } from '@aviato/utils'

import { themes } from '../theme/theme'
import { ThemeProps } from '../theme/types'

const MEDIA = '(prefers-color-scheme: dark)'

const THEME_STORAGE_KEY = 'activeTheme'

const defaultTheme = 'light'

let baseActiveTheme = defaultTheme

export const ThemeContext = createContext<ThemeProps>({
  activeTheme: defaultTheme,
  setActiveTheme: () => {},
  getNextTheme: () => defaultTheme,
})

export const useTheme = () => useContext(ThemeContext)

function storeThemeAndUpdateDOM(targetValue: string): void {
  Object.keys(themes).forEach((themeName) => {
    document.documentElement.classList.remove(themeName)
  })

  document.documentElement.classList.add(themes[targetValue])
  document.documentElement.setAttribute('data-theme', targetValue)

  setStoredTheme(targetValue)
}

export const ThemeProvider: FunctionComponent = ({ children }) => {
  const [storedTheme, setStoredTheme] = useState<string>(baseActiveTheme)

  /**
   * Set active theme, load in storage, and update DOM
   */
  const setActiveTheme = useCallback((targetTheme: string) => {
    baseActiveTheme = targetTheme

    setStoredTheme(baseActiveTheme)
    storeThemeAndUpdateDOM(targetTheme)
  }, [])

  /**
   * Get next available theme
   *
   * @returns string - next available theme
   */
  function getNextTheme() {
    const availableThemes = Object.keys(themes)
    const currentIndex = availableThemes.indexOf(baseActiveTheme)
    const nextIndex = (currentIndex + 1) % availableThemes.length

    const nextAvailableTheme = availableThemes[nextIndex]
    return nextAvailableTheme
  }

  /**
   * Set theme value on initial load
   */
  useEffect(() => {
    const initialTheme = getStoredTheme()
    const fallbackTheme = getSystemTheme() ?? defaultTheme

    setActiveTheme(initialTheme ?? fallbackTheme)
  })

  /**
   * Check if local-storage is cleared
   */
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== THEME_STORAGE_KEY) {
        return
      }

      const themeName = event?.newValue
      const themeExists = themeName in themes
      if (themeExists) {
        setActiveTheme(themeName)
      } else {
        removeStoredTheme()
      }
    }

    window.addEventListener('storage', handleStorage)

    return () => {
      window.removeEventListener('storage', handleStorage)
    }
  }, [setActiveTheme])

  /**
   * If missing local theme or system update, set theme to system
   */
  const handleMediaQuery = useCallback(
    ({ isSystemUpdate = false }: any, event?) => {
      const systemTheme = getSystemTheme(event)

      const localTheme = getStoredTheme()
      if (isSystemUpdate || !localTheme) {
        setActiveTheme(systemTheme)
      }
    },
    [storedTheme]
  )

  // Ref hack to avoid adding handleMediaQuery as a dep
  const mediaListener = useRef(handleMediaQuery)
  mediaListener.current = handleMediaQuery

  useEffect(() => {
    // @ts-ignore
    const handler = (...args: any) =>
      mediaListener.current({ isSystemUpdate: true }, ...args)

    // Listen to System preference
    const media = window.matchMedia(MEDIA)

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handler)

    return () => media.removeListener(handler)
  }, [])

  const ProviderValue = useMemo(
    () => ({
      activeTheme: storedTheme,
      setActiveTheme,
      getNextTheme,
    }),
    [storedTheme]
  )

  return (
    <ThemeContext.Provider value={ProviderValue}>
      {children}
    </ThemeContext.Provider>
  )
}

const getStoredTheme: () => string | null = () => {
  return LocalStorage.getItem(THEME_STORAGE_KEY)
}

const setStoredTheme: (theme: string) => void = (theme: string) => {
  return LocalStorage.setItem(THEME_STORAGE_KEY, theme)
}

const removeStoredTheme = () => {
  return LocalStorage.removeItem(THEME_STORAGE_KEY)
}

const getSystemTheme = (event?: MediaQueryList) => {
  if (!event) {
    event = window.matchMedia(MEDIA)
  }

  const isDark = event.matches
  const systemTheme = isDark ? 'dark' : 'light'
  return systemTheme
}

ThemeProvider.displayName = 'ThemeProvider'
