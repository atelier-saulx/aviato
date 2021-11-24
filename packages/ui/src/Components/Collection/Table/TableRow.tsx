import React, { useCallback, useRef } from 'react'
import { useColor } from '../../../theme'
import useHover from '../../../hooks/events/useHover'
import { iconFromString, More } from '../../../icons'
import { useSelect, useClick } from '../../../hooks/useSelect'
import useMultiple from '../../../hooks/events/useMultipleEvents'
import useDrag from '../../../hooks/drag/useDrag'
import useContextualMenu from '../../../hooks/events/useContextualMenu'
import RowField from './RowField'

const modifyImageElement = (el) => {
  while (el.children[4]) {
    el.removeChild(el.children[4])
  }
}

const TableRow = (props) => {
  const context = props.data.context
  const { index, data } = props
  const itemData = data.items[index]
  const [hover, isHover] = useHover()
  const ref = useRef()

  const wrappedData = {
    index,
    data: itemData,
    exportData: context.exportData,
  }

  let drag
  if (context.draggable) {
    ;[drag] = useDrag(wrappedData, ref, {
      style: {
        maxWidth: 500,
        backgroundColor: useColor({ color: 'background' }),
      },
      modifyImageElement,
    })
  }

  const [select, isSelected] = useSelect(wrappedData)

  let optionsRef
  if (context.onOptions) {
    optionsRef = useRef()
  }

  const OptionsIcon = context.optionsIcon
    ? iconFromString(context.optionsIcon)
    : More

  return (
    <div
      {...useMultiple(
        hover,
        select,
        context.contextualMenu
          ? useContextualMenu(
              useCallback(
                (e) => {
                  context.onOptions(e, wrappedData)
                },
                [context.onOptions, wrappedData]
              )
            )
          : undefined,
        context.onClick
          ? {
              onClick: useClick(
                (e) => {
                  context.onClick(e, wrappedData)
                },
                [context.onClick, wrappedData]
              ),
            }
          : undefined
      )}
      style={{
        paddingLeft: context.paddingLeft,
        paddingRight: context.paddingRight,
        paddingTop: context.isLarge ? 10 : 5,
        cursor: context.onClick ? 'pointer' : 'default',
        height: context.isLarge ? 80 : 60,
        ...props.style,
      }}
    >
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          height: context.isLarge ? 70 : 55,
          paddingLeft: 8,
          paddingRight: 8,
          borderRadius: 4,
          backgroundColor: isSelected
            ? useColor({ color: 'background', tone: 3 })
            : isHover
            ? useColor({ color: 'background', tone: 2 })
            : null,
        }}
        {...drag}
      >
        {context.itemProps.fields.map((field, index) => {
          return (
            <RowField
              data={data.items[props.index]}
              field={field}
              isLarge={context.large}
              key={index}
            />
          )
        })}
        {context.onOptions ? (
          <div
            ref={optionsRef}
            style={{
              minWidth: 35,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <OptionsIcon
              onClick={useCallback(
                (e) => context.onOptions(e, wrappedData),
                [wrappedData]
              )}
              style={{ minWidth: 35 }}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default TableRow
