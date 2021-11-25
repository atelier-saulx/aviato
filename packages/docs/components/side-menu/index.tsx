import { withRouter, NextRouter } from 'next/router'

import { SideMenu as AviatoSideMenu, Menu, MenuItem, Text } from '@aviato/ui'
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
      route: '/examples',
    },
    {
      title: 'Playground',
      route: '/playground',
      subMenu: [
        {
          title: 'Inputs',
          route: '/playground/inputs',
        },
      ],
    },
  ]

  const mainMenuItems = mainMenu.map(({ title, route, subMenu }, menuIndex) => {
    const mappedSubmenu = subMenu?.map(({ title, route }, submenuIndex) => {
      return (
        <MenuItem
          title={title}
          onClick={() => router.push({ pathname: route })}
          key={`SubMenuItem-${submenuIndex}`}
        />
      )
    })

    return (
      <MenuItem
        title={title}
        onClick={() => router.push({ pathname: route })}
        key={`MenuItem-${menuIndex}`}
      >
        {subMenu ? mappedSubmenu : null}
      </MenuItem>
    )
  })

  const Header: FunctionComponent = () => {
    return (
      <div
        onClick={() => router.push({ pathname: '/' })}
        style={{
          padding: '10px',
        }}
      >
        <Text fontWeight="bold">Aviato-UI</Text>
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
