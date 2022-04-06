import {
  ContextOptions,
  Option,
  ContextMultiOptions,
  Value,
} from '../../../Overlay/ContextMenu/ContextOptions'
import { ContextMenu } from '../../../Overlay/ContextMenu'
import { useOverlay } from './useOverlay'
import { PositionProps } from './useOverlayPosition'
import { useCallback, useState } from 'react'
import { PropsEventHandler } from '../../types'
import { hash } from '@saulx/hash'
import { StitchedCSS } from '~/theme'

export function useSelect(
  items: (Option | Value)[] = [],
  initialValue?: Value,
  position?: PositionProps & {
    filterable?: boolean
    placeholder?: string
    css?: StitchedCSS
  },
  handler?: (selection: Event | any) => () => void | undefined
): [string | number | undefined, PropsEventHandler] {
  const [value, setValue] = useState(initialValue)
  let id: number
  const n = items.map((v) => {
    const opt = typeof v === 'object' ? v : { value: v }
    // @ts-ignore
    id = hash(id + opt.value)
    return opt
  })
  return [
    value,
    useOverlay(
      ContextOptions,
      {
        filterable: position?.filterable,
        placeholder: position?.placeholder,
        items: n,
        value,
        onChange: useCallback((value) => {
          setValue(value)
        }, []),
      },
      position,
      handler,
      ContextMenu,
      { transparent: true, css: position?.css },
      [n]
    ),
  ]
}

export function useMultiSelect(
  items: (Option | Value)[] = [],
  initialValues?: Value[],
  position?: PositionProps & {
    filterable?: boolean
    placeholder?: string
    css?: StitchedCSS
  },
  handler?: (selection: Event | any) => () => void | undefined
): [Value[] | null | undefined, PropsEventHandler] {
  const [values, setValues] = useState(initialValues)
  let id: number
  const n = items.map((v) => {
    const opt = typeof v === 'object' ? v : { value: v }
    // @ts-ignore
    id = hash(id + opt.value)
    return opt
  })

  if (!position) {
    position = {}
  }

  // width AUTO
  if (!position.width) {
    position.width = 350
  }

  return [
    values,
    useOverlay(
      ContextMultiOptions,
      {
        filterable: position?.filterable,
        placeholder: position?.placeholder,
        items: n,
        values,
        onChange: useCallback((value) => {
          setValues(value)
        }, []),
      },
      position,
      handler,
      ContextMenu,
      { transparent: true, css: position?.css },
      [n]
    ),
  ]
}
