import React, { FunctionComponent, CSSProperties, useCallback } from 'react'
import { useColor, Color } from '../../theme'
import { OnValueChange } from '../../types'
import useScopedState from '../../hooks/useScopedState'
import { TextValue } from '../../textParser'
import { Text } from '../Text'
import '@compiled/react'

export type SwitchProps = {
  color?: Color
  onChange: OnValueChange<boolean>
  value?: boolean
  style?: CSSProperties
  identifier?: any
}

type SwitchBaseProps = SwitchProps & {
  ignoreInternal?: boolean
}

export const Switch: FunctionComponent<SwitchBaseProps> = ({
  onChange,
  color = { color: 'primary' },
  ignoreInternal,
  value,
  identifier,
  style,
}) => {
  let enabled, setValue
  if (!ignoreInternal) {
    ;[enabled, setValue] = useScopedState(value, identifier)
  } else {
    enabled = value
  }

  return (
    <div
      style={{
        backgroundColor: useColor({
          color: enabled ? color.color : 'foreground',
          opacity: enabled ? 1 : 0.5,
        }),
        ...style,
      }}
      css={{
        display: 'flex',
        width: 31 - 3,
        cursor: 'pointer',
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 2.5,
        paddingRight: 2,
        borderRadius: 28,
      }}
      onClick={(e) => {
        e.stopPropagation()
        const value = !enabled
        if (setValue) {
          setValue(value)
        }
        onChange(value)
      }}
    >
      <div
        css={{
          width: 13,
          height: 13,
          borderRadius: '50%',
          transition: 'transform 0.2s',
        }}
        style={{
          transform: `translate3d(${enabled ? 7 + 5 - 3 : 0}px,0px,0px)`,
          backgroundColor: useColor({ color: 'background' }),
        }}
      />
    </div>
  )
}

export type SwitchTextButtonProps = SwitchProps & {
  enabledText?: TextValue
  disabledText?: TextValue
}

export const SwitchTextButton: FunctionComponent<SwitchTextButtonProps> = ({
  enabledText = 'Enabled',
  disabledText = 'Disabled',
  onChange,
  identifier,
  value,
  style,
  color,
}) => {
  const [enabled, setValue] = useScopedState(value, identifier)

  return (
    <div
      style={{
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        ...style,
      }}
      onClick={(event) => {
        event.stopPropagation()
        const value = !enabled
        setValue(value)
        onChange(value)
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
      <Text
        weight="medium"
        singleLine
        noSelect
        style={{
          marginLeft: 8,
        }}
      >
        {enabled ? enabledText : disabledText}
      </Text>
    </div>
  )
}
