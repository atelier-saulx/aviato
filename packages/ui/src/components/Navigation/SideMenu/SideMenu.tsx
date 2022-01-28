import React, { ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { headerHeight } from '../../Layout/Header'
import { ScrollArea } from '../../Utilities'

export const menuWidth = 224

const Padding = styled('div', {
  padding: 8,
})

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
  zIndex: 10,
  marginTop: headerHeight,

  '@breakpoint1': {
    width: menuWidth,
    minWidth: menuWidth,
    borderRight: '1px solid $OtherDivider',
    marginTop: 0,
  },
})

export interface SideMenuProps extends ComponentProps<typeof StyledSideMenu> {}

export const SideMenu = forwardRef<
  ElementRef<typeof StyledSideMenu>,
  SideMenuProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledSideMenu ref={forwardedRef} {...remainingProps}>
      <ScrollArea>
        <Padding>{children}</Padding>
      </ScrollArea>
    </StyledSideMenu>
  )
})

SideMenu.displayName = 'SideMenu'
