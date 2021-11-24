import React, {
  useCallback,
  useReducer,
  FunctionComponent,
  useEffect,
  useRef,
} from 'react'
import { useColor } from '../../theme'
import { Text } from '../Text'
import { ChevronRight as Expand, iconFromString } from '../../icons'
import useHover from '../../hooks/events/useHover'
import { SideMenuItemProps } from './SideMenu'
import useLocation from 'wouter/use-location'
import useTooltip from '../../hooks/overlay/useTooltip'
import useMultipleEvents from '../../hooks/events/useMultipleEvents'

export const SideMenuItem: FunctionComponent<SideMenuItemProps> = ({
  title,
  icon,
  style,
  items,
  onClick,
  checkResize,
  isSmall,
  to,
  inverseColor,
  color,
  active,
  data,
}) => {
  const [hover, isHover] = useHover()
  const [expanded, toggleExpand] = useReducer((v) => !v, false)
  const [, setLocation] = useLocation()
  const ItemIcon = items ? Expand : icon ? iconFromString(icon) : null
  const wasExpanded = useRef(false)

  useEffect(() => {
    if (expanded && !wasExpanded.current) {
      wasExpanded.current = true
      if (checkResize) {
        checkResize()
      }
    } else if (!expanded && wasExpanded.current) {
      wasExpanded.current = false
      if (checkResize) {
        checkResize()
      }
    }
  }, [expanded])

  const tooltip = useTooltip(isSmall ? title : null)

  return (
    <div style={style}>
      <div
        {...useMultipleEvents(hover, tooltip)}
        onClick={useCallback(
          (event) => {
            if (to) {
              setLocation(to)
            }
            if (items) {
              toggleExpand()
            }
            if (onClick) {
              onClick(event, data)
            }
          },
          [onClick, to, !!items, data]
        )}
        style={{
          minHeight: 32,
          paddingLeft: isSmall ? 3 : 8,
          paddingRight: isSmall ? 3 : 8,
          paddingTop: 4,
          paddingBottom: 4,
          display: 'flex',
          marginBottom: 4,
          cursor: 'pointer',
          alignItems: 'center',
          borderRadius: 4,
          transition: 'background 0.15s',
          backgroundColor: isHover
            ? useColor({
                color: inverseColor ? 'foreground' : 'background',
                tone: 3,
              })
            : active
            ? useColor({
                color: inverseColor ? 'foreground' : 'background',
                tone: inverseColor ? 2 : 4,
              })
            : null,
        }}
      >
        {ItemIcon ? (
          <ItemIcon
            size={items ? 24 : 24}
            color={
              color ||
              (active
                ? { color: inverseColor ? 'background' : 'foreground' }
                : {
                    color: inverseColor ? 'background' : 'foreground',
                    tone: 2,
                  })
            }
            style={{
              marginRight: 8,
              transform: expanded ? 'rotate(90deg)' : '',
            }}
          />
        ) : null}
        {isSmall ? null : (
          <Text
            weight="medium"
            singleLine
            noSelect
            color={
              color ||
              (active
                ? { color: inverseColor ? 'background' : 'foreground' }
                : {
                    color: inverseColor ? 'background' : 'foreground',
                    tone: 2,
                  })
            }
          >
            {title}
          </Text>
        )}
      </div>
      {expanded && items ? (
        <div style={{ marginLeft: 14 }}>
          {items.map((v, i) => (
            <SideMenuItem
              inverseColor={inverseColor}
              checkResize={checkResize}
              key={i}
              {...v}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
