import { ComponentProps } from '@stitches/react'
import React, { ElementRef } from 'react'
import { styled } from '~/theme'

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
  width: menuWidth,
  minWidth: menuWidth,
  backgroundColor: '$Background2dp',
  borderRight: '1px solid $OtherDivider',
  overflowX: 'hidden',
  zIndex: 1,
})

export interface SideMenuProps {
  useBorder?: boolean
}

type ForwardProps = ComponentProps<typeof StyledSideMenu> & SideMenuProps

export const SideMenu = React.forwardRef<
  ElementRef<typeof StyledSideMenu>,
  ForwardProps
>((properties, forwardedRef) => {
  const { children, ...remainingProps } = properties

  return (
    <StyledSideMenu
      ref={forwardedRef}
      css={{
        padding: 8,
      }}
      {...remainingProps}
    >
      {children}
    </StyledSideMenu>
  )
})
