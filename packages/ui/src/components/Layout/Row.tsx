import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { DefaultProps, styled } from '~/theme'

const StyledRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  height: '100%',
})

export interface RowProps extends DefaultProps {}

type ForwardProps = ComponentProps<typeof StyledRow> & RowProps

export const Row = React.forwardRef<ElementRef<typeof StyledRow>, ForwardProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    return (
      <StyledRow ref={forwardedRef} {...remainingProps}>
        {children}
      </StyledRow>
    )
  }
)
