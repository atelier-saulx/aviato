import { addOverlay, OnClose, removeOverlay } from '../../Components/Overlay'
import { PositionPropsFnOptional } from './useOverlayPosition'
import { OverlayContext, createOverlayContextRef } from './useOverlayProps'
import { GenericOverlay } from '../../Components/Overlay/GenericOverlay'

import React, {
  PropsWithChildren,
  useCallback,
  ReactChild,
  ReactChildren,
  ReactNode,
  useEffect,
} from 'react'

import { DataEventHandler } from '../../types'
import { TextValue } from '../../textParser'

export type TooltipEvents = {
  onMouseEnter: DataEventHandler
}

export default function useTooltip(
  children: ReactChild | ReactChildren[] | TextValue,
  props: PropsWithChildren<
    PositionPropsFnOptional & { initialTimer?: number }
  > = {},
  handler?: (selection: Event | any) => OnClose | undefined
): TooltipEvents {
  const ctx = createOverlayContextRef({ children, ...props })

  useEffect(() => {
    if (ctx.current.timer) {
      clearTimeout(ctx.current.timer)
    }
  }, [])

  return {
    onMouseEnter: useCallback(
      (e, data) => {
        // @ts-ignore
        if (
          ctx.current &&
          ctx.current.props &&
          ctx.current.props.children === null
        ) {
          return null
        }

        let cancel: OnClose
        let tooltip: ReactNode
        if (handler) {
          cancel = handler(e)
        }
        const target = e.currentTarget
        const removeListeners = () => {
          clearTimeout(ctx.current.timer)
          target.removeEventListener('mouseleave', leave)
          target.removeEventListener('click', leave)
        }
        const leave = () => {
          removeListeners()
          clearTimeout(ctx.current.timer)
          if (tooltip) removeOverlay(tooltip)
        }
        target.addEventListener('mouseleave', leave)
        target.addEventListener('click', leave)
        ctx.current.timer = setTimeout(() => {
          tooltip = (
            <OverlayContext.Provider value={ctx}>
              <GenericOverlay target={target} {...props} {...data}>
                {children}
              </GenericOverlay>
            </OverlayContext.Provider>
          )
          addOverlay(
            tooltip,
            () => {
              removeListeners()
              if (cancel) cancel()
            },
            { overlay: false }
          )
        }, props.initialTimer || 500)
      },
      [ctx]
    ),
  }
}
