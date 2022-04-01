import {
  ContextOptions,
  Option,
  Value,
} from '../../../Overlay/ContextMenu/ContextOptions'
import { ContextMenu } from '../../../Overlay/ContextMenu'
import useOverlay from './useOverlay'
import { PositionProps } from './useOverlayPosition'
import { useCallback, useState } from 'react'
import { PropsEventHandler } from '../../types'
import { hash } from '@saulx/hash'

export function useSelect(
  items: (Option | Value)[] = [],
  initialValue?: Value,
  position?: PositionProps,
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
        items: n,
        value,
        onChange: useCallback((value) => {
          setValue(value)
        }, []),
      },
      position,
      handler,
      ContextMenu,
      { transparent: true },
      [n]
    ),
  ]
}

// export function useMultiSelect<P = { [key: string]: any }>(
//   component: ComponentType<PropsWithChildren<P>>,
//   props?: P | PropsWithChildren<P>,
//   position?: PositionProps,
//   handler?: (selection: Event | any) => () => void | undefined
// ): PropsEventHandler {
//   return useOverlay<P>(component, props, position, handler, ContextMenu)
// }
