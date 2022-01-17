import React, {
  forwardRef,
  ReactNode,
  ElementRef,
  MouseEventHandler,
} from 'react'
import { ComponentProps } from '@stitches/react'

import { classNames, styled, StitchedCSS } from '~/theme'
import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'

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

const IconWrapper = styled('span', {
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

export const StyledButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  borderRadius: '4px',
  padding: '4px 8px',
  cursor: 'pointer',

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

export type ButtonType = 'primary' | 'ghost' | 'error'
export type ButtonVariant = 'filled' | 'outlined' | 'transparent'

export interface ButtonProps extends ComponentProps<typeof StyledButton> {
  type?: ButtonType
  variant?: ButtonVariant
  disabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  css?: StitchedCSS
}

export const Button = forwardRef<ElementRef<typeof StyledButton>, ButtonProps>(
  (properties, forwardedRef) => {
    const {
      type = 'primary',
      variant = 'filled',
      disabled = false,
      leftIcon = null,
      rightIcon = null,
      children,
      ...remainingProps
    } = properties

    const isFilled = variant === 'filled'
    const isOutlined = variant === 'outlined'
    const isTransparent = variant === 'transparent'

    const classes = classNames({
      isFilled,
      isOutlined,
      isTransparent,
    })

    const isText = typeof children === 'string'

    const TextComponent = isText ? (
      <Text weight="medium" color="Inherit" css={{ lineHeight: '24px' }}>
        {children}
      </Text>
    ) : (
      children
    )

    return (
      <StyledButton
        type={type}
        disabled={disabled}
        className={classes}
        ref={forwardedRef}
        {...remainingProps}
      >
        <Conditional test={leftIcon}>
          <IconWrapper type="start">{leftIcon}</IconWrapper>
        </Conditional>

        {TextComponent}

        <Conditional test={rightIcon}>
          <IconWrapper type="end">{rightIcon}</IconWrapper>
        </Conditional>
      </StyledButton>
    )
  }
)
