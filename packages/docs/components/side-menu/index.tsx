import { withRouter, NextRouter } from 'next/router'

import { SideMenu as AviatoSideMenu, Menu, MenuItem, Title } from '@aviato/ui'
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
      <Menu>{mainMenuItems}</Menu>
    </AviatoSideMenu>
  )
})

export { SideMenu }
