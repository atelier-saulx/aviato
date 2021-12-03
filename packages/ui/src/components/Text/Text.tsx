import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const StyledText = styled('p', TextStyles)

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
    <StyledText weight={weight} color={color} size={size} alignment="start">
      {children}
    </StyledText>
  )
}
