import React, {
  forwardRef,
  ReactNode,
  ElementRef,
  MouseEventHandler,
  useCallback,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { isText, noop } from '@aviato/utils'

import { classNames, styled, StitchedCSS } from '~/theme'
import { Conditional } from '~/components/Utilities/Conditional'
import { Text } from '~/components/Text'

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
})

export type ButtonVariant =
  | 'main'
  | 'light'
  | 'ghost'
  | 'outline'
  | 'outline-light'

export type ButtonColor = 'primary' | 'action' | 'error'

export interface ButtonProps extends ComponentProps<typeof StyledButton> {
  variant?: ButtonVariant
  color?: ButtonColor
  disabled?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  css?: StitchedCSS
}

export const Button = forwardRef<ElementRef<typeof StyledButton>, ButtonProps>(
  (properties, forwardedRef) => {
    const {
      color = 'primary',
      variant = 'main',
      disabled = false,
      leftIcon = null,
      rightIcon = null,
      onClick = noop,
      children,
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

    const handleClick = useCallback(
      (event) => {
        return disabled ? noop() : onClick(event)
      },
      [disabled]
    )

    return (
      <StyledButton
        color={color}
        disabled={disabled}
        className={classes}
        ref={forwardedRef}
        onClick={(event) => handleClick(event)}
        {...remainingProps}
      >
        <Conditional test={leftIcon}>
          <IconContainer type="start">{leftIcon}</IconContainer>
        </Conditional>

        {ChildVariant}

        <Conditional test={rightIcon}>
          <IconContainer type="end">{rightIcon}</IconContainer>
        </Conditional>
      </StyledButton>
    )
  }
)

Button.displayName = 'Button'
