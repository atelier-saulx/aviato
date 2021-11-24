import React, { FunctionComponent, CSSProperties } from 'react'
import { useColor, Color } from '../../theme'

const Divider: FunctionComponent<{
  color?: Color
  style?: CSSProperties
}> = ({ color = { color: 'divider' }, style }) => {
  return (
    <div
      style={{
        borderBottom: '1px solid ' + useColor(color),
        marginTop: 16,
        marginBottom: 16,
        ...style,
      }}
    />
  )
}

export { Divider }
