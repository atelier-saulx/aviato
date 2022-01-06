import React, { useState, useCallback, ElementRef } from 'react'
import { useHasLoaded } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'

import { getCurrentTheme, styled, useThemeContext } from '~/theme'
import { IconButton } from '../Input/Button/IconButton'

const StyledToggleThemeButton = styled('div', {})

type ForwardProps = ComponentProps<typeof StyledToggleThemeButton>

export const ToggleThemeButton = React.forwardRef<
  ElementRef<typeof StyledToggleThemeButton>,
  ForwardProps
>((properties, forwardedRef) => {
  const hasLoaded = useHasLoaded()
  const { setColorMode } = useThemeContext()
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme())

  const toggleTheme = useCallback(() => {
    const targetTheme = getCurrentTheme() === 'light' ? 'dark' : 'light'

    setColorMode(targetTheme)
    setCurrentTheme(targetTheme)
  }, [setColorMode])

  if (!hasLoaded) {
    return null
  }

  return (
    <StyledToggleThemeButton ref={forwardedRef} {...properties}>
      <IconButton
        type="ghost"
        onClick={toggleTheme}
        icon={currentTheme === 'light' ? 'IconDark' : 'IconLight'}
      />
    </StyledToggleThemeButton>
  )
})
