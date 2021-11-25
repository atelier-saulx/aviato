import React, { FunctionComponent } from 'react'

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold'

export type TextProps = {
  value?: string
  fontWeight?: FontWeight
}

export const Text: FunctionComponent<TextProps> = ({
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