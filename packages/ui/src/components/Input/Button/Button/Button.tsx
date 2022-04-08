import React, {
  forwardRef,
  ReactElement,
  ElementRef,
  cloneElement,
  useState,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { isText } from '@aviato/utils'

import { classNames, styled, StitchedCSS, keyframes } from '~/theme'
import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'
import { PropsEventHandler } from '~/types'
import { Loader } from '~/components'

const LoaderStyled = styled('div', {
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  right: 0,
  position: 'absolute',
  bottom: 0,
  left: 0,
})

const PrimaryCSS: StitchedCSS = {
  transition: 'width 0.15s, transform 0.1s, opacity 0.15s',
  position: 'relative',
  overflow: 'hidden',

  '&.isMain': {
    color: '$PrimaryMainContrast',
    background: '$PrimaryMain',

    '&:hover': {
      background: '$PrimaryMainHover',
    },
    '&:active, &:focus': {
      background: '$PrimaryMainSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isLight': {
    color: '$PrimaryLightContrast',
    background: '$PrimaryLight',

    '&:hover': {
      background: '$PrimaryLightHover',
    },
    '&:active, &:focus': {
      background: '$PrimaryLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isGhost': {
    color: '$PrimaryLightContrast',
    background: 'none',

    '&:hover': {
      background: '$PrimaryLightHover',
    },
    '&:active, &:focus': {
      background: '$PrimaryLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutline': {
    color: '$PrimaryLightContrast',
    background: 'none',
    outline: '1px solid $PrimaryMainOutline',

    '&:hover': {
      background: '$PrimaryLightHover',
    },
    '&:active, &:focus': {
      background: '$PrimaryLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutlineLight': {
    color: '$PrimaryLightContrast',
    background: 'none',
    outline: '1px solid $PrimaryLightOutline',

    '&:hover': {
      background: '$PrimaryLightHover',
    },
    '&:active, &:focus': {
      background: '$PrimaryLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },
}

const ActionCSS: StitchedCSS = {
  '&.isMain': {
    color: '$ActionMainContrast',
    background: '$ActionMain',

    '&:hover': {
      background: '$ActionMainHover',
    },
    '&:active, &:focus': {
      background: '$ActionMainSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isLight': {
    color: '$ActionLightContrast',
    background: '$ActionLight',

    '&:hover': {
      background: '$ActionLightHover',
    },
    '&:active, &:focus': {
      background: '$ActionLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isGhost': {
    color: '$ActionLightContrast',
    background: 'none',

    '&:hover': {
      background: '$ActionLightHover',
    },
    '&:active, &:focus': {
      background: '$ActionLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutline': {
    color: '$ActionLightContrast',
    background: 'none',
    outline: '1px solid $ActionMainOutline',

    '&:hover': {
      background: '$ActionLightHover',
    },
    '&:active, &:focus': {
      background: '$ActionLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutlineLight': {
    color: '$ActionLightContrast',
    background: 'none',
    outline: '1px solid $ActionLightOutline',

    '&:hover': {
      background: '$ActionLightHover',
    },
    '&:active, &:focus': {
      background: '$ActionLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },
}

const ErrorCSS: StitchedCSS = {
  '&.isMain': {
    color: '$ErrorMainContrast',
    background: '$ErrorMain',

    '&:hover': {
      background: '$ErrorMainHover',
    },
    '&:active, &:focus': {
      background: '$ErrorMainSelected',
    },
    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isLight': {
    color: '$ErrorLightContrast',
    background: '$ErrorLight',

    '&:hover': {
      background: '$ErrorLightHover',
    },
    '&:active, &:focus': {
      background: '$ErrorLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isGhost': {
    color: '$ErrorLightContrast',
    background: 'none',

    '&:hover': {
      background: '$ErrorLightHover',
    },
    '&:active, &:focus': {
      background: '$ErrorLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutline': {
    color: '$ErrorLightContrast',
    background: 'none',
    outline: '1px solid $ErrorMainOutline',

    '&:hover': {
      background: '$ErrorLightHover',
    },
    '&:active, &:focus': {
      background: '$ErrorLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },

  '&.isOutlineLight': {
    color: '$ErrorLightContrast',
    background: 'none',
    outline: '1px solid $ErrorLightOutline',

    '&:hover': {
      background: '$ErrorLightHover',
    },
    '&:active, &:focus': {
      background: '$ErrorLightSelected',
    },

    '&:disabled': {
      color: '$OtherDisabledContent',
      background: '$OtherDisabledBackground',
      outline: '1px solid $OtherDisabledBackground',
    },
  },
}

const IconContainer = styled('span', {
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
    color: {
      primary: PrimaryCSS,
      action: ActionCSS,
      error: ErrorCSS,
    },
  },
})

export const buttonVariants = [
  'main',
  'light',
  'ghost',
  'outline',
  'outline-light',
] as const

export type ButtonVariant = typeof buttonVariants[number]

export const buttonColors = ['primary', 'action', 'error'] as const

export type ButtonColor = typeof buttonColors[number]

export interface ButtonProps extends ComponentProps<typeof StyledButton> {
  variant?: ButtonVariant
  color?: ButtonColor
  disabled?: boolean
  leftIcon?: ReactElement
  rightIcon?: ReactElement
  css?: StitchedCSS
  onClick?: PropsEventHandler<React.MouseEvent<HTMLButtonElement, MouseEvent>>
}

export const Button = forwardRef<ElementRef<typeof StyledButton>, ButtonProps>(
  (properties, forwardedRef) => {
    let {
      color = 'primary',
      variant = 'main',
      disabled = false,
      leftIcon = null,
      rightIcon = null,
      children,
      onClick,
      ...remainingProps
    } = properties

    const isMain = variant === 'main'
    const isLight = variant === 'light'
    const isGhost = variant === 'ghost'
    const isOutline = variant === 'outline'
    const isOutlineLight = variant === 'outline-light'

    const classes = classNames({
      isMain,
      isLight,
      isGhost,
      isOutline,
      isOutlineLight,
    })

    const ChildVariant = isText(children) ? (
      <Text weight="medium" color="inherit" css={{ lineHeight: '24px' }}>
        {children}
      </Text>
    ) : (
      children
    )

    const [isLoading, setIsLoading] = useState(false)

    // transition width and use effect

    if (onClick) {
      const onClickOrginal = onClick
      // @ts-ignore wrapper for error handling
      onClick = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        const t = e.currentTarget
        let isSet = false
        const timer = setTimeout(() => {
          if (!isSet) {
            setIsLoading(true)
          }
        }, 100)
        try {
          await onClickOrginal(e)
        } catch (e) {
          console.error(`Unhandled error from async click "${e.message}"`)
          t.style.transform = 'translateX(-10px)'
          setTimeout(() => {
            t.style.transform = 'translateX(10px)'
            setTimeout(() => {
              t.style.transform = 'translateX(0px)'
            }, 100)
          }, 100)
        }
        isSet = true
        setIsLoading(false)
        clearTimeout(timer)
      }
    }

    const LeftIcon = IconWithSize(leftIcon)

    // isLoading
    //   ? IconWithSize(<Loader color="inherit" />)
    //   : IconWithSize(leftIcon)

    const RightIcon = IconWithSize(rightIcon)

    return (
      <StyledButton
        color={color}
        disabled={disabled}
        className={classes}
        ref={forwardedRef}
        role="button"
        tabIndex={0}
        onClick={onClick}
        style={{
          opacity: isLoading ? 0.8 : 1,
        }}
        {...remainingProps}
      >
        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.15s',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Conditional test={LeftIcon}>
            <IconContainer type="start">{LeftIcon}</IconContainer>
          </Conditional>

          {ChildVariant}

          <Conditional test={RightIcon}>
            <IconContainer type="end">{RightIcon}</IconContainer>
          </Conditional>
        </div>

        {isLoading ? (
          <LoaderStyled>
            <Loader width={18} height={18} color="inherit" />
          </LoaderStyled>
        ) : null}
      </StyledButton>
    )
  }
)

const IconWithSize = (icon: ReactElement | null) => {
  if (!icon) return null

  return cloneElement(icon, {
    width: 16,
    height: 16,
  })
}

Button.displayName = 'Button'
