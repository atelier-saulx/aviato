import { ComponentProps } from '@stitches/react'
import React, { forwardRef, ElementRef } from 'react'

import { styled } from '~/theme'

const StyledListItem = styled('div', {})

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
