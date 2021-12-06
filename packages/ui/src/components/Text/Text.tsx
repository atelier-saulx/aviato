import React from 'react'
import { styled, CSS } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const TEXT_TAG = 'p'

const StyledTitle = styled(TEXT_TAG, TextStyles)

export type TextProps = React.ComponentProps<typeof TEXT_TAG> & {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
  css?: CSS
}

export const Text = React.forwardRef<
  React.ElementRef<typeof TEXT_TAG>,
  TextProps
>((properties, forwardedRef) => {
  const {
    weight = 'Regular',
    color = 'Primary',
    size = 'Medium',
    ...remainingProps
  } = properties

  return (
    <StyledTitle
      as={TEXT_TAG}
      weight={weight}
      color={color}
      size={size}
      {...remainingProps}
      ref={forwardedRef}
    />
  )
})
