import { ComponentProps } from '@stitches/react'
import React, { forwardRef, ElementRef } from 'react'

import { classNames, StitchedCSS, styled } from '~/theme'
import { BaseSize } from '~/types'

const PrimaryBadgeCSS: StitchedCSS = {
  '&.isLight': {
    background: '$PrimaryLight',
    border: '1px solid $PrimaryLight',
    color: '$PrimaryLightContrast',
  },

  '&.isFilled': {
    background: '$PrimaryMain',
    border: '1px solid $PrimaryMain',
    color: '$PrimaryMainContrast',
  },

  '&.isOutlined': {
    color: '$PrimaryMain',
    border: '1px solid $PrimaryOutline',
  },
}

const ActionBadgeCSS: StitchedCSS = {
  '&.isLight': {
    background: '$ActionLight',
    border: '1px solid $ActionLight',
    color: '$ActionLightContrast',
  },

  '&.isFilled': {
    background: '$ActionLight',
    border: '1px solid $ActionLight',
    color: '$ActionLightContrast',
  },

  '&.isOutlined': {
    background: 'transparent',
    border: '1px solid $ActionOutline',
    color: '$ActionLightContrast',
  },
}

const StyledBadge = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  userSelect: 'none',
  fontWeight: 500,

  variants: {
    type: {
      primary: PrimaryBadgeCSS,
      action: ActionBadgeCSS,
    },

    size: {
      extrasmall: {
        borderRadius: 24,
        fontSize: 11,
        padding: '0px 12px',
        lineHeight: '20px',
      },
      small: {
        borderRadius: 24,
        fontSize: 12,
        padding: '0px 12px',
        lineHeight: '24px',
      },
      medium: {
        borderRadius: 24,
        fontSize: 13,
        padding: '0px 12px',
        lineHeight: '28px',
      },
      large: {
        borderRadius: 24,
        fontSize: 14,
        padding: '0px 12px',
        lineHeight: '32px',
      },
      extralarge: {
        borderRadius: 24,
        fontSize: 15,
        padding: '0px 12px',
        lineHeight: '36px',
      },
    },
  },
})

export type BadgeType = 'primary' | 'action'
export type BadgeVariant = 'light' | 'filled' | 'outlined'
export type BadgeSize = BaseSize

export interface BadgeProps extends ComponentProps<typeof StyledBadge> {
  type?: BadgeType
  variant?: BadgeVariant
  size?: BadgeSize
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

    const isLight = variant === 'light'
    const isFilled = variant === 'filled'
    const isOutlined = variant === 'outlined'

    const classes = classNames({
      isLight,
      isFilled,
      isOutlined,
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
