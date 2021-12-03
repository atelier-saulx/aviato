import { css } from '~/theme'

export const TextStyles = css({
  display: 'block',
  lineHeight: '1.5',
  margin: 0,
  fontVariantNumeric: 'tabular-nums',
  fontSize: '15px',

  variants: {
    size: {
      Small: {
        fontSize: '15px',
      },
      Medium: {
        fontSize: '18px',
      },
      Large: {
        fontSize: '21px',
      },
      ExtraLarge: {
        fontSize: '32px',
      },
    },

    weight: {
      Regular: {
        fontWeight: 'normal',
      },
      Medium: {
        fontWeight: 500,
      },
      Semibold: {
        fontWeight: 600,
      },
      Bold: {
        fontWeight: 700,
      },
    },

    color: {
      Primary: {
        color: '$TextPrimary',
      },
      PrimaryContrastHigh: {
        color: '$PrimaryContrastHigh',
      },
      PrimaryMain: {
        color: '$PrimaryMain',
      },
      ActionDisabledContent: {
        color: '$PrimaryContrastHigh',
      },
      Secondary: {
        color: '$TextSecondary',
      },
      Disabled: {
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
