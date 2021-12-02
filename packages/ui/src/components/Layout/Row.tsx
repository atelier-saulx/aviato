import React, { ElementRef } from 'react'
import { styled, DefaultProps } from '~/theme'

const StyledRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

type RowProps = DefaultProps & {}

export const Row = React.forwardRef<ElementRef<typeof StyledRow>, RowProps>(
  ({ children, ...properties }, forwardedRef) => {
    return (
      <StyledRow {...properties} ref={forwardedRef}>
        {children}
      </StyledRow>
    )
  }
)
