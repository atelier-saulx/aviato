import React, { ElementRef } from 'react'
import { styled } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const StyledTitle = styled('h1', TextStyles)

export type TitleProps = {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
}

export const Title = React.forwardRef<
  ElementRef<typeof StyledTitle>,
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
    <StyledTitle
      ref={forwardedRef}
      weight={weight}
      color={color}
      size={size}
      alignment="start"
      {...remainingProps}
    >
      {children}
    </StyledTitle>
  )
})
