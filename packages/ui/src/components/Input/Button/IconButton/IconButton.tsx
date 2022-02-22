import React, { ElementRef, forwardRef, MouseEventHandler } from 'react'

import { StitchedCSS } from '~/theme'
import { IconName, getIconFromName } from '~/components/Icons'
import {
  Button,
  ButtonVariant,
  ButtonColor,
  StyledButton,
} from '~/components/Input/Button/Button'

const IconButtonStyles: StitchedCSS = {
  padding: '8px 8px',
  height: 'max-content',
  width: 'max-content',
}

export interface IconButtonProps {
  variant?: ButtonVariant
  color?: ButtonColor
  disabled?: boolean
  icon?: IconName
  onClick?: MouseEventHandler<HTMLButtonElement>
  css?: StitchedCSS
}

export const IconButton = forwardRef<
  ElementRef<typeof StyledButton>,
  IconButtonProps
>((properties, forwardedRef) => {
  const {
    color = 'primary',
    variant = 'main',
    disabled = false,
    icon = 'IconPlus',
    ...remainingProps
  } = properties

  const TargetIcon = getIconFromName(icon)

  return (
    <Button
      color={color}
      variant={variant}
      disabled={disabled}
      css={IconButtonStyles}
      ref={forwardedRef}
      {...remainingProps}
    >
      <TargetIcon width={16} height={16} />
    </Button>
  )
})

IconButton.displayName = 'IconButton'
