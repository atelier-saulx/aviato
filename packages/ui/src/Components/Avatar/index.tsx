import React, { FunctionComponent } from 'react'

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
  type AvatarSizeMap = {
    [key in AvatarSize]: number | string
  }

  const avatarSizeMap: AvatarSizeMap = {
    small: '54px',
    medium: '96px',
    large: '128px',
  }

  const avatarSize = avatarSizeMap[size] ?? '54px'

  type AvatarFontSizeMap = {
    [key in AvatarSize]: number | string
  }

  const avatarFontSizeMap: AvatarFontSizeMap = {
    small: '16px',
    medium: '24px',
    large: '42px',
  }

  const avatarFontSize = avatarFontSizeMap[size] ?? '16px'

  return (
    <div
      style={{
        backgroundColor: 'var(--color-secondary)',
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        borderRadius: '50%',
        color: 'var(--color-background)',
        fontSize: avatarFontSize,
        width: avatarSize,
        height: avatarSize,
        letterSpacing: '-0.015em',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children ?? value}
    </div>
  )
}
