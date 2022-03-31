import { addOverlay, OnClose, OverlayOptions } from '../../Overlay'
import {
  GenericOverlay,
  GenericOverlayProps,
} from '../../Overlay/GenericOverlay'
import { PositionProps } from './useOverlayPosition'
import React, {
  ComponentType,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
} from 'react'

// maybe keet it is pretty usefull
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'

// this gone
import { PropsEventHandler } from '../../types'

// make it nice here
export default function useOverlay<P, T = PropsWithChildren<any>>(
  component: ComponentType<P>,
  props?: PropsWithChildren<P & PositionProps>,
  handler?: (selection: Event | any) => OnClose | undefined,
  Overlay: ComponentType<GenericOverlayProps & T> = GenericOverlay,
  options: OverlayOptions = { transparent: true }
): PropsEventHandler {
  const ctx = createOverlayContextRef(props)
  return useCallback(
    (e: Event | SyntheticEvent, selectionProps) => {
      e.stopPropagation()
      e.preventDefault()
      let cancel: OnClose
      if (handler) {
        cancel = handler(e)
      }
      const reactNode = (
        <OverlayContext.Provider value={ctx}>
          <Overlay
            Component={component}
            target={e.currentTarget}
            {...selectionProps}
          />
        </OverlayContext.Provider>
      )
      addOverlay(
        reactNode,
        () => {
          if (cancel) cancel()
        },
        options
      )
    },
    [ctx]
  )
}
