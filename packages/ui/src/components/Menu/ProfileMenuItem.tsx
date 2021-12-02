import { styled } from '~/theme'
import React, { FunctionComponent, useCallback, MouseEventHandler } from 'react'
import { noop } from '@aviato/utils'

import TempAvatar from './temp'

const StyledProfileMenuItem = styled('button', {
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  width: '100%',
  fontWeight: '600',
  fontSize: '15px',
  height: '40px',
  padding: '8px',

  '&:hover': {
    backgroundColor: '$ActionMainHover',
  },
  '&:active': {
    backgroundColor: '$ActionMainSelected',
  },
})

export type ProfileMenuItemProps = {
  userName?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const ProfileMenuItem: FunctionComponent<ProfileMenuItemProps> = ({
  onClick = noop,
  children,
  userName = '',
}) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [])

  return (
    <StyledProfileMenuItem onClick={handleClick}>
      <TempAvatar />
      {children}
      {userName}
    </StyledProfileMenuItem>
  )
}
