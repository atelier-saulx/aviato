import React, { FunctionComponent } from 'react'
import { styled } from '@aviato/theme'

const Text = styled('p', {
  variants: {
    size: {
      small: {
        fontSize: '12px',
        lineHeight: '12px',
      },
      medium: {
        fontSize: '15px',
        lineHeight: '15px',
      },
      large: {
        fontSize: '18px',
        lineHeight: '18px',
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
  weight = 'regular',
}) => {
  return (
    <Text size={size} weight={weight}>
      {children ?? value}
    </Text>
  )
}
