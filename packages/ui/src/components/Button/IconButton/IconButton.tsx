import React, { ElementRef, useCallback } from 'react'
import { classNames, styled } from '~/theme'
import { noop } from '@aviato/utils'
import { PlusIcon } from './temp'
import { ButtonProps, ButtonStyles } from '~/components/Button/Button'
import { ComponentProps } from '@stitches/react'

const BUTTON_TAG = 'button'

const StyledButton = styled(BUTTON_TAG, ButtonStyles)
const StyledIconButton = styled(StyledButton, {
  padding: '8px 8px',
})

export type IconTypes = 'plus'

export interface IconButtonProps extends ButtonProps {
  icon?: IconTypes
}

type ForwardProps = ComponentProps<typeof StyledIconButton> & IconButtonProps

export const IconButton = React.forwardRef<
  ElementRef<typeof BUTTON_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
  const {
    type = 'primary',
    mode = 'filled',
    disabled = false,
    onClick = noop,
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

  return (
    <StyledIconButton
      ref={forwardedRef}
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={classes}
      {...remainingProps}
    >
      <PlusIcon />
    </StyledIconButton>
  )
})
