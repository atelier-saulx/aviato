import React, {
  useCallback,
  useContext,
  useEffect,
  FunctionComponent,
  CSSProperties,
} from 'react'
import useOverlayPosition from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps, {
  OverlayContext,
} from '../../hooks/overlay/useOverlayProps'
import { useColor, Color } from '../../theme'
import {
  ChevronRight,
  ChevronLeft,
  iconFromString,
  IconName,
  IconProps,
} from '../../icons'
import { Text } from '../Text'
import useHover from '../../hooks/events/useHover'
import Shared from './Shared'
import { removeOverlay } from './index'
import { GenericOverlayProps } from './GenericOverlay'
import { TextValue } from '../../textParser'
import renderChildren from '../../util/renderChildren'
import { DataEventHandler } from '../../types'

export type NextProps = {
  label?: TextValue
}

const Next: FunctionComponent<NextProps> = ({ label, children }) => {
  const [hover, isHover] = useHover()
  const context = useContext(OverlayContext)

  return (
    <div>
      <div
        {...hover}
        onClick={useCallback(() => {
          context.current.merge({ content: undefined })
        }, [])}
        style={{
          display: 'flex',
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 15,
          paddingRight: 15,
          width: '100%',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: isHover
            ? useColor({ color: 'foreground', opacity: 0.05 })
            : null,
        }}
      >
        <ChevronLeft />
        <Text
          weight="medium"
          singleLine
          noSelect
          style={{
            marginLeft: 4,
          }}
        >
          {label}
        </Text>
      </div>
      {renderChildren(children, {})}
    </div>
  )
}

export type ContextualMenuItemProps = {
  icon?: IconName
  label?: TextValue
  onClick?: DataEventHandler
  style?: CSSProperties
  color?: Color
  border?: boolean
  iconProps?: IconProps
  onOptions?: DataEventHandler
  optionsIcon?: IconName
  weight?: 'semibold' | 'medium' | 'regular'
  Icon?: FunctionComponent<IconProps>
  first?: boolean
}

export const ContextualMenuItem: FunctionComponent<ContextualMenuItemProps> = ({
  icon,
  label,
  weight,
  color,
  children,
  onClick,
  style,
  iconProps,
  optionsIcon,
  onOptions,
  border,
  Icon = icon ? iconFromString(icon) : null,
  first,
}) => {
  const [hover, isHover] = useHover()
  const context = useContext(OverlayContext)

  const click = useCallback(
    (event) => {
      if (onClick) {
        if (!onClick(event)) {
          removeOverlay()
        }
      } else {
        context.current.merge({
          content: <Next label={label}>{children}</Next>,
        })
      }
    },
    [onClick, children, context]
  )
  return (
    <div
      style={{
        borderColor: useColor({
          color: 'foreground',
          tone: 5,
          opacity: 0.33,
        }),
        borderStyle: 'solid',
        borderWidth: 0,
        borderTopWidth: border ? 1 : 'inherit',
      }}
    >
      <div
        {...hover}
        onClick={click}
        style={{
          display: 'flex',
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 8,
          paddingRight: 8,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: isHover ? useColor({ color: 'divider' }) : null,
          ...style,
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          {Icon ? (
            <Icon
              color={color || { color: 'foreground', tone: 1 }}
              {...iconProps}
            />
          ) : null}
          <Text
            color={color}
            style={{
              marginLeft: !Icon ? 8 + 24 : 8,
              marginRight: 8,
            }}
            weight={weight}
            singleLine
            noSelect
          >
            {label}
          </Text>
        </div>
        {onOptions
          ? React.createElement(iconFromString(optionsIcon || 'more'), {
              onClick: (event) => {
                event.preventDefault()
                event.stopPropagation()
                onOptions(event)
              },
            })
          : null}
        {children && !onClick && !onOptions ? (
          <ChevronRight color={{ color: 'foreground', tone: 3 }} />
        ) : null}
      </div>
    </div>
  )
}

export const Menu: FunctionComponent<GenericOverlayProps> = (initialProps) => {
  const props = useOverlayProps(initialProps)

  const { align, target, selectTarget, width = 256, y, x, maxY, maxX } = props

  const [elementRef, position, resize] = useOverlayPosition({
    align,
    y,
    x,
    target,
    selectTarget,
    width,
    maxY,
    maxX,
  })

  const context = useContext(OverlayContext)

  useEffect(() => {
    const x = () => {
      resize()
      setTimeout(() => resize, 200)
    }
    context.current.listeners.add(x)
    return () => {
      context.current.listeners.delete(x)
    }
  }, [context, resize])

  const content = props.content

  return (
    <Shared
      width={props.width}
      ref={elementRef}
      position={position}
      align={align}
    >
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.15s',
          transform: content
            ? 'translate3d(-100%,0px,0px)'
            : `translate3d(0px,0px,0px)`,
        }}
      >
        <div
          style={{
            minWidth: '100%',
          }}
        >
          {React.createElement(props.Component, {
            resize,
            position,
            ...props,
          })}
        </div>
        <div
          style={{
            minWidth: '100%',
          }}
        >
          {content}
        </div>
      </div>
    </Shared>
  )
}
