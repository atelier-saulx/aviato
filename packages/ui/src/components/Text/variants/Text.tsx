import React, { FunctionComponent } from 'react'

import { BaseText } from '../styles'
import { BaseTextProps } from '../types'

export type TextProps = BaseTextProps & {}

export const Text: FunctionComponent<TextProps> = ({
  children,
  value = '',
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
      {children ?? value}
    </BaseText>
  )
}
