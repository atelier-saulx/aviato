import React from 'react'
import { styled, CSS } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const TITLE_TAG = 'p'

const StyledText = styled(TITLE_TAG, TextStyles)

export type TitleProps = React.ComponentProps<typeof TITLE_TAG> & {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
  css?: CSS
}

export const Title = React.forwardRef<
  React.ElementRef<typeof TITLE_TAG>,
  TitleProps
>((properties, forwardedRef) => {
  const {
    weight = 'Regular',
    color = 'Primary',
    size = 'Small',
    ...remainingProps
  } = properties

  return (
    <StyledText
      as={TITLE_TAG}
      weight={weight}
      color={color}
      size={size}
      {...remainingProps}
      ref={forwardedRef}
    />
  )
})
