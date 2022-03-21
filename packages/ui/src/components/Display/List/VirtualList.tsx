import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledVirtualList = styled('div', {})

export interface VirtualListProps
  extends ComponentProps<typeof StyledVirtualList> {}

export const VirtualList = forwardRef<
  ElementRef<typeof StyledVirtualList>,
  VirtualListProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledVirtualList ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledVirtualList>
  )
})
