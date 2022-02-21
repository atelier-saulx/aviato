import React, { ElementRef, forwardRef } from 'react'
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

  const { activeTheme, toggleTheme } = useTheme()

  return (
    <StyledToggleThemeButton ref={forwardedRef} {...remainingProps}>
      <Tooltip
        label={activeTheme === 'light' ? 'Dark mode' : 'Light mode'}
        position="bottom"
        placement="start"
        gutter={8}
      >
        <IconButton
          color="action"
          variant="main"
          icon={activeTheme === 'light' ? 'IconDark' : 'IconLight'}
          onClick={toggleTheme}
        />
      </Tooltip>
    </StyledToggleThemeButton>
  )
})

ToggleThemeButton.displayName = 'ToggleThemeButton'
