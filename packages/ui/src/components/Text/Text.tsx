import { ComponentProps } from '@stitches/react'
import React, { ElementRef } from 'react'
import { styled, StitchedCSS, DefaultProps } from '~/theme'
import { TextStyles } from './styles'

import { FontWeight, FontColor, FontSize } from './types'

const TEXT_TAG = 'p'

const StyledText = styled(TEXT_TAG, TextStyles)

export interface TextProps extends DefaultProps {
  weight?: FontWeight
  color?: FontColor
  size?: FontSize
  css?: StitchedCSS
}

type ForwardProps = ComponentProps<typeof StyledText> & TextProps

export const Text = React.forwardRef<ElementRef<typeof TEXT_TAG>, ForwardProps>(
  (properties, forwardedRef) => {
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
        ref={forwardedRef}
        {...remainingProps}
      />
    )
  }
)
