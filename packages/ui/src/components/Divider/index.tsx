import React, { ElementRef } from 'react'
import { styled, DefaultProps } from '~/theme'

const DividerDiv = styled('div', {
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
  ElementRef<typeof DividerDiv>,
  DividerProps
>(({ ...props }, forwardedRef) => {
  return <DividerDiv {...props} ref={forwardedRef} />
})
