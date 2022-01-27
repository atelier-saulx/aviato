import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledListItem = styled('div', {
  width: '100%',
  height: '100%',
  background: '$Background1dp',
  padding: '4px 16px',

  '&:hover': {
    background: '$ActionMain',
  },
})

export interface ListItemProps extends ComponentProps<typeof StyledListItem> {}

export const ListItem = forwardRef<
  ElementRef<typeof StyledListItem>,
  ListItemProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledListItem ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledListItem>
  )
})
