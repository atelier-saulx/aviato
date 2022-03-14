import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { getZIndex, styled } from '~/theme'
import { GroupedTransition, Portal, TransitionPrimitive } from '~/components'
import {
  useFocusReturn,
  useFocusTrap,
  useScrollLock,
  useHotkeys,
} from '~/hooks'
import { ModalElement } from './ModalElement'
import { ModalButton } from '.'

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
  onClose(isConfirm?: boolean): void
  onConfirm?(): void
  onCancel?(): void
  buttons?: ModalButton[]
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  closeOnEnter?: boolean
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
      isOpen = false,
      onClose = noop,
      onConfirm = noop,
      onCancel = noop,
      noFocusTrap = false,
      closeOnClickOutside = true,
      closeOnEscape = true,
      closeOnEnter = true,
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

    const handleClose = (isConfirm: boolean = false) => {
      if (!isOpen) return

      if (isConfirm) {
        onConfirm()
      } else {
        onCancel()
      }

      onClose(isConfirm)
    }

    const handleModalAction = (button: ModalButton) => {
      const isConfirmAction = button.type === 'primary'

      handleClose(isConfirmAction)
    }

    const handleHotkey = (shouldTrigger, callback) => {
      if (!isOpen || !shouldTrigger) return

      callback()
    }

    useHotkeys([
      ['ctrl+enter', () => handleHotkey(closeOnEnter, () => handleClose(true))],
      ['escape', () => handleHotkey(closeOnEscape, () => handleClose(false))],
    ])

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
