import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const StyledDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: 224,
  minWidth: 224,
  overflowX: 'hidden',
  backgroundColor: '#F7F7F8',
  padding: 8,
})

export const SideMenu: FunctionComponent = ({ children }) => {
  return <StyledDiv>{children}</StyledDiv>
}
