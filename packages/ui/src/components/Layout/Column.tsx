import React, { ComponentProps, ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

const StyledColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
})

export interface ColumnProps extends DefaultProps {}

type ForwardProps = ComponentProps<typeof StyledColumn> & ColumnProps

export const Column = React.forwardRef<
  ElementRef<typeof StyledColumn>,
  ForwardProps
>(({ children, ...properties }, forwardedRef) => {
  return (
    <StyledColumn {...properties} ref={forwardedRef}>
      {children}
    </StyledColumn>
  )
})
