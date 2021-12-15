import { useCallback, useEffect, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'
import { useTheme } from 'next-themes'

import { log } from '@aviato/utils'
import {
  SideMenu,
  Menu,
  MenuItem,
  Button,
  styled,
  getCurrentTheme,
} from '@aviato/ui'
import { AviatoLogo } from '../logo'

const mainMenu: MenuDataItems[] = [
  {
    title: 'Introduction',
    route: '/',
  },
  {
    title: 'Components',
    subMenu: [
      {
        title: 'Button',
        route: '/components/button',
      },
      {
        title: 'Icon Button',
        route: '/components/icon-button',
      },
      {
        title: 'Checkbox',
        route: '/components/checkbox',
      },
      {
        title: 'Switch',
        route: '/components/switch',
      },
      // {
      //   title: 'Radio Group',
      //   route: '/components/radio-group',
      // },
    ],
  },
]

const HeaderDiv = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '8px',
  paddingBottom: '69px',
  cursor: 'pointer',
})

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginTop: 'auto',
  padding: '8px',
})

interface MainSideMenuProps {
  router: NextRouter
}

type MenuDataItems = {
  title: string
  route?: string
  subMenu?: MenuDataItems[]
}

const MainSideMenu = withRouter(({ router }: MainSideMenuProps) => {
  const [activeRoute, setActiveRoute] = useState('/')
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(theme)

  useEffect(() => setMounted(true), [])

  const { asPath } = router

  useCallback(() => {
    setActiveRoute(asPath)
  }, [asPath])

  const isActiveRoute = (route = '') => activeRoute === route

  const setRoute = (targetRoute: string | undefined) => {
    if (!targetRoute) return

    setActiveRoute(targetRoute)
    router.push({
      pathname: targetRoute,
    })
  }

  const toggleTheme = useCallback(() => {
    log.global.debug('Toggling theme...')

    const targetTheme = getCurrentTheme() === 'light' ? 'dark' : 'light'

    setTheme(targetTheme)
    setCurrentTheme(targetTheme)
  }, [setTheme])

  // Prevent SSR de-sync error by waiting for CSR
  if (!mounted) {
    return null
  }

  const mainMenuItems = mainMenu.map(({ title, route, subMenu }, menuIndex) => {
    const mappedSubmenu = subMenu?.map(({ title, route }, submenuIndex) => {
      return (
        <MenuItem
          title={title}
          onClick={() => setRoute(route)}
          key={`SubMenuItem-${submenuIndex}`}
          isActive={isActiveRoute(route)}
        />
      )
    })

    const hasSubmenu = Boolean(subMenu)

    return (
      <MenuItem
        title={title}
        onClick={() => setRoute(route)}
        key={`MenuItem-${menuIndex}`}
        isHeader={hasSubmenu}
        isActive={isActiveRoute(route)}
      >
        {hasSubmenu ? <Menu>{mappedSubmenu}</Menu> : null}
      </MenuItem>
    )
  })

  return (
    <SideMenu
      css={{
        borderRight: '1px solid $OtherDivider',
      }}
    >
      <HeaderDiv onClick={() => setRoute('/')}>
        <AviatoLogo />
      </HeaderDiv>

      <Menu>{mainMenuItems}</Menu>

      <Footer>
        <Button onClick={() => toggleTheme()}>
          {currentTheme === 'light' ? '🌙' : '☀️'}
        </Button>
      </Footer>
    </SideMenu>
  )
})

export { MainSideMenu as SideMenu }
