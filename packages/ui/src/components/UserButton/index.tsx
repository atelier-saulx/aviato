import { styled } from '~/theme'
import React, { FunctionComponent, useCallback, MouseEventHandler } from 'react'
import { noop } from '@aviato/utils'

import TempAvatar from './temp'

const StyledUserButton = styled('button', {
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
