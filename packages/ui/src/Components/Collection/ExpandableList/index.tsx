import React, { FunctionComponent, useReducer, useCallback } from 'react'
import { Text } from '../../Text'
import { useColor } from '../../../theme'
import { ExpandableListProps } from './types'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Header } from '../Header'
import { Expand, iconFromString, Settings } from '../../../icons'
import getData from '../getData'
import useHover from '../../../hooks/events/useHover'
import renderChildren from '../../../util/renderChildren'
import '@compiled/react'

const defaultitemProps = {
  title: {
    path: ['title'],
  },
}

type ExpandableItemProps = {
  context: any
  paddingItemLeft: any
  item: any
  index: number
}

export const ExpandableItem: FunctionComponent<ExpandableItemProps> = ({
  context,
  paddingItemLeft,
  item,
  index,
}) => {
  const itemProps = context.itemProps || defaultitemProps
  const [hover, isHover] = useHover()
  const [isExpanded, setExpanded] = useReducer((x) => !x, false)
  const { onOptions, options, optionsIcon, items, isNested, onClick } = context

  const wrappedData = {
    data: item,
    index,
  }

  const iconDef = itemProps.icon && getData(item, itemProps.icon.path)

  const titleProps = itemProps.title || defaultitemProps.title
  const title = titleProps.format
    ? {
        format: titleProps.format,
        value: getData(item, titleProps.path),
      }
    : getData(item, titleProps.path)

  let iconName
  let iconProps

  if (iconDef && typeof iconDef === 'object') {
    iconName = iconDef.name
    iconProps = iconDef
  } else if (iconDef) {
    iconName = iconDef
    iconProps = itemProps.icon
  }

  const Icon = iconName ? iconFromString(iconName) : null
  const OptionsIcon = optionsIcon ? iconFromString(optionsIcon) : Settings
  const hasExpand = !isNested || isNested(wrappedData)

  return (
    <div>
      <div
        {...hover}
        style={{
          paddingLeft: paddingItemLeft,
          borderBottom: '1px solid ' + useColor({ color: 'divider' }),
          backgroundColor: isHover
            ? useColor({ color: 'background', tone: 2 })
            : null,
        }}
        css={{
          height: 56,
          display: 'flex',
          cursor: 'pointer',
          alignItems: 'center',
          paddingTop: 16,
          paddingBottom: 16,
        }}
        onClick={(event) => {
          if (!isNested || isNested(wrappedData)) {
            setExpanded()
          } else if (onClick) {
            onClick(event, wrappedData)
          }
        }}
      >
        {hasExpand ? (
          <Expand
            style={{
              transition: 'transform 0.1s',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
            color={{ color: 'foreground' }}
          />
        ) : (
          <div css={{ width: 24 }} />
        )}
        {Icon ? <Icon style={{ marginLeft: 20 }} {...iconProps} /> : null}
        <Text
          noSelect
          weight={isExpanded ? 'medium' : itemProps.title.weight || 'medium'}
          singleLine
          style={{
            marginLeft: 16,
          }}
        >
          {title}
        </Text>
        <div
          css={{
            flexGrow: 1,
            paddingRight: 15,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          {onOptions ? (
            <OptionsIcon
              color={{ color: 'foreground', opacity: isHover ? 0.5 : 0 }}
              onClick={useCallback(
                (e) => {
                  e.stopPropagation()
                  onOptions(e, wrappedData)
                },
                [wrappedData]
              )}
              style={{
                width: 35,
                paddingLeft: 7.5,
              }}
            />
          ) : null}

          {options && options.children
            ? renderChildren(options.children, {
                isHover,
                isDragging: false,
                isDragOver: false,
                isSelected: false,
                isActive: false,
                onOptions: onOptions,
                data: wrappedData,
                items,
              })
            : null}
        </div>
      </div>

      {isExpanded
        ? renderChildren(context.children, {
            data: wrappedData,
            ...context,
          })
        : null}
    </div>
  )
}

export const ExpandableList: FunctionComponent<ExpandableListProps> = (
  props
) => {
  const {
    header,
    items,
    framed,
    className,
    style,
    paddingRight,
    paddingLeft,
    autoSize = true,
  } = props
  return autoSize ? (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <div
            style={style}
            css={{
              paddingLeft,
              width,
              height,
            }}
          >
            {header ? (
              <Header
                framed={framed}
                width={width}
                {...header}
                paddingRight={paddingRight}
                paddingLeft={paddingLeft}
                items={items}
              />
            ) : null}

            <div
              style={{
                width,
                height: height - (header ? 48 : 0),
              }}
              css={{
                overflowY: 'auto',
                overflowX: 'hidden',
              }}
            >
              {items.map((item, index) => {
                return (
                  <ExpandableItem
                    paddingItemLeft={props.paddingItemLeft}
                    key={`ExpandableItem-${index}`}
                    context={props}
                    item={item}
                    index={index}
                  />
                )
              })}
            </div>
          </div>
        )
      }}
    </AutoSizer>
  ) : (
    <div style={{ paddingLeft, ...style }} className={className}>
      {header ? (
        <Header
          framed={framed}
          width="100%"
          {...header}
          paddingRight={paddingRight}
          paddingLeft={paddingLeft}
          items={items}
        />
      ) : null}

      {items.map((item, index) => {
        return (
          <ExpandableItem
            paddingItemLeft={props.paddingItemLeft}
            key={`ExpandableItem-${index}`}
            context={props}
            item={item}
            index={index}
          />
        )
      })}
    </div>
  )
}
