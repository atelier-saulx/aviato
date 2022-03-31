import { ContextMenu } from '../../../Overlay/ContextMenu'
import useOverlay from './useOverlay'
import { PositionProps } from './useOverlayPosition'
import { ComponentType, PropsWithChildren, SyntheticEvent } from 'react'

export default function useContextMenu<P = { [key: string]: any }>(
  component: ComponentType<PropsWithChildren<P>>,
  props?: P | PropsWithChildren<P>,
  position?: PositionProps,
  handler?: (selection: Event | any) => () => void | undefined
): (e?: Event | SyntheticEvent, selectionProps?: PropsWithChildren<P>) => void {
  return useOverlay<P>(component, props, position, handler, ContextMenu)
}
