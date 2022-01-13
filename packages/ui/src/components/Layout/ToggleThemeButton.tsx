import React, { useCallback, ElementRef } from 'react'
import { useHasLoaded } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'

import { getColorMode, styled, useThemeContext } from '~/theme'
import { IconButton } from '../Input/Button/IconButton'

const StyledToggleThemeButton = styled('div', {})

type ForwardProps = ComponentProps<typeof StyledToggleThemeButton>

export const ToggleThemeButton = React.forwardRef<
  ElementRef<typeof StyledToggleThemeButton>,
  ForwardProps
>((properties, forwardedRef) => {
  const hasLoaded = useHasLoaded()
  const { colorMode, setColorMode } = useThemeContext()

  const toggleTheme = useCallback(() => {
    const targetTheme = getColorMode() === 'light' ? 'dark' : 'light'

    setColorMode(targetTheme)
  }, [colorMode, setColorMode])

  if (!hasLoaded) {
    return null
  }

  return (
    <StyledToggleThemeButton ref={forwardedRef} {...properties}>
      <IconButton
        type="ghost"
        onClick={toggleTheme}
        icon={colorMode === 'light' ? 'IconDark' : 'IconLight'}
      />
    </StyledToggleThemeButton>
  )
})
