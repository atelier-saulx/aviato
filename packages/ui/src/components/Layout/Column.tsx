import React, { ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

const StyledColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export interface ColumnProps extends DefaultProps {}

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
