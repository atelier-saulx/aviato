import React, { CSSProperties, ElementRef } from 'react'
import { styled, CSS } from '~/theme'

const StyledDivider = styled('div', {
  background: '$OtherDivider',

  variants: {
    type: {
      horizontal: {
        width: '100%',
        height: '1px',
      },
      vertical: {
        height: '100%',
        width: '1px',
      },
    },
  },
})

type DividerType = 'horizontal' | 'vertical'

export type DividerProps = {
  type?: DividerType
  css?: CSS
  style?: CSSProperties
}

export const Divider = React.forwardRef<
  ElementRef<typeof StyledDivider>,
  DividerProps
>((properties, forwardedRef) => {
  return <StyledDivider {...properties} ref={forwardedRef} />
})
