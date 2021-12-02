import React, { FunctionComponent } from 'react'

import { BaseText } from '../styles'
import { FontWeight, FontColor, FontSize } from '../types'

export type TitleProps = {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
}

export const Title: FunctionComponent<TitleProps> = ({
  children,
  weight = 'Semibold',
  color = 'Primary',
  size = 'Medium',
}) => {
  return (
    <BaseText
      as="h1"
      weight={weight}
      color={color}
      size={size}
      alignment="start"
    >
      {children}
    </BaseText>
  )
}
