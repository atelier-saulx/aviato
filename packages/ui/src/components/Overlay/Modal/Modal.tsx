import React, { forwardRef, ElementRef, useEffect } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { getZIndex, styled } from '~/theme'
import { GroupedTransition, Portal, TransitionPrimitive } from '~/components'
import { useFocusReturn, useFocusTrap, useScrollLock } from '~/hooks'

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

const StyledModal = styled('div', {
  position: 'relative',
  minWidth: '600px',
  background: '$Background1dp',
  zIndex: 5,
})

const ContentArea = styled('div', {
  padding: '24px',
})

const ButtonArea = styled('div', {})

export type ModalButton = {
  label: string
  onClose: () => {}
}

export interface ModalProps extends ComponentProps<typeof StyledModal> {
  isOpen: boolean
  onClose(): void
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
      noFocusTrap = false,
      closeOnEscape = true,
      closeOnClickOutside = true,
      transition = 'pop',
      transitionDuration = 300,
      zIndex = getZIndex('Modal'),
      target,
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
      const stopPropagationAttr = (event.target as any)?.getAttribute(
        'data-aviato-stop-propagation'
      )
      const shouldTrigger = stopPropagationAttr !== 'true'

      shouldTrigger &&
        event.nativeEvent.code === 'Escape' &&
        closeOnEscape &&
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
                <StyledModal
                  ref={forwardedRef}
                  onMouseDown={(event) => event.stopPropagation()}
                  role="dialog"
                  tabIndex={-1}
                  style={{
                    ...transitionStyles.modal,
                  }}
                  {...remainingProps}
                >
                  <ContentArea>{children}</ContentArea>

                  <ButtonArea />
                </StyledModal>
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
