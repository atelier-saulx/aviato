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
    },
  ]

  const mainMenuItems = mainMenu.map(({ title, route }, index) => {
    return (
      <MenuItem
        title={title}
        onClick={() => router.push(route)}
        key={`MenuItem-${index}`}
      />
    )
  })

  const Header: FunctionComponent = () => {
    return (
      <div
        onClick={() => router.push('/')}
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
