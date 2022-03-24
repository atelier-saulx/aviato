import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

import { theme as LightTheme } from './schemas/theme.light'
import { theme as DarkTheme } from './schemas/theme.dark'

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

export const darkTheme = createTheme('dark', DarkTheme)

export const themes = {
  light: 'light',
  dark: darkTheme.className,
}

export { LightTheme, DarkTheme }

export type StitchedCSS = Stitches.CSS<typeof config>

export { classNames } from './utils'
export { getZIndex } from './zIndex'
