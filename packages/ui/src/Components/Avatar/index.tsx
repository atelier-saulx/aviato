import React, { FunctionComponent } from 'react'

export type AvatarProps = {
  value?: string
  imageUrl?: string
  size?: 'small' | 'medium' | 'large'
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  children,
  value = '',
  imageUrl = '',
  size = 'small',
}) => {
  const avatarSize =
    size === 'small'
      ? '54px'
      : size === 'medium'
      ? '96px'
      : size === 'large'
      ? '128px'
      : 'small'

  const avatarFontSize =
    size === 'small'
      ? '16px'
      : size === 'medium'
      ? '24px'
      : size === 'large'
      ? '42px'
      : 'small'

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