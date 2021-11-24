import React, {
  CSSProperties,
  FunctionComponent,
  FocusEvent,
  useRef,
  useReducer,
  // useEffect,
} from 'react'
import { Color, useColor } from '../../theme'
import { IconName, Expand, iconFromString, Drag } from '../../icons'
import { Validator } from './validators'
import { DropdownOption } from '../Overlay/Dropdown'
// import { useHub } from '@saulx/hub'
import { TextValue } from '../../textParser'
import {
  OnValueChange,
  DataEventHandler,
  MultiDataEventHandler,
  Data,
} from '../../types'
import './style.css'
import { Input } from './Text'
import useHover from '../../hooks/events/useHover'
import useDrag from '../../hooks/drag/useDrag'
import useDrop from '../../hooks/drag/useDrop'
import { CheckBox } from './Toggle'

type ExpandTextProps = {
  style?: CSSProperties
  icon?: IconName
  errorText?: TextValue
  helperText?: TextValue
  expandAllOnShift?: boolean
  border?: boolean
  autoFocus?: boolean
  onChange: OnValueChange<string | number | undefined>
  onFocus?: (event: FocusEvent<any>) => void
  onBlur?: (event: FocusEvent<any>) => void
  type?: 'text' | 'email' | 'number' | 'date' | 'time' | 'search'
  validator?: Validator
  identifier?: any
  value?: string | number
  label?: TextValue
  placeholder?: TextValue
  dropdown?: DropdownOption[]
  color?: Color
  progress?: number
  data?: any
  optionsIcon?: IconName
  onOptions?: DataEventHandler
  checkbox?: {
    value?: boolean
    onChange: OnValueChange<boolean>
  }
  draggable?: boolean
  onDrop?: MultiDataEventHandler<Object> | DataEventHandler<Data<any>>
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const r = (x) => !x

const ExpandableTextInput: FunctionComponent<ExpandTextProps> = ({
  style,
  children,
  label,
  optionsIcon,
  onOptions,
  draggable,
  onDrop,
  expandAllOnShift,
  data,
  checkbox,
  ...props
}) => {
  const [isExpanded, setExpanded] = useReducer(r, false)
  const [hover, isHover] = useHover()
  const Icon = optionsIcon ? iconFromString(optionsIcon) : null
  const ref = useRef<any>()
  const [drag, isDragging] = useDrag({ data }, ref)

  // let hub
  if (expandAllOnShift) {
    console.warn(
      'shift functionality does not work currently (after removing @saulx/hub)'
    )
    // hub = useHub()

    // useEffect(() => {
    //   const flap = (x) => {
    //     setExpanded()
    //   }
    //   hub.on('device.expandAll', flap)
    //   return () => {
    //     hub.removeEventListener('device.expandAll', flap)
    //   }
    // }, [])
  }

  let drop, isDragOver
  if (onDrop) {
    // @ts-ignore
    ;[drop, isDragOver] = useDrop(onDrop)
  }

  return (
    <div
      style={{
        ...style,
        position: 'relative',
        borderRadius: '4px',
        background: useColor({
          color: 'background',
          tone: isDragging ? 5 : 2,
          opacity: 0.75,
        }),
      }}
      {...hover}
      {...drop}
    >
      {onDrop ? (
        <div
          style={{
            position: 'absolute',
            top: -7,
            left: 0,
            right: 0,
            opacity: isDragOver ? 1 : 0,
            transition: 'opacity 0.1s',
            borderBottom: '2px solid ' + useColor({ color: 'divider' }),
          }}
        />
      ) : null}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 10,
        }}
        ref={ref}
      >
        <Expand
          style={{
            transition: 'transform 0.1s',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          color={{ color: 'foreground' }}
          onClick={
            expandAllOnShift
              ? (e) => {
                  // if (e.shiftKey) {
                  //   // hub.emit('device.expandAll', !isExpanded)
                  // } else {
                  setExpanded()
                  // }
                }
              : setExpanded
          }
        />
        {checkbox ? <CheckBox {...checkbox} /> : null}
        {label}
        <Input
          noClear
          style={{
            marginLeft: -5,
          }}
          noBackground
          noBorder
          weight="medium"
          {...props}
        />
        {Icon ? (
          <Icon
            color={{ color: 'foreground' }}
            style={{ marginRight: 12, opacity: isHover ? 1 : 0 }}
            onClick={onOptions}
          />
        ) : null}
        {draggable ? (
          <Drag
            {...drag}
            color={{ color: 'foreground', tone: 1 }}
            style={{ marginRight: 5, cursor: 'grab', opacity: isHover ? 1 : 0 }}
          />
        ) : null}
      </div>
      {isExpanded ? children || null : null}
    </div>
  )
}

export { ExpandableTextInput }
