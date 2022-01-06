import React, { ElementRef, useCallback, useContext } from 'react'
import { ComponentProps } from '@stitches/react'

import { IconButton } from '../Input/Button/IconButton'
import { styled } from '~/theme'
import { MenuStateContext } from '../SideMenu'

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
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuStateContext)

  const handleMenuButtonClick = useCallback(() => {
    const newState = !isMenuOpen
    setIsMenuOpen(newState)
  }, [isMenuOpen])

  return (
    <StyledToggleMenuButton
      onClick={handleMenuButtonClick}
      ref={forwardedRef}
      {...properties}
    >
      <IconButton type="ghost" icon="IconAlignJustify" />
    </StyledToggleMenuButton>
  )
})
