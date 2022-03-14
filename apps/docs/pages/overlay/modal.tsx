import { useState } from 'react'
import {
  Page,
  Modal,
  Button,
  Input,
  Group,
  Text,
  ModalElement,
  ModalButton,
} from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'
import { log } from '@aviato/utils'

const ModalPage = () => {
  const ModalContent = () => {
    return (
      <>
        <Text weight="semibold">Register</Text>

        <Group direction="horizontal">
          <Input
            type="text"
            placeholder="Type something here"
            label="First Name"
          />
          <Input
            type="text"
            placeholder="Type something here"
            label="Last Name"
          />
        </Group>
      </>
    )
  }

  const modalButtons: () => ModalButton[] = () => [
    {
      text: 'Cancel (Esc)',
      type: 'outline',
      onClick: () => log.global.debug('Secondary'),
    },
    {
      text: 'Register (Cmd+Enter)',
      type: 'primary',
      onClick: () => log.global.debug('Primary'),
    },
  ]

  const ShowModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const closeDialogAction = (wasConfirmed: boolean) => {
      setIsOpen(false)

      log.global.debug(
        `Dialog was closed - Confirmed? ${wasConfirmed ? 'Yes' : 'No'}.`
      )
    }

    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={(wasConfirmed) => closeDialogAction(wasConfirmed)}
          onConfirm={() => log.global.debug('Confirm and close')}
          onCancel={() => log.global.debug('Close without confirming')}
          buttons={modalButtons()}
        >
          <ModalContent />
        </Modal>

        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </>
    )
  }

  const ShowModalElement = () => {
    return (
      <ModalElement buttons={modalButtons()}>
        <ModalContent />
      </ModalElement>
    )
  }

  return (
    <Page>
      <NextTitle>Modal</NextTitle>

      <NextText color="Secondary">Overlay with interactive elements.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowModal />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowModalElement />
      </ShowcaseComponent>
    </Page>
  )
}

export default ModalPage
