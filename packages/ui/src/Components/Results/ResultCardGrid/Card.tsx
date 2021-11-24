import React, { FunctionComponent, CSSProperties } from 'react'
import { TextValue } from '../../../textParser'
import { Text } from '../../Text'
import { Title } from '../../Text/Title'
import { useColor, Color } from '../../../theme'
import { ResultCardGridItem } from './'

export const Filler: FunctionComponent = () => {
  return (
    <div
      style={{
        minWidth: 175,
        width: 'calc(16.5% - 16px)',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
      }}
    />
  )
}

export const ResultCard: FunctionComponent<{ item: ResultCardGridItem }> = ({
  item: { value, label },
}) => {
  if (typeof value !== 'object') {
    value = { format: 'number-short', value }
  }

  return (
    <div
      style={{
        marginRight: 16,
        marginBottom: 16,
        padding: 30,
        minWidth: 175,
        width: 'calc(16.5% - 16px)',
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        border: '1px solid ' + useColor({ color: 'divider' }),
        background: useColor({ color: 'background', tone: 2 }),
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Title noSelect color={{ color: 'foreground' }}>
          {value}
        </Title>
        <Text noSelect color={{ color: 'foreground' }}>
          {label}
        </Text>
      </div>
    </div>
  )
}
