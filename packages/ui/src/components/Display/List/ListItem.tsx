import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { classNames, styled } from '~/theme'
import { Conditional } from '~/components'

const StyledListItem = styled('div', {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '4px 16px',

  '&.isSimple': {
    background: '$Background1dp',

    '&:hover': {
      background: '$ActionMain',
    },
  },

  '&.isComplex': {
    background: '$Background1dp',
    padding: '8px 16px',

    '&:hover': {
      background: '$ActionMain',
    },

    '&.isFirstItem': {
      borderTop: '1px solid $OtherDivider',
      borderBottom: '1px solid $OtherDivider',
    },
    '&:not(.isFirstItem):not(.isLastItem)': {
      borderBottom: '1px solid $OtherDivider',
    },
    '&.isLastItem': {
      borderBottom: '1px solid $OtherDivider',
    },
  },

  '&.isHeader': {
    background: '$ActionMain',
    padding: '8px 16px',
  },

  '&.isFooter': {
    background: '$Background1dp',
    padding: '8px 16px',
  },

  '&.isActive': {
    background: '$ActionMainSelected',
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
        paddingLeft: 10,
      },
    },
  },
})

export type ListItemType = 'simple' | 'complex' | 'header' | 'footer'

export interface ListItemProps extends ComponentProps<typeof StyledListItem> {
  type?: ListItemType
  leftArea?: ReactNode
  rightArea?: ReactNode
  isActive?: boolean
  isFirstItem?: boolean
  isLastItem?: boolean
}

export const ListItem = forwardRef<
  ElementRef<typeof StyledListItem>,
  ListItemProps
>((properties, forwardedRef) => {
  const {
    type = 'simple',
    isActive = false,
    isFirstItem = false,
    isLastItem = false,
    leftArea,
    rightArea,
    children,
    ...remainingProps
  } = properties

  const isSimple = type === 'simple'
  const isComplex = type === 'complex'
  const isHeader = type === 'header'
  const isFooter = type === 'footer'

  const classes = classNames({
    isSimple,
    isComplex,
    isHeader,
    isFooter,
    isActive,
    isFirstItem,
    isLastItem,
  })

  return (
    <StyledListItem className={classes} ref={forwardedRef} {...remainingProps}>
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
