import {
  Page,
  Button,
  useModal,
  Text,
  ModalButton,
  ModalHotkey,
  Group,
  Input,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ModalPage = () => {
  const ShowSimpleModal = () => {
    const { open } = useModal()

    const openSimpleModal = () => {
      open(<Text>This is a simple modal.</Text>)
    }

    return <Button onClick={openSimpleModal}>Open Simple Modal</Button>
  }

  const ShowComplexModal = () => {
    const { open } = useModal()

    const ComplexModal = (
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

    const openComplexModal = () => {
      open(ComplexModal, {
        buttons: modalButtons,
        hotkeys: modalHotkeys,
      })
    }

    return <Button onClick={openComplexModal}>Open Modal</Button>
  }

  return (
    <Page>
      <NextTitle>Modal</NextTitle>

      <NextText color="Secondary">Overlay with interactive elements.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowSimpleModal />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowComplexModal />
      </ShowcaseComponent>
    </Page>
  )
}

export default ModalPage
