import React, { FC } from 'react'
import useOverlayPosition from '../../BasedUI/hooks/overlay/useOverlayPosition'
import Shared, { OverlayProps } from '../../BasedUI/Overlay/Shared'

export const ContextMenu: FC<OverlayProps> = ({
  positionProps = {},
  target,
  props,
  Component,
}) => {
  if (!positionProps.width) {
    positionProps.width = 256
  }
  const [elementRef, position, resize] = useOverlayPosition(
    target,
    positionProps
  )

  return (
    <Shared ref={elementRef} position={position}>
      {React.createElement(Component, {
        resize,
        position,
        ...props,
      })}
    </Shared>
  )
}
