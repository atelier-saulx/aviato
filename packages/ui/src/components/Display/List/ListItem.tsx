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

  '&.simple': {
    background: '$Background1dp',

    '&:hover': {
      background: '$ActionMain',
    },
  },

  '&.complex': {
    background: '$Background1dp',
    padding: '8px 16px',

    '&:hover': {
      background: '$ActionMain',
    },
  },

  '&.header': {
    background: '$ActionMain',
    borderBottom: '1px solid $OtherDivider',
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

export type ListItemType = 'simple' | 'complex' | 'header'

export interface ListItemProps extends ComponentProps<typeof StyledListItem> {
  type?: ListItemType
  isActive?: boolean
  leftArea?: ReactNode
  rightArea?: ReactNode
}

export const ListItem = forwardRef<
  ElementRef<typeof StyledListItem>,
  ListItemProps
>((properties, forwardedRef) => {
  const {
    type = 'simple',
    isActive = false,
    leftArea,
    rightArea,
    children,
    ...remainingProps
  } = properties

  const classes = classNames({
    simple: type === 'simple',
    complex: type === 'complex',
    header: type === 'header',
    isActive,
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
