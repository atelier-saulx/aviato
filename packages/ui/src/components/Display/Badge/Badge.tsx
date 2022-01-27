import { ComponentProps } from '@stitches/react'
import React, { forwardRef, ElementRef } from 'react'

import { classNames, StitchedCSS, styled } from '~/theme'
import { BaseSize } from '~/types'

const PrimaryBadgeCSS: StitchedCSS = {}

const GhostBadgeCSS: StitchedCSS = {}

const ErrorBadgeCSS: StitchedCSS = {}

const StyledBadge = styled('div', {
  variants: {
    type: {
      primary: PrimaryBadgeCSS,
      ghost: GhostBadgeCSS,
      error: ErrorBadgeCSS,
    },

    size: {
      extrasmall: {},
      small: {},
      medium: {},
      large: {},
      extralarge: {},
    },
  },
})

export type BadgeType = 'primary' | 'ghost' | 'error'
export type BadgeVariant = 'filled' | 'outlined' | 'transparent'

export interface BadgeProps extends ComponentProps<typeof StyledBadge> {
  type?: BadgeType
  variant?: BadgeVariant
  size?: BaseSize
}

export const Badge = forwardRef<ElementRef<typeof StyledBadge>, BadgeProps>(
  (properties, forwardedRef) => {
    const {
      type = 'primary',
      variant = 'filled',
      size = 'medium',
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

    return (
      <StyledBadge
        type={type}
        size={size}
        className={classes}
        ref={forwardedRef}
        {...remainingProps}
      >
        {children}
      </StyledBadge>
    )
  }
)
