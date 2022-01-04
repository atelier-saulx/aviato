/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { CSSProperties, ComponentProps, ElementRef } from 'react'
import { DefaultProps, StitchedCSS, styled } from '~/theme'
import { Size } from '~/types/sizes'

const StyledGroup = styled('div', {
  display: 'flex',
  height: '100%',

  variants: {
    direction: {
      row: {
        flexDirection: 'row',
      },

      column: {
        flexDirection: 'column',
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

export interface GroupProps extends DefaultProps {
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
    children,
    ...remainingProps
  } = properties

  const styledCSS: StitchedCSS = {
    flexWrap: wrap ? 'wrap' : 'nowrap',
  }

  if (direction === 'row') {
    styledCSS.justifyContent = mappedPositions[position]
  }

  return (
    <StyledGroup
      direction={direction}
      ref={forwardedRef}
      css={styledCSS}
      {...remainingProps}
    >
      {children}
    </StyledGroup>
  )
})