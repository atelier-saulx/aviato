import { FunctionComponent } from 'react'

import { Text } from '@based/ui-next'

const LogoWithTitle: FunctionComponent = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Text
        fontWeight="bold"
        style={{
          display: 'flex',
          marginTop: 14,
          fontSize: '22px',
        }}
      >
        Aviato-UI
      </Text>
    </div>
  )
}

export { LogoWithTitle }
