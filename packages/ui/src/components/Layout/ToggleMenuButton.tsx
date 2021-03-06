import React, { ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { IconButton } from '../Input/Button/IconButton'
import { styled } from '~/theme'
import { useMenuContext } from '~/providers'

const StyledToggleMenuButton = styled('div', {})

export interface ToggleMenuButtonProps
  extends ComponentProps<typeof StyledToggleMenuButton> {}

export const ToggleMenuButton = forwardRef<
  ElementRef<typeof StyledToggleMenuButton>,
  ToggleMenuButtonProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  const { isMenuOpen, setIsMenuOpen } = useMenuContext()

  const handleMenuButtonClick = () => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
  }

  return (
    <StyledToggleMenuButton
      onClick={handleMenuButtonClick}
      ref={forwardedRef}
      {...remainingProps}
    >
      <IconButton
        color="action"
        variant="outline-light"
        icon="IconAlignJustify"
      />
    </StyledToggleMenuButton>
  )
})

ToggleMenuButton.displayName = 'ToggleMenuButton'
