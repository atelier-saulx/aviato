import React, { CSSProperties, FunctionComponent } from 'react'
import { SideMenuItem } from './SideMenuItem'

export type MenuItem = {
  title: string
  route: string
}

export type SideMenuProps = {
  menuItems: MenuItem[]
  Header?: JSX.Element
  Footer?: JSX.Element
  onClick?: (value: MenuItem) => void
  style?: CSSProperties
}

export const SideMenu: FunctionComponent<SideMenuProps> = ({
  style = {},
  menuItems = [],
  Header = null,
  Footer = null,
  onClick,
}) => {
  const SideMenuItems = menuItems.map((itemProps, index) => {
    return (
      <SideMenuItem
        key={`SideMenuItem-${index}`}
        onClick={() => onClick(itemProps)}
        style={{
          marginBottom: index !== menuItems.length - 1 ? '6px' : null,
        }}
        {...itemProps}
      />
    )
  })

  const StyledMenuItems = (
    <div
      style={{
        padding: '10px',
      }}
    >
      {SideMenuItems}
    </div>
  )

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: 200,
        minWidth: 200,
        overflowX: 'hidden',
        backgroundColor: 'red', // useColor
        ...style,
      }}
    >
      <>{Header}</>
      <>{StyledMenuItems}</>
      <>{Footer}</>
    </div>
  )
}
