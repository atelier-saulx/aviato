import React, { ElementRef } from 'react'

import { StyledText } from './styles'
import { FontWeight, FontColor, FontSize } from './types'

export type TitleProps = {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
}

export const Title = React.forwardRef<
  ElementRef<typeof StyledText>,
  TitleProps
>((properties, forwardedRef) => {
  const {
    children,
    weight = 'Semibold',
    color = 'Primary',
    size = 'Medium',
    ...remainingProps
  } = properties

  return (
    <StyledText
      as="h1"
      ref={forwardedRef}
      weight={weight}
      color={color}
      size={size}
      alignment="start"
      {...remainingProps}
    >
      {children}
    </StyledText>
  )
})
