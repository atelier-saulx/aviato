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

        '&:hover': {
          backgroundColor: '$hoverAlt',
        },
      },
      outlined: {
        background: '$primary',

        '&:hover': {
          backgroundColor: '$hoverAlt',
        },
      },
      transparent: {
        background: '$primary',

        '&:hover': {
          backgroundColor: '$hoverAlt',
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
