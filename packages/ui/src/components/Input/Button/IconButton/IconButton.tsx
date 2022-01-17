import React, { ElementRef, forwardRef, MouseEventHandler } from 'react'
import { ComponentProps } from '@stitches/react'

import { StitchedCSS } from '~/theme'
import { IconName, getIconFromType, Icon } from '~/icons'
import {
  Button,
  ButtonVariant,
  ButtonType,
  StyledButton,
} from '~/components/Input/Button/Button'

const IconButtonStyles: StitchedCSS = {
  padding: '8px 8px',
  height: 'max-content',
  width: 'max-content',
}

export interface IconButtonProps extends ComponentProps<typeof StyledButton> {
  type?: ButtonType
  variant?: ButtonVariant
  disabled?: boolean
  icon?: IconName
  onClick?: MouseEventHandler<HTMLButtonElement>
  css?: StitchedCSS
  as?: any
}

export const IconButton = forwardRef<
  ElementRef<typeof StyledButton>,
  IconButtonProps
>((properties, forwardedRef) => {
  const {
    type = 'primary',
    variant = 'filled',
    disabled = false,
    icon = 'IconPlus',
    ...remainingProps
  } = properties

  const TargetIcon = getIconFromType(icon as IconName) as Icon

  return (
    <Button
      type={type}
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
