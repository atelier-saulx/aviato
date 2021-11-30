import { styled } from '~/theme'
import React, { FunctionComponent, MouseEventHandler } from 'react'
import { noop } from '@aviato/utils'

const StyledButton = styled('button', {
  alignItems: 'flex-start',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
  lineHeight: '24px',
  margin: '6px',
  padding: '4px 8px',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  variants: {
    type: {
      filled: {
        color: '$PrimaryContrastHigh',
        background: '$PrimaryMain',
        border: '1px solid $PrimaryMain',

        '&:hover': {
          background: '$PrimaryMainHover',
        },
        '&:active': {
          background: '$PrimaryMainSelected',
        },
        '&:disabled': {
          color: '$ActionDisabledContent',
          background: '$ActionDisabledBackground',
          border: '1px transparent $ActionDisabledBackground',
        },
      },

      outlined: {
        border: '1px solid $PrimaryOutlineBorder',
        color: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryLightHover',
        },
        '&:active': {
          background: '$PrimaryLightSelected',
        },
        '&:disabled': {
          color: '$ActionDisabledContent',
          border: '1px solid $ActionDisabledBackground',
          background: 'none',
        },
      },

      transparent: {
        border: '1px solid transparent',
        color: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryLightHover',
        },
        '&:active': {
          background: '$PrimaryLightSelected',
        },
        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'none',
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
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button: FunctionComponent<ButtonProps> = ({
  text,
  children,
  variant = 'filled',
  disabled = false,
  onClick = noop,
  ...rest
}) => {
  return (
    <StyledButton
      type={variant}
      disabled={disabled}
      onClick={(event) => onClick(event)}
      {...rest}
    >
      {text ?? children}
    </StyledButton>
  )
}
