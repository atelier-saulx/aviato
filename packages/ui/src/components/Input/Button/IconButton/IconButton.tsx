import React, { ElementRef, MouseEventHandler, useCallback } from 'react'
import {
  Button,
  ButtonMode,
  ButtonType,
  StyledButton,
} from '~/components/Input/Button/Button'
import { ComponentProps } from '@stitches/react'
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
  mode?: ButtonMode
  disabled?: boolean
  icon?: IconName | string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

type ForwardProps = ComponentProps<typeof StyledButton> & IconButtonProps

export const IconButton = React.forwardRef<
  ElementRef<typeof StyledButton>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    type = 'primary',
    mode = 'filled',
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
      mode={mode}
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
