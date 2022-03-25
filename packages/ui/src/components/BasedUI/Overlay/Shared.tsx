import React, { CSSProperties, forwardRef, PropsWithChildren } from 'react'
import { Position, Align } from '../hooks/overlay/useOverlayPosition'
import { styled, StitchedCSS } from '~/theme'

const InnerSharedStyled = styled('div', {
  pointerEvents: 'all',
  borderRadius: 4,
  background: '$Background2dp',
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingTop: 4,
  border: '1px solid $OtherDivider',
  paddingBottom: 4,
  maxHeight: 'calc(100vh - 30px)',
  boxShadow: `0px 3px 16px 1px rgba(0,0,0,0.05)`,
})

export const InnerShared = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    width?: number | string
    css?: StitchedCSS
  }>
>(({ width, css, children }, ref) => {
  return (
    <InnerSharedStyled
      ref={ref}
      css={{
        width: width,
        ...css,
      }}
    >
      {children}
    </InnerSharedStyled>
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
