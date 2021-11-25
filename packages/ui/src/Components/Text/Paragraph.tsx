import React, { FunctionComponent } from 'react'

export type ParagraphProps = {
  value?: string
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const Paragraph: FunctionComponent<ParagraphProps> = ({
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
        fontSize: '16px',
        fontWeight: targetWeight,
        letterSpacing: '-0.015em',
        lineHeight: '20px',
        userSelect: 'text',
      }}
    >
      {children ?? value}
    </div>
  )
}
