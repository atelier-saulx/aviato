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
    fontSizes: {
      1: '12px',
    },
    lineHeights: {
      1: '24px',
    },
  },
  utils: {
    marginX: (value) => ({
      marginLeft: value,
      marginRight: value,
    }),
    marginY: (value) => ({
      marginTop: value,
      marginBottom: value,
    }),
    paddingX: (value) => ({
      paddingLeft: value,
      paddingRight: value,
    }),
    paddingY: (value) => ({
      paddingTop: value,
      paddingBottom: value,
    }),
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
