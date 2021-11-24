import React, { CSSProperties, FunctionComponent } from 'react'

export type ParagraphProps = {
  value?: string
  style?: CSSProperties
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const Paragraph: FunctionComponent<ParagraphProps> = ({
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
        fontSize: '16px',
        fontWeight: targetWeight,
        letterSpacing: '-0.015em',
        lineHeight: '20px',
        userSelect: 'text',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}
