import React from 'react'
import { FunctionComponent } from 'react'

import { Text } from '@aviato/ui'

export type DisplayComponentProps = {
  name?: string
}

const DisplayComponent: FunctionComponent<DisplayComponentProps> = ({
  name,
  children,
}) => {
  let actualComponentName = ''

  React.Children.forEach(children, (child) => {
    actualComponentName = (child as any)?.type?.name ?? ''
  })

  const componentName = name ?? actualComponentName

  return (
    <div
      style={{
        margin: '20px',
      }}
    >
      <div
        style={{
          marginBottom: '10px',
        }}
      >
        <Text>{componentName}</Text>
      </div>

      <div
        style={{
          display: 'flex',
          flexFlow: 'column nowrap',
          border: '1px dashed rgba(5, 24, 41, 0.2)',
          padding: '20px',
          borderRadius: '7px',
          backgroundColor: 'transparent',
        }}
      >
        <div style={{ display: 'flex' }}>{children}</div>
      </div>
    </div>
  )
}

export default DisplayComponent
