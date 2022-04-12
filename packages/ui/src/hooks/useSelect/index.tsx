import {
  ContextOptions,
  Option,
  ContextMultiOptions,
  Value,
  ContextMenu,
} from '~/components/Overlay'
import { useOverlay } from '../useOverlay'
import { useCallback, useState, useEffect } from 'react'
import { PropsEventHandler, PositionProps } from '~/types'
import { hash } from '@saulx/hash'
import { StitchedCSS } from '~/theme'

export function useSelect(
  items: (Option | Value)[] = [],
  value?: Value,
  position?: PositionProps & {
    filterable?: boolean | 'create'
    placeholder?: string
    css?: StitchedCSS
  },
  handler?: (selection: Event | any) => () => void | undefined
): [string | number | undefined, PropsEventHandler, (value: Value) => void] {
  const [v, setValue] = useState(value)
  useEffect(() => {
    setValue(value)
  }, [value])
  let id: number
  const n = items.map((v) => {
    const opt = typeof v === 'object' ? v : { value: v }
    // @ts-ignore
    id = hash(id + opt.value)
    return opt
  })
  return [
    v,
    useOverlay(
      ContextOptions,
      {
        filterable: position?.filterable,
        placeholder: position?.placeholder,
        items: n,
        value: v,
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
    setValue,
  ]
}

export function useMultiSelect(
  items: (Option | Value)[] = [],
  initialValues?: Value[],
  position?: PositionProps & {
    filterable?: boolean | 'create'
    placeholder?: string
    css?: StitchedCSS
  },
  handler?: (selection: Event | any) => () => void | undefined
): [
  Value[] | null | undefined,
  PropsEventHandler,
  (value: Value[] | undefined) => void
] {
  const [values, setValues] = useState(initialValues)
  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])
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
    setValues,
  ]
}
