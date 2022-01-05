import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled, ThemeProvider, ToggleThemeButton } from '~/theme'
import { menuWidth } from '../SideMenu'

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

const TopRight = styled('div', {
  position: 'absolute',
  top: 0,
  right: 0,
  paddingTop: 10,
  paddingRight: 16,
})

const PageWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: '$Background2dp',

  variants: {
    sideMenu: {
      true: {
        paddingLeft: menuWidth,
      },
    },
  },
})

export type ApplicationRootProps = {
  navigation?: React.ReactElement
}

type ForwardProps = ComponentProps<typeof StyledApplicationRoot> &
  ApplicationRootProps

export const ApplicationRoot = React.forwardRef<
  ElementRef<typeof StyledApplicationRoot>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    children,
    navigation: NavigationComponent,
    ...remainingProps
  } = properties

  const hasSideMenu = Boolean(NavigationComponent)

  return (
    <ThemeProvider>
      <StyledApplicationRoot ref={forwardedRef} {...remainingProps}>
        <>{NavigationComponent}</>

        <PageWrapper sideMenu={hasSideMenu}>{children}</PageWrapper>

        <TopRight>
          <ToggleThemeButton />
        </TopRight>
      </StyledApplicationRoot>
    </ThemeProvider>
  )
})
