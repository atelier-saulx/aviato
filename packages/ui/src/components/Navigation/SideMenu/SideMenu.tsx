import React, { ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { ScrollArea } from '../../Utilities'

export const menuWidth = 224

const Padding = styled('div', {
  padding: 8,
})

const StyledSideMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  minWidth: menuWidth,
  maxWidth: menuWidth,
  backgroundColor: '$Background2dp',
  overflowX: 'hidden',
  zIndex: 10,
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
