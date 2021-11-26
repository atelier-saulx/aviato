import React, { FunctionComponent } from 'react'
import { styled } from '../../theme'

const StyledButton = styled('button', {
  backgroundColor: '$primary',
  '&:hover': {
    backgroundColor: '$hover',
  },
  alignItems: 'flex-start',
  borderRadius: '4px',
  color: 'white', // Foreground Color??
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: '500',
  lineHeight: '24px',
  margin: '6px',
  padding: '4px 8px',
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
        '&:hover': {
          backgroundColor: variant !== 'filled' && '$hoverAlt',
        },
        border: variant === 'outlined' && '2px solid $primary',
        color: variant !== 'filled' && '$primary',
      }}
    >
      {text ?? children}
    </StyledButton>
  )
}
