import React, {
  forwardRef,
  ElementRef,
  useState,
  useMemo,
  ReactElement,
  cloneElement,
} from 'react'
import { ComponentProps } from '@stitches/react'

import { styled, ThemeProvider } from '~/theme'
import { MenuStateContext, menuWidth } from '../Navigation'
import { headerHeight } from './Header'

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

const PageContainer = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: '$Background2dp',
  marginTop: headerHeight,

  '@breakpoint1': {
    paddingLeft: menuWidth,
  },

  variants: {
    headerStyle: {
      fullWidth: {},
      split: {},
    },
  },
})

const NavigationContainer = styled('div', {
  height: '100%',
  width: 'auto',
  marginTop: headerHeight,

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

export type HeaderStyle = 'fullWidth' | 'split'

export interface ApplicationRootProps
  extends ComponentProps<typeof StyledApplicationRoot> {
  navigation?: ReactElement
  header?: ReactElement
  headerStyle?: HeaderStyle
  SSR?: boolean
}

export const ApplicationRoot = forwardRef<
  ElementRef<typeof StyledApplicationRoot>,
  ApplicationRootProps
>((properties, forwardedRef) => {
  const {
    SSR = false,
    navigation,
    header,
    headerStyle = 'fullWidth',
    children,
    ...remainingProps
  } = properties

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const value = useMemo(() => ({ isMenuOpen, setIsMenuOpen }), [isMenuOpen])

  const NavigationComponent = navigation ? cloneElement(navigation) : null
  const HeaderComponent = header ? cloneElement(header) : null

  return (
    <ThemeProvider isSSRApplication={SSR}>
      <MenuStateContext.Provider value={value}>
        <StyledApplicationRoot ref={forwardedRef} {...remainingProps}>
          {HeaderComponent}

          <NavigationContainer isOpen={isMenuOpen}>
            {NavigationComponent}
          </NavigationContainer>

          <PageContainer headerStyle={headerStyle}>{children}</PageContainer>
        </StyledApplicationRoot>
      </MenuStateContext.Provider>
    </ThemeProvider>
  )
})

ApplicationRoot.displayName = 'ApplicationRoot'
