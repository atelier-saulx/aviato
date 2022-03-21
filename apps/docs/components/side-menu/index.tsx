import { useCallback, useEffect, useState } from 'react'
import { withRouter } from 'next/router'

import { SideMenu, Menu, MenuItem, useMenuContext } from '@aviato/ui'

import { featureFlags } from '../../feature-flags/featureFlags'

interface MenuDataItem {
  title: string
  route?: string
  isMissing?: boolean
  subMenu?: MenuDataItem[]
  startOpen?: boolean
}

const inputMenuItems: MenuDataItem[] = [
  {
    title: 'Button',
    route: '/input/button',
  },
  {
    title: 'Checkbox',
    route: '/input/checkbox',
  },
  {
    title: 'Color Picker',
    route: '/input/color-picker',
    isMissing: true,
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
    title: 'Select',
    route: '/input/select',
    isMissing: true,
  },
  {
    title: 'Slider',
    route: '/input/slider',
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
  {
    title: 'Upload',
    route: '/input/upload',
    isMissing: true,
  },
]

const dataDisplayMenuItems: MenuDataItem[] = [
  {
    title: 'Accordion',
    route: '/data-display/accordion',
  },
  {
    title: 'Avatar',
    route: '/data-display/avatar',
  },
  {
    title: 'Badge',
    route: '/data-display/badge',
  },
  {
    title: 'Card',
    route: '/data-display/card',
    isMissing: true,
  },
  {
    title: 'Chip',
    route: '/data-display/chip',
  },
  {
    title: 'Code Snippet',
    route: '/data-display/code-snippet',
  },
  {
    title: 'Code Editor',
    route: '/data-display/code-editor',
  },
  {
    title: 'Grid',
    route: '/data-display/grid',
    isMissing: true,
  },
  {
    title: 'Image',
    route: '/data-display/image',
  },
  {
    title: 'List',
    route: '/data-display/list',
  },
  {
    title: 'Stat',
    route: '/data-display/stat',
    isMissing: true,
  },
  {
    title: 'Table',
    route: '/data-display/table',
    isMissing: true,
  },
]

const feedbackMenuItems: MenuDataItem[] = [
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

const navigationMenuItems: MenuDataItem[] = [
  {
    title: 'Breadcrumbs',
    route: '/navigation/breadcrumbs',
  },
  {
    title: 'Link',
    route: '/navigation/link',
  },
  {
    title: 'Side Menu',
    route: '/navigation/side-menu',
  },
  {
    title: 'Tabs',
    route: '/navigation/tabs',
  },
  {
    title: 'Top Bar',
    route: '/navigation/top-bar',
    isMissing: true,
  },
]

const overlayMenuItems: MenuDataItem[] = [
  {
    title: 'Context Menu',
    route: '/overlay/context-menu',
    isMissing: true,
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
  },
  {
    title: 'Overlay',
    route: '/overlay/overlay',
    isMissing: true,
  },
]

const rootMenu: MenuDataItem[] = [
  {
    title: 'Introduction',
    route: '/',
  },
  {
    title: 'Components',
    subMenu: [
      {
        title: 'Input',
        route: '/input',
        subMenu: inputMenuItems,
        startOpen: true,
      },
      {
        title: 'Data Display',
        route: '/data-display',
        subMenu: dataDisplayMenuItems,
      },
      {
        title: 'Feedback',
        route: '/feedback',
        subMenu: feedbackMenuItems,
      },
      {
        title: 'Navigation',
        route: '/navigation',
        subMenu: navigationMenuItems,
      },
      {
        title: 'Overlay',
        route: '/overlay',
        subMenu: overlayMenuItems,
      },
    ],
  },
]

const hasActiveRoute = (item: MenuDataItem, activeRoute: string): boolean => {
  const itemRoute = item?.route?.replace(/\//g, '')
  const targetRoute = activeRoute.replace(/\//g, '')

  const hasActiveRoute = itemRoute !== '' && targetRoute.includes(itemRoute)
  return hasActiveRoute
}

function getMenuItems({
  targetMenu,
  activeRoute,
}: {
  targetMenu?: MenuDataItem[]
  activeRoute: string
}) {
  if (!targetMenu) {
    return undefined
  }

  const filteredMenu = targetMenu
    .map((item) => {
      item.subMenu = getMenuItems({
        targetMenu: item.subMenu,
        activeRoute,
      })

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

  const handleRouteChange = useCallback(
    (targetRoute) => {
      setActiveRoute(targetRoute)
      setIsMenuOpen(false)
    },
    [setIsMenuOpen]
  )

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

      router.push({
        pathname: targetRoute,
      })
    },
    [router]
  )

  const mainMenuItems = getMenuItems({ targetMenu: rootMenu, activeRoute }).map(
    (menuItem, menuIndex) => {
      const { title, route, subMenu } = menuItem
      const hasSubmenu = Boolean(subMenu)

      const mappedSubmenu = subMenu?.map((subMenuItem, submenuIndex) => {
        const { title, route, subMenu, startOpen = false } = subMenuItem
        const hasSubmenu = Boolean(subMenu)

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

        /**
         * Keep menu open if on root route and startOpen is true
         */
        const isRootRoute = activeRoute === '/'
        const isMenuOpen =
          hasActiveRoute(subMenuItem, activeRoute) || (isRootRoute && startOpen)

        return (
          <MenuItem
            key={`SubMenuItem-${submenuIndex}`}
            title={title}
            onClick={() => setRoute(route)}
            isActive={isActiveRoute(route)}
            startOpen={isMenuOpen}
          >
            {hasSubmenu ? <Menu>{mappedSubmenu}</Menu> : null}
          </MenuItem>
        )
      })

      return (
        <MenuItem
          key={`MenuItem-${menuIndex}`}
          title={title}
          onClick={() => setRoute(route)}
          isHeader={hasSubmenu}
          isActive={isActiveRoute(route)}
        >
          {hasSubmenu ? <Menu>{mappedSubmenu}</Menu> : null}
        </MenuItem>
      )
    }
  )

  return (
    <SideMenu>
      <Menu>{mainMenuItems}</Menu>
    </SideMenu>
  )
})

export { MainSideMenu as SideMenu }
