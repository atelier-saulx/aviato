import React, { FunctionComponent } from 'react'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { SelectableCollection } from '../../../hooks/useSelect'
import useDragScroll from '../../../hooks/drag/useDragScroll'
import TableRow from './TableRow'
import Fields from './Fields'
import { TableProps } from './types'
import getFieldSizes from './getFieldSizes'

export const Table: FunctionComponent<TableProps> = (props) => {
  return (
    // <div
    //   style={{
    //     width: '100%',
    //     paddingLeft: props.paddingLeft === undefined ? 40 : props.paddingLeft,
    //     paddingRight:
    //       props.paddingRight === undefined ? 40 : props.paddingRight,
    //     height: '100%',
    //   }}
    // >
    <AutoSizer>
      {({ height, width }) => {
        const itemProps = getFieldSizes(
          width,
          props.itemProps,
          props.onOptions,
          true
        )
        const context = {
          paddingLeft: 32,
          paddingRight: 32,
          ...props,
          itemProps,
        }
        return (
          <SelectableCollection items={props.items}>
            <Fields onChange={props.onChange} width={width} context={context} />
            <FixedSizeList
              width={width}
              itemCount={props.items ? props.items.length : 0}
              height={height - 49}
              itemData={{ context, items: props.items }}
              itemSize={props.large ? 80 : 60}
              {...useDragScroll(true)}
              onScroll={
                props.onScroll ? (e) => props.onScroll(e, height) : null
              }
            >
              {TableRow}
            </FixedSizeList>
          </SelectableCollection>
        )
      }}
    </AutoSizer>
    // </div>
  )
}
