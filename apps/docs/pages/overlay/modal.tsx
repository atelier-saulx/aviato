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
  ModalHotkey,
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

  const ShowSimpleModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const closeDialogAction = () => {
      setIsOpen(false)
    }

    return (
      <>
        <Modal isOpen={isOpen} onClose={closeDialogAction}>
          <Text>This is a simple modal.</Text>
        </Modal>

        <Button onClick={() => setIsOpen(true)}>Open Simple Modal</Button>
      </>
    )
  }

  const ShowComplexModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    const closeDialogAction = (wasConfirmed: boolean) => {
      setIsOpen(false)

      log.global.debug(
        `Dialog was closed - Confirmed? ${wasConfirmed ? 'Yes' : 'No'}.`
      )
    }

    const modalButtons: ModalButton[] = [
      {
        text: 'Cancel (Esc)',
        type: 'outline',
        hotkey: 'escape',
        onClick: () => log.global.debug('Cancel'),
      },
      {
        text: 'Register (Cmd+Enter)',
        type: 'primary',
        hotkey: 'cmd+enter',
        onClick: () => log.global.debug('Register'),
      },
    ]

    const modalHotkeys: ModalHotkey[] = [
      ['ctrl+t', () => log.global.debug('CTRL+T was pressed.')],
    ]

    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={(wasConfirmed) => closeDialogAction(wasConfirmed)}
          onConfirm={() => log.global.debug('Confirm and close')}
          onCancel={() => log.global.debug('Close without confirming')}
          buttons={modalButtons}
          hotkeys={modalHotkeys}
        >
          <ModalContent />
        </Modal>

        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </>
    )
  }

  const ShowModalElement = () => {
    const modalButtons: ModalButton[] = [
      {
        text: 'Register User (Cmd+O)',
        type: 'primary',
        hotkey: 'cmd+o',
        onClick: () => log.global.debug('Register User'),
      },
    ]

    return (
      <ModalElement buttons={modalButtons}>
        <ModalContent />
      </ModalElement>
    )
  }

  return (
    <Page>
      <NextTitle>Modal</NextTitle>

      <NextText color="Secondary">Overlay with interactive elements.</NextText>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Modal, Button, Text } from '@aviato/ui'

const [isOpen, setIsOpen] = useState(false)

const closeDialogAction = () => {
  setIsOpen(false)
}

return (
  <>
    <Modal isOpen={isOpen} onClose={closeDialogAction}>
      <Text>This is a simple modal.</Text>
    </Modal>

    <Button onClick={() => setIsOpen(true)}>Open Simple Modal</Button>
  </>
)
      `}
      >
        <ShowSimpleModal />
      </ShowcaseComponent>

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Modal, Button, Text, Group, Input } from '@aviato/ui'

const [isOpen, setIsOpen] = useState(false)

const closeDialogAction = (wasConfirmed: boolean) => {
  setIsOpen(false)
}

const modalButtons: ModalButton[] = [
  {
    text: 'Cancel (Esc)',
    type: 'outline',
    hotkey: 'escape',
    onClick: () => log.global.debug('Cancel'),
  },
  {
    text: 'Register (Cmd+Enter)',
    type: 'primary',
    hotkey: 'cmd+enter',
    onClick: () => log.global.debug('Register'),
  },
]

const modalHotkeys: ModalHotkey[] = [
  ['ctrl+t', () => log.global.debug('CTRL+T was pressed.')],
]

return (
  <>
    <Modal
      isOpen={isOpen}
      onClose={(wasConfirmed) => closeDialogAction(wasConfirmed)}
      onConfirm={() => log.global.debug('Confirm and close')}
      onCancel={() => log.global.debug('Close without confirming')}
      buttons={modalButtons}
      hotkeys={modalHotkeys}
    >
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
    </Modal>

    <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
  </>
)
      `}
      >
        <ShowComplexModal />
      </ShowcaseComponent>

      <ShowcaseComponent
        codeBlock={`
import { ModalElement, Text, Group, Input } from '@aviato/ui'

const modalButtons: ModalButton[] = [
  {
    text: 'Register User (Cmd+O)',
    type: 'primary',
    hotkey: 'cmd+o',
    onClick: () => log.global.debug('Register User'),
  },
]

return (
  <ModalElement buttons={modalButtons}>
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
  </ModalElement>
)
      `}
      >
        <ShowModalElement />
      </ShowcaseComponent>
    </Page>
  )
}

export default ModalPage
