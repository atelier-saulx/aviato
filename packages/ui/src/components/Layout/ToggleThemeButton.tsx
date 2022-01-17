import React, { useCallback, ElementRef, forwardRef } from 'react'
import { useHasLoaded } from '@aviato/hooks'
import { ComponentProps } from '@stitches/react'

import { getColorMode, styled, useTheme } from '~/theme'
import { IconButton } from '../Input/Button/IconButton'
import { Tooltip } from '../Feedback'

const StyledToggleThemeButton = styled('div', {})

export interface ToggleThemeButtonProps
  extends ComponentProps<typeof StyledToggleThemeButton> {}

export const ToggleThemeButton = forwardRef<
  ElementRef<typeof StyledToggleThemeButton>,
  ToggleThemeButtonProps
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
      <Tooltip
        label={getColorMode() === 'light' ? 'Light mode' : 'Dark mode'}
        position="bottom"
        placement="start"
        gutter={8}
      >
        <IconButton
          type="ghost"
          onClick={toggleTheme}
          icon={getColorMode() === 'light' ? 'IconDark' : 'IconLight'}
        />
      </Tooltip>
    </StyledToggleThemeButton>
  )
})
