import {
  Page,
  Button,
  useModal,
  Text,
  ModalButton,
  ModalHotkey,
  Group,
  Input,
  ModalElement,
} from '@aviato/ui'
import { log } from '@aviato/utils'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

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
    const { open } = useModal()

    const openSimpleModal = () => {
      open(<Text>This is a simple modal.</Text>)
    }

    return <Button onClick={openSimpleModal}>Open Simple Modal</Button>
  }

  const ShowComplexModal = () => {
    const { open } = useModal()

    const ComplexModal = <>{ModalContent}</>

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

    return <Button onClick={openComplexModal}>Open Complex Modal</Button>
  }

  const ShowLargeModal = () => {
    const { open } = useModal()

    const repeatedContent = Array(50)
      .fill(null)
      .map((_, index) => {
        return (
          <div key={`SimpleContent-${index}`} style={{ paddingBottom: 12 }}>
            <Text>Repeated content</Text>
            <Input type="text" placeholder="Type something here" />
          </div>
        )
      })

    const LargeModal = (
      <>
        <NextText weight="semibold">Repeated input fields</NextText>
        <div>{repeatedContent}</div>
      </>
    )

    const modalButtons: ModalButton[] = [
      {
        text: 'Confirm',
      },
    ]

    const openLargeModal = () => {
      open(LargeModal, {
        buttons: modalButtons,
      })
    }

    return <Button onClick={openLargeModal}>Open Large Modal</Button>
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

      <ShowcaseComponent background="transparent">
        <ShowSimpleModal />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowComplexModal />
      </ShowcaseComponent>

      <ShowcaseComponent background="transparent">
        <ShowLargeModal />
      </ShowcaseComponent>

      <ShowcaseComponent>
        <ShowModalElement />
      </ShowcaseComponent>
    </Page>
  )
}

export default ModalPage
