import React, { ElementRef } from 'react'
import { styled, DefaultProps } from '~/theme'

const RowDiv = styled('div', {
  display: 'flex',
  flexDirection: 'row',
})

export type RowProps = DefaultProps & {}

export const Column = React.forwardRef<ElementRef<typeof RowDiv>, RowProps>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <RowDiv {...props} ref={forwardedRef}>
        {children}
      </RowDiv>
    )
  }
)
