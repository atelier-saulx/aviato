import { styled } from '~/theme'
import React, { FunctionComponent, useCallback, MouseEventHandler } from 'react'
import { noop } from '@aviato/utils'

import TempAvatar from './temp'

const StyledUserButton = styled('div', {
  alignItems: 'center',
  backgroundColor: 'yellow',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  fontWeight: '500',
  height: '40px',
  padding: '8px',

  '&:hover': {
    backgroundColor: '$ActionMainHover',
  },
})

export type UserButtonProps = {
  userName?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const UserButton: FunctionComponent<UserButtonProps> = ({
  onClick = noop,
  children,
  userName = '',
}) => {
  const handleClick = useCallback(() => {
    onClick()
  }, [])

  return (
    <StyledUserButton onClick={handleClick}>
      <TempAvatar />
      {children}
      {userName}
    </StyledUserButton>
  )
}
