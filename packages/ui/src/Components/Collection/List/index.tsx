import React, { forwardRef, useEffect } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Header } from '../Header'
import { SelectableCollection } from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { ListItem } from './ListItem'
import { ListProps } from './types'
import { useColor } from '../../../theme'
import { Footer } from '../Footer'

const mem = {}

const getElementType = (paddingTop: number, paddingBottom: number) => {
  const padding = paddingTop + paddingBottom
  if (!(padding in mem)) {
    mem[padding] = forwardRef<any>(({ style, ...rest }: any, ref) => {
      return (
        <div
          ref={ref}
          style={{
            ...style,
            height: `${parseFloat(style.height) + padding}px`,
          }}
          {...rest}
        />
      )
    })
  }
  return mem[padding]
}

export const List = (props: ListProps) => {
  let {
    header,
    footer,
    framed,
    items = [],
    onClick,
    paddingRight = 0,
    paddingLeft = 0,
    paddingTop = 0,
    paddingBottom = 0,
    activeId,
    forceActive,
  } = props

  if (forceActive) {
    forceActive = !activeId && !!items[0]
  }

  useEffect(() => {
    if (forceActive && items[0]) {
      onClick(null, { index: 0, data: items[0], exportData: props.exportData })
    }
  }, [forceActive])

  return (
    <AutoSizer>
      {({ height, width }) => {
        const context = props
        return (
          <SelectableCollection items={items}>
            <>
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
              <FixedSizeList
                width={width}
                style={{
                  paddingTop,
                  paddingBottom,
                  borderBottomLeftRadius: framed && !footer ? 4 : null,
                  borderBottomRightRadius: framed && !footer ? 4 : null,
                  borderLeft: framed
                    ? '1px solid ' + useColor({ color: 'divider' })
                    : null,
                  borderRight: framed
                    ? '1px solid ' + useColor({ color: 'divider' })
                    : null,
                  borderBottom:
                    framed && !footer
                      ? '1px solid ' + useColor({ color: 'divider' })
                      : null,
                }}
                innerElementType={
                  paddingTop || paddingBottom
                    ? getElementType(paddingTop, paddingBottom)
                    : null
                }
                itemCount={items.length}
                height={height - (header ? 48 : 0) - (footer ? 48 : 0)}
                itemData={{ items, context }}
                itemSize={
                  48 + (props.itemProps && props.itemProps.info ? 15 : 0)
                }
                {...useDragScroll(true)}
              >
                {ListItem}
              </FixedSizeList>
              {footer ? (
                <Footer
                  {...footer}
                  items={items}
                  width={width}
                  framed={framed}
                />
              ) : null}
            </>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
  )
}
