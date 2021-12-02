import React, { FunctionComponent } from 'react'
import { styled } from '~/theme'

const StyledAvatar = styled('div', {
  alignItems: 'center',
  backgroundColor: '$PrimaryMain',
  borderRadius: '300px',
  color: 'white',
  display: 'flex',
  fontSize: '9px',
  fontWeight: '600',
  lineHeight: '24px',
  marginRight: '8px',
  height: '24px',
  width: '24px',
  justifyContent: 'center',

  variants: {
    size: {
      small: {
        fontSize: '7px',
        width: '20px;',
        height: '20px',
      },
      medium: {
        width: '24px',
        height: '24px',
      },
      large: {
        fontSize: '12px',
        width: '36px',
        height: '36px',
      },
    },
  },
})

export function initialsFromUsername(fullUserName) {
  const fullName = fullUserName.split(' ')
  if (fullName.length > 1) {
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0)
    return initials.toUpperCase()
  } else {
    const initials = fullName.shift().charAt(0)
    return initials.toUpperCase()
  }
}

type AvatarSize = 'small' | 'medium' | 'large'

export type AvatarProps = {
  size?: AvatarSize
  username?: string
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  username = '',
  size = 'medium',
}) => {
  return (
    <StyledAvatar size={size}>{initialsFromUsername(username)}</StyledAvatar>
  )
}
