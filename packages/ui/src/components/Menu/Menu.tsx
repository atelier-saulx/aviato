import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const StyledWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
})

const StyledChild = styled('div', {
  paddingBottom: '2px',
})

export const Menu: FunctionComponent = ({ children }) => {
  const WrappedChildren = React.Children.map(children, (child, index) => {
    return <StyledChild key={`StyledChild-${index}`}>{child}</StyledChild>
  })

  return <StyledWrapper>{WrappedChildren}</StyledWrapper>
}
