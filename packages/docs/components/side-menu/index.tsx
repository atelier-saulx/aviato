import { withRouter, NextRouter } from 'next/router'

import {
  SideMenu as AviatoSideMenu,
  Menu,
  MenuItem,
  Title,
  Divider,
} from '@aviato/ui'
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
          title: 'Menu',
          route: '/playground/menu',
        },
        {
          title: 'Buttons',
          route: '/playground/buttons',
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
          padding: '30px 0px',
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <Title fontWeight="bold">Aviato-UI</Title>
      </div>
    )
  }

  return (
    <AviatoSideMenu>
      <Header />
      <div>
        <Divider />
      </div>
      <Menu>{mainMenuItems}</Menu>
    </AviatoSideMenu>
  )
})

export { SideMenu }
