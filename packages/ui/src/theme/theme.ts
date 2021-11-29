import { createStitches } from '@stitches/react'

const createdConfig = createStitches({
  theme: {
    colors: {
      primary: 'rgb(61, 83, 231)',
      hover: 'rgb(56,76,213)',
      hoverAlt: 'rgba(61, 83, 231, 0.12)',
      active: 'rgba(98, 0, 238, 0.8)',
      secondary: 'rgb(217, 19, 174)',
      background: 'rgb(247, 247, 248)',
      disabledBg: 'rgba(15,16,19,0.12)',
      disabledColor: 'rgba(15,16,19,0.26)',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '12px',
    },
    fontSizes: {
      1: '12px',
      2: '15px',
      3: '18px',
    },
    lineHeights: {
      1: '24px',
      2: '27px',
      3: '30px',
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
