import React, {
  useCallback,
  FunctionComponent,
  CSSProperties,
  SyntheticEvent,
  EventHandler,
} from 'react'
import { Check, CheckProps } from '../Button/CheckBox'
import { Radio } from '../Button/Radio'
import { Text } from '../Text'
import { TextValue } from '../../textParser'
import { OnValueChange } from '../../types'
import { IconName, iconFromString } from '../../icons'
import useScopedState from '../../hooks/useScopedState'
import { useColor } from '../../theme'

export type ToggleInputProps = {
  style?: CSSProperties
  onChange: OnValueChange<boolean>
  value?: boolean
  icon?: IconName
  border?: boolean
  onMouseEnter?: EventHandler<SyntheticEvent>
  identifier?: any
  children?: TextValue
}

export const CheckBox: FunctionComponent<ToggleInputProps & CheckProps> = ({
  style,
  children,
  onChange,
  identifier,
  border,
  icon,
  value = false,
  onMouseEnter,
  ...rest
}) => {
  const [stateValue, setValue] = useScopedState<boolean>(value, identifier)

  const Icon = icon ? iconFromString(icon) : null

  return (
    <div
      style={{
        border: border ? '1px solid ' + useColor({ color: 'divider' }) : null,
        borderRadius: 4,
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        justifyContent: 'space-between',
        ...style,
      }}
      onMouseEnter={onMouseEnter}
      onClick={useCallback(() => {
        const v = !stateValue
        if (onChange) {
          onChange(v)
        }
        setValue(v)
      }, [onChange, stateValue])}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Check {...rest} overrideValue={stateValue} />
        <Text
          noSelect
          style={{
            marginLeft: 15,
          }}
        >
          {children}
        </Text>
      </div>
      {Icon ? <Icon /> : null}
    </div>
  )
}

export const RadioButton: FunctionComponent<ToggleInputProps> = ({
  style,
  children,
  onChange,
  icon,
  border,
  identifier,
  value = false,
  ...rest
}) => {
  const [stateValue, setValue] = useScopedState<boolean>(value, identifier)

  const Icon = icon ? iconFromString(icon) : null

  return (
    <div
      style={{
        display: 'flex',
        border: border ? '1px solid ' + useColor({ color: 'divider' }) : null,
        alignItems: 'center',
        cursor: 'pointer',
        paddingLeft: 12,
        paddingRight: 12,
        paddingTop: 7.5,
        paddingBottom: 7.5,
        justifyContent: 'space-between',
        ...style,
      }}
      onClick={useCallback(() => {
        const value = !stateValue
        if (onChange) {
          onChange(value)
        }
        setValue(value)
      }, [onChange, stateValue])}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Radio overrideValue={stateValue} {...rest} />
        <Text
          noSelect
          style={{
            marginLeft: 15,
          }}
        >
          {children}
        </Text>
      </div>
      {Icon ? <Icon /> : null}
    </div>
  )
}
