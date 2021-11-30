import React, { FunctionComponent } from 'react'

import { BaseText } from './styles'
import { BaseTextProps } from './types'

export type TitleProps = BaseTextProps & {}

export const Title: FunctionComponent<TitleProps> = ({
  children,
  value = '',
  weight = 'regular',
  color = 'primary',
}) => {
  return (
    <BaseText as="h1" weight={weight} color={color} alignment="start">
      {children ?? value}
    </BaseText>
  )
}
