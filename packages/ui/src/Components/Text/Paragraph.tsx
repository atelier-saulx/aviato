import React, { FunctionComponent } from 'react'

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

export type ParagraphProps = {
  value?: string
  fontWeight?: FontWeight
}

export const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  value = '',
  fontWeight = 'normal',
}) => {
  type FontWeightMap = {
    [key in FontWeight]: number | string
  }

  const fontWeightMap: FontWeightMap = {
    bold: 700,
    semibold: 600,
    medium: 500,
    regular: 'normal',
  }

  const targetWeight = fontWeightMap[fontWeight] ?? 'normal'

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
