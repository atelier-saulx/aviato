import React, { useContext, useEffect, FC } from 'react'
import useOverlayPosition from '../../BasedUI/hooks/overlay/useOverlayPosition'
import useOverlayProps, {
  OverlayContext,
} from '../../BasedUI/hooks/overlay/useOverlayProps'
import Shared from '../../BasedUI/Overlay/Shared'
import { GenericOverlayProps } from '../../BasedUI/Overlay/GenericOverlay'

export const ContextMenu: FC<GenericOverlayProps> = (initialProps) => {
  const props = useOverlayProps(initialProps)

  const { align, target, selectTarget, width = 256, y, x, maxY, maxX } = props

  const [elementRef, position, resize] = useOverlayPosition({
    align,
    y,
    x,
    target,
    selectTarget,
    width,
    maxY,
    maxX,
  })

  const context = useContext(OverlayContext)

  useEffect(() => {
    const x = () => {
      resize()
      setTimeout(() => resize, 200)
    }
    context.current.listeners.add(x)
    return () => {
      context.current.listeners.delete(x)
    }
  }, [context, resize])

  return (
    <Shared
      width={props.width}
      ref={elementRef}
      position={position}
      align={align}
    >
      <div
        style={{
          minWidth: props.width,
        }}
      >
        {React.createElement(props.Component, {
          resize,
          position,
          ...props,
        })}
      </div>
    </Shared>
  )
}
