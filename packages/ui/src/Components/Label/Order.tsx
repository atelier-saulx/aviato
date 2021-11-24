import React, { CSSProperties, FunctionComponent } from 'react'
import { Title } from '../Text/Title'
import { useColor, Color } from '../../theme'

type OrderLabelProps = {
  style?: CSSProperties
  index: number
  color?: Color
  Icon: any
}
// Subtitle
export const OrderLabel: FunctionComponent<OrderLabelProps> = ({
  style,
  index,
  children,
  color = { color: 'primary' },
  Icon,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        ...style,
      }}
    >
      <div
        style={{
          backgroundColor: useColor(color),
          paddingLeft: 8,
          paddingRight: 7,
          paddingTop: 6,
          paddingBottom: 6,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          position: 'relative',
        }}
      >
        <div
          style={{
            width: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            left: 7.5,
            top: 0,
            bottom: 0,
          }}
        >
          <Icon color={color} />
        </div>
        <div style={{ width: 23 }} />
        <Title size="small" color={color}>
          {children || index + 1}
        </Title>
      </div>
    </div>
  )
}
