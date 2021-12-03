import { createStitches } from '@stitches/react'
import { CSSProperties } from 'react'
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

export const darkTheme = createTheme(DarkTheme)

export { classNames } from './utils'
