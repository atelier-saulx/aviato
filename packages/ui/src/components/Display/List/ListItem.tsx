import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { Conditional } from '~/components'

const StyledListItem = styled('div', {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  background: '$Background1dp',
  padding: '4px 16px',

  '&:hover': {
    background: '$ActionMain',
  },

  variants: {
    isActive: {
      true: {
        background: '$ActionMainSelected',
      },
    },
  },
})

const Container = styled('span', {
  display: 'inline-flex',
  alignSelf: 'center',
  flexShrink: 0,

  variants: {
    type: {
      start: {
        marginRight: 10,
      },
      end: {
        marginLeft: 'auto',
      },
    },
  },
})

export interface ListItemProps extends ComponentProps<typeof StyledListItem> {
  isActive?: boolean
  leftArea?: ReactNode
  rightArea?: ReactNode
}

export const ListItem = forwardRef<
  ElementRef<typeof StyledListItem>,
  ListItemProps
>((properties, forwardedRef) => {
  const {
    isActive = false,
    leftArea,
    rightArea,
    children,
    ...remainingProps
  } = properties

  return (
    <StyledListItem ref={forwardedRef} {...remainingProps} isActive={isActive}>
      <Conditional test={leftArea}>
        <Container type="start">{leftArea}</Container>
      </Conditional>

      {children}

      <Conditional test={rightArea}>
        <Container type="end">{rightArea}</Container>
      </Conditional>
    </StyledListItem>
  )
})
