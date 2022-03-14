import React, { forwardRef, ElementRef } from 'react'
import { ComponentProps } from '@stitches/react'
import { noop } from '@aviato/utils'

import { styled } from '~/theme'
import { Conditional, Button, ButtonVariant, Group } from '~/components'

type MouseEvent = React.MouseEvent<HTMLButtonElement>

const StyledModalElement = styled('div', {
  position: 'relative',
  minWidth: '600px',
  background: '$Background1dp',
  zIndex: 5,
})

const ContentArea = styled('div', {
  padding: '24px',
})

const ButtonArea = styled('div', {
  padding: '24px',
  display: 'flex',
  justifyContent: 'end',
  borderTop: '1px solid $OtherDivider',
  marginTop: '12px',
})

export interface ModalButton {
  text: string
  onClick: (event) => void
  type?: 'primary' | 'outline'
}

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
      <ContentArea>{children}</ContentArea>

      <Conditional test={buttons.length > 0}>
        <ButtonArea>
          <Group direction="vertical">{mappedButtons}</Group>
        </ButtonArea>
      </Conditional>
    </StyledModalElement>
  )
})
