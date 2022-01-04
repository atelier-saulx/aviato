export const BaseTextStyles = {
  display: 'block',
  fontVariantNumeric: 'tabular-nums',
  margin: 0,
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
  },
}

export const BaseFontColor = {
  color: {
    Inherit: {
      color: 'inherit',
    },
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
    Error: {
      color: '$ErrorMain',
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
