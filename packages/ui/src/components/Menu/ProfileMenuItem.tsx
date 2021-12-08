import React, { useCallback, MouseEventHandler, ElementRef } from 'react'
import { DefaultProps, styled } from '~/theme'
import { noop } from '@aviato/utils'
import { Avatar } from '../Avatar'
import { ComponentProps } from '@stitches/react'

const BUTTON_TAG = 'button'

const StyledProfileMenuItem = styled(BUTTON_TAG, {
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  width: '100%',
  fontWeight: '600',
  fontSize: '15px',
})

export interface ProfileMenuItemProps extends DefaultProps {
  username?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

type ForwardProps = ComponentProps<typeof StyledProfileMenuItem> &
  ProfileMenuItemProps

export const ProfileMenuItem = React.forwardRef<
  ElementRef<typeof BUTTON_TAG>,
  ForwardProps
>((properties, forwardedRef) => {
  const { onClick = noop, username = '', ...remainingProps } = properties

  const handleClick = useCallback(() => {
    onClick()
  }, [])

  return (
    <StyledProfileMenuItem
      onClick={handleClick}
      {...remainingProps}
      ref={forwardedRef}
    >
      <Avatar
        username={username}
        css={{
          marginRight: 6,
        }}
      />
      {username}
    </StyledProfileMenuItem>
  )
})
