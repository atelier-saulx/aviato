import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

import { theme as LightTheme } from './schemas/theme.light'
import { theme as DarkTheme } from './schemas/theme.dark'
import { isBrowser } from '@aviato/utils'

const createdConfig = createStitches({
  theme: LightTheme,
  media: {
    breakpoint1: '(min-width: 768px)',
  },
})

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
  reset,
  keyframes,
} = createdConfig

/**
 * SSR: Get the CSS and reset the internal css representation.
 *
 * Note:
 * This is very *IMPORTANT* to do as the server might handle multiple requests
 * and we don't want to have the css accumulated from previous requests.
 */
export const getCssAndReset = () => {
  const css = getCssText()
  reset()
  return css
}

export const darkTheme = createTheme(DarkTheme)

export const themes = {
  light: 'light',
  dark: darkTheme.className,
}

export type StitchedCSS = Stitches.CSS<typeof config>

export const getColorMode: () => 'light' | 'dark' = () => {
  if (isBrowser) {
    const root = document.documentElement
    return root.classList.contains(themes.light) ? 'light' : 'dark'
  }

  return 'light'
}

export { classNames } from './utils'
export { getZIndex } from './zIndex'
