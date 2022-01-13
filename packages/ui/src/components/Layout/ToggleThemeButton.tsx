import React, { useCallback, ElementRef } from 'react'
import { useHasLoaded } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'

import { getColorMode, styled, useTheme } from '~/theme'
import { IconButton } from '../Input/Button/IconButton'

const StyledToggleThemeButton = styled('div', {})

type ForwardProps = ComponentProps<typeof StyledToggleThemeButton>

export const ToggleThemeButton = React.forwardRef<
  ElementRef<typeof StyledToggleThemeButton>,
  ForwardProps
>((properties, forwardedRef) => {
  const hasLoaded = useHasLoaded()
  const { setTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    const targetTheme = getColorMode() === 'light' ? 'dark' : 'light'

    setTheme(targetTheme)
  }, [setTheme])

  if (!hasLoaded) {
    return null
  }

  return (
    <StyledToggleThemeButton ref={forwardedRef} {...properties}>
      <IconButton
        type="ghost"
        onClick={toggleTheme}
        icon={getColorMode() === 'light' ? 'IconDark' : 'IconLight'}
      />
    </StyledToggleThemeButton>
  )
})
