import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { DefaultProps, styled } from '~/theme'

const StyledColumn = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
})

export interface ColumnProps extends DefaultProps {}

type ForwardProps = ComponentProps<typeof StyledColumn> & ColumnProps

export const Column = React.forwardRef<
  ElementRef<typeof StyledColumn>,
  ForwardProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledColumn ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledColumn>
  )
})
