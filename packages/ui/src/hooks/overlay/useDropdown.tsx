import { addOverlay, removeOverlay } from '../../Components/Overlay'
import {
  Dropdown,
  DropdownOption,
  dropdownOptionIsEqual,
} from '../../Components/Overlay/Dropdown'
import { PositionProps } from './useOverlayPosition'
import React, { SyntheticEvent, useCallback } from 'react'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'
import { DataEventHandler } from '../../types'

export type OnSelect = (
  value: DropdownOption | DropdownOption[],
  index: number | number[],
  e?: Event | SyntheticEvent
) => void

const findOptionIndex = (
  options: DropdownOption[],
  option: DropdownOption
): number => {
  return options.findIndex((o) => {
    return dropdownOptionIsEqual(option, o)
  })
}

export default (
  items: DropdownOption[],
  onSelect: OnSelect,
  value?: DropdownOption | DropdownOption[] | undefined,
  props: PositionProps & {
    registerDoubleClick?: boolean
    multi?: boolean
    filter?: boolean
  } = {},
  handler?: () => () => void
): DataEventHandler => {
  const ctx = createOverlayContextRef({
    value,
    items,
    ...props,
  })

  return useCallback(
    (e, extraProps) => {
      e.preventDefault()
      e.stopPropagation()
      const cancel = handler && handler()
      const dropdown = (
        <OverlayContext.Provider value={ctx}>
          <Dropdown
            filter={props.filter}
            value={value}
            // @ts-ignore
            target={e.currentTarget}
            items={items}
            onChange={(option, index, e) => {
              if (ctx.current.props.multi) {
                let value = ctx.current.props.value
                if (!Array.isArray(value)) {
                  value = []
                }
                const index = findOptionIndex(value, option)
                value = [...value]
                if (index !== -1) {
                  value.splice(index, 1)
                } else {
                  value.push(option)
                }
                const res = onSelect(
                  value,
                  value.map((v) => findOptionIndex(ctx.current.props.items, v)),
                  e
                )
                if (Array.isArray(res)) {
                  value = res
                }
                ctx.current.update({ ...ctx.current.props, value })
              } else {
                removeOverlay(dropdown)
                ctx.current.update({ ...ctx.current.props, value: option })
                onSelect(option, index, e)
              }
            }}
            {...props}
            {...extraProps}
          />
        </OverlayContext.Provider>
      )
      addOverlay(dropdown, cancel, { transparent: true })
      return true
    },
    [ctx]
  )
}
