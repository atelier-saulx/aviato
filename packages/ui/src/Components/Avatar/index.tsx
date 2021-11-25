import React, { FunctionComponent } from 'react'
import { styled } from '../../theme'

const StyledAvatar = styled('div', {
  backgroundColor: '$secondary',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  borderRadius: '50%',
  color: '$background',
  letterSpacing: '-0.015em',
  lineHeight: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

type AvatarSize = 'small' | 'medium' | 'large'

export type AvatarProps = {
  value?: string
  imageUrl?: string
  size?: AvatarSize
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  children,
  value = '',
  imageUrl = '',
  size = 'small',
}) => {
  type AvatarMap = {
    [key in AvatarSize]: number | string
  }

  const avatarSizeMap: AvatarMap = {
    small: '54px',
    medium: '96px',
    large: '128px',
  }

  const avatarFontSizeMap: AvatarMap = {
    small: '16px',
    medium: '24px',
    large: '42px',
  }

  const avatarSize = avatarSizeMap[size] ?? '54px'
  const avatarFontSize = avatarFontSizeMap[size] ?? '16px'

  return (
    <StyledAvatar
      css={{
        backgroundImage: `url(${imageUrl})`,
        fontSize: avatarFontSize,
        width: avatarSize,
        height: avatarSize,
      }}
    >
      {children ?? value}
    </StyledAvatar>
  )
}
