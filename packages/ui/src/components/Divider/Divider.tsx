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

export const Divider = React.forwardRef<
  ElementRef<typeof StyledDivider>,
  DividerProps
>((properties, forwardedRef) => {
  return <StyledDivider {...properties} ref={forwardedRef} />
})
