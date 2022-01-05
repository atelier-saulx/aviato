import React, { ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { IconButton } from '../Input/Button/IconButton'
import { styled } from '~/theme'

const CloseMenuWrapper = styled('div', {
  visibility: 'visible',

  '@breakpoint1': {
    visibility: 'hidden',
  },
})

type ToggleMenuProps = {}

type ForwardProps = ComponentProps<typeof CloseMenuWrapper> & ToggleMenuProps

export const ToggleMenuButton = React.forwardRef<
  ElementRef<typeof CloseMenuWrapper>,
  ForwardProps
>((properties, forwardedRef) => {
  return (
    <CloseMenuWrapper ref={forwardedRef} {...properties}>
      <IconButton type="ghost" icon="IconAlignJustify" />
    </CloseMenuWrapper>
  )
})
