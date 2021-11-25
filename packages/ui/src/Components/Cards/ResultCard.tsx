import React, { FunctionComponent } from 'react'

export type ResultCardProps = {
  value?: string
}

export const ResultCard: FunctionComponent<ResultCardProps> = ({
  children,
  value = '',
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
      }}
    >
      {children ?? value}
    </div>
  )
}
