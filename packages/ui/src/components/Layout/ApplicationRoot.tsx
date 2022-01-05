import React, { ElementRef, useState } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled, ThemeProvider, ToggleThemeButton } from '~/theme'
import { ToggleMenuButton, menuWidth } from '../SideMenu'
import { Header, headerHeight } from './Header'
import { Group } from './Group'

const StyledApplicationRoot = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '100%',
  minHeight: '100vh',
  backgroundColor: '$Background2dp',
  overflowX: 'hidden',
  overflowY: 'hidden',
})

const PageWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: '$Background2dp',
  marginTop: headerHeight,

  variants: {
    sideMenu: {
      true: {
        '@breakpoint1': {
          paddingLeft: menuWidth,
        },
      },
    },
  },
})

const NavigationWrapper = styled('div', {
  variants: {
    isOpen: {
      true: {
        display: 'block',
      },

      false: {
        display: 'none',

        '@breakpoint1': {
          display: 'block',
        },
      },
    },
  },
})

export type ApplicationRootProps = {
  navigation?: React.ReactElement
}

type ForwardProps = ComponentProps<typeof StyledApplicationRoot> &
  ApplicationRootProps

let menuOpen = false

export const ApplicationRoot = React.forwardRef<
  ElementRef<typeof StyledApplicationRoot>,
  ForwardProps
>((properties, forwardedRef) => {
  const { children, navigation, ...remainingProps } = properties

  const [isMenuOpen, setIsOpen] = useState(false)

  const hasSideMenu = Boolean(navigation)
  const NavigationComponent = navigation ? React.cloneElement(navigation) : null

  const handleMenuButtonClick = () => {
    menuOpen = !menuOpen
    setIsOpen(menuOpen)
  }

  return (
    <ThemeProvider>
      <StyledApplicationRoot ref={forwardedRef} {...remainingProps}>
        <Header>
          <Group>
            <ToggleMenuButton onClick={handleMenuButtonClick} />
            <ToggleThemeButton />
          </Group>
        </Header>

        <NavigationWrapper isOpen={isMenuOpen}>
          {NavigationComponent}
        </NavigationWrapper>

        <PageWrapper sideMenu={hasSideMenu}>{children}</PageWrapper>
      </StyledApplicationRoot>
    </ThemeProvider>
  )
})
