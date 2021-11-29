import { styled } from '~/theme'
import React, { FunctionComponent } from 'react'

const StyledButton = styled('button', {
  backgroundColor: '$primary',
  alignItems: 'flex-start',
  borderRadius: '4px',
  color: 'white', // Foreground Color??
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  lineHeight: '24px',
  margin: '6px',
  padding: '4px 8px',

  '&:hover': {
    backgroundColor: '$hover',
  },

  variants: {
    type: {
      filled: {
        background: '$primary',
        '&:disabled': {
          backgroundColor: 'rgba(15,16,19,0.12)',
          color: 'rgba(15,16,19,0.26)',
          cursor: 'not-allowed',
        },
      },
      outlined: {
        background: '$transparent',
        color: '$primary',
        border: '1px solid $primary',
        '&:hover': {
          backgroundColor: '$hoverAlt',
        },
        '&:disabled': {
          background: '$transparent',
          color: 'rgba(15,16,19,0.26)',
          border: '1px solid rgba(15,16,19,0.26)',
          cursor: 'not-allowed',
        },
      },
      transparent: {
        background: '$transparent',
        color: '$primary',
        '&:hover': {
          backgroundColor: '$hoverAlt',
        },
        '&:disabled': {
          background: '$transparent',
          color: 'rgba(15,16,19,0.26)',
          cursor: 'not-allowed',
        },
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
