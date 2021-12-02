import React, { ElementRef } from 'react'
import { styled, DefaultProps } from '~/theme'

const StyledDivider = styled('div', {
  variants: {
    type: {
      horizontal: {},
      vertical: {},
    },
  },
})

type DividerType = 'horizontal' | 'vertical'

export type DividerProps = DefaultProps & {
  type?: DividerType
}

export const Divider = React.forwardRef<
  ElementRef<typeof StyledDivider>,
  DividerProps
>((properties, forwardedRef) => {
  return <StyledDivider {...properties} ref={forwardedRef} />
})
