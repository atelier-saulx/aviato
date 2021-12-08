import React, { FunctionComponent, MouseEventHandler, useCallback } from 'react'
import { classNames, styled } from '~/theme'
import { noop } from '@aviato/utils'
import {
  ButtonMode,
  ButtonStyles,
  ButtonType,
} from '~/components/Button/Button'
import { IconName, iconFromString } from '~/icons'

const BUTTON_TAG = 'button'

const StyledButton = styled(BUTTON_TAG, ButtonStyles)

const StyledIconButton = styled(StyledButton, {
  padding: '8px 8px',
})

export interface IconButtonProps {
  type?: ButtonType
  mode?: ButtonMode
  disabled?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  icon?: IconName
}

export const IconButton: FunctionComponent<IconButtonProps> = (
  properties: IconButtonProps
) => {
  const {
    type = 'primary',
    mode = 'filled',
    disabled = false,
    onClick = noop,
    icon,
    ...remainingProps
  } = properties

  const handleClick = useCallback(() => {
    onClick()
  }, [])

  const isFilled = mode === 'filled'
  const isOutlined = mode === 'outlined'
  const isTransparent = mode === 'transparent'

  const classes = classNames({
    isFilled,
    isOutlined,
    isTransparent,
  })

  const TargetIcon = iconFromString(icon)

  return (
    <StyledIconButton
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
      {...remainingProps}
    >
      <TargetIcon fill="#FFF" width={12} height={12} />
    </StyledIconButton>
  )
}
