import React, { FunctionComponent } from 'react'

import { BaseText } from './styles'
import { BaseTextProps } from './types'

export type TextProps = BaseTextProps & {}

export const Text: FunctionComponent<TextProps> = ({
  children,
  value = '',
  weight = 'regular',
  color = 'primary',
}) => {
  return (
    <BaseText as="p" weight={weight} color={color} alignment="start">
      {children ?? value}
    </BaseText>
  )
}
