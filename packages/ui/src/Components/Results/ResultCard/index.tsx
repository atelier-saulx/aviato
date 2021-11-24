import React, { FunctionComponent, CSSProperties } from 'react'
import { TextValue } from '../../../textParser'
import { Text } from '../../Text'
import { Title } from '../../Text/Title'
import { useColor, Color } from '../../../theme'

export type ResultCardProps = {
  label: TextValue
  value: string | number
  style?: CSSProperties
  color?: Color
}

export const ResultCard: FunctionComponent<ResultCardProps> = ({
  style,
  label,
  value,
}) => {
  return (
    <div
      style={{
        width: 212,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        height: 116,
        border: '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text
          singleLine
          noSelect
          style={{
            marginTop: 16,
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
        <Title
          singleLine
          noSelect
          style={{
            marginBottom: 20,
          }}
          size="large"
        >
          {{ value, format: 'number-short' }}
        </Title>
      </div>
    </div>
  )
}
