import React, {
  useState,
  useCallback,
  CSSProperties,
  FunctionComponent,
  FocusEvent,
} from 'react'
import { useColor, Color } from '../../theme'
import Clear from './Clear'
import {
  Search,
  Date,
  Time,
  Email,
  Down,
  IconProps,
  iconFromString,
  IconName,
} from '../../icons'
import { emailValidator, Validator } from './validators'
import { SubText } from '../Text/SubText'
import useDropdown from '../../hooks/overlay/useDropdown'
import { DropdownOption } from '../Overlay/Dropdown'
import useHover from '../../hooks/events/useHover'
import { ProgressIndicator } from '../ProgressIndicator/ProgressIndicator'
import { TextValue, getTextValue } from '../../textParser'
import { OnValueChange } from '../../types'
import useScopedState from '../../hooks/useScopedState'
import './style.css'

type InputProps = {
  inputRef?: any
  style?: CSSProperties
  weight?: 'semibold' | 'medium' | 'regular'
  icon?: IconName
  errorText?: TextValue
  helperText?: TextValue
  noBorder?: boolean
  noHover?: boolean
  noBackground?: boolean
  border?: boolean
  iconColor?: Color
  name?: string
  autoFocus?: boolean
  onChange: OnValueChange<string | number | undefined>
  onFocus?: (event: FocusEvent<any>) => void
  onBlur?: (event: FocusEvent<any>) => void
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'search' | 'password'
  validator?: Validator
  onValid?: (valid: boolean) => {}
  identifier?: any
  value?: string | number
  placeholder?: TextValue
  dropdown?: DropdownOption[]
  color?: Color
  noClear?: boolean
  noBordeRadius?: boolean
  progress?: number
  autoComplete?: string
}

export const Input: FunctionComponent<InputProps> = ({
  inputRef,
  placeholder = '',
  value = '',
  onChange,
  onKeyUp,
  noBackground,
  onFocus,
  iconColor = { color: 'foreground', tone: 3 },
  name,
  noHover,
  onBlur,
  weight,
  autoFocus,
  noBorder,
  noBordeRadius,
  border,
  icon,
  color = { color: 'background', tone: 1 },
  style,
  noClear,
  type = 'text',
  onValid,
  validator,
  dropdown,
  errorText,
  helperText,
  identifier,
  progress,
  autoComplete,
}) => {
  const [hover, isHover] = noHover ? [{}, false] : useHover()
  const [isFocus, setFocus] = useState(false)
  const [isWrong, setWrong] = useState(false)

  const [stateValue, setValue] = useScopedState(value, identifier, isFocus)

  const update = useCallback(
    (e) => {
      let newvalue = e.target ? e.target.value : e
      if (newvalue && type === 'number') {
        newvalue = Number(newvalue)
      }
      setValue(newvalue)
      if (validator) {
        if (validator(newvalue) || !newvalue) {
          setWrong(false)
          if (onValid) onValid(true)
          onChange(newvalue)
        } else {
          setWrong(true)
          if (onValid) onValid(false)
        }
      } else {
        onChange(newvalue)
      }
    },
    [setValue, onChange, validator]
  )

  const clear = useCallback(() => {
    setValue('')
    onChange(null)
  }, [setValue, onChange])

  const blur = useCallback(
    (event) => {
      setFocus(false)
      onBlur && onBlur(event)
    },
    [setFocus]
  )

  const focus = useCallback(
    (event) => {
      setFocus(true)
      onFocus && onFocus(event)
    },
    [setFocus]
  )

  let Icon: FunctionComponent<IconProps>

  if (Icon === undefined) {
    if (icon) {
      Icon = iconFromString(icon)
    } else if (type === 'search') {
      Icon = Search
    } else if (type === 'date') {
      Icon = Date
    } else if (type === 'time') {
      Icon = Time
    } else if (type === 'email') {
      Icon = Email
    }
  }

  if (type === 'email') {
    if (!validator) {
      validator = emailValidator
    }
    if (!errorText) {
      errorText = { en: 'Please enter a valid email adress' }
    }
  }

  return (
    <div
      {...hover}
      style={{
        position: 'relative',

        paddingLeft: !noBorder && isFocus ? 11 : 12,
        paddingRight: !noBorder && isFocus ? 11 : 12,
        display: 'flex',
        alignItems: 'center',
        borderRadius: noBordeRadius ? null : '8px',
        flexGrow: 1,
        background: noBackground
          ? 'transparent'
          : useColor({
              color: color.color,
              tone: isFocus ? 1 : isHover ? color.tone + 1 : 1,
            }),
        border: noBorder
          ? null
          : isFocus
          ? '2px solid ' +
            (isWrong
              ? useColor({ color: 'error' })
              : useColor({ color: 'primary' }))
          : '1px solid ' +
            (isWrong
              ? useColor({ color: 'error' })
              : useColor({
                  color: 'divider',
                  opacity: border ? 1 : 0,
                })),
        ...style,
      }}
    >
      {progress !== null && progress !== undefined ? (
        <div style={{ marginRight: 9 }}>
          <ProgressIndicator value={progress} />
        </div>
      ) : Icon ? (
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
            <Icon color={iconColor} />
          </div>
          <div style={{ width: 28 }} />
        </>
      ) : null}

      <input
        ref={inputRef}
        type={type}
        value={stateValue}
        onChange={update}
        onKeyUp={onKeyUp}
        onFocus={focus}
        onBlur={blur}
        name={name}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        placeholder={String(getTextValue(placeholder))}
        style={{
          width: '100%',
          paddingLeft: Icon ? 6.5 : 0,
          paddingTop: isFocus && !noBorder ? 6.5 : 7.5,
          paddingBottom: isFocus && !noBorder ? 6.5 : 7.5,
          appearance: 'none',
          fontSize: '15px',
          lineHeight: '24px',
          letterSpacing: '-0.015em',
          background: 'none',
          fontFamily: 'Font',
          color: useColor({ color: 'foreground' }),
          fontWeight:
            weight === 'semibold' ? 600 : weight === 'medium' ? 500 : 'normal',
        }}
      />

      {dropdown ? (
        <Down
          onClick={useDropdown(
            dropdown,
            (value) => {
              if (!Array.isArray(value)) {
                update(value.value === undefined ? '' : value.value)
              }
            },
            { value: stateValue },
            {
              align: 'flex-end',
              x: ({ left }) => left - 15,
              y: ({ top }) => top + 15,
              selectTarget: (target) => {
                return target.parentNode.parentNode
              },
            }
          )}
        />
      ) : !noClear ? (
        <Clear
          color={
            isWrong
              ? { color: 'error' }
              : isFocus
              ? { color: 'primary' }
              : { color: 'foreground', tone: 1 }
          }
          style={{
            // @ts-ignore
            opacity: isHover && (stateValue || stateValue === 0) ? 1 : 0,
          }}
          onClick={clear}
        />
      ) : null}

      {isFocus && (errorText || helperText) ? (
        <SubText
          color={{
            color: isWrong ? 'error' : 'foreground',
            tone: isWrong ? 1 : 3,
          }}
          style={{
            marginLeft: 4,
            position: 'absolute',
            bottom: -25,
            left: 0,
          }}
        >
          {isWrong ? errorText : helperText || ''}
        </SubText>
      ) : null}
    </div>
  )
}
