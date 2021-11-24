import React, { CSSProperties, FC } from 'react'
import { Text } from '../Text'

export type SideMenuItemProps = {
  title: string
  onClick?: (value) => void
  style?: CSSProperties
}

export const SideMenuItem: FC<SideMenuItemProps> = ({
  title,
  onClick,
  style,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 200,
        minWidth: 200,
        cursor: 'pointer',
        ...style,
      }}
      onClick={onClick}
    >
      <Text>{title}</Text>
    </div>
  )
}
