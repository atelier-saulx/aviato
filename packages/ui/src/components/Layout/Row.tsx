import React, { ElementRef } from 'react'
import { styled, DefaultProps } from '~/theme'

const RowDiv = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

export type RowProps = DefaultProps & {}

export const Row = React.forwardRef<ElementRef<typeof RowDiv>, RowProps>(
  ({ children, ...properties }, forwardedRef) => {
    return (
      <RowDiv {...properties} ref={forwardedRef}>
        {children}
      </RowDiv>
    )
  }
)
