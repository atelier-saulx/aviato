import React, { ComponentProps, ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

const StyledRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
})

export interface RowProps extends DefaultProps {}

type ForwardProps = ComponentProps<typeof StyledRow> & RowProps

export const Row = React.forwardRef<ElementRef<typeof StyledRow>, ForwardProps>(
  ({ children, ...properties }, forwardedRef) => {
    return (
      <StyledRow {...properties} ref={forwardedRef}>
        {children}
      </StyledRow>
    )
  }
)
