import {
  addOverlay,
  OnClose,
  OverlayOptions,
  GenericOverlay,
  OverlayProps,
} from '~/components/Overlay'
import React, { ComponentType, SyntheticEvent, useCallback } from 'react'
import { PropsEventHandler, PositionProps } from '../../types'
import { hash } from '@saulx/hash'

export function useOverlay<P = any>(
  Component: ComponentType<P>, // hint to geuss from useOverlay
  props?: P,
  positionProps?: PositionProps,
  handler?: (selection: Event | any) => OnClose | undefined,
  Overlay: ComponentType<OverlayProps<P>> = GenericOverlay,
  options: OverlayOptions = { transparent: true },
  callBackRef: null | any[] = null
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
        css={options.css}
      />
    )
    addOverlay(
      reactNode,
      () => {
        if (cancel) cancel()
      },
      options
    )
    return true
  }, callBackRef || [props ? hash(props) : null])
}
