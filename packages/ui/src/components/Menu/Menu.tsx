import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const StyledDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  overflowX: 'hidden',
})

export const Menu: FunctionComponent = ({ children }) => {
  return (
    <StyledDiv>
      <div>{children}</div>
    </StyledDiv>
  )
}
