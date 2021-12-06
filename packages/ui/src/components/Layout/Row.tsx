import React, { CSSProperties, ElementRef } from 'react'
import { styled, CSS } from '~/theme'

const StyledRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

export type RowProps = {
  css?: CSS
  style?: CSSProperties
}

export const Row = React.forwardRef<ElementRef<typeof StyledRow>, RowProps>(
  ({ children, ...properties }, forwardedRef) => {
    return (
      <StyledRow {...properties} ref={forwardedRef}>
        {children}
      </StyledRow>
    )
  }
)
