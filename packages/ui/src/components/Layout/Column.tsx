import React, { ElementRef } from 'react'
import { styled, DefaultProps } from '~/theme'

const ColumnDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export type ColumnProps = DefaultProps & {}

export const Column = React.forwardRef<
  ElementRef<typeof ColumnDiv>,
  ColumnProps
>(({ children, ...properties }, forwardedRef) => {
  return (
    <ColumnDiv {...properties} ref={forwardedRef}>
      {children}
    </ColumnDiv>
  )
})
