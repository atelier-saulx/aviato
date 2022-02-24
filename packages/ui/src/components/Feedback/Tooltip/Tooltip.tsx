import React, {
  forwardRef,
  ForwardedRef,
  ElementRef,
  ReactNode,
  useRef,
  useState,
} from 'react'
import { isText, noop } from '@aviato/utils'

import { mergeRefs } from '~/hooks'
import { styled } from '~/theme'
import { Text, Popper, SharedPopperProps } from '~/components'

const StyledTooltip = styled('div', {
  position: 'relative',
})

const TooltipContainer = styled('div', {
  background: '$CalloutMain',
  padding: '4px 8px',
  border: '1px solid $OtherDivider',
  color: '$TextPrimary',
  borderRadius: 4,
})

const TextContainer = styled('div', {
  color: '$TextPrimary',
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
  disablePortal?: boolean
}

export const Tooltip = forwardRef<
  ElementRef<typeof StyledTooltip>,
  TooltipProps
>((properties, forwardedRef) => {
  const {
    label,
    position = 'bottom',
    placement = 'center',
    gutter = 5,
    delay = 0,
    opened,
    disabled = false,
    tooltipRef,
    onMouseLeave = noop,
    onMouseEnter = noop,
    width = 'auto',
    wrapLines = false,
    allowPointerEvents = false,
    disablePortal = false,
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

  const ChildVariant = isText(children) ? (
    <Text weight="medium" color="inherit" css={{ lineHeight: '24px' }}>
      {children}
    </Text>
  ) : (
    children
  )

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
        disablePortal={disablePortal}
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

      <TextContainer>{ChildVariant}</TextContainer>
    </StyledTooltip>
  )
})

Tooltip.displayName = 'Tooltip'
