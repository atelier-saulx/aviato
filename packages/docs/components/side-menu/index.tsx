import { LogoWithTitle } from '../logo'
import { withRouter, NextRouter } from 'next/router'

import { SideMenu as AviatoSideMenu, Menu, MenuItem } from '@aviato/ui'
import { FunctionComponent } from 'react'

interface MainSideMenuProps {
  router: NextRouter
}

const SideMenu = withRouter(({ router }: MainSideMenuProps) => {
  type Items = {
    title: string
    route: string
    subMenu?: Items[]
  }

  const mainMenu: Items[] = [
    {
      title: 'Home',
      route: '/',
    },
    {
      title: 'Examples',
      route: 'examples',
    },
    {
      title: 'Playground',
      route: 'playground',
      subMenu: [
        {
          title: 'Inputs',
          route: 'playground/inputs',
        },
      ],
    },
  ]

  const mainMenuItems = mainMenu.map(({ title, route, subMenu }, menuIndex) => {
    const mappedSubmenu = subMenu?.map(({ title, route }, submenuIndex) => {
      return (
        <MenuItem
          title={title}
          onClick={() => router.replace(route)}
          key={`SubMenuItem-${submenuIndex}`}
        />
      )
    })

    return (
      <MenuItem
        title={title}
        onClick={() => router.replace(route)}
        key={`MenuItem-${menuIndex}`}
      >
        {mappedSubmenu}
      </MenuItem>
    )
  })

  const Header: FunctionComponent = () => {
    return (
      <div
        onClick={() => router.replace('./')}
        style={{
          padding: '10px',
        }}
      >
        <LogoWithTitle />
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
