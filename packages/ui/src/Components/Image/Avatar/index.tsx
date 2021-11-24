import React, { FunctionComponent } from 'react'
import { DataEventHandler } from '../../../types'
import { useColor, Color, RgbColor } from '../../../theme'
import { Text } from '../../Text'
import { iconFromString, IconName } from '../../../icons'

export type AvatarProps = {
  src?: string
  name?: string
  onClick?: DataEventHandler
  size?: number
  color?: Color | [Color, Color] | RgbColor
  foregroundColor?: Color
  icon?: IconName
}

const parseName = (name: string): string => {
  if (!name) {
    return ''
  }
  let str = ''
  const split = name.split(' ')
  for (const word of split) {
    if (word[0] < 'a') {
      str += word[0]
    }
  }
  if (!str) {
    for (const word of split) {
      str += word[0]
      if (str.length === 2) {
        return str
      }
    }
  }
  return str
}

const Avatar: FunctionComponent<AvatarProps> = ({
  src,
  name = '',
  onClick,
  size = 40,
  color = { color: 'primary', tone: 2 },
  foregroundColor = { color: 'background' },
  icon,
}) => {
  const isArray = Array.isArray(color)
  const parsedName = parseName(name)
  const Icon = icon ? iconFromString(icon) : null
  return (
    <div
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundImage: src
            ? `url(${src})`
            : isArray
            ? useColor(color)
            : null,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:
            isArray && src ? useColor(color[0]) : useColor(color),
        }}
      >
        {!src && !icon && parsedName ? (
          <Text
            weight="semibold"
            style={{
              fontSize: (size < 32 ? 10 : size < 42 ? 13 : 16) + 'px',
            }}
            noSelect
            color={foregroundColor}
          >
            {parsedName}
          </Text>
        ) : !src && Icon ? (
          <Icon
            color={foregroundColor}
            style={{ transform: `scale(${size * 0.03})` }}
          />
        ) : null}
      </div>
    </div>
  )
}

export default Avatar
