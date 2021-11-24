import React, { CSSProperties, FunctionComponent } from 'react'

export type TitleProps = {
  value?: string
  style?: CSSProperties
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const Title: FunctionComponent<TitleProps> = ({
  children,
  value = '',
  style = {},
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
        fontSize: '22px',
        lineHeight: '24px',
        letterSpacing: '-0.015em',
        userSelect: 'text',
        fontWeight: targetWeight,
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}
