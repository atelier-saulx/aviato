import React, { CSSProperties } from 'react'
import { styled, CSS } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const TITLE_TAG = 'p'

const StyledText = styled(TITLE_TAG, TextStyles)

export type TitleProps = {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
  css?: CSS
  style?: CSSProperties
}

type ForwardProps = React.ComponentProps<typeof TITLE_TAG> & TitleProps

export const Title = React.forwardRef<
  React.ElementRef<typeof TITLE_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    weight = 'Semibold',
    color = 'Primary',
    size = 'Medium',
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
