import React, { FunctionComponent } from 'react'
import { SideMenuItem } from './SideMenuItem'

export type SimpleMenuItem = {
  title: string
  route: string
}

export type SideMenuProps = {
  menuItems: SimpleMenuItem[]
  Header?: JSX.Element
  Footer?: JSX.Element
  onClick?: (value: SimpleMenuItem) => void
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  menuItems = [],
  Header = null,
  Footer = null,
  onClick,
}) => {
  const StyledMenuItems = () => {
    const mappedMenuItems = menuItems.map((itemProps, index) => {
      return (
        <SideMenuItem
          key={`SideMenuItem-${index}`}
          onClick={() => onClick(itemProps)}
          {...itemProps}
        />
      )
    })

    return (
      <div
        style={{
          padding: '10px',
        }}
      >
        {mappedMenuItems}
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 200,
        minWidth: 200,
        overflowX: 'hidden',
        backgroundColor: 'var(--color-background)',
      }}
    >
      {Header}
      <StyledMenuItems />
      {Footer}
    </div>
  )
}
