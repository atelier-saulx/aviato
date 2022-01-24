import { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'next/router'

import { SideMenu, Menu, MenuItem, styled, useMenuContext } from '@aviato/ui'
import { AviatoLogo } from '../logo'
import { featureFlags } from '../../feature-flags/featureFlags'

type MenuDataItems = {
  title: string
  route?: string
  startOpen?: boolean
  isMissing?: boolean
  subMenu?: MenuDataItems[]
}

const inputMenuItems: MenuDataItems[] = [
  {
    title: 'Button',
    route: '/input/button',
  },
  {
    title: 'Checkbox',
    route: '/input/checkbox',
  },
  {
    title: 'Icons',
    route: '/input/icons',
  },
  {
    title: 'Input',
    route: '/input/input',
  },
  {
    title: 'Radio Group',
    route: '/input/radio-group',
  },
  {
    title: 'Slider',
    route: '/input/slider',
  },
  {
    title: 'Select',
    route: '/input/select',
  },
  {
    title: 'Switch',
    route: '/input/switch',
  },
  {
    title: 'Text Field',
    route: '/input/text-field',
  },
  {
    title: 'Toggle Group',
    route: '/input/toggle-group',
  },
]

const dataDisplayMenuItems: MenuDataItems[] = [
  {
    title: 'Accordion',
    route: '/data-display/accordion',
  },
  {
    title: 'Avatar',
    route: '/data-display/avatar',
    isMissing: true,
  },
  {
    title: 'Badge',
    route: '/data-display/badge',
    isMissing: true,
  },
  {
    title: 'Chip',
    route: '/data-display/chip',
    isMissing: true,
  },
  {
    title: 'List',
    route: '/data-display/list',
    isMissing: true,
  },
  {
    title: 'Table',
    route: '/data-display/table',
    isMissing: true,
  },
  {
    title: 'Code Snippet',
    route: '/data-display/code-snippet',
    isMissing: true,
  },
  {
    title: 'Tabs',
    route: '/data-display/tabs',
    isMissing: true,
  },
]

const feedbackMenuItems: MenuDataItems[] = [
  {
    title: 'Alert',
    route: '/feedback/alert',
  },
  {
    title: 'Toast / Notification',
    route: '/feedback/toast',
  },
  {
    title: 'Tooltip',
    route: '/feedback/tooltip',
  },
]

const navigationMenuItems: MenuDataItems[] = [
  {
    title: 'Side Menu',
    route: '/navigation/side-menu',
    isMissing: true,
  },
  {
    title: 'Top Bar',
    route: '/navigation/top-bar',
    isMissing: true,
  },
  {
    title: 'Link',
    route: '/navigation/link',
    isMissing: true,
  },
  {
    title: 'Breadcrumbs',
    route: '/navigation/breadcrumbs',
    isMissing: true,
  },
]

const overlayMenuItems: MenuDataItems[] = [
  {
    title: 'Context Menu',
    route: '/overlay/context-menu',
  },
  {
    title: 'Dialog',
    route: '/overlay/dialog',
  },
  {
    title: 'Drawer',
    route: '/overlay/drawer',
    isMissing: true,
  },
  {
    title: 'Modal',
    route: '/overlay/modal',
    isMissing: true,
  },
]

const rootMenu: MenuDataItems[] = [
  {
    title: 'Introduction',
    route: '/',
  },
  {
    title: 'Components',
    route: '/components',
    subMenu: [
      {
        title: 'Input',
        startOpen: true,
        subMenu: inputMenuItems,
      },
      {
        title: 'Data Display',
        startOpen: false,
        subMenu: dataDisplayMenuItems,
      },
      {
        title: 'Feedback',
        startOpen: false,
        subMenu: feedbackMenuItems,
      },
      {
        title: 'Navigation',
        startOpen: false,
        subMenu: navigationMenuItems,
      },
      {
        title: 'Overlay',
        startOpen: false,
        subMenu: overlayMenuItems,
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

function getMenuItems(menu: MenuDataItems[]) {
  const filteredMenu = menu
    .map((item) => {
      if (item.subMenu) {
        item.subMenu = getMenuItems(item.subMenu)
      }

      if (!featureFlags.isEnabled('ShowUnfinishedPages')) {
        if (item.isMissing) {
          return null
        }
      }

      return item
    })
    .filter((item) => item !== null)

  return filteredMenu
}

const MainSideMenu = withRouter(({ router }) => {
  const { asPath, events, pathname } = router
  const [activeRoute, setActiveRoute] = useState(pathname)

  const { setIsMenuOpen } = useMenuContext()

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

  const mainMenu = getMenuItems(rootMenu)

  const mainMenuItems = mainMenu.map(
    ({ title, route, subMenu, startOpen = false }, menuIndex) => {
      const mappedSubmenu = subMenu?.map(
        ({ title, route, subMenu, startOpen = false }, submenuIndex) => {
          const mappedSubmenu = subMenu?.map(
            ({ title, route }, submenuIndex) => {
              return (
                <MenuItem
                  title={title}
                  onClick={() => setRoute(route)}
                  key={`SubMenuItem-${submenuIndex}`}
                  isActive={isActiveRoute(route)}
                  startOpen={startOpen}
                />
              )
            }
          )

          const hasSubmenu = Boolean(subMenu)

          return (
            <MenuItem
              title={title}
              onClick={() => setRoute(route)}
              key={`SubMenuItem-${submenuIndex}`}
              isActive={isActiveRoute(route)}
              startOpen={startOpen}
            >
              {hasSubmenu ? <Menu>{mappedSubmenu}</Menu> : null}
            </MenuItem>
          )
        }
      )

      const hasSubmenu = Boolean(subMenu)

      return (
        <MenuItem
          title={title}
          onClick={() => setRoute(route)}
          key={`MenuItem-${menuIndex}`}
          isHeader={hasSubmenu}
          isActive={isActiveRoute(route)}
          startOpen={startOpen}
        >
          {hasSubmenu ? <Menu>{mappedSubmenu}</Menu> : null}
        </MenuItem>
      )
    }
  )

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
