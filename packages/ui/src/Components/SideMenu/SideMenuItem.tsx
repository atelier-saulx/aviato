import React, { FunctionComponent } from 'react'
import { Text } from '../Text'

export type SideMenuItemProps = {
  title: string
  onClick?: (value) => void
}

export const SideMenuItem: FunctionComponent<SideMenuItemProps> = ({
  title,
  onClick,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        minWidth: 200,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      <Text>{title}</Text>
    </div>
  )
}
