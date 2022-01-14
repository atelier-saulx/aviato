import React, { ElementRef, forwardRef, Children } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'

const StyledMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
})

const StyledChild = styled('div', {
  paddingBottom: '2px',
})

export interface MenuProps extends ComponentProps<typeof StyledMenu> {}

export const Menu = forwardRef<ElementRef<typeof StyledMenu>, MenuProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    const WrappedChildren = Children.map(children, (child, index) => {
      return <StyledChild key={`StyledChild-${index}`}>{child}</StyledChild>
    })

    return (
      <StyledMenu ref={forwardedRef} {...remainingProps}>
        {WrappedChildren}
      </StyledMenu>
    )
  }
)
