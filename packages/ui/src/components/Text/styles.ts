export const BaseTextStyles = {
  display: 'block',
  fontVariantNumeric: 'tabular-nums',
  margin: 0,
  letterSpacing: '-0.015em',
}

export const BaseFontWeight = {
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
    inherit: {
      fontWeight: 'inherit',
    },
  },
}

export const BaseFontColor = {
  color: {
    Primary: {
      color: '$TextPrimary',
    },
    Secondary: {
      color: '$TextSecondary',
    },
    Disabled: {
      color: '$TextDisabled',
    },
    Error: {
      color: '$ErrorMain',
    },
    PrimaryContrastHigh: {
      color: '$PrimaryContrastHigh',
    },
    PrimaryMain: {
      color: '$PrimaryMain',
    },
    inherit: {
      color: 'inherit',
    },
  },
}

export const BaseFontAlignment = {
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
}

export const BaseFontVariants = {
  ...BaseFontWeight,
  ...BaseFontColor,
  ...BaseFontAlignment,
}
