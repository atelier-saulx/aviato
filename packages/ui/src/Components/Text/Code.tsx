import React, { CSSProperties, FunctionComponent } from 'react'
import { useColor, Color } from '../../theme'

type CodeProps = {
  style?: CSSProperties
  color?: Color
  noSelect?: boolean
  lineNumbers?: boolean
  lines?: { start: number; end: number }
}

export const Code: FunctionComponent<CodeProps> = ({
  children,
  style,
  color = { color: 'foreground' },
  noSelect,
}) => {
  return (
    <div
      style={{
        color: useColor(color),
        display: 'flex',
        ...style,
      }}
    >
      <pre
        style={{
          userSelect: 'text',
          lineHeight: '24px',
          fontSize: '13px',
          margin: 0,
          overflowX: 'hidden',
          fontFamily:
            'Menlo, Consolas, Monaco, Liberation Mono, Lucida Console, monospace',
        }}
      >
        {children}
      </pre>
    </div>
  )
}
