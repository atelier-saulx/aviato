import React, { forwardRef, ElementRef, useEffect } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { getZIndex, styled } from '~/theme'
import { GroupedTransition, Portal, TransitionPrimitive } from '~/components'
import { useFocusReturn, useFocusTrap, useScrollLock } from '~/hooks'
import { ModalElement } from './ModalElement'
import { ModalButton } from '.'

type CaptureEvent = React.KeyboardEvent<HTMLDivElement>

const Root = styled('div', {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
})

const Inner = styled('div', {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 4,
  overflowY: 'auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Backdrop = styled('div', {
  backgroundColor: '$OtherOverlay',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
})

const StyledModal = styled('div', {})

export interface ModalProps extends ComponentProps<typeof StyledModal> {
  isOpen: boolean
  onClose(): void
  onConfirm?(): void
  onCancel?(): void
  buttons?: ModalButton[]
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  zIndex?: number
  noFocusTrap?: boolean
  transition?: TransitionPrimitive
  transitionDuration?: number
  target?: HTMLElement | string
}

export const Modal = forwardRef<ElementRef<typeof StyledModal>, ModalProps>(
  (properties, forwardedRef) => {
    const {
      children,
      isOpen,
      onClose = noop,
      onConfirm = noop,
      onCancel = noop,
      noFocusTrap = false,
      closeOnEscape = true,
      closeOnClickOutside = true,
      transition = 'pop',
      transitionDuration = 300,
      zIndex = getZIndex('Modal'),
      target,
      buttons = [],
      ...remainingProps
    } = properties

    const focusTrapRef = useFocusTrap(!noFocusTrap && isOpen)

    const [, lockScroll] = useScrollLock()

    useFocusReturn({ isOpen, transitionDuration })

    const closeOnEscapePress = (event: KeyboardEvent) => {
      if (noFocusTrap && event.code === 'Escape' && closeOnEscape) {
        onClose()
      }
    }

    const onKeydownCapture = (event: CaptureEvent) => {
      const isEscapeKey = event.nativeEvent.code === 'Escape'
      const hasValidKey = isEscapeKey && closeOnEscape
      if (hasValidKey) {
        onClose()
      }
    }

    const handleModalAction = (button: ModalButton) => {
      if (button.type === 'primary') {
        onConfirm()
      } else {
        onCancel()
      }

      onClose()
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
      <Portal zIndex={zIndex} target={target}>
        <GroupedTransition
          onExited={() => lockScroll(false)}
          onEntered={() => lockScroll(true)}
          mounted={isOpen}
          transitions={{
            modal: {
              duration: transitionDuration,
              transition,
            },
            overlay: {
              duration: transitionDuration / 2,
              transition: 'fade',
              timingFunction: 'ease',
            },
          }}
        >
          {(transitionStyles) => (
            <Root>
              <Inner
                ref={focusTrapRef}
                onMouseDown={() => closeOnClickOutside && onClose()}
                onKeyDownCapture={onKeydownCapture}
              >
                <ModalElement
                  ref={forwardedRef}
                  buttons={buttons}
                  onMouseDown={(event) => event.stopPropagation()}
                  onModalAction={handleModalAction}
                  role="dialog"
                  tabIndex={-1}
                  style={{
                    ...transitionStyles.modal,
                  }}
                  {...remainingProps}
                >
                  {children}
                </ModalElement>
              </Inner>

              <Backdrop style={transitionStyles.overlay} />
            </Root>
          )}
        </GroupedTransition>
      </Portal>
    )
  }
)

Modal.displayName = 'Modal'
