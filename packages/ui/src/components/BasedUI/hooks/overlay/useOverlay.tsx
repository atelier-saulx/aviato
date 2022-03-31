import { addOverlay, OnClose, OverlayOptions } from '../../Overlay'
import { PositionProps } from './useOverlayPosition'
import React, { ComponentType, SyntheticEvent, useCallback } from 'react'
import { GenericOverlay, OverlayProps } from '../../Overlay/Shared'
import { PropsEventHandler } from '../../types'

export default function useOverlay<P = any>(
  Component: ComponentType<P>, // hint to geuss from useOverlay
  props?: P,
  positionProps?: PositionProps,
  handler?: (selection: Event | any) => OnClose | undefined,
  Overlay: ComponentType<OverlayProps<P>> = GenericOverlay,
  options: OverlayOptions = { transparent: true }
): PropsEventHandler {
  // maybe remove selectionProps :/
  return useCallback((e: Event | SyntheticEvent, selectionProps) => {
    e.stopPropagation()
    e.preventDefault()
    let cancel: OnClose
    if (handler) {
      cancel = handler(e)
    }
    const reactNode = (
      <Overlay
        Component={Component}
        target={e.currentTarget}
        props={{ ...props, ...selectionProps }}
        positionProps={positionProps}
      />
    )
    addOverlay(
      reactNode,
      () => {
        if (cancel) cancel()
      },
      options
    )
  }, [])
}
