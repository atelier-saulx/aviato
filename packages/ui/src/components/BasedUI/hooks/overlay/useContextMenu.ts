import { ContextMenu } from '../../../Overlay/ContextMenu'
import useOverlay from './useOverlay'
import { PositionProps } from './useOverlayPosition'
import { ComponentType, PropsWithChildren } from 'react'
import { PropsEventHandler } from '../../types'
import { StitchedCSS } from '~/theme'

export default function useContextMenu<P = { [key: string]: any }>(
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
