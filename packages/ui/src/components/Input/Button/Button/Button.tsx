import React, { ElementRef, MouseEventHandler, useCallback } from 'react'
import { noop } from '@aviato/utils'
import { ComponentProps } from '@stitches/react'

import { classNames, css, styled, StitchedCSS } from '~/theme'
import { Conditional } from '~/components/Utilities/Conditional'

const primaryButtonCSS: StitchedCSS = {
  '&.isFilled': {
    color: '$PrimaryMainContrast',
    background: '$PrimaryMain',
    border: '1px solid $PrimaryMain',

    '&:hover': {
      background: '$PrimaryMainHover',
      border: '1px solid $PrimaryMainHover',
    },
    '&:active': {
      background: '$PrimaryMainSelected',
      border: '1px solid $PrimaryMainSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      border: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutlined': {
    color: '$PrimaryMain',
    border: '1px solid $PrimaryOutline',

    '&:hover': {
      backgroundColor: '$PrimaryLightHover',
    },
    '&:active': {
      background: '$PrimaryLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      border: '1px solid $OtherDisabledOutline',
      background: 'transparent',
    },
  },

  '&.isTransparent': {
    color: '$PrimaryMain',
    border: '1px solid transparent',

    '&:hover': {
      backgroundColor: '$PrimaryLightHover',
    },
    '&:active': {
      background: '$PrimaryLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: 'transparent',
    },
  },
}

const ghostButtonCSS: StitchedCSS = {
  '&.isFilled': {
    color: '$ActionMainContrast',
    background: '$ActionMain',
    border: '1px solid $ActionMain',

    '&:hover': {
      background: '$ActionMainHover',
    },
    '&:active': {
      background: '$ActionMainSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      border: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutlined': {
    color: '$ActionMainContrast',
    border: '1px solid $ActionOutline',

    '&:hover': {
      backgroundColor: '$ActionLightHover',
    },
    '&:active': {
      background: '$ActionMainSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      border: '1px solid $OtherDisabledOutline',
      background: 'transparent',
    },
  },

  '&.isTransparent': {
    color: '$ActionMainContrast',
    border: '1px solid transparent',

    '&:hover': {
      backgroundColor: '$ActionMainHover',
    },
    '&:active': {
      background: '$ActionMainSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: 'transparent',
    },
  },
}

const errorButtonCSS: StitchedCSS = {
  '&.isFilled': {
    color: '$ErrorMainContrast',
    background: '$ErrorMain',
    border: '1px solid $ErrorMain',

    '&:hover': {
      background: '$ErrorMainHover',
      border: '1px solid $ErrorMainHover',
    },
    '&:active': {
      background: '$ErrorMainSelected',
      border: '1px solid $ErrorMainSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      border: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutlined': {
    color: '$ErrorLightContrast',
    border: '1px solid $ErrorOutline',

    '&:hover': {
      backgroundColor: '$ErrorLightHover',
    },
    '&:active': {
      background: '$ErrorLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      border: '1px solid $OtherDisabledOutline',
      background: 'transparent',
    },
  },

  '&.isTransparent': {
    color: '$ErrorMain',
    border: '1px solid transparent',

    '&:hover': {
      backgroundColor: '$ErrorLightHover',
    },
    '&:active': {
      background: '$ErrorLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: 'transparent',
    },
  },
}

export const ButtonStyles = css({
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: '500',
  padding: '4px 10px',
  lineHeight: '24px',
  fontSize: '15px',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  variants: {
    type: {
      primary: primaryButtonCSS,
      ghost: ghostButtonCSS,
      error: errorButtonCSS,
    },
  },
})

export const ButtonIcon = styled('span', {
  display: 'inline-flex',
  alignSelf: 'center',
  flexShrink: 0,

  variants: {
    type: {
      start: {
        marginRight: 10,
      },
      end: {
        marginLeft: 10,
      },
    },
  },
})

const BUTTON_TAG = 'button'

export const StyledButton = styled(BUTTON_TAG, ButtonStyles)

export type ButtonType = 'primary' | 'ghost' | 'error'
export type ButtonMode = 'filled' | 'outlined' | 'transparent'

export interface ButtonProps {
  type?: ButtonType
  mode?: ButtonMode
  disabled?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

type ForwardProps = ComponentProps<typeof StyledButton> & ButtonProps

export const Button = React.forwardRef<
  ElementRef<typeof StyledButton>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    type = 'primary',
    mode = 'filled',
    disabled = false,
    onClick = noop,
    leftIcon = null,
    rightIcon = null,
    children,
    ...remainingProps
  } = properties

  const handleClick = useCallback(() => {
    if (disabled) {
      return noop()
    }

    onClick()
  }, [])

  const isFilled = mode === 'filled'
  const isOutlined = mode === 'outlined'
  const isTransparent = mode === 'transparent'

  const classes = classNames({
    isFilled,
    isOutlined,
    isTransparent,
  })

  return (
    <StyledButton
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
      ref={forwardedRef}
      {...remainingProps}
    >
      <Conditional test={leftIcon}>
        <ButtonIcon type="start">{leftIcon}</ButtonIcon>
      </Conditional>

      {children}

      <Conditional test={rightIcon}>
        <ButtonIcon type="end">{rightIcon}</ButtonIcon>
      </Conditional>
    </StyledButton>
  )
})
