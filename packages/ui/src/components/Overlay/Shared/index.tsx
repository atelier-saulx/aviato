import React, {
  forwardRef,
  FC,
  PropsWithChildren,
  ComponentType,
  useEffect,
  useState,
} from 'react'
import { Position, PositionProps, Target } from '~/types'
import { styled, StitchedCSS } from '~/theme'
import { ScrollArea } from '~/components'

const InnerSharedStyled = styled('div', {
  pointerEvents: 'all',
  borderRadius: 4,
  background: '$Background2dp',
  border: '1px solid $OtherDivider',
  maxHeight: 'calc(100vh - 30px)',
  boxShadow: `0px 3px 16px 1px rgba(0,0,0,0.05)`,
})

export type OverlayProps<P = any> = {
  Component: ComponentType<P>
  props: P
  target: Target
  positionProps: PositionProps
  css?: StitchedCSS
}

export const GenericOverlay: FC<OverlayProps> = () => {
  return <div>'x'</div>
}

export const InnerShared = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{
    width?: number | string
    css?: StitchedCSS
    style?: any
  }>
>(({ width, css, children, style }, ref) => {
  return (
    <InnerSharedStyled
      ref={ref}
      css={{
        ...css,
        width: width,
      }}
      style={style}
    >
      <ScrollArea>{children}</ScrollArea>
    </InnerSharedStyled>
  )
})

export type SharedOverlayProps = PropsWithChildren<{
  css?: StitchedCSS
  position: Position
}>

export default forwardRef<HTMLDivElement, SharedOverlayProps>(
  ({ position, children, css }, ref) => {
    const [go, setgo] = useState(false)

    const placement =
      position.placement === 'left'
        ? 'flex-start'
        : position.placement === 'right'
        ? 'flex-end'
        : 'center'

    useEffect(() => {
      const x = requestAnimationFrame(() => {
        setgo(true)
      })
      return () => {
        cancelAnimationFrame(x)
      }
    }, [])

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
          justifyContent: placement,
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
            width={position.width}
            css={css}
            style={{
              transition: 'transform 0.15s, opacity 0.15s',
              opacity: go ? 1 : 0,
              transform: go ? 'scale(1)' : 'scale(0.9)',
            }}
          >
            {children}
          </InnerShared>
        </div>
      </div>
    )
  }
)
