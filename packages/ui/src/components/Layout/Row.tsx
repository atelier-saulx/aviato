import React, { ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

const StyledRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

export interface RowProps extends DefaultProps {}

export const Row = React.forwardRef<ElementRef<typeof StyledRow>, RowProps>(
  ({ children, ...properties }, forwardedRef) => {
    return (
      <StyledRow {...properties} ref={forwardedRef}>
        {children}
      </StyledRow>
    )
  }
)
