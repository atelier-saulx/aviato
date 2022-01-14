import React, {
  ElementRef,
  forwardRef,
  MouseEventHandler,
  useCallback,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

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
}

export const IconButton = forwardRef<
  ElementRef<typeof StyledButton>,
  IconButtonProps
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
