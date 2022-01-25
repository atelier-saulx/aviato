import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledTab = styled('div', {})

export interface TabProps extends ComponentProps<typeof StyledTab> {}

export const Tab = forwardRef<ElementRef<typeof StyledTab>, TabProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    return (
      <StyledTab ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledTab>
    )
  }
)
