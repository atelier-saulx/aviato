import React from 'react'
import { styled } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const TEXT_TAG = 'p'

const StyledText = styled(TEXT_TAG, TextStyles)

export interface TextProps {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
}

type ForwardProps = React.ComponentProps<typeof TEXT_TAG> & TextProps

export const Text = React.forwardRef<
  React.ElementRef<typeof TEXT_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    weight = 'Regular',
    color = 'Primary',
    size = 'Small',
    ...remainingProps
  } = properties

  return (
    <StyledText
      as={TEXT_TAG}
      weight={weight}
      color={color}
      size={size}
      {...remainingProps}
      ref={forwardedRef}
    />
  )
})
