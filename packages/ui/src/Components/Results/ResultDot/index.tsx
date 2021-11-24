import React, { CSSProperties } from 'react'
import { Text } from '../../Text'
import { SubText } from '../../Text/SubText'
import { useColor, Color } from '../../../theme'
import { iconFromString } from '../../../icons'
import { Loader } from '../../Loader/Loader'

const ResultDot = ({
  style,
  value,
  size = 'large',
  loading = false,
  icon,
  label,
  foregroundColor = { color: 'primary' },
  color = { color: 'background' },
  textColor,
}: {
  style?: CSSProperties
  size?: 'small' | 'large'
  value?: [number, number]
  label?: string
  icon?: string
  loading?: boolean
  color?: Color | [Color, Color]
  foregroundColor?: Color
  textColor?: Color
}) => {
  // @ts-ignore
  const Icon = icon ? iconFromString(icon) : null

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
    >
      <div
        style={{
          borderRadius: '50%',
          height: size === 'small' ? 43 : 60,
          width: size === 'small' ? 43 : 60,
          background: useColor(color),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {loading ? (
          <Loader color={foregroundColor} size={size === 'small' ? 20 : 24} />
        ) : Icon ? (
          <Icon size={size === 'small' ? 20 : 24} color={foregroundColor} />
        ) : value ? (
          (value[0] === value[1] ? [value[0]] : [value[0], '/', value[1]]).map(
            (v, i) => {
              return size === 'small' ? (
                <SubText
                  key={i}
                  color={foregroundColor}
                  style={{
                    fontSize: value[0] === value[1] ? 13 : 11,
                  }}
                >
                  {{
                    value: v,
                    format: 'number-short',
                  }}
                </SubText>
              ) : (
                <Text weight="semibold" key={i} color={foregroundColor}>
                  {{ value: v, format: 'number-short' }}
                </Text>
              )
            }
          )
        ) : null}
      </div>
      {label ? (
        <Text
          weight="semibold"
          style={{
            marginLeft: 16,
          }}
          color={textColor || (Array.isArray(color) ? foregroundColor : color)}
        >
          {label}
        </Text>
      ) : null}
    </div>
  )
}

export default ResultDot
