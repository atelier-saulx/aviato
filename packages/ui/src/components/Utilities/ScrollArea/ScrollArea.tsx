import React, { forwardRef } from 'react'
import { ComponentProps } from '@stitches/react'
import * as RadixScrollArea from '@radix-ui/react-scroll-area'
import { noop } from '@aviato/utils'

import { styled } from '~/theme'

const StyledScrollArea = styled(RadixScrollArea.Root, {
  borderRadius: 4,
  overflow: 'hidden',
})

const StyledViewport = styled(RadixScrollArea.Viewport, {
  width: '100%',
  height: '100%',
  borderRadius: 'inherit',
})

const Container = styled('div', {})

const Scrollbar = styled(RadixScrollArea.Scrollbar, {
  display: 'flex',
  userSelect: 'none',
  touchAction: 'none',
  boxSizing: 'border-box',

  '&:hover': {},

  '&[data-state="hidden"]': {
    opacity: 0,
  },
})

const Thumb = styled(RadixScrollArea.Thumb, {
  flex: 1,
  position: 'relative',
  backgroundColor: '$ActionLightHover',
  transition: 'background-color 150ms ease',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    minWidth: 44,
    minHeight: 44,
  },
})

const Corner = styled(RadixScrollArea.Corner, {})

export interface ScrollAreaProps
  extends ComponentProps<typeof StyledScrollArea> {
  /** Scrollbar size in px */
  scrollbarSize?: number

  /** Scrollbars type */
  type?: 'auto' | 'always' | 'scroll' | 'hover'

  /** Scroll hide delay in ms, for scroll and hover types only */
  scrollHideDelay?: number

  /** Should scrollbars be offset with padding */
  offsetScrollbars?: boolean

  /** Get viewport ref */
  viewportRef?: React.ForwardedRef<HTMLDivElement>

  /** Subscribe to scroll position changes */
  onScrollPositionChange?(position: { x: number; y: number }): void
}

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (properties, forwardedRef) => {
    const {
      children,
      scrollbarSize = 8,
      scrollHideDelay = 1000,
      type = 'hover',
      viewportRef,
      offsetScrollbars = false,
      onScrollPositionChange = noop,
      ...remainingProps
    } = properties

    return (
      <StyledScrollArea
        type={type}
        scrollHideDelay={scrollHideDelay}
        dir="ltr"
        ref={forwardedRef}
        asChild
      >
        <Container {...remainingProps}>
          <StyledViewport
            ref={viewportRef}
            css={{
              paddingRight: offsetScrollbars ? scrollbarSize : null,
            }}
            onScroll={({ currentTarget }) => {
              onScrollPositionChange({
                x: currentTarget.scrollLeft,
                y: currentTarget.scrollTop,
              })
            }}
          >
            {children}
          </StyledViewport>

          <Scrollbar
            orientation="horizontal"
            forceMount
            css={{
              padding: scrollbarSize / 5,
              height: scrollbarSize,
            }}
          >
            <Thumb />
          </Scrollbar>

          <Scrollbar
            orientation="vertical"
            forceMount
            css={{
              padding: scrollbarSize / 5,
              width: scrollbarSize,
            }}
          >
            <Thumb
              css={{
                borderRadius: scrollbarSize,
              }}
            />
          </Scrollbar>

          <Corner />
        </Container>
      </StyledScrollArea>
    )
  }
)
