import React, { ElementRef } from 'react'
import { styled, DefaultProps } from '~/theme'

const StyledColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

type ColumnProps = DefaultProps & {}

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
