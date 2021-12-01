import React, { FunctionComponent } from 'react'

import { BaseText } from '../styles'
import { BaseTextProps } from '../types'

export type TitleProps = BaseTextProps & {}

export const Title: FunctionComponent<TitleProps> = ({
  children,
  value = '',
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
      {children ?? value}
    </BaseText>
  )
}
