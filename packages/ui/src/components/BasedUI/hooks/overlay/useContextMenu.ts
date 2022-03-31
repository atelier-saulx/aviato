import { ContextMenu } from '../../../Overlay/ContextMenu'
import useOverlay from './useOverlay'
import { PositionProps } from './useOverlayPosition'
import { ComponentType, PropsWithChildren, SyntheticEvent } from 'react'

export default function useContextMenu<P = { [key: string]: any }, T = any>(
  component: ComponentType<PropsWithChildren<{ props: T } & P>>,
  props?: P | PropsWithChildren<P & PositionProps & { props?: T }>,
  handler?: (selection: Event | any) => () => void | undefined
): (
  e: Event | SyntheticEvent,
  selectionProps?: PropsWithChildren<any & { props?: T }>
) => void {
  return useOverlay<P>(component, props, handler, ContextMenu)
}
