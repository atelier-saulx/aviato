import { ComponentProps } from '@stitches/react'
import React, { ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'

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

interface DividerProps extends DefaultProps {
  type?: DividerType
}

type ForwardProps = ComponentProps<typeof StyledDivider> & DividerProps

export const Divider = React.forwardRef<
  ElementRef<typeof StyledDivider>,
  ForwardProps
>((properties, forwardedRef) => {
  return <StyledDivider {...properties} ref={forwardedRef} />
})
