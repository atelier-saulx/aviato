import { withRouter, NextRouter } from 'next/router'

import { SideMenu, Menu, MenuItem, styled } from '@aviato/ui'

import { AviatoLogo } from '../logo'

const HeaderDiv = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '8px',
  paddingBottom: '69px',
  cursor: 'pointer',
})

interface MainSideMenuProps {
  router: NextRouter
}

const MainSideMenu = withRouter(({ router }: MainSideMenuProps) => {
  type Items = {
    title: string
    route?: string
    subMenu?: Items[]
  }

  const mainMenu: Items[] = [
    {
      title: 'Introduction',
      route: '/',
    },
    {
      title: 'Components',
      subMenu: [
        {
          title: 'Side-menu',
          route: '/components/side-menu',
        },
        {
          title: 'Buttons',
          route: '/components/buttons',
        },
        {
          title: 'Hooks',
          route: '/components/hooks',
        },
      ],
    },
  ]

  const isActivePath = (path: string = '') => {
    return router.asPath === path
  }

  const mainMenuItems = mainMenu.map(({ title, route, subMenu }, menuIndex) => {
    const mappedSubmenu = subMenu?.map(({ title, route }, submenuIndex) => {
      return (
        <MenuItem
          title={title}
          onClick={() => route && router.push({ pathname: route })}
          key={`SubMenuItem-${submenuIndex}`}
          isActive={isActivePath(route)}
        />
      )
    })

    const hasSubmenu = Boolean(subMenu)

    return (
      <MenuItem
        title={title}
        onClick={() => route && router.push({ pathname: route })}
        key={`MenuItem-${menuIndex}`}
        isHeader={hasSubmenu}
        isActive={isActivePath(route)}
      >
        {hasSubmenu ? <Menu>{mappedSubmenu}</Menu> : null}
      </MenuItem>
    )
  })

  return (
    <SideMenu>
      <HeaderDiv onClick={() => router.push({ pathname: '/' })}>
        <AviatoLogo />
      </HeaderDiv>

      <Menu>{mainMenuItems}</Menu>
    </SideMenu>
  )
})

export { MainSideMenu as SideMenu }
