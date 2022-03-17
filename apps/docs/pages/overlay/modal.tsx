import { Page, Button, useModal, Text } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ModalPage = () => {
  const ShowSimpleModal = () => {
    const { open } = useModal()

    const SimpleModal = <Text>This is a simple modal.</Text>

    const openModal = () => {
      open(SimpleModal)
    }

    return <Button onClick={openModal}>Open Simple Modal</Button>
  }

  return (
    <Page>
      <NextTitle>Modal</NextTitle>

      <NextText color="Secondary">Overlay with interactive elements.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowSimpleModal />
      </ShowcaseComponent>
    </Page>
  )
}

export default ModalPage
