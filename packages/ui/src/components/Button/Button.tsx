import React, { ElementRef, MouseEventHandler, useCallback } from 'react'
import { css, DefaultProps, styled } from '~/theme'
import { noop } from '@aviato/utils'

const ButtonStyles = css({
  alignItems: 'flex-start',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
  lineHeight: '24px',
  padding: '4px 8px',
  fontSize: '15px',

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

const StyledButton = styled('button', ButtonStyles)

type ButtonVariant = 'filled' | 'outlined' | 'transparent'

export type ButtonProps = DefaultProps & {
  variant?: ButtonVariant
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = React.forwardRef<
  ElementRef<typeof StyledButton>,
  ButtonProps
>((properties, forwardedRef) => {
  const {
    variant = 'filled',
    disabled = false,
    onClick = noop,
    children,
    ...remainingProps
  } = properties

  const handleClick = useCallback(() => {
    onClick()
  }, [])

  return (
    <StyledButton
      ref={forwardedRef}
      type={variant}
      disabled={disabled}
      onClick={handleClick}
      {...remainingProps}
    >
      {children}
    </StyledButton>
  )
})
