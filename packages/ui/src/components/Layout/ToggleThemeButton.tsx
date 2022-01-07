import React, { useState, useCallback, ElementRef } from 'react'
import { useHasLoaded } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'
import { useTheme } from 'next-themes'

import { getCurrentTheme, styled } from '~/theme'
import { IconButton } from '../Input/Button/IconButton'

const StyledToggleThemeButton = styled('div', {})

type ForwardProps = ComponentProps<typeof StyledToggleThemeButton>

export const ToggleThemeButton = React.forwardRef<
  ElementRef<typeof StyledToggleThemeButton>,
  ForwardProps
>((properties, forwardedRef) => {
  const hasLoaded = useHasLoaded()
  const { setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState(getCurrentTheme())

  const toggleTheme = useCallback(() => {
    const targetTheme = getCurrentTheme() === 'light' ? 'dark' : 'light'

    setTheme(targetTheme)
    setCurrentTheme(targetTheme)
  }, [setTheme])

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
