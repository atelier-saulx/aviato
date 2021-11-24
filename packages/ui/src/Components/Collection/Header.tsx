import React, { FunctionComponent } from 'react'
import { Text } from '../Text'
import { HeaderProps } from './types'
import { useColor } from '../../theme'
import { iconFromString, Expand } from '../../icons'
import renderChildren from '../../util/renderChildren'
import { EditableTitle } from '../Input/EditableTitle'

const Header: FunctionComponent<HeaderProps> = ({
  label,
  children,
  width,
  framed,
  icon,
  items,
  data,
  style,
  weight = 'semibold',
  onEditTitle,
  autoFocusTitle,
  paddingLeft,
  indicator,
  paddingRight,
  noBorderBottom,
  isHover,
  isExpanded,
  onExpand,
  ...props
}) => {
  const Icon = onExpand ? Expand : icon ? iconFromString(icon) : null
  return (
    <div
      style={{
        marginLeft: paddingLeft || 0,
        marginRight: paddingRight || 0,
        display: 'flex',
        alignItems: 'center',
        border: framed ? '1px solid ' + useColor({ color: 'divider' }) : null,
        borderBottom:
          noBorderBottom || (onExpand && !isExpanded)
            ? '1px solid transparent'
            : '1px solid ' + useColor({ color: 'divider' }),
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        height: 48,
        width,
        justifyContent: 'space-between',
        ...style,
      }}
      {...props}
    >
      <div
        style={{
          alignItems: 'center',
          cursor: onExpand ? 'pointer' : null,
          display: 'flex',
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
          padding: 15,
          whiteSpace: 'nowrap',
        }}
        onClick={onExpand || null}
      >
        {onExpand ? (
          <Icon
            style={{
              marginRight: 15,
              marginLeft: 1,
              transition: 'transform',
              transform: `rotate(${isExpanded ? '90deg' : '0deg'})`,
            }}
            color={{ color: 'foreground' }}
          />
        ) : Icon ? (
          <Icon
            style={{ marginRight: 15, marginLeft: 1 }}
            color={{ color: 'foreground' }}
          />
        ) : null}

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {indicator ? (
            <Text
              weight="semibold"
              style={{
                marginRight: onEditTitle ? 0 : 10,
              }}
            >
              {indicator}
            </Text>
          ) : null}
          {onEditTitle ? (
            <EditableTitle
              placeholder="Untitled"
              identifier={data && data.data.id}
              value={label}
              onChange={(value) => onEditTitle(value, data)}
              autoFocus={autoFocusTitle}
            />
          ) : (
            <Text singleLine noSelect weight={weight}>
              {label}
            </Text>
          )}
        </div>
      </div>

      <div
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          paddingRight: 15,
          paddingLeft: 8,
        }}
      >
        {renderChildren(children, { items, data, isHover })}
      </div>
    </div>
  )
}

export { Header }
