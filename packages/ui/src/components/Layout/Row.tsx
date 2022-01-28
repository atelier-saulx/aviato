import React, { ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
})

export interface RowProps extends ComponentProps<typeof StyledRow> {}

export const Row = forwardRef<ElementRef<typeof StyledRow>, RowProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    return (
      <StyledRow ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledRow>
    )
  }
)

Row.displayName = 'Row'
