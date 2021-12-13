import React, { FunctionComponent, MouseEventHandler, useCallback } from 'react'
import { noop } from '@aviato/utils'

import { classNames, css, styled, CSS, DefaultProps } from '~/theme'
import { Conditional } from '~/components/Utilities/Conditional'
import { Icon } from '~/icons/collection'

const primaryButtonCSS: CSS = {
  '&.isFilled': {
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
      border: '1px solid $ActionDisabledBackground',
    },
  },

  '&.isOutlined': {
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
      color: '$ActionDisabledContent',
      background: 'transparent',
      border: '1px solid transparent',
    },
  },
}

const ghostButtonCSS: CSS = {
  '&.isFilled': {
    color: '$TextPrimary',
    background: '$ActionMain',
    border: '1px solid $ActionMain',

    '&:hover': {
      background: '$ActionMainHover',
    },
    '&:active': {
      background: '$ActionMainSelected',
    },

    '&:disabled': {
      color: '$ActionDisabledContent',
      background: '$ActionDisabledBackground',
      border: '1px solid $ActionMain',
    },
  },

  '&.isOutlined': {
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

  '&.isTransparent': {
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
}

const errorButtonCSS: CSS = {
  '&.isFilled': {
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

  '&.isOutlined': {
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

  '&.isTransparent': {
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

export interface ButtonProps extends DefaultProps {
  type?: ButtonType
  mode?: ButtonMode
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  leftIcon?: Icon
  rightIcon?: Icon
}

export const Button: FunctionComponent<ButtonProps> = (properties) => {
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
}
