import React, { FunctionComponent } from 'react'

export type SideMenuProps = {}

export const SideMenu: FunctionComponent<SideMenuProps> = ({ children }) => {
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
      {children}
    </div>
  )
}
