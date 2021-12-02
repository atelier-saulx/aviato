import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

export const MenuWidthConstant = 224

const MenuDiv = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: MenuWidthConstant,
  minWidth: MenuWidthConstant,
  overflowX: 'hidden',
  backgroundColor: '#F7F7F8',
})

export type SideMenuProps = {
  padding?: number
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  children,
  padding = 8,
}) => {
  return <MenuDiv css={{ padding }}>{children}</MenuDiv>
}
