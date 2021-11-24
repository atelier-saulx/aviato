import React, { useEffect } from 'react'
import { FixedSizeGrid } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SelectableCollection } from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import { GridProps } from './types'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { useColor } from '../../../theme'
import GridItem from './GridItem'

export const Grid = (props: GridProps) => {
  const {
    items = [],
    large,
    onClick,
    onOptions,
    optionsIcon,
    header,
    footer,
    framed,
    activeId,
  } = props
  let { forceActive } = props

  if (forceActive) {
    forceActive = !activeId && !!items[0]
  }

  useEffect(() => {
    if (forceActive) {
      onClick(null, { index: 0, data: items[0], exportData: props.exportData })
    }
  }, [forceActive])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <AutoSizer>
        {({ height, width }) => {
          const ratio = 220 / 232
          let w = (large ? 400 : 220) + 16
          const columnCount = Math.floor(width / w)

          // - 4 for scrollbar
          w = Math.min(Math.floor((width - 16) / columnCount) - 4 / columnCount)
          const h = w * ratio + 16
          const context = {
            onOptions,
            optionsIcon,
            onClick,
            large,
            width: w - 16,
            height: h - 16,
            columnCount,
            ...props,
          }
          return (
            <SelectableCollection items={items}>
              {header ? (
                <Header
                  framed={framed}
                  width={width}
                  {...header}
                  items={items}
                />
              ) : null}
              <div
                style={{
                  paddingTop: 8,
                  paddingLeft: 8,
                  paddingRight: 8,
                  width,
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
              >
                <FixedSizeGrid
                  width={width - 9}
                  columnCount={context.columnCount}
                  rowCount={Math.ceil(items.length / context.columnCount)}
                  height={height - 10 - (header ? 48 : 0) - (footer ? 48 : 0)}
                  itemData={{ items, context }}
                  rowHeight={h}
                  columnWidth={w}
                  {...useDragScroll(true)}
                  style={{
                    paddingBottom: 8,
                  }}
                >
                  {GridItem}
                </FixedSizeGrid>
              </div>
              {footer ? (
                <Footer
                  {...footer}
                  items={items}
                  width={width}
                  framed={framed}
                />
              ) : null}
            </SelectableCollection>
          )
        }}
      </AutoSizer>
    </div>
  )
}
