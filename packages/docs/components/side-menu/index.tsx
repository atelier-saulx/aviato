import { LogoWithTitle } from '../logo'
import { withRouter, NextRouter } from 'next/router'

import { SideMenu as AviatoSideMenu, SimpleMenuItem } from '@aviato/ui'
import { FunctionComponent } from 'react'

interface MainSideMenuProps {
  router: NextRouter
}

const SideMenu = withRouter(({ router }: MainSideMenuProps) => {
  const menuItems: SimpleMenuItem[] = [
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
    <AviatoSideMenu
      menuItems={menuItems}
      Header={<Header />}
      onClick={({ route }) => router.push(route)}
    />
  )
})

export { SideMenu }
