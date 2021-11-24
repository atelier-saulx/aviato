import React, {
  useState,
  useCallback,
  CSSProperties,
  ComponentType,
  FunctionComponent,
  useEffect,
} from 'react'
import { useColor, Color } from '../../theme'
import { Down, IconName, iconFromString } from '../../icons'
import { Validator } from './validators'
import './style.css'
import { DropdownOption } from '../Overlay/Dropdown'
import { getTextValue, TextValue } from '../../textParser'
import useHover from '../../hooks/events/useHover'
import { Text } from '../Text'
import useDropdown, { OnSelect } from '../../hooks/overlay/useDropdown'
import useScopedState from '../../hooks/useScopedState'
import renderChildren from '../../util/renderChildren'

type SelectInputProps = {
  style?: CSSProperties
  placeholder?: TextValue
  border?: boolean
  autoFocus?: boolean
  onChange: OnSelect
  filter?: boolean
  validator?: Validator
  Label?: ComponentType<{
    value: DropdownOption | DropdownOption[]
    placeholder?: TextValue
  }>
  icon?: IconName
  identifier?: any
  multi?: boolean
  value?: DropdownOption | DropdownOption[]
  items?: DropdownOption[]
  color?: Color
  weight?: 'semibold' | 'medium' | 'regular'
  registerDoubleClick?: boolean
}

export const Select: FunctionComponent<SelectInputProps> = ({
  placeholder = '',
  onChange,
  items = [],
  Label,
  icon,
  filter,
  color = { color: 'background', tone: 1 },
  multi,
  weight = 'regular',
  border,
  identifier,
  value = multi ? [] : undefined,
  style,
  registerDoubleClick,
}) => {
  if (typeof value === 'string') {
    value = { value }
  }

  const [isFocus, setFocus] = useState(false)
  const [valueString, setValueString] = useState(JSON.stringify(value))

  const [stateValue, setValue] = useScopedState<
    DropdownOption | DropdownOption[]
  >(value, identifier, isFocus)

  /**
   * Force state-update when value is updated externally.
   * This prevents an edge-case where internal component state is de-synced from consuming app.
   */
  useEffect(() => {
    const needsStateUpdate = JSON.stringify(value) !== valueString
    if (needsStateUpdate) {
      setValueString(JSON.stringify(value))
      setValue(value)
    }
  }, [value])

  const [hover, isHover] = useHover()

  const Icon = icon
    ? iconFromString(icon)
    : value && !Array.isArray(value) && value.icon
    ? iconFromString(value.icon)
    : ''

  const update = useCallback(
    (value, index, e) => {
      setValue(value)
      return onChange(value, index, e)
    },
    [setValue, onChange]
  )

  let displayName: any = ''

  if (Array.isArray(stateValue)) {
    const displayNames = stateValue
      .filter((value) => value.value !== undefined)
      .map((value) =>
        getTextValue(
          // @ts-ignore
          value.children ? renderChildren(value.children) : value.value
        )
      )

    if (displayNames.length >= 2) {
      // On 2+ responses, show `${<firstDisplayName>, +<countRemaining>}`
      displayName = `${displayNames[0] ?? placeholder}, +${
        stateValue.length - 1
      }`
    } else {
      // Otherwise just show first
      displayName = displayNames[0] ?? placeholder
    }
  } else {
    displayName =
      !stateValue || stateValue.value === undefined
        ? placeholder
        : getTextValue(
            // @ts-ignore
            stateValue.children
              ? renderChildren(stateValue.children)
              : stateValue.value
          )
  }

  return (
    <div
      {...hover}
      onClick={useDropdown(
        items,
        (value, index, e) => {
          if (index !== undefined) {
            return update(value, index, e)
          }
        },
        stateValue,
        {
          registerDoubleClick,
          multi,
          filter,
          align: 'flex-end',
          x: ({ left }) => left - 15,
          y: ({ top }) => top + 15,
        },
        () => {
          setFocus(true)
          return () => {
            setFocus(false)
          }
        }
      )}
      style={{
        cursor: 'pointer',
        position: 'relative',
        paddingLeft: isFocus ? 11 : 12,
        paddingRight: isFocus ? 11 : 12,
        paddingTop: isFocus ? 6.5 : 7.5,
        paddingBottom: isFocus ? 6.5 : 7.5,
        justifyContent: 'space-between',
        display: 'flex',
        borderRadius: 4,
        background: useColor({
          color: color.color,
          tone: isFocus || isHover ? color.tone + 1 : 1,
        }),
        border: isFocus
          ? '2px solid ' + useColor({ color: 'primary' })
          : '1px solid ' +
            useColor({
              color: 'divider',
              opacity: border ? 1 : 0,
            }),
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
        }}
      >
        {Icon ? (
          <>
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon />
            </div>
            <div style={{ width: 24, marginRight: 12 }} />
          </>
        ) : null}
        {Label ? (
          <Label value={stateValue} placeholder={placeholder} />
        ) : (
          <Text
            weight={weight}
            singleLine
            style={{
              userSelect: 'none',
              opacity: displayName === placeholder ? 0.6 : 1,
            }}
          >
            {displayName}
          </Text>
        )}
      </div>
      <Down />
    </div>
  )
}
