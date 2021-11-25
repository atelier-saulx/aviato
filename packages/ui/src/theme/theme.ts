import { createStitches } from '@stitches/react'

const createdConfig = createStitches({
  theme: {
    colors: {
      primary: 'rgb(98, 0, 238)',
      secondary: 'rgb(217, 19, 174)',
      background: 'rgb(247, 247, 248)',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
    },
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
} = createdConfig
