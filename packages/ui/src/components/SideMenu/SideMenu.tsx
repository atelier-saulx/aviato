import { ComponentProps } from '@stitches/react'
import React, { ElementRef } from 'react'
import { styled } from '~/theme'

const StyledSideMenu = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: 224,
  minWidth: 224,
  backgroundColor: '$Background2dp',
  borderRight: '1px solid $OtherDivider',
  overflowX: 'hidden',
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
