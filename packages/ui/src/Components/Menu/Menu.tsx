import React, { FunctionComponent } from 'react'

export type MenuProps = {}

export const Menu: FunctionComponent<MenuProps> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          padding: '10px',
        }}
      >
        {children}
      </div>
    </div>
  )
}
