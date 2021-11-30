import { createStitches } from '@stitches/react'

import { theme as LightTheme } from './theme.light'

const createdConfig = createStitches({
  theme: LightTheme,
})

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  styled,
  theme,
} = createdConfig

type ClassName = {
  [key: string]: boolean
}

export function classNames(classes: ClassName) {
  return Object.entries(classes)
    .filter(([, value]) => value)
    .map(([key]) => key)
    .join(' ')
}
