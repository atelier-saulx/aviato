import React, {
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
  CSSProperties,
} from 'react'
import { Text } from '../Text'
import { Color, useColor } from '../../theme'
import useHover from '../../hooks/events/useHover'
import { TextValue } from '../../textParser'
import { Check } from './CheckBox'
import '@compiled/react'

type GenericEventHandler = EventHandler<SyntheticEvent>

type CardOptionsProps = {
  onChange?: (value: boolean | void) => void
  label?: TextValue
  onHover?: GenericEventHandler
  value?: boolean
  style?: CSSProperties
  frameColor?: Color
}

export const CardOption: FunctionComponent<CardOptionsProps> = ({
  children,
  onChange,
  value,
  label = '',
  onHover,
  style,
}) => {
  const [hover, isHover] = useHover(onHover)

  return (
    <div
      {...hover}
      onClick={() => {
        onChange(!value)
      }}
      style={{
        padding: value || isHover ? 11 : 12,
        border:
          value || isHover
            ? '2px solid ' + useColor({ color: 'primary' })
            : '1px solid ' + useColor({ color: 'divider' }),

        ...style,
      }}
      css={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: 4,
        transition: 'hover 0.15s, background-color 0.15s',
      }}
    >
      <Check
        overrideValue={value}
        value={value}
        disabledColor={{ color: isHover ? 'primary' : 'divider' }}
      />

      <Text
        noSelect
        singleLine
        style={{
          marginLeft: 12,
          marginRight: 16,
        }}
      >
        {label}
      </Text>

      {children || null}
    </div>
  )
}
