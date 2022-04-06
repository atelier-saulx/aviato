import { ContextMenu } from '../../components/Overlay/ContextMenu'
import { useOverlay } from '../useOverlay'
import { PositionProps, PropsEventHandler } from '~/types'
import { ComponentType, PropsWithChildren } from 'react'
import { StitchedCSS } from '~/theme'

export function useContextMenu<P = { [key: string]: any }>(
  component: ComponentType<PropsWithChildren<P>>,
  props?: P | PropsWithChildren<P>,
  position?: PositionProps & { css?: StitchedCSS },
  handler?: (selection: Event | any) => () => void | undefined
): PropsEventHandler {
  return useOverlay<P>(component, props, position, handler, ContextMenu, {
    transparent: true,
    css: position?.css,
  })
}
