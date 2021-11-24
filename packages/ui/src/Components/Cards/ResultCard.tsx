import React, { CSSProperties, FunctionComponent } from 'react'

export type ResultCardProps = {
  value?: string
  style?: CSSProperties
}

export const ResultCard: FunctionComponent<ResultCardProps> = ({
  children,
  value = '',
  style = {},
}) => {
  return (
    <div
      style={{
        alignItems: 'center',
        border: '1px solid #eaebed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '24%',
        margin: '1%',
        padding: '32px 16px',
        textAlign: 'center',
        userSelect: 'text',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}
