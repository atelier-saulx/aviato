import React, { FunctionComponent, CSSProperties, useCallback } from 'react'
import { useColor, Color } from '../../theme'
import { OnValueChange } from '../../types'
import useScopedState from '../../hooks/useScopedState'
import { TextValue } from '../../textParser'
import { Text } from '../Text'
import { SubText } from '../Text/SubText'
import { Switch } from './Switch'
import '@compiled/react'

export type SwitchExtendedProps = {
  onChange: OnValueChange<boolean>
  value?: boolean
  style?: CSSProperties
  identifier?: any
  info?: TextValue
  label?: TextValue
  color?: Color
  noBorder?: boolean
}

export const SwitchExtended: FunctionComponent<SwitchExtendedProps> = ({
  label,
  info,
  onChange,
  noBorder,
  identifier,
  value,
  color,
  style,
}) => {
  const [enabled, setValue] = useScopedState(value, identifier)

  return (
    <div
      css={{
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: 16,
        paddingBottom: 8,
      }}
      style={{
        marginTop: noBorder ? 0 : 8,
        borderTop: noBorder
          ? null
          : '1px solid ' + useColor({ color: 'divider' }),
        ...style,
      }}
      onClick={(event) => {
        event.stopPropagation()
        const value = !enabled
        setValue(value)
        onChange(value)
      }}
    >
      <div
        css={{
          flexGrow: 1,
        }}
      >
        <Text
          weight="semibold"
          singleLine
          noSelect
          style={{
            marginBottom: 4,
          }}
        >
          {label}
        </Text>
        <SubText noSelect>{info}</SubText>
      </div>
      <div
        css={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Switch
          color={color}
          value={enabled}
          ignoreInternal
          onChange={useCallback(
            (value) => {
              setValue(value)
              onChange(value)
            },
            [onChange]
          )}
        />
      </div>
    </div>
  )
}
