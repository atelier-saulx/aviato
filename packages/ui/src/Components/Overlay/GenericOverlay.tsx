import React, {
  ComponentType,
  FunctionComponent,
  PropsWithChildren,
  ReactNode,
} from 'react'
import useOverlayPosition, {
  PositionPropsFn,
} from '../../hooks/overlay/useOverlayPosition'
import useOverlayProps from '../../hooks/overlay/useOverlayProps'
import Shared from './Shared'
import { Text } from '../Text'
import { Data } from '../../types'

export type GenericOverlayProps = {
  Component?: ComponentType
} & PropsWithChildren<any & { data: Data }> &
  PositionPropsFn

export const GenericOverlay: FunctionComponent<GenericOverlayProps> = ({
  Component,
  ...selectionProps
}) => {
  const props = useOverlayProps<GenericOverlayProps>(selectionProps)

  const [elementRef, position, resize] = useOverlayPosition(props)

  let body: ReactNode

  if (!Component) {
    const type = typeof props.children
    if (type === 'string' || type === 'number') {
      body = (
        <div
          style={{
            width: '100%',
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Text weight="medium" singleLine>
            {props.children}
          </Text>
        </div>
      )
    } else {
      body = props.children
    }
  } else {
    body = React.createElement(Component, {
      resize,
      position,
      ...props,
    })
  }

  return (
    <Shared
      width={typeof props.width !== 'function' ? props.width : null}
      ref={elementRef}
      position={position}
      align={props.align}
    >
      {body}
    </Shared>
  )
}
