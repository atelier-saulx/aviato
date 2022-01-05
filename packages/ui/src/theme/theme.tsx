import { createStitches } from '@stitches/react'
import type * as Stitches from '@stitches/react'

import { theme as LightTheme } from './schemas/theme.light'
import { theme as DarkTheme } from './schemas/theme.dark'
import { isBrowser } from '@aviato/utils'

const createdConfig = createStitches({
  theme: LightTheme,
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
    return root.classList.contains(themes.dark) ? 'dark' : 'light'
  }

  return 'light'
}
