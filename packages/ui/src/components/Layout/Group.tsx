/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { CSSProperties, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { StitchedCSS, styled } from '~/theme'
import { Size } from '~/types/sizes'

const StyledGroup = styled('div', {
  display: 'flex',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },

      column: {
        flexDirection: 'column',
      },
    },

    space: {
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

export interface GroupProps {
  direction?: 'row' | 'column'
  align?: CSSProperties['alignItems']
  position?: GroupPosition
  wrap?: boolean
  grow?: boolean
  spacing?: Size
}

type ForwardProps = ComponentProps<typeof StyledGroup> & GroupProps

export const Group = React.forwardRef<
  ElementRef<typeof StyledGroup>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    direction = 'row',
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
    (direction === 'row'
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

  if (direction === 'row') {
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
})
