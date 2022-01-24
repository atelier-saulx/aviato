import React, { ElementRef, forwardRef, useCallback } from 'react'
import { ComponentProps } from '@stitches/react'

import { IconButton } from '../Input/Button/IconButton'
import { styled } from '~/theme'
import { useMenuContext } from '../SideMenu'

const StyledToggleMenuButton = styled('div', {
  visibility: 'visible',

  '@breakpoint1': {
    visibility: 'hidden',
  },
})

export interface ToggleMenuButtonProps
  extends ComponentProps<typeof StyledToggleMenuButton> {}

export const ToggleMenuButton = forwardRef<
  ElementRef<typeof StyledToggleMenuButton>,
  ToggleMenuButtonProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  const { isMenuOpen, setIsMenuOpen } = useMenuContext()

  const handleMenuButtonClick = useCallback(() => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
  }, [isMenuOpen])

  return (
    <StyledToggleMenuButton
      onClick={handleMenuButtonClick}
      ref={forwardedRef}
      {...remainingProps}
    >
      <IconButton type="ghost" icon="IconAlignJustify" />
    </StyledToggleMenuButton>
  )
})
