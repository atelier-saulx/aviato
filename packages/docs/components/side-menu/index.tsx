import { useTheme } from 'next-themes'
import { withRouter, NextRouter } from 'next/router'

import { SideMenu, Menu, MenuItem, Button, styled } from '@aviato/ui'

import { AviatoLogo } from '../logo'

const HeaderDiv = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '8px',
  paddingBottom: '69px',
  cursor: 'pointer',
})

const Footer = styled('div', {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginTop: 'auto',
  padding: '8px',
})

interface MainSideMenuProps {
  router: NextRouter
}

const MainSideMenu = withRouter(({ router }: MainSideMenuProps) => {
  const { theme, setTheme } = useTheme()

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
          title: 'Avatars',
          route: '/components/avatar',
        },
        {
          title: 'Buttons',
          route: '/components/buttons',
        },
        {
          title: 'Checkboxes',
          route: '/components/checkboxes',
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
    <SideMenu
      css={{
        borderRight: '1px solid $OtherDivider',
      }}
    >
      <HeaderDiv onClick={() => router.push({ pathname: '/' })}>
        <AviatoLogo />
      </HeaderDiv>

      <Menu>{mainMenuItems}</Menu>

      <Footer>
        <Button>Change to Light Theme</Button>
      </Footer>
    </SideMenu>
  )
})

export { MainSideMenu as SideMenu }
