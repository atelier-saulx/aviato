import React, { FunctionComponent } from 'react'

import { BaseText } from '../styles'
import { FontWeight, FontColor, FontSize } from '../types'

export type TextProps = {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
}

export const Text: FunctionComponent<TextProps> = ({
  children,
  weight = 'Regular',
  color = 'Primary',
  size = 'Small',
}) => {
  return (
    <BaseText
      as="p"
      weight={weight}
      color={color}
      size={size}
      alignment="start"
    >
      {children}
    </BaseText>
  )
}
