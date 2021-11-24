import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
  useRef,
  useState,
} from 'react'
import useOverlayPosition, {
  PositionPropsFn,
} from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'
import { useColor } from '../../theme'
import { Checked, iconFromString, IconName, IconProps } from '../../icons'
import { Text } from '../Text'
import useHover from '../../hooks/events/useHover'
import Shared from './Shared'
import { TextValue, isTextValue, getStringValue } from '../../textParser'
import { Data, OnValueChange } from '../../types'
import { deepEqual } from '@saulx/utils'
import { Input } from '../Input/Text'

export type DropdownOption = {
  icon?: IconName
  value: TextValue
  framed?: boolean
  data?: Data
  action?: boolean
  id?: string
  children?: TextValue | ComponentType<PropsWithChildren<OptionProps>>
}

export type OptionProps = {
  option: DropdownOption
  isActive: boolean
  onChange: OnValueChange
  index: number
  registerDoubleClick?: boolean
}

const DoubleClicker = ({ onClick, onDoubleClick = null, ...props }) => {
  const timer = useRef() as { current: NodeJS.Timeout }
  return (
    <div
      onClick={
        onDoubleClick
          ? () => {
              clearTimeout(timer.current)
              timer.current = setTimeout(onClick, 200)
            }
          : onClick
      }
      onDoubleClick={
        onDoubleClick
          ? (e) => {
              clearTimeout(timer.current)
              onDoubleClick(e)
            }
          : null
      }
      {...props}
    />
  )
}

const Option: FunctionComponent<OptionProps> = (props) => {
  let { option, isActive, onChange, index, registerDoubleClick } = props
  const [hover, isHover] = useHover()
  const Icon: FunctionComponent<IconProps> = iconFromString(option.icon)
  let isSelectNone: boolean

  if (option.value === undefined) {
    isActive = false
    isSelectNone = true
  }

  let label = isSelectNone ? { en: 'Select none' } : option.value

  const children = option.children
  let body: ReactNode

  if (children) {
    if (isTextValue(children)) {
      label = children
    } else {
      body = React.createElement(children, props)
    }
  }

  if (!body) {
    body = isActive ? (
      <div
        style={{
          marginRight: 16,
          position: 'relative',
        }}
      >
        <Text
          singleLine
          noSelect
          weight="semibold"
          style={{
            position: 'absolute',
          }}
        >
          {label}
        </Text>
        <Text
          singleLine
          noSelect
          style={{
            opacity: 0,
          }}
        >
          {label}
        </Text>
      </div>
    ) : (
      <Text style={{ marginRight: 16 }} singleLine noSelect>
        {label}
      </Text>
    )
  }

  return (
    <DoubleClicker
      {...hover}
      style={{
        opacity: isSelectNone ? 0.5 : 1,
        width: '100%',
        paddingTop: option.action ? 0 : 5,
        paddingBottom: option.action ? 0 : 5,
        paddingLeft: option.action ? 0 : Icon ? 8 : 16,
        paddingRight: option.action ? 0 : 8,
        display: 'flex',
        cursor: 'pointer',
        backgroundColor:
          !option.action && isHover ? useColor({ color: 'divider' }) : null,
      }}
      onClick={() => {
        if (!option.action) {
          onChange(option, index)
        }
      }}
      onDoubleClick={
        registerDoubleClick
          ? (e) => {
              if (!option.action) {
                onChange(option, index, e)
              }
            }
          : null
      }
    >
      {Icon ? <Icon style={{ marginRight: 8 }} framed={option.framed} /> : null}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'space-between',
        }}
      >
        {body}
        {!option.action ? (
          <Checked
            style={{ opacity: isActive ? 1 : 0, marginLeft: 16 }}
            color={{
              color: isActive ? 'primary' : 'foreground',
              opacity: isActive ? 1 : 0,
            }}
          />
        ) : null}
      </div>
    </DoubleClicker>
  )
}

export type DropdownProps = {
  items: DropdownOption[]
  onChange: OnValueChange<DropdownOption>
  value?: DropdownOption | DropdownOption[]
  filter?: boolean
  registerDoubleClick?: boolean
}

export const dropdownOptionIsEqual = (
  a: DropdownOption,
  b: DropdownOption
): boolean => {
  return (
    a.value === b.value ||
    (typeof b.value === 'object' && deepEqual(b.value, a.value))
  )
}

const filterFunction = (v: DropdownOption, filterValue: string): boolean => {
  if (getStringValue(v.value).toLowerCase().indexOf(filterValue) !== -1) {
    return true
  }
  if (
    isTextValue(v.children) &&
    getStringValue(v.children).toLowerCase().indexOf(filterValue) !== -1
  ) {
    return true
  }
  return false
}

export const Dropdown: FunctionComponent<PositionPropsFn & DropdownProps> = (
  initialProps
) => {
  const props = useOverlayProps<PositionPropsFn & DropdownProps>(initialProps)
  const { align, value, onChange, items, filter } = props
  const [filterValue, setFilter] = useState<string>()
  const [elementRef, position] = useOverlayPosition(props)

  const minWidth =
    position && position.elementRect && position.elementRect.width

  return (
    <Shared
      width={typeof props.width !== 'function' ? props.width : null}
      position={position}
      align={align}
      ref={elementRef}
      style={{
        minWidth: filterValue ? minWidth : null,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 32px)',
      }}
    >
      {filter ? (
        <div
          style={{
            marginTop: -12,
            paddingTop: 2,
            background: useColor({
              color: 'background',
              tone: 2,
            }),
            marginBottom: 8,
            paddingBottom: 2,
            borderBottom: '1px solid ' + useColor({ color: 'divider' }),
          }}
        >
          <Input
            iconColor={{ color: 'foreground' }}
            type="search"
            noBackground
            onChange={(v) => {
              setFilter(v ? String(v).toLowerCase() : '')
            }}
            noBorder
            noBordeRadius
            placeholder="Filter"
          />
        </div>
      ) : null}

      {(filterValue
        ? items.filter((v) => filterFunction(v, filterValue))
        : items
      ).map((option, index) => {
        return (
          <Option
            key={index}
            option={option}
            index={index}
            isActive={
              !option.action
                ? Array.isArray(value)
                  ? value.findIndex((o) => dropdownOptionIsEqual(option, o)) !==
                    -1
                  : value && dropdownOptionIsEqual(option, value)
                : false
            }
            onChange={onChange}
            registerDoubleClick={props.registerDoubleClick}
          />
        )
      })}
    </Shared>
  )
}
