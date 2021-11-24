import React, {
  useRef,
  useCallback,
  CSSProperties,
  FunctionComponent,
} from 'react'
import { useColor } from '../../../theme'
import { Text } from '../../Text'
import useHover from '../../../hooks/events/useHover'
import Info from './Info'
import { Settings, iconFromString } from '../../../icons'
import useDrag from '../../../hooks/drag/useDrag'
import useDrop from '../../../hooks/drag/useDrop'
import { useSelect, useClick } from '../../../hooks/useSelect'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import useContextualMenu from '../../../hooks/events/useContextualMenu'
import getData from '../getData'
import { Image } from './Image'
import { Title } from '../../Text/Title'

const defaultitemProps = {
  title: {
    path: ['title'],
  },
}

type DataProps = {
  items: any
  context: {
    columnCount: any
    onClick: any
    height: any
    optionsIcon: any
    width: any
    exportData: any
    Graphic: any
    onDrop: any
    onOptions: any
    large: any
    itemProps: any
    activeId: any
    contextualMenu: any
  }
}

export type GridItemProps = {
  style: CSSProperties
  columnIndex: number
  rowIndex: number
  data: DataProps
}

const GridItem: FunctionComponent<GridItemProps> = ({
  style,
  columnIndex,
  rowIndex,
  data: { items, context },
}) => {
  let {
    columnCount,
    onClick,
    height,
    optionsIcon,
    width,
    exportData,
    Graphic,
    onDrop,
    onOptions,
    large,
    itemProps,
    activeId,
  } = context

  const index = columnIndex + rowIndex * columnCount
  const itemData = items[index]

  if (!itemData) {
    return null
  }

  if (!itemProps) {
    itemProps = defaultitemProps
  }

  const textProps = itemProps.text
  const titleProps = itemProps.title || defaultitemProps.title
  const iconName = itemProps.icon && getData(itemData, itemProps.icon.path)
  const img = itemProps.img && getData(itemData, itemProps.img.path)
  const title = titleProps.format
    ? {
        format: titleProps.format,
        value: getData(itemData, titleProps.path),
      }
    : getData(itemData, titleProps.path)

  const text = textProps
    ? textProps.format
      ? {
          format: textProps.format,
          value: getData(itemData, textProps.path),
        }
      : getData(itemData, textProps.path)
    : undefined

  const info =
    itemProps.info &&
    (itemProps.info.format
      ? {
          format: itemProps.info.format,
          value: getData(itemData, itemProps.info.path),
        }
      : getData(itemData, itemProps.info.path))
  const id = itemProps.id ? getData(itemData, itemProps.id) : index

  const wrappedData = {
    index,
    data: itemData,
    exportData,
  }

  const isActive = activeId === id

  const TextComponent = large ? Title : Text

  const hasGraphic = itemProps.img || Graphic

  const [hover, isHover] = useHover()
  const ref = useRef()
  const [drag, isDragging] = useDrag(wrappedData, ref)
  const [select, isSelected] = useSelect(wrappedData)

  const [drop, isDragOver] = useDrop(
    useCallback(
      (event, { files, data }) => {
        if (onDrop) {
          if (data && data.length) {
            const oldIndex = data[0].index
            const newIndex = index > oldIndex ? index - 1 : index
            return onDrop(event, {
              targetIndex: newIndex || index,
              data,
            })
          } else if (files) {
            return onDrop(event, { files, targetIndex: index })
          }
        }
      },
      [index, items]
    ),
    { readFiles: true }
  )

  const Icon = iconName ? iconFromString(iconName) : null

  const OptionsIcon = optionsIcon
    ? typeof optionsIcon === 'string'
      ? iconFromString(optionsIcon)
      : optionsIcon
    : Settings

  return (
    <div
      style={{
        padding: 8,
        ...style,
      }}
    >
      <div
        ref={ref}
        style={{
          height,
          opacity: isDragging ? 0.5 : 1,
          width,
          display: 'flex',
          transform: isDragOver
            ? large
              ? 'scale(0.98)'
              : 'scale(0.96)'
            : 'scale(1.0)',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'transform 0.15s',
          border:
            '1px solid ' +
            useColor({
              tone: isHover ? 3 : 1,
              color:
                isSelected || isActive
                  ? 'primary'
                  : isHover
                  ? 'foreground'
                  : 'divider',
            }),
          borderRadius: 4,
        }}
        {...useMultipleEvents(
          drop,
          hover,
          drag,
          select,
          onClick
            ? {
                onClick: useClick(
                  (e) => {
                    onClick(e, wrappedData)
                  },
                  [onClick, itemData, index]
                ),
              }
            : undefined,
          onOptions && context.contextualMenu
            ? useContextualMenu(
                useCallback(
                  (event) => {
                    onOptions(event, wrappedData)
                  },
                  [wrappedData]
                )
              )
            : undefined
        )}
      >
        <>
          <div
            style={{
              flex: hasGraphic ? 1 : 0,
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {Graphic ? (
              <Graphic
                isHover={isHover}
                isDragging={isDragging}
                isDragOver={isDragOver}
                isSelected={isSelected}
                isActive={isActive}
                onOptions={onOptions}
                onClick={onClick}
                data={wrappedData}
                items={items}
              />
            ) : itemProps.img ? (
              <Image src={img} />
            ) : null}

            {onOptions ? (
              <OptionsIcon
                color={{
                  color: 'foreground',
                }}
                onClick={useCallback(
                  (e) => onOptions(e, wrappedData),
                  [itemData, index]
                )}
                style={{
                  opacity: isHover ? 1 : 0,
                  transition: 'opacity 0.15s',
                  position: 'absolute',
                  top: 10,
                  right: 15,
                }}
              />
            ) : null}
          </div>
          <div
            style={{
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              padding: 16,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: itemProps.icon && itemProps.icon.framed ? 5 : 0,
              }}
            >
              {Icon ? (
                <Icon
                  {...itemProps.icon}
                  style={{
                    marginRight: itemProps.icon.framed ? 12 : 8,
                    marginLeft: itemProps.icon.framed ? 0 : -3,
                  }}
                />
              ) : null}

              <TextComponent weight="medium" noSelect>
                {title}
              </TextComponent>
            </div>

            {itemProps.info ? <Info data={info} /> : null}

            {!hasGraphic && itemProps.text ? (
              <div
                style={{
                  marginTop: 8,
                  marginBottom: 8,
                }}
              >
                <Text>
                  {text && text.length > 1e3
                    ? text.slice(0, 1000) + '...'
                    : text}
                </Text>
              </div>
            ) : null}
          </div>
        </>
      </div>
    </div>
  )
}

export default GridItem
