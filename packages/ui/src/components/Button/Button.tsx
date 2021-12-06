import React, { ElementRef, MouseEventHandler, useCallback } from 'react'
import { css, DefaultProps, styled } from '~/theme'
import { noop } from '@aviato/utils'

const ButtonStyles = css({
  alignItems: 'flex-start',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
  padding: '4px 8px',
  lineHeight: '24px',
  fontSize: '15px',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  variants: {
    type: {
      primary: {},
      ghost: {},
      error: {},
    },
    mode: {
      filled: {},
      outlined: {},
      transparent: {},
    },
  },

  compoundVariants: [
    // PRIMARY COMPOUND START
    {
      type: 'primary',
      mode: 'filled',
      css: {
        color: '$PrimaryContrastHigh',
        background: '$PrimaryMain',
        border: '0px solid transparent',

        '&:hover': {
          background: '$PrimaryMainHover',
        },
        '&:active': {
          background: '$PrimaryMainSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: '$ActionDisabledBackground',
          border: '0px solid transparent',
        },
      },
    },
    {
      type: 'primary',
      mode: 'outlined',
      css: {
        color: '$PrimaryMain',
        border: '1px solid $PrimaryOutlineBorder',

        '&:hover': {
          backgroundColor: '$PrimaryLightHover',
        },
        '&:active': {
          background: '$PrimaryLightSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'transparent',
          border: '1px solid $ActionDisabledBackground',
        },
      },
    },
    {
      type: 'primary',
      mode: 'transparent',
      css: {
        color: '$PrimaryMain',

        '&:hover': {
          backgroundColor: '$PrimaryLightHover',
        },
        '&:active': {
          background: '$PrimaryLightSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'transparent',
          border: '0px solid transparent',
        },
      },
    },
    // PRIMARY COMPOUND END

    // GHOST COMPOUND START
    {
      type: 'ghost',
      mode: 'filled',
      css: {
        color: '$TextPrimary',
        background: '$ActionMain',
        border: '0px solid transparent',

        '&:hover': {
          background: '$ActionMainHover',
        },
        '&:active': {
          background: '$ActionMainSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: '$ActionDisabledBackground',
          border: '0px solid transparent',
        },
      },
    },
    {
      type: 'ghost',
      mode: 'outlined',
      css: {
        color: '$TextPrimary',
        border: '1px solid $OtherOutline',

        '&:hover': {
          backgroundColor: '$ActionMainHover',
        },
        '&:active': {
          background: '$ActionMainSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'transparent',
          border: '1px solid $ActionDisabledBackground',
        },
      },
    },
    {
      type: 'ghost',
      mode: 'transparent',
      css: {
        color: '$TextPrimary',

        '&:hover': {
          backgroundColor: '$ActionMainHover',
        },
        '&:active': {
          background: '$ActionMainSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'transparent',
          border: '0px solid transparent',
        },
      },
    },
    // GHOST COMPOUND END

    // ERROR COMPOUND START
    {
      type: 'error',
      mode: 'filled',
      css: {
        color: '$PrimaryContrastHigh',
        background: '$ErrorMain',
        border: '0px solid transparent',

        '&:hover': {
          background: '$ErrorMainHover',
        },
        '&:active': {
          background: '$ErrorMainSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: '$ActionDisabledBackground',
          border: '0px solid transparent',
        },
      },
    },
    {
      type: 'error',
      mode: 'outlined',
      css: {
        color: '$ErrorMain',
        border: '1px solid $ErrorOutlineBorder',

        '&:hover': {
          backgroundColor: '$ErrorLightHover',
        },
        '&:active': {
          background: '$ErrorLightSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'transparent',
          border: '1px solid $ActionDisabledBackground',
        },
      },
    },
    {
      type: 'error',
      mode: 'transparent',
      css: {
        color: '$ErrorMain',

        '&:hover': {
          backgroundColor: '$ErrorLightHover',
        },
        '&:active': {
          background: '$ErrorLightSelected',
        },

        '&:disabled': {
          color: '$ActionDisabledContent',
          background: 'transparent',
          border: '0px solid transparent',
        },
      },
    },
    // ERROR COMPOUND END
  ],
})

const StyledButton = styled('button', ButtonStyles)

export type ButtonType = 'primary' | 'ghost' | 'error'
export type ButtonMode = 'filled' | 'outlined' | 'transparent'

export type ButtonProps = DefaultProps & {
  type?: ButtonType
  mode?: ButtonMode
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const Button = React.forwardRef<
  ElementRef<typeof StyledButton>,
  ButtonProps
>((properties, forwardedRef) => {
  const {
    type = 'primary',
    mode = 'filled',
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
      type={type}
      mode={mode}
      onClick={handleClick}
      disabled={disabled}
      {...remainingProps}
    >
      {children}
    </StyledButton>
  )
})
