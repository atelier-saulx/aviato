import React, {
  CSSProperties,
  ElementRef,
  MouseEventHandler,
  useCallback,
} from 'react'
import { classNames, css, styled, CSS } from '~/theme'
import { noop } from '@aviato/utils'

const primaryButtonCSS: CSS = {
  '&.isFilled': {
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
}

const ghostButtonCSS: CSS = {
  '&.isFilled': {
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
      primary: primaryButtonCSS,
      ghost: ghostButtonCSS,
      error: errorButtonCSS,
    },
  },
})

const StyledButton = styled('button', ButtonStyles)

export type ButtonType = 'primary' | 'ghost' | 'error'
export type ButtonMode = 'filled' | 'outlined' | 'transparent'

export type ButtonProps = {
  type?: ButtonType
  mode?: ButtonMode
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  css?: CSS
  style?: CSSProperties
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
      ref={forwardedRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
      {...remainingProps}
    >
      {children}
    </StyledButton>
  )
})
