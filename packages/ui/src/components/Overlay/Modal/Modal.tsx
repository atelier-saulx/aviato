import React, { forwardRef, ElementRef, useEffect } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { getZIndex, styled } from '~/theme'
import { Portal } from '~/components'
import {
  useFocusReturn,
  useFocusTrap,
  useScrollLock,
  useHotkeys,
  HotkeyItem,
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
  onConfirm?(): void
  onCancel?(): void
  onClose(didUserConfirm?: boolean): void
  buttons?: ModalButton[]
  hotkeys?: HotkeyItem[]
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  closeOnEnter?: boolean
  zIndex?: number
  noFocusTrap?: boolean
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
      buttons = [],
      hotkeys = [],
      noFocusTrap = false,
      closeOnClickOutside = true,
      closeOnEscape = true,
      zIndex = getZIndex('Modal'),
      target,
      ...remainingProps
    } = properties

    const focusTrapRef = useFocusTrap(!noFocusTrap && isOpen)

    const [, lockScroll] = useScrollLock()

    useFocusReturn({ isOpen, transitionDuration: 0 })

    const handleClose = (isConfirm: boolean = false) => {
      if (!isOpen) return

      if (isConfirm) {
        onConfirm()
      } else {
        onCancel()
      }

      onClose(isConfirm)
    }

    useEffect(() => {
      lockScroll(true)

      return () => {
        lockScroll(false)
      }
    }, [])

    const handleModalAction = (button: ModalButton) => {
      const isConfirmAction = button.type === 'primary'

      handleClose(isConfirmAction)
    }

    const handleHotkey = (shouldTrigger, callback) => {
      if (!isOpen || !shouldTrigger) return

      callback()
    }

    const defaultHotkeys: HotkeyItem[] = [
      ['escape', () => handleHotkey(closeOnEscape, () => handleClose(false))],
    ]

    const buttonHotkeys = buttons
      .map(({ hotkey }) => hotkey)
      .filter((hotkey) => typeof hotkey === 'string')

    const combinedHotkeys = [...defaultHotkeys, ...hotkeys]

    const modalHotkeys: HotkeyItem[] = combinedHotkeys.filter((hotkey) => {
      const targetKey = hotkey[0] as string
      const hotkeyIsAssigned = buttonHotkeys.includes(targetKey)

      return !hotkeyIsAssigned
    }) as HotkeyItem[]

    useHotkeys(modalHotkeys)

    return (
      <Portal zIndex={zIndex} target={target}>
        <Root>
          <Inner
            ref={focusTrapRef}
            onMouseDown={() => closeOnClickOutside && onClose()}
          >
            <ModalElement
              tabIndex={-1}
              ref={forwardedRef}
              buttons={buttons}
              onMouseDown={(event) => event.stopPropagation()}
              onModalAction={handleModalAction}
              role="dialog"
              {...remainingProps}
            >
              {children}
            </ModalElement>
          </Inner>

          <Backdrop />
        </Root>
      </Portal>
    )
  }
)

Modal.displayName = 'Modal'
