import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'

const StyledColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export interface ColumnProps extends ComponentProps<typeof StyledColumn> {}

export const Column = React.forwardRef<
  ElementRef<typeof StyledColumn>,
  ColumnProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledColumn ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledColumn>
  )
})
