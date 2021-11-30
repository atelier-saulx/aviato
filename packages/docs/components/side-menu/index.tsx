import { FunctionComponent } from 'react'
import { withRouter, NextRouter } from 'next/router'

import { SideMenu as AviatoSideMenu, Menu, MenuItem } from '@aviato/ui'

import { AviatoLogo } from './logo'

interface MainSideMenuProps {
  router: NextRouter
}

const SideMenu = withRouter(({ router }: MainSideMenuProps) => {
  type Items = {
    title: string
    route: string
    subMenu?: Items[]
  }

  const componentsMenu: Items[] = [
    {
      title: 'Buttons',
      route: '/components/buttons',
    },
    {
      title: 'Menu',
      route: '/components/menu',
    },
    {
      title: 'Text',
      route: '/components/text',
    },
    {
      title: 'Hooks',
      route: '/components/hooks',
    },
  ]

  const mainMenu: Items[] = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Components',
      route: '/components',
      subMenu: componentsMenu,
    },
  ]

  const mainMenuItems = mainMenu.map(({ title, route, subMenu }, menuIndex) => {
    const mappedSubmenu = subMenu?.map(({ title, route }, submenuIndex) => {
      return (
        <MenuItem
          title={title}
          onClick={() => router.push({ pathname: route })}
          key={`SubMenuItem-${submenuIndex}`}
          isCollapsable={false}
        />
      )
    })

    return (
      <MenuItem
        title={title}
        onClick={() => router.push({ pathname: route })}
        key={`MenuItem-${menuIndex}`}
        isCollapsable={false}
      >
        {subMenu ? (
          <div style={{ padding: '6px 10px' }}>{mappedSubmenu}</div>
        ) : null}
      </MenuItem>
    )
  })

  const Header: FunctionComponent = () => {
    return (
      <div
        onClick={() => router.push({ pathname: '/' })}
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '16px',
          paddingBottom: 85 - 16,
          cursor: 'pointer',
        }}
      >
        <AviatoLogo />
      </div>
    )
  }

  return (
    <AviatoSideMenu>
      <Header />
      <Menu>{mainMenuItems}</Menu>
    </AviatoSideMenu>
  )
})

export { SideMenu }
