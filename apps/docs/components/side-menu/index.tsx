import { useCallback, useContext, useEffect, useState } from 'react'
import { withRouter, NextRouter } from 'next/router'

import { SideMenu, Menu, MenuItem, styled, MenuStateContext } from '@aviato/ui'
import { AviatoLogo } from '../logo'
import { featureFlags } from '../../feature-flags'

const componentsSubMenu: MenuDataItems[] = [
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
  {
    title: 'Input',
    route: '/components/input',
  },
  {
    title: 'Text Field',
    route: '/components/text-field',
  },
  {
    title: 'Icons',
    route: '/components/icons',
  },
  {
    title: 'Tooltip',
    route: '/components/tooltip',
  },
]

const mainMenu: MenuDataItems[] = [
  {
    title: 'Introduction',
    route: '/',
  },
  {
    title: 'Components',
    subMenu: componentsSubMenu,
  },
]

/**
 * Add pages under a feature flag using the below approach.
 */
if (featureFlags.isEnabled('DemoFlag')) {
  componentsSubMenu.push({
    title: 'Demo Page',
    route: '/components/demo-page',
  })
}

if (featureFlags.isEnabled('Select')) {
  componentsSubMenu.push({
    title: 'Select',
    route: '/components/select',
  })
}

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
  const { asPath, events } = router

  const { setIsMenuOpen } = useContext(MenuStateContext)

  const handleRouteChange = useCallback(() => {
    setIsMenuOpen(false)
  }, [setIsMenuOpen])

  useEffect(() => {
    events.on('routeChangeComplete', handleRouteChange)

    return () => {
      events.off('routeChangeComplete', handleRouteChange)
    }
  }, [events, handleRouteChange])

  useCallback(() => {
    setActiveRoute(asPath)
  }, [asPath])

  const isActiveRoute = (route = '') => activeRoute === route

  const setRoute = useCallback(
    (targetRoute: string | undefined) => {
      if (!targetRoute) return

      setActiveRoute(targetRoute)
      router.push({
        pathname: targetRoute,
      })
    },
    [router]
  )

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
