import React, { forwardRef, CSSProperties, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { StitchedCSS, styled } from '~/theme'
import { Size } from '~/types/sizes'

const StyledGroup = styled('div', {
  display: 'flex',

  variants: {
    direction: {
      vertical: {
        flexDirection: 'row',
      },

      horizontal: {
        flexDirection: 'column',
      },
    },

    space: {
      none: {},
      xxxs: {
        gap: '$xxxs',
      },
      xxs: {
        gap: '$xxs',
      },
      xs: {
        gap: '$xs',
      },
      sm: {
        gap: '$sm',
      },
      md: {
        gap: '$md',
      },
      lg: {
        gap: '$lg',
      },
      xl: {
        gap: '$xl',
      },
      xxl: {
        gap: '$xxl',
      },
      xxxl: {
        gap: '$xxxl',
      },
    },
  },
})

const mappedPositions = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end',
  apart: 'space-between',
}

export type GroupPosition = 'left' | 'center' | 'right' | 'apart'
export type GroupDirection = 'vertical' | 'horizontal'

export interface GroupProps extends ComponentProps<typeof StyledGroup> {
  direction?: GroupDirection
  position?: GroupPosition
  align?: CSSProperties['alignItems']
  wrap?: boolean
  grow?: boolean
  spacing?: Size | 'none'
}

export const Group = forwardRef<ElementRef<typeof StyledGroup>, GroupProps>(
  (properties, forwardedRef) => {
    const {
      direction = 'vertical',
      position = 'left',
      wrap = true,
      grow = false,
      spacing = 'sm',
      align,
      children,
      ...remainingProps
    } = properties

    const alignItems =
      align ||
      (direction === 'vertical'
        ? 'center'
        : grow
        ? 'stretch'
        : position === 'apart'
        ? 'flex-start'
        : mappedPositions[position])

    const styledCSS: StitchedCSS = {
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems,
    }

    if (direction === 'vertical') {
      styledCSS.justifyContent = mappedPositions[position]
    }

    return (
      <StyledGroup
        direction={direction}
        css={styledCSS}
        space={spacing}
        ref={forwardedRef}
        {...remainingProps}
      >
        {children}
      </StyledGroup>
    )
  }
)

Group.displayName = 'Group'
