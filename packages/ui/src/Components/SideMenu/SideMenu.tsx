import React, { FunctionComponent } from 'react'
import { styled } from '../../theme'

const StyledDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: 200,
  minWidth: 200,
  overflowX: 'hidden',
  backgroundColor: '$background',
})

export const SideMenu: FunctionComponent = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>
}
