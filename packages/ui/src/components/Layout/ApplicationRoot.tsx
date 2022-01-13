import React, { ElementRef, useState, useMemo } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled, ThemeProvider } from '~/theme'

import { MenuStateContext, menuWidth } from '../SideMenu'
import { Header, headerHeight } from './Header'
import { Group } from './Group'
import { ToggleThemeButton } from './ToggleThemeButton'
import { ToggleMenuButton } from './ToggleMenuButton'

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
  SSR?: boolean
}

type ForwardProps = ComponentProps<typeof StyledApplicationRoot> &
  ApplicationRootProps

export const ApplicationRoot = React.forwardRef<
  ElementRef<typeof StyledApplicationRoot>,
  ForwardProps
>((properties, forwardedRef) => {
  const { SSR = false, children, navigation, ...remainingProps } = properties

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const value = useMemo(() => ({ isMenuOpen, setIsMenuOpen }), [isMenuOpen])

  const hasSideMenu = Boolean(navigation)
  const NavigationComponent = navigation ? React.cloneElement(navigation) : null

  return (
    <ThemeProvider isSSRApplication={SSR}>
      <MenuStateContext.Provider value={value}>
        <StyledApplicationRoot ref={forwardedRef} {...remainingProps}>
          <Header>
            <Group>
              <ToggleMenuButton />
              <ToggleThemeButton />
            </Group>
          </Header>

          <NavigationWrapper isOpen={isMenuOpen}>
            {NavigationComponent}
          </NavigationWrapper>

          <PageWrapper sideMenu={hasSideMenu}>{children}</PageWrapper>
        </StyledApplicationRoot>
      </MenuStateContext.Provider>
    </ThemeProvider>
  )
})
