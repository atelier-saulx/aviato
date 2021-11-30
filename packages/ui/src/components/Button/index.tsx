import { styled } from '~/theme'
import React, { FunctionComponent } from 'react'

const StyledButton = styled('button', {
  alignItems: 'flex-start',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  lineHeight: '24px',
  margin: '6px',
  padding: '4px 8px',

  variants: {
    type: {
      filled: {
        background: '$PrimaryMain',
        border: '1px solid $PrimaryMain',
        color: '$PrimaryContrastHigh',

        '&:hover': {
          background: '$PrimaryMainHover',
        },
        '&:active': {
          background: '$PrimaryMainSelected',
        },
      },

      outlined: {
        backgroundColor: '$PrimaryLightHover',
        border: '1px solid $PrimaryOutlineBorder',
        color: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryLightHover',
        },
        '&:active': {
          background: '$PrimaryLightSelected',
        },
      },

      transparent: {
        background: 'none',
        color: '$PrimaryMain',
      },
    },
  },
})

type ButtonVariant = 'filled' | 'outlined' | 'transparent'

export type ButtonProps = {
  text?: string
  variant?: ButtonVariant
  disabled?: boolean
}

export const Button: FunctionComponent<ButtonProps> = ({
  text,
  children,
  variant = 'filled',
  disabled = false,
}) => {
  return (
    <StyledButton disabled={disabled} type={variant}>
      {text ?? children}
    </StyledButton>
  )
}
