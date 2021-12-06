import React, { CSSProperties, ElementRef } from 'react'
import { styled, CSS } from '~/theme'

const StyledColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export type ColumnProps = {
  css?: CSS
  style?: CSSProperties
}

export const Column = React.forwardRef<
  ElementRef<typeof StyledColumn>,
  ColumnProps
>(({ children, ...properties }, forwardedRef) => {
  return (
    <StyledColumn {...properties} ref={forwardedRef}>
      {children}
    </StyledColumn>
  )
})
