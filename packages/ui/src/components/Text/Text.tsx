import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { styled } from '~/theme'
import { BaseFontVariants, BaseTextStyles } from './styles'

import { FontWeight, FontColor } from './types'

const TEXT_TAG = 'p'

const StyledText = styled(TEXT_TAG, {
  ...BaseTextStyles,

  variants: {
    ...BaseFontVariants,

    size: {
      extrasmall: {
        fontSize: '$xs',
        lineHeight: '$xs',
      },
      small: {
        fontSize: '$sm',
        lineHeight: '$sm',
      },
      medium: {
        fontSize: '$md',
        lineHeight: '$md',
      },
      large: {
        fontSize: '$lg',
        lineHeight: '$lg',
      },
      extralarge: {
        fontSize: '$xl',
        lineHeight: '$xl',
      },
    },
  },
})

type TextSize = 'extrasmall' | 'small' | 'medium' | 'large' | 'extralarge'

export interface TextProps {
  size?: TextSize
  weight?: FontWeight
  color?: FontColor
}

type ForwardProps = ComponentProps<typeof StyledText> & TextProps

export const Text = React.forwardRef<ElementRef<typeof TEXT_TAG>, ForwardProps>(
  (properties, forwardedRef) => {
    const {
      size = 'small',
      weight = 'regular',
      color = 'Inherit',
      ...remainingProps
    } = properties

    return (
      <StyledText
        as={TEXT_TAG}
        color={color}
        size={size}
        weight={weight}
        ref={forwardedRef}
        {...remainingProps}
      />
    )
  }
)
