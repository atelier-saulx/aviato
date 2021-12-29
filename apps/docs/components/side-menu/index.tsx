import { useCallback, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'

import { SideMenu, Menu, MenuItem, styled } from '@aviato/ui'
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
      {
        title: 'Radio Group',
        route: '/components/radio-group',
      },
      {
        title: 'Slider',
        route: '/components/slider',
      },
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
  color: '$Primary',
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
    <SideMenu>
      <HeaderDiv onClick={() => setRoute('/')}>
        <AviatoLogo />
      </HeaderDiv>

      <Menu>{mainMenuItems}</Menu>
    </SideMenu>
  )
})

export { MainSideMenu as SideMenu }
