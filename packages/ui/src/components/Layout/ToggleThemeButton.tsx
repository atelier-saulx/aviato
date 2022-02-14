import React, { useCallback, ElementRef, forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'

import { useTheme } from '~/providers'
import { styled } from '~/theme'
import { IconButton } from '../Input/Button/IconButton'
import { Tooltip } from '../Feedback'

const StyledToggleThemeButton = styled('div', {})

export interface ToggleThemeButtonProps
  extends ComponentProps<typeof StyledToggleThemeButton> {}

export const ToggleThemeButton = forwardRef<
  ElementRef<typeof StyledToggleThemeButton>,
  ToggleThemeButtonProps
>((properties, forwardedRef) => {
  const { ...remainingProps } = properties

  const { activeTheme, setActiveTheme, getNextTheme } = useTheme()

  const toggleTheme = useCallback(() => {
    const nextTheme = getNextTheme()
    setActiveTheme(nextTheme)
  }, [activeTheme])

  return (
    <StyledToggleThemeButton ref={forwardedRef} {...remainingProps}>
      <Tooltip
        label={activeTheme === 'light' ? 'Dark mode' : 'Light mode'}
        position="bottom"
        placement="start"
        gutter={8}
      >
        <IconButton
          mode="ghost"
          icon={activeTheme === 'light' ? 'IconDark' : 'IconLight'}
          onClick={toggleTheme}
        />
      </Tooltip>
    </StyledToggleThemeButton>
  )
})

ToggleThemeButton.displayName = 'ToggleThemeButton'
