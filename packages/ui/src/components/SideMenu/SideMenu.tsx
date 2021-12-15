import { ComponentProps } from '@stitches/react'
import React, { ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

export const MenuWidthConstant = 224

const DIV_TAG = 'div'

const StyledSideMenu = styled(DIV_TAG, {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: MenuWidthConstant,
  minWidth: MenuWidthConstant,
  overflowX: 'hidden',
  backgroundColor: '$Background2dp',
  borderRight: '1px solid $OtherDivider',
})

export interface SideMenuProps extends DefaultProps {
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
