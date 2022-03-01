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
      text: 'Primary',
      type: 'primary',
      onClick: () => log.global.debug('Primary'),
    },
    {
      text: 'Secondary',
      type: 'outline',
      onClick: () => log.global.debug('Secondary'),
    },
  ]

  const ShowModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
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
