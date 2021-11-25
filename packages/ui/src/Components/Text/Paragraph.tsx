import React, { FunctionComponent } from 'react'
import { styled } from '../../theme'

const Text = styled('p', {
  variants: {
    size: {
      small: {
        fontSize: '$1',
        lineHeight: '$1',
      },
      medium: {
        fontSize: '$2',
        lineHeight: '$2',
      },
      large: {
        fontSize: '$3',
        lineHeight: '$3',
      },
    },

    weight: {
      regular: {
        fontWeight: 400,
      },
      medium: {
        fontWeight: 500,
      },
      semibold: {
        fontWeight: 600,
      },
      bold: {
        fontWeight: 700,
      },
    },
  },
})

export type ParagraphProps = {
  value?: string
  size?: 'small' | 'medium' | 'large'
  weight?: 'regular' | 'medium' | 'semibold' | 'bold'
}

export const Paragraph: FunctionComponent<ParagraphProps> = ({
  children,
  value = '',
  size = 'small',
  weight: fontWeight = 'regular',
}) => {
  return (
    <Text size={size} weight={fontWeight}>
      {children ?? value}
    </Text>
  )
}
