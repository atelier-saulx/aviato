import React, { FunctionComponent } from 'react'
import { DefaultProps, styled } from '~/theme'

const StyledAvatar = styled('div', {
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$PrimaryMain',
  color: '$PrimaryContrastHigh',
  display: 'flex',
  fontSize: '9px',
  fontWeight: '600',
  lineHeight: '24px',
  height: '24px',
  width: '24px',

  variants: {
    size: {
      small: {
        fontSize: '7px',
        width: '20px;',
        height: '20px',
        borderRadius: '20px',
      },
      medium: {
        width: '24px',
        height: '24px',
        borderRadius: '24px',
      },
      large: {
        fontSize: '12px',
        width: '36px',
        height: '36px',
        borderRadius: '24px',
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

export type AvatarProps = DefaultProps & {
  size?: AvatarSize
  username?: string
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  username = '',
  size = 'medium',
  ...remainingProps
}) => {
  return (
    <StyledAvatar size={size} {...remainingProps}>
      {initialsFromUsername(username)}
    </StyledAvatar>
  )
}
