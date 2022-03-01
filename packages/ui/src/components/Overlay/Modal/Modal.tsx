import React, {
  forwardRef,
  ElementRef,
  useEffect,
  ComponentPropsWithoutRef,
} from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { getZIndex, styled } from '~/theme'
import { Portal } from '~/components'
import { useFocusReturn, useFocusTrap } from '~/hooks'

const StyledModal = styled('div', {})

export interface ModalProps extends ComponentProps<typeof StyledModal> {
  isOpen: boolean
  onClose(): void
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  zIndex?: number
  noFocusTrap?: boolean
  target?: HTMLElement | string
}

export const ModalElement = forwardRef<
  ElementRef<typeof StyledModal>,
  ModalProps
>((properties, forwardedRef) => {
  const {
    children,
    isOpen,
    onClose = noop,
    noFocusTrap = false,
    closeOnEscape = true,
    closeOnClickOutside = true,
    ...remainingProps
  } = properties

  const focusTrapRef = useFocusTrap(!noFocusTrap && isOpen)

  useFocusReturn({ isOpen, transitionDuration: 0 })

  const closeOnEscapePress = (event: KeyboardEvent) => {
    if (noFocusTrap && event.code === 'Escape' && closeOnEscape) {
      onClose()
    }
  }

  useEffect(() => {
    if (noFocusTrap) {
      window.addEventListener('keydown', closeOnEscapePress)

      return () => {
        window.removeEventListener('keydown', closeOnEscapePress)
      }
    }
  }, [noFocusTrap])

  return (
    <StyledModal ref={forwardedRef} {...remainingProps}>
      <div
        ref={focusTrapRef}
        onMouseDown={() => closeOnClickOutside && onClose()}
        onKeyDownCapture={(event) => {
          const shouldTrigger =
            (event.target as any)?.getAttribute(
              'data-aviato-stop-propagation'
            ) !== 'true'

          shouldTrigger &&
            event.nativeEvent.code === 'Escape' &&
            closeOnEscape &&
            onClose()
        }}
      >
        {children}
      </div>
    </StyledModal>
  )
})

ModalElement.displayName = 'ModalElement'

export function Modal({
  zIndex = getZIndex('Modal'),
  target,
  ...props
}: ComponentPropsWithoutRef<typeof ModalElement>) {
  return (
    <Portal zIndex={zIndex} target={target}>
      <ModalElement {...props} />
    </Portal>
  )
}

Modal.displayName = 'Modal'
