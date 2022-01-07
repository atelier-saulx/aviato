import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

import { theme as LightTheme } from './schemas/theme.light'
import { theme as DarkTheme } from './schemas/theme.dark'
import { isBrowser } from '@aviato/utils'

const createdConfig = createStitches({
  theme: LightTheme,
  media: {
    breakpoint1: '(min-width: 640px)',
    breakpoint2: '(min-width: 768px)',
    breakpoint3: '(min-width: 1024px)',
  },
})

export type StitchedCSS = Stitches.CSS<typeof config>

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

export const getCurrentTheme: () => 'light' | 'dark' = () => {
  if (isBrowser) {
    const root = document.documentElement
    return root.classList.contains(themes.light) ? 'light' : 'dark'
  }

  return 'light'
}
