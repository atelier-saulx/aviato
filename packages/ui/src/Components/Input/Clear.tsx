import React, {
  CSSProperties,
  FunctionComponent,
  EventHandler,
  SyntheticEvent,
} from 'react'
import { Color } from '../../theme'

import { Close } from '../../icons'

type GenericEventHandler = EventHandler<SyntheticEvent>

type ClearProps = {
  style?: CSSProperties
  color?: Color
  onClick?: GenericEventHandler
}

const Clear: FunctionComponent<ClearProps> = ({
  color = { color: 'foreground', tone: 1 },
  style,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      style={{
        paddingLeft: 4,
        position: 'absolute',
        right: 8,
        top: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'opacity 0.15s',
        cursor: 'pointer',
        ...style,
      }}
    >
      <Close color={color} />
    </div>
  )
}

export default Clear
