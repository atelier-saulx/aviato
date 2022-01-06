import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { IconButton } from '../Input/Button/IconButton'
import { styled } from '~/theme'

const StyledToggleMenuButton = styled('div', {
  visibility: 'visible',

  '@breakpoint1': {
    visibility: 'hidden',
  },
})

type ForwardProps = ComponentProps<typeof StyledToggleMenuButton>

export const ToggleMenuButton = React.forwardRef<
  ElementRef<typeof StyledToggleMenuButton>,
  ForwardProps
>((properties, forwardedRef) => {
  return (
    <StyledToggleMenuButton ref={forwardedRef} {...properties}>
      <IconButton type="ghost" icon="IconAlignJustify" />
    </StyledToggleMenuButton>
  )
})
