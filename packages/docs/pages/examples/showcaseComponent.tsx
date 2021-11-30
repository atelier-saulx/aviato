import React from 'react'
import { FunctionComponent } from 'react'

import { Text } from '@aviato/ui'
import { Code } from '../../components'

export type ShowcaseComponentProps = {
  component: JSX.Element
  code: string
}

const ShowcaseComponent: FunctionComponent<ShowcaseComponentProps> = ({
  component,
  code,
}) => {
  let componentName = ''

  React.Children.forEach(component, (child) => {
    componentName = (child as any)?.type.name
  })

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
        <div style={{ display: 'flex' }}>{component}</div>
      </div>

      <div>
        <Code code={code} language={'jsx'} />
      </div>
    </div>
  )
}

export default ShowcaseComponent
