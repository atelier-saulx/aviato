import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { styled } from '~/theme'
import {
  Conditional,
  Button,
  ButtonVariant,
  Group,
  ScrollArea,
} from '~/components'
import { useHotkeys, HotkeyItem } from '~/hooks'

type MouseEvent = React.MouseEvent<HTMLButtonElement>

const StyledModalElement = styled('div', {
  position: 'relative',
  minWidth: '600px',
  background: '$Background1dp',
  zIndex: 5,
})

const ContentArea = styled('div', {
  maxHeight: '600px',
})

const Padding = styled('div', {
  padding: '24px',
})

const ButtonArea = styled('div', {
  padding: '24px',
  display: 'flex',
  justifyContent: 'end',
  borderTop: '1px solid $OtherDivider',
})

export interface ModalButton {
  text: string
  onClick: (event) => void
  hotkey?: string
  type?: 'primary' | 'outline'
}

export type ModalHotkey = HotkeyItem

export interface ModalElementProps
  extends ComponentProps<typeof StyledModalElement> {
  buttons?: ModalButton[]
  onModalAction?: (button: ModalButton) => void
}

export const ModalElement = forwardRef<
  ElementRef<typeof StyledModalElement>,
  ModalElementProps
>((properties, forwardedRef) => {
  const {
    children,
    buttons = [],
    onModalAction = noop,
    ...remainingProps
  } = properties

  const handleModalClick = (
    event: MouseEvent,
    button: ModalButton,
    callback
  ) => {
    onModalAction(button)
    callback(event)
  }

  const mappedHotKeys: any = buttons
    .filter((button) => typeof button.hotkey === 'string')
    .map((button) => {
      const { hotkey, onClick } = button

      return [hotkey, (event) => handleModalClick(event, button, onClick)]
    })

  useHotkeys(mappedHotKeys)

  const mappedButtons = buttons.map((button, index) => {
    const { text, type = 'primary', onClick } = button

    const buttonMap: { [key: string]: ButtonVariant } = {
      primary: 'main',
      outline: 'outline-light',
    }

    const buttonVariant = buttonMap[type] ?? buttonMap.outline

    return (
      <Button
        variant={buttonVariant}
        key={`ModalButton-${index}`}
        onClick={(event) => {
          handleModalClick(event, button, () => onClick(event))
        }}
      >
        {text}
      </Button>
    )
  })

  return (
    <StyledModalElement ref={forwardedRef} {...remainingProps}>
      <ScrollArea type="scroll">
        <ContentArea>
          <Padding>{children}</Padding>
        </ContentArea>
      </ScrollArea>

      <Conditional test={buttons.length > 0}>
        <ButtonArea>
          <Group direction="vertical">{mappedButtons}</Group>
        </ButtonArea>
      </Conditional>
    </StyledModalElement>
  )
})
