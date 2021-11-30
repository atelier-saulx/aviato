import { styled } from '~/theme'

export const BaseText = styled('p', {
  display: 'block',
  lineHeight: 1,
  margin: '0',
  fontWeight: 400,
  fontVariantNumeric: 'tabular-nums',

  variants: {
    weight: {
      regular: {
        fontWeight: 'normal',
      },
      medium: {
        fontWeight: 500,
      },
      semibold: {
        fontWeight: 600,
      },
      bold: {
        fontWeight: 700,
      },
    },

    color: {
      primary: {
        color: '$TextPrimary',
      },
      secondary: {
        color: '$TextSecondary',
      },
      disabled: {
        color: '$TextDisabled',
      },
    },

    alignment: {
      start: {
        textAlign: 'start',
      },
      middle: {
        textAlign: 'center',
      },
      end: {
        textAlign: 'end',
      },
    },
  },
})
