import React, { FunctionComponent } from 'react'

export type TextProps = {
  value?: string
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const Text: FunctionComponent<TextProps> = ({
  children,
  value = '',
  fontWeight = 'normal',
}) => {
  const targetWeight =
    fontWeight === 'bold'
      ? 700
      : fontWeight === 'semibold'
      ? 600
      : fontWeight === 'medium'
      ? 500
      : 'normal'

  return (
    <div
      style={{
        fontSize: '15px',
        lineHeight: '24px',
        letterSpacing: '-0.015em',
        userSelect: 'text',
        fontWeight: targetWeight,
      }}
    >
      {children ?? value}
    </div>
  )
}
