import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { headerHeight } from '../Layout/Header'

export const menuWidth = 224

const StyledSideMenu = styled('div', {
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  minWidth: '100%',
  backgroundColor: '$Background2dp',
  overflowX: 'hidden',
  padding: 8,
  zIndex: 10,
  marginTop: headerHeight,

  '@breakpoint1': {
    width: menuWidth,
    minWidth: menuWidth,
    borderRight: '1px solid $OtherDivider',
    marginTop: 0,
  },
})

export interface SideMenuProps {}

type ForwardProps = ComponentProps<typeof StyledSideMenu> & SideMenuProps

export const SideMenu = React.forwardRef<
  ElementRef<typeof StyledSideMenu>,
  ForwardProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledSideMenu ref={forwardedRef} {...remainingProps}>
      {children}
    </StyledSideMenu>
  )
})
