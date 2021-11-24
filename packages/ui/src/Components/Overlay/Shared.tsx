import React, { CSSProperties, forwardRef, PropsWithChildren } from 'react'
import { useColor } from '../../theme'
import { Position, Align } from '../../hooks/overlay/useOverlayPosition'

export const InnerShared = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    width?: number | string
    minWidth?: number | string
    style: CSSProperties
  }>
>(({ width, style, children }, ref) => {
  return (
    <div
      ref={ref}
      style={{
        pointerEvents: 'all',
        borderRadius: 4,
        width: width,
        background: useColor({ color: 'background' }),
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingTop: 10,

        border: '1px solid lightgrey' /* +
          useColor({
            color: 'grey',
            tone: 2,
            opacity: 0.05,
           }) */,
        paddingBottom: 10,
        maxHeight: 'calc(100vh - 30px)',
        boxShadow: `0px 3px 16px 1px ${useColor({
          color: 'foreground',
          tone: 2,
          opacity: 0.15,
        })}`,
        ...style,
      }}
    >
      {children}
    </div>
  )
})

export type SharedOverlayProps = PropsWithChildren<{
  width?: number | string
  style?: CSSProperties
  position?: Position
  align?: Align
}>

export default forwardRef<HTMLDivElement, SharedOverlayProps>(
  ({ position, align = 'center', children, style, width = 'auto' }, ref) => {
    return (
      <div
        style={{
          opacity: position ? 1 : 0,
          width: position ? position.containerWidth : 'auto',
          position: 'fixed',
          top: position ? position.y : 0,
          left: position ? position.x : 0,
          bottom: position ? position.bottom : null,
          display: 'flex',
          justifyContent: align,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent:
              position && position.spaceOnTop ? 'flex-end' : 'flex-start',
          }}
        >
          <InnerShared
            ref={ref}
            width={position ? position.width : width}
            style={{
              ...style,
            }}
          >
            {children}
          </InnerShared>
        </div>
      </div>
    )
  }
)
