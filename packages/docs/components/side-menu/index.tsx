import { FunctionComponent } from 'react'
import { withRouter, NextRouter } from 'next/router'

import { SideMenu as AviatoSideMenu, Menu, MenuItem, styled } from '@aviato/ui'

import { AviatoLogo } from './logo'

const HeaderDiv = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '16px',
  paddingBottom: '77px',
  cursor: 'pointer',
})

const MenuContainerDiv = styled('div', {
  padding: 8,
})

interface MainSideMenuProps {
  router: NextRouter
}

const SideMenu = withRouter(({ router }: MainSideMenuProps) => {
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
    <AviatoSideMenu>
      <HeaderDiv onClick={() => router.push({ pathname: '/' })}>
        <AviatoLogo />
      </HeaderDiv>

      <MenuContainerDiv>
        <Menu>{mainMenuItems}</Menu>
      </MenuContainerDiv>
    </AviatoSideMenu>
  )
})

export { SideMenu }
