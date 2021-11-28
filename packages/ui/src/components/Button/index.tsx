import { styled } from '@aviato/theme'
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
  type ButtonMap = {
    [key in ButtonVariant]: string
  }

  const buttonVariantBackground: ButtonMap = {
    filled: '$primary',
    outlined: 'rgba(0,0,0,0)',
    transparent: 'rgba(0,0,0,0)',
  }

  const buttonVariantBg = buttonVariantBackground[variant] ?? 'filled'

  return (
    <StyledButton
      css={{
        backgroundColor: buttonVariantBg,
        border: variant === 'outlined' && '2px solid $primary',
        color: variant !== 'filled' && '$primary',

        '&:hover': {
          backgroundColor: variant !== 'filled' && '$hoverAlt',
        },
      }}
    >
      {text ?? children}
    </StyledButton>
  )
}
