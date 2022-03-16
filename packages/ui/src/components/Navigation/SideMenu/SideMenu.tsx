import React, { ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { styled } from '~/theme'
import { ScrollArea } from '~/components'

const Padding = styled('div', {
  padding: 8,
})

const StyledSideMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
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
