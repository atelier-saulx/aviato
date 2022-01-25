import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledTabs = styled('div', {})

export interface TabsProps extends ComponentProps<typeof StyledTabs> {}

export const Tabs = forwardRef<ElementRef<typeof StyledTabs>, TabsProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    return (
      <StyledTabs ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledTabs>
    )
  }
)
