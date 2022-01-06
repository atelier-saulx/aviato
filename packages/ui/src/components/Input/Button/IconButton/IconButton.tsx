import React, { ElementRef, MouseEventHandler, useCallback } from 'react'
import {
  Button,
  ButtonVariant,
  ButtonType,
  StyledButton,
} from '~/components/Input/Button/Button'
import { noop } from '@aviato/utils'

import { IconName, getIconFromType, Icon } from '~/icons'
import { StitchedCSS } from '~/theme'

const IconButtonStyles: StitchedCSS = {
  padding: '8px 8px',
  height: 'max-content',
  width: 'max-content',
}

export interface IconButtonProps {
  type?: ButtonType
  variant?: ButtonVariant
  disabled?: boolean
  icon?: IconName
  onClick?: MouseEventHandler<HTMLButtonElement>
  css?: StitchedCSS
}

type ForwardProps = IconButtonProps

export const IconButton = React.forwardRef<
  ElementRef<typeof StyledButton>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    type = 'primary',
    variant = 'filled',
    disabled = false,
    onClick = noop,
    icon = 'IconPlus',
    ...remainingProps
  } = properties

  const handleClick = useCallback(() => {
    if (disabled) {
      return noop()
    }

    onClick()
  }, [])

  const TargetIcon = getIconFromType(icon as IconName) as Icon

  return (
    <Button
      type={type}
      variant={variant}
      onClick={handleClick}
      disabled={disabled}
      css={IconButtonStyles}
      ref={forwardedRef}
      {...remainingProps}
    >
      <TargetIcon width={16} height={16} />
    </Button>
  )
})
