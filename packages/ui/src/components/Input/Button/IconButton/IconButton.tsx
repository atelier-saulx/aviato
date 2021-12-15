import React, { FunctionComponent, MouseEventHandler, useCallback } from 'react'
import {
  Button,
  ButtonMode,
  ButtonType,
} from '~/components/Input/Button/Button'
import { IconName, getIconFromString } from '~/icons'
import { noop } from '@aviato/utils'
import { DefaultProps, StitchedCSS } from '~/theme'

const IconButtonStyles: StitchedCSS = {
  padding: '8px 8px',
  height: 'max-content',
  width: 'max-content',
}

export interface IconButtonProps extends DefaultProps {
  type?: ButtonType
  mode?: ButtonMode
  disabled?: boolean
  icon?: IconName | string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const IconButton: FunctionComponent<IconButtonProps> = (properties) => {
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

  const TargetIcon = getIconFromString(icon as IconName)

  return (
    <Button
      type={type}
      mode={mode}
      onClick={handleClick}
      disabled={disabled}
      css={IconButtonStyles}
      {...remainingProps}
    >
      <TargetIcon width={16} height={16} />
    </Button>
  )
}
