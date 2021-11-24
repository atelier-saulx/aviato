import React, { CSSProperties, FunctionComponent } from 'react'

export type AvatarProps = {
  value?: string
  style?: CSSProperties
  imageUrl?: string
  size?: 'small' | 'medium' | 'large'
}

export const Avatar: FunctionComponent<AvatarProps> = ({
  children,
  value = '',
  style = {},
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
        background: 'red', // useColor({ color: 'primary' }),
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        borderRadius: '50%',
        color: 'red', // useColor({ color: 'background' }),
        fontSize: avatarFontSize,
        width: avatarSize,
        height: avatarSize,
        letterSpacing: '-0.015em',
        lineHeight: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children ?? value}
    </div>
  )
}
