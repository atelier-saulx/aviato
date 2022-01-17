import React, {
  forwardRef,
  ForwardedRef,
  ElementRef,
  ReactNode,
  useRef,
  useState,
} from 'react'
import { mergeRefs } from '@aviato/hooks'
import { noop } from '@aviato/utils'

import { getZIndex, styled } from '~/theme'
import { Popper, SharedPopperProps } from '~/components'

const StyledTooltip = styled('div', {})

const TooltipContainer = styled('div', {
  background: '$CalloutMain',
  padding: '4px 8px',
  border: '1px solid $OtherDivider',
  color: '$TextPrimary',
  borderRadius: 4,
})

export interface TooltipProps extends SharedPopperProps {
  /**
   * Text or component to show when label is active
   */
  label: ReactNode | string

  /**
   * Target child to wrap label display
   */
  children: ReactNode

  /**
   * Control Tooltip state yourself
   */
  opened?: boolean

  /**
   * Delay before showing tooltip
   */
  delay?: number

  /**
   * Disable tooltip
   */
  disabled?: boolean

  /**
   * Set specific tooltip width
   */
  width?: number | 'auto'

  /**
   * Escape-hatch to allow pointer-events
   */
  allowPointerEvents?: boolean

  /**
   * Use with multi-line tooltip text
   */
  wrapLines?: boolean

  /**
   * Triggers when the mouse enters the target component bounding box
   */
  onMouseEnter?: () => void

  /**
   * Triggers when the mouse leaves the target component bounding box
   */
  onMouseLeave?: () => void

  /**
   * Forward a reference to the tooltip itself
   */
  tooltipRef?: ForwardedRef<HTMLDivElement>

  /**
   * useEffect dependencies to force update tooltip position
   */
  positionDependencies?: any[]

  /**
   * Whether to render the target element in a Portal
   */
  withinPortal?: boolean
}

export const Tooltip = forwardRef<
  ElementRef<typeof StyledTooltip>,
  TooltipProps
>((properties, forwardedRef) => {
  const {
    label,
    delay = 0,
    opened,
    disabled = false,
    position = 'bottom',
    placement = 'center',
    zIndex = getZIndex('Popover'),
    gutter = 5,
    arrowSize = 2,
    tooltipRef,
    onMouseLeave = noop,
    onMouseEnter = noop,
    width = 'auto',
    withArrow = false,
    wrapLines = false,
    withinPortal = true,
    allowPointerEvents = false,
    positionDependencies = [],
    transition = 'fade',
    transitionDuration = 200,
    transitionTimingFunction,
    children,
    ...remainingProps
  } = properties

  const timeoutRef = useRef<number>()
  const [isOpen, setOpened] = useState(false)

  const isVisible = (typeof opened === 'boolean' ? opened : isOpen) && !disabled

  const [referenceElement, setReferenceElement] = useState(null)

  const handleOpen = () => {
    window.clearTimeout(timeoutRef.current)
    setOpened(true)
  }

  const handleClose = () => {
    if (delay !== 0) {
      timeoutRef.current = window.setTimeout(() => {
        setOpened(false)
      }, delay)
    } else {
      setOpened(false)
    }
  }

  return (
    <StyledTooltip
      onMouseEnter={(event) => {
        handleOpen()
        onMouseEnter(event)
      }}
      onMouseLeave={(event) => {
        handleClose()
        onMouseLeave(event)
      }}
      onFocusCapture={handleOpen}
      onBlurCapture={handleClose}
      ref={mergeRefs(setReferenceElement, forwardedRef)}
      {...remainingProps}
    >
      <Popper
        referenceElement={referenceElement}
        mounted={isVisible}
        position={position}
        placement={placement}
        gutter={gutter}
        withArrow={withArrow}
        arrowSize={arrowSize}
        arrowDistance={7}
        zIndex={zIndex}
        forceUpdateDependencies={[...positionDependencies]}
        withinPortal={withinPortal}
        transitionDuration={transitionDuration}
        transition={transition}
        transitionTimingFunction={transitionTimingFunction}
      >
        <TooltipContainer
          ref={tooltipRef}
          css={{
            pointerEvents: allowPointerEvents ? 'all' : 'none',
            whiteSpace: wrapLines ? 'normal' : 'nowrap',
            width,
          }}
        >
          {label}
        </TooltipContainer>
      </Popper>

      {children}
    </StyledTooltip>
  )
})
