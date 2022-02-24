import React, { forwardRef, ElementRef, ReactNode } from 'react'
import { ComponentProps } from '@stitches/react'

import { classNames, styled } from '~/theme'
import { Conditional, IconDragDrop } from '~/components'

const StyledListItem = styled('div', {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  lineHeight: 1,

  '&.isSimple': {
    background: '$Background1dp',
    padding: '8px 16px',

    '&:hover': {
      background: '$ActionLight',
    },
  },

  '&.isComplex': {
    background: '$Background1dp',
    padding: '13px 16px',

    '&.isFirstItem': {},
    '&:not(.isLastItem)': {
      borderBottom: '1px solid $OtherDivider',
    },
    '&.isLastItem': {},
  },

  '&.isFloating': {
    background: '$Background1dp',
    padding: '13px 16px',
    border: '1px solid $OtherDivider',
    borderRadius: 4,
  },

  '&.isHeader': {
    background: '$ActionLight',
    padding: '13px 16px',
    borderBottom: '1px solid $OtherDivider',
  },

  '&.isFooter': {
    background: '$Background1dp',
    padding: '13px 16px',
    color: '$TextSecondary',
    borderTop: '1px solid $OtherDivider',
  },

  '&.isActive': {
    background: '$ActionLightSelected',
  },
})

const Container = styled('span', {
  display: 'inline-flex',
  alignSelf: 'center',
  flexShrink: 0,

  variants: {
    type: {
      drag: {
        marginRight: 12,
      },
      start: {
        marginRight: 16,
      },
      end: {
        marginLeft: 'auto',
        paddingLeft: 10,
      },
    },
  },
})

export type ListItemType =
  | 'simple'
  | 'complex'
  | 'header'
  | 'footer'
  | 'floating'

export interface ListItemProps extends ComponentProps<typeof StyledListItem> {
  type?: ListItemType
  leftArea?: ReactNode
  rightArea?: ReactNode
  isActive?: boolean
  isDraggable?: boolean
  isFirstItem?: boolean
  isLastItem?: boolean
  children?: ReactNode
}

export const ListItem = forwardRef<
  ElementRef<typeof StyledListItem>,
  ListItemProps
>((properties, forwardedRef) => {
  const {
    type = 'simple',
    isActive = false,
    isDraggable = false,
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
  const isFloating = type === 'floating'

  const classes = classNames({
    isSimple,
    isComplex,
    isFloating,
    isHeader,
    isFooter,
    isActive,
    isFirstItem,
    isLastItem,
  })

  const dragIcon = <IconDragDrop />

  return (
    <StyledListItem className={classes} ref={forwardedRef} {...remainingProps}>
      <Conditional test={isDraggable}>
        <Container type="drag">{dragIcon}</Container>
      </Conditional>

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

ListItem.displayName = 'ListItem'
