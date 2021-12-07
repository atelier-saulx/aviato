import React, { ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

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

export interface MenuProps extends DefaultProps {}

export const Menu = React.forwardRef<ElementRef<typeof StyledMenu>, MenuProps>(
  (properties, forwardedRef) => {
    const { children, ...remainingProps } = properties

    const WrappedChildren = React.Children.map(children, (child, index) => {
      return <StyledChild key={`StyledChild-${index}`}>{child}</StyledChild>
    })

    return (
      <StyledMenu ref={forwardedRef} {...remainingProps}>
        {WrappedChildren}
      </StyledMenu>
    )
  }
)
