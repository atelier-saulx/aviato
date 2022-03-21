import React, { ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { isText } from '@aviato/utils'

import { styled } from '~/theme'
import { BaseFontVariants, BaseTextStyles } from './styles'

import { FontWeight, FontColor } from './types'
import { BaseSize } from '~/types'

const StyledText = styled('p', {
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
    mode: {
      singleLine: {
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      },
    },
  },
})

export interface TextProps extends ComponentProps<typeof StyledText> {
  size?: BaseSize
  weight?: FontWeight
  color?: FontColor
  as?: any
  singleLine?: boolean
}

export const Text = forwardRef<ElementRef<typeof StyledText>, TextProps>(
  (properties, forwardedRef) => {
    const { children } = properties

    if (isText(children)) {
      const {
        size = 'medium',
        weight = 'regular',
        color = 'Primary',
        singleLine,
        ...remainingProps
      } = properties

      return (
        <StyledText
          color={color}
          size={size}
          weight={weight}
          mode={singleLine ? 'singleLine' : null}
          ref={forwardedRef}
          {...remainingProps}
        />
      )
    }

    return children || (null as any)
  }
)

Text.displayName = 'Text'
