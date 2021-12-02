import React, { ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

export const MenuWidthConstant = 224

const StyledSideMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: MenuWidthConstant,
  minWidth: MenuWidthConstant,
  overflowX: 'hidden',
  backgroundColor: '#F7F7F8',
})

type SideMenuProps = DefaultProps & {}

export const SideMenu = React.forwardRef<
  ElementRef<typeof StyledSideMenu>,
  SideMenuProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledSideMenu ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledSideMenu>
  )
})
