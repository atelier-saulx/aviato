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
>(({ children, ...props }, forwardedRef) => {
  return (
    <ColumnDiv {...props} ref={forwardedRef}>
      {children}
    </ColumnDiv>
  )
})
