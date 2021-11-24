import React, { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { VariableSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { SelectableCollection } from '../../../hooks/useSelect'
import { Footer } from '../Footer'
import { ListItem } from '../List/ListItem'
import { Header } from '../Header'
import useDrop from '../../../hooks/drag/useDrop'
import useDrag from '../../../hooks/drag/useDrag'
import useMultipleEvents from '../../../hooks/events/useMultipleEvents'
import { FlowProps } from './types'
import { useColor } from '../../../theme'
import useHover from '../../../hooks/events/useHover'
import { Loader } from '../../Loader/Loader'
import getData from '../getData'
import '@compiled/react'

type FooterBottomProps = {
  context: any
  seqItems: any
  isDragOver: any
  isDragOverSeq: any
  isDropLoading: any
  index: any
  wrappedData: any
}

export const FooterBottom: FunctionComponent<FooterBottomProps> = ({
  context,
  seqItems,
  isDragOver,
  isDragOverSeq,
  isDropLoading,
  index,
  wrappedData,
}) => {
  const [drop, isFooterDragOver, isFooterLoading] = useDrop(
    useCallback(
      (e, { files, data }) => {
        const index = wrappedData.data.items.length
        if (data && data.length) {
          return context.onDrop(e, {
            targetIndex: index,
            data,
          })
        } else if (files) {
          return context.onDrop(e, { files, targetIndex: index })
        }
      },
      [context.onDrop, seqItems, wrappedData]
    ),
    { readFiles: true }
  )

  const footer = { ...context.stepFooter }

  if (context.expandable) {
    if (context.stepFooter.onClick) {
      footer.onClick = (...args) => {
        if (context.expanded[index]) {
          context.updateExpandList(index)
        }
        context.stepFooter.onClick(...args)
      }
    }
  }

  return (
    <div
      {...drop}
      css={{
        position: 'relative',
      }}
    >
      <div
        css={{
          top: 0,
          paddingTop: 15,
          left: 0,
          right: 0,
          position: 'absolute',
        }}
        style={{
          borderBottom: isFooterDragOver ? '2px solid blue' : null,
          borderLeft: '1px solid ' + useColor({ color: 'divider' }),
          borderRight: '1px solid ' + useColor({ color: 'divider' }),
        }}
      />
      <Footer
        framed
        items={seqItems}
        {...footer}
        data={wrappedData}
        css={{
          transition: 'opacity 0.15s, transform 0.2s',
        }}
        style={{
          opacity: isDragOver || isFooterDragOver ? 0 : 1,
          transform:
            isDragOverSeq ||
            isDropLoading ||
            isFooterDragOver ||
            isFooterLoading
              ? 'translate3d(0px, 20px, 0px)'
              : isDragOver
              ? 'translate3d(0px, 40px, 0px)'
              : 'translate3d(0px, 0px, 0px)',
        }}
      />
    </div>
  )
}

const DragSeqLine = ({ index, width, onDropSequence, context }) => {
  if (onDropSequence) {
    const [dropSeq, isDragOverSeq, isDropLoading] = useDrop(
      useCallback(
        (e, { files, data }) => {
          if (data[0]) {
            if (data[0].index > index) {
              index = index + 1
            }
            return onDropSequence(e, {
              // todo clean
              targetIndex: index,
              data,
              files,
              items: context.items,
            })
          }
        },
        [index, onDropSequence]
      )
    )
    return (
      <div
        style={{
          top: 0,
          left: 0,
          paddingLeft: 10,
          paddingRight: 15,
          width:
            width - (context.paddingLeft || 0) - (context.paddingRight || 0),
          position: 'absolute',
          height: 35,
        }}
        // @ts-ignore
        {...dropSeq}
      >
        <div
          style={{
            pointerEvents: 'none',
            marginTop: 16.5,
            opacity: isDragOverSeq ? 1 : 0,
            transition: 'opacity 0.2s',
            width: '100%',
            borderTop: '2px solid ' + useColor({ color: 'primary' }),
          }}
        />
        {isDropLoading ? (
          <div
            style={{
              position: 'absolute',
              height: 0,
              left: 0,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: 16,
            }}
          >
            <Loader size={18} color={{ color: 'primary' }} />
          </div>
        ) : null}
      </div>
    )
  }
  return null
}

const defaultItemProps = {
  title: { path: ['title'] },
  items: { path: ['items'] },
}

const Sequence = ({ style, data: { items, context, width }, index }) => {
  const itemData = items[index]

  if (!itemData) {
    return null
  }

  if (itemData['@@newSequence']) {
    let onClick = context.footer.onClick
    if (
      context.footer.onClick &&
      context.header &&
      context.header.onEditTitle
    ) {
      onClick = async (e, data) => {
        // allow expand in here
        // maybe add on autofocus ref

        context.autoFocusRef.current = true
        // where to put this...
        setTimeout(() => {
          context.autoFocusRef.current = false
        }, 500)
        await context.footer.onClick(e, data)
      }
    }

    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
          paddingBottom: 35,
          paddingTop: index === 0 ? context.paddingTop : 0,
        }}
      >
        <Footer
          framed
          floating
          items={items}
          data={{ data: { items: items.slice(0, -1) } }}
          {...context.footer}
          onClick={onClick}
        />
      </div>
    )
  } else {
    const [hover, isHover] = useHover()

    const wrappedData = {
      exportData: context.exportDataSequence,
      index,
      data: itemData,
    }

    if (context.onDrop) {
      const onDrop = context.onDrop
      context = {
        ...context,
        onDrop: useCallback(
          (e, d) => {
            return onDrop(e, { ...d, targetData: itemData })
          },
          [onDrop, itemData]
        ),
      }
    }

    const [drag, isDragging] =
      context.draggable !== false ? useDrag(wrappedData) : [{}, false]
    const [drop, isDragOver] =
      context.draggable !== false ? useDrop() : [{}, false]

    let dropSeq, isDragOverSeq, isDropLoading
    if (index === 0 && context.onDropSequence && context.draggable !== false) {
      ;[dropSeq, isDragOverSeq, isDropLoading] = useDrop(
        useCallback(
          (e, { files, data }) => {
            return context.onDropSequence(e, {
              targetIndex: 0,
              data,
              files,
              items,
            })
          },
          [index, context.onDropSequence]
        )
      )
    }

    const itemProps = context.seqItemProps || defaultItemProps

    const titleProps = itemProps.title || defaultItemProps.title
    const nestedItemProps = itemProps.items || defaultItemProps.items

    const iconName = itemProps.icon && getData(itemData, itemProps.icon.path)
    const title = titleProps.format
      ? {
          format: titleProps.format,
          value: getData(itemData, titleProps.path),
        }
      : getData(itemData, titleProps.path)

    const isExpanded =
      !context.expandable ||
      (context.expandable
        ? context.defaultIsExpanded
          ? !context.expanded[wrappedData.index]
          : context.expanded[wrappedData.index]
        : null)

    const seqItems = getData(itemData, nestedItemProps.path) || []

    const isLast = index === items.length - 2

    const useAutoFocus = context.autoFocusRef.current === true && isLast

    return (
      <div
        style={{
          ...style,
          paddingLeft: context.paddingLeft,
          paddingRight: context.paddingRight,
        }}
        {...hover}
      >
        <div
          style={{
            paddingTop: index === 0 ? context.paddingTop : 0,
            height: style.height - 35 - 48,
          }}
        >
          {/* @ts-ignore */}
          <div
            {...useMultipleEvents(drag, dropSeq)}
            style={{
              position: 'relative',
            }}
          >
            {dropSeq ? (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    pointerEvents: 'none',
                    opacity: isDragOverSeq ? 1 : 0,
                    transition: 'opacity 0.2s',
                    width: '100%',
                    borderTop: '2px solid ' + useColor({ color: 'primary' }),
                  }}
                />
                {isDropLoading ? (
                  <div
                    style={{
                      position: 'absolute',
                      height: 0,
                      left: 0,
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      top: 0,
                    }}
                  >
                    <Loader size={18} color={{ color: 'primary' }} />
                  </div>
                ) : null}
              </div>
            ) : null}
            <div
              style={{
                opacity: isDragging ? 0.5 : 1,
                height: 48,
                transition: 'opacity 0.15s, transform 0.2s',
                transform:
                  isDragOverSeq || isDropLoading
                    ? 'translate3d(0px, 20px, 0px)'
                    : 'translate3d(0px, 0px, 0px)',
              }}
            >
              <Header
                {...context.header}
                // how do i know if something is just created...
                data={wrappedData}
                items={items}
                framed
                indicator={context.indicator ? `${index + 1}.` : ''}
                label={itemData.name === 'New sequence' ? '' : title}
                isExpanded={isExpanded}
                onExpand={
                  context.expandable
                    ? useCallback(() => {
                        context.updateExpandList(index)
                      }, [index])
                    : null
                }
                icon={iconName || 'newFlow'}
                isHover={isHover}
                autoFocusTitle={useAutoFocus}
                noBorderBottom={
                  wrappedData.data &&
                  wrappedData.data.items &&
                  wrappedData.data.items.length === 0
                }
              />
            </div>
          </div>
          <div
            style={{
              transform:
                isDragOverSeq || isDropLoading
                  ? 'translate3d(0px, 20px, 0px)'
                  : 'translate3d(0px, 0px, 0px)',
              transition: 'opacity 0.15s, transform 0.2s',
              borderLeft: '1px solid ' + useColor({ color: 'divider' }),
              borderRight: '1px solid ' + useColor({ color: 'divider' }),
              borderBottom: context.stepFooter
                ? null
                : '1px solid ' + useColor({ color: 'divider' }),
              borderBottomLeftRadius: context.stepFooter ? null : '4px',
              borderBottomRightRadius: context.stepFooter ? null : '4px',
            }}
            {...drop}
          >
            {isExpanded ? (
              <SelectableCollection items={seqItems}>
                {itemData.items &&
                  itemData.items.map((_data, index) => {
                    const s = {
                      position: 'relative',
                    }
                    return (
                      <ListItem
                        key={index}
                        data={{ items: seqItems, context }}
                        index={index}
                        styleOverride={s}
                      />
                    )
                  })}
              </SelectableCollection>
            ) : null}
          </div>
        </div>
        {context.stepFooter ? (
          <FooterBottom
            index={index}
            context={context}
            seqItems={seqItems}
            isDragOver={isDragOver}
            isDragOverSeq={isDragOverSeq}
            isDropLoading={isDropLoading}
            wrappedData={wrappedData}
          />
        ) : null}
        {context.draggable !== false ? (
          <>
            <div
              style={{
                position: 'relative',
              }}
            >
              <DragSeqLine
                onDropSequence={context.onDropSequence}
                index={index}
                context={context}
                width={width}
              />
            </div>
          </>
        ) : null}
      </div>
    )
  }
}

export const Flow = (props: FlowProps) => {
  const { items = [], footer, paddingTop = 0, paddingBottom = 0 } = props
  const autoFocusRef = useRef()
  const itemsWithNew = footer
    ? [
        ...items,
        {
          '@@newSequence': true,
        },
      ]
    : items

  const listRef = useRef<any>()

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0)
    }
  }, [items])

  const expandedRef = useRef({ cnt: (~~(1000 * Math.random())).toString(16) })

  const updateExpandList = (action) => {
    expandedRef.current[action] = !expandedRef.current[action]
    listRef.current.resetAfterIndex(action)
  }

  const expanded = expandedRef.current
  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <VariableSizeList
            ref={listRef}
            width={props.width || width}
            style={{
              paddingTop,
              paddingBottom,
              overflowX: 'hidden',
            }}
            itemCount={itemsWithNew.length}
            height={height}
            itemData={{
              items: itemsWithNew,
              context: {
                autoFocusRef,
                showIndex: true,
                ...props,
                updateExpandList,
                expanded,
                seqItemProps: props.itemProps,
                itemProps: props.itemProps
                  ? props.itemProps.items
                    ? props.itemProps.items.props
                    : undefined
                  : undefined,
              },
              width,
            }}
            itemSize={(index) => {
              let x = 48 + 35
              if (index === 0 && paddingTop) {
                x += paddingTop
              }

              const data = itemsWithNew[index]

              if (index === itemsWithNew.length - 1) {
                x += paddingBottom
              }

              if (data['@@newSequence']) {
                return x
              }

              if (props.stepFooter) {
                x += 48
              }

              if (props.sequenceSpacing) {
                x += props.sequenceSpacing
              }

              const selectItems =
                (props.itemProps && props.itemProps.items) ||
                defaultItemProps.items

              const items = getData(data, selectItems.path)

              if (
                !props.expandable ||
                (props.defaultIsExpanded ? !expanded[index] : expanded[index])
              ) {
                return (items ? items.length : 0) * 48 + x
              }
              return x
            }}
            {...useDragScroll(true)}
          >
            {Sequence}
          </VariableSizeList>
        )
      }}
    </AutoSizer>
  )
}
