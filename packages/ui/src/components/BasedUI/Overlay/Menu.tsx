import React, { useCallback, useContext, useEffect, FC } from 'react'
import useOverlayPosition from '../hooks/overlay/useOverlayPosition'
import useOverlayProps, {
  OverlayContext,
} from '../hooks/overlay/useOverlayProps'
// import { ChevronLeft } from '../icons'
import { Text } from '~/components'
import Shared from './Shared'
import { removeOverlay } from './index'
import { GenericOverlayProps } from './GenericOverlay'
import renderChildren from '../util/renderChildren'
import { DataEventHandler } from '../types'
import { styled, StitchedCSS } from '~/theme'
import { useHover } from '~/hooks'

export type NextProps = {
  label?: string
}

const StyledNextNested = styled('div', {
  display: 'flex',
  paddingTop: 4,
  paddingBottom: 4,
  paddingLeft: 4,
  paddingRight: 4,
  width: '100%',
  alignItems: 'center',
  cursor: 'pointer',
})

const Next: FC<NextProps> = ({ label, children }) => {
  const [hover, isHover] = useHover()
  const context = useContext(OverlayContext)

  return (
    <div ref={hover}>
      <StyledNextNested
        onClick={useCallback(() => {
          context.current.merge({ content: undefined })
        }, [])}
        css={{
          display: 'flex',
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 15,
          paddingRight: 15,
          width: '100%',
          alignItems: 'center',
          cursor: 'pointer',
          backgroundColor: isHover ? '$ActionLightHover' : null,
        }}
      >
        {/* <ChevronLeft /> */}
        <Text
          weight="medium"
          singleLine
          css={{
            marginLeft: 4,
            userSelect: 'none',
          }}
        >
          {label}
        </Text>
      </StyledNextNested>
      {renderChildren(children, {})}
    </div>
  )
}

const StyledContextualMenuItem = styled('div', {
  display: 'flex',
  padding: 4,
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
})

const Box = styled('div', {
  display: 'flex',
})

export type ContextualMenuItemProps = {
  label?: string
  onClick?: DataEventHandler
  css?: StitchedCSS
  color?: any
  weight?: 'semibold' | 'medium' | 'regular'
}

export const ContextualMenuItem: FC<ContextualMenuItemProps> = ({
  label,
  weight,
  color,
  children,
  onClick,
  css,
}) => {
  const [hover, isHover, isActive] = useHover()
  const context = useContext(OverlayContext)

  // ListItem in aviato

  const click = useCallback(
    (event) => {
      if (onClick) {
        if (!onClick(event)) {
          removeOverlay()
        }
      } else {
        context.current.merge({
          content: <Next label={label}>{children}</Next>,
        })
      }
    },
    [onClick, children, context]
  )

  return (
    <StyledContextualMenuItem
      ref={hover}
      onClick={click}
      css={{
        backgroundColor: isActive
          ? '$ActionLightSelected'
          : isHover
          ? '$ActionLightHover'
          : null,
        ...css,
      }}
    >
      <Box>
        <Text
          color={color}
          css={{
            marginLeft: 8,
            marginRight: 8,
            userSelect: 'none',
          }}
          weight={weight}
          singleLine
        >
          {label}
        </Text>
      </Box>
    </StyledContextualMenuItem>
  )
}

export const Menu: FC<GenericOverlayProps> = (initialProps) => {
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

  const content = props.content

  return (
    <Shared
      width={props.width}
      ref={elementRef}
      position={position}
      align={align}
    >
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.15s',
          transform: content
            ? 'translate3d(-100%,0px,0px)'
            : `translate3d(0px,0px,0px)`,
        }}
      >
        <div
          style={{
            minWidth: '100%',
          }}
        >
          {React.createElement(props.Component, {
            resize,
            position,
            ...props,
          })}
        </div>
        <div
          style={{
            minWidth: '100%',
          }}
        >
          {content}
        </div>
      </div>
    </Shared>
  )
}
