import { styled } from '~/theme'
import React, { FunctionComponent } from 'react'

const StyledButton = styled('button', {
  backgroundColor: '$PrimaryMain',
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
    backgroundColor: '$PrimaryMainHover',
  },

  variants: {
    type: {
      filled: {
        background: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryMainHover',
        },
      },
      outlined: {
        background: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryMainHover',
        },
      },
      transparent: {
        background: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryMainHover',
        },
      },
    },
  },
})

type ButtonVariant = 'filled' | 'outlined' | 'transparent'

export type ButtonProps = {
  text?: string
  variant?: ButtonVariant
}

export const Button: FunctionComponent<ButtonProps> = ({
  text,
  children,
  variant = 'filled',
}) => {
  return <StyledButton type={variant}>{text ?? children}</StyledButton>
}
