import React, {
  CSSProperties,
  FunctionComponent,
  useCallback,
  useReducer,
} from 'react'
import { useColor, Color } from '../../theme'
import '@compiled/react'

export type RadioProps = {
  onChange?: (value: boolean | void) => void
  value?: boolean
  overrideValue?: boolean
  style?: CSSProperties
  color?: Color
}

export const Radio: FunctionComponent<RadioProps> = ({
  onChange = () => {},
  color = { color: 'primary' },
  value = false,
  overrideValue,
  style,
}) => {
  let [enabled, update] = useReducer((x) => !x, value)

  if (overrideValue !== undefined) {
    enabled = overrideValue
  }

  return (
    <div
      css={{
        display: 'flex',
        cursor: 'pointer',
        borderRadius: '50%',
        width: 24,
        height: 24,
        padding: 5,
        transform: 'translate3d(0,0,0)',
      }}
      style={{
        border: '1px solid ' + useColor(color),
        boxShadow:
          `0 0 1px 0 ${useColor(color)} inset, 0 0 1px 0 ` + useColor(color),
        backgroundColor: useColor({ color: color.color, opacity: 0.1 }),
        ...style,
      }}
      onClick={useCallback(() => {
        if (overrideValue !== undefined) {
          onChange(!overrideValue)
        } else {
          onChange(update())
        }
      }, [onChange])}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          opacity: enabled ? 1 : 0,
          backgroundColor: useColor(color),
          transition: 'opacity 0.2s',
        }}
      />
    </div>
  )
}
