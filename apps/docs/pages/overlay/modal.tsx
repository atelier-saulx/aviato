import { useState } from 'react'
import { Page, Modal, Button } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ModalPage = () => {
  const ShowModal = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          Booyah!
        </Modal>

        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Modal</NextTitle>

      <NextText color="Secondary">Overlay with interactive elements.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowModal />
      </ShowcaseComponent>
    </Page>
  )
}

export default ModalPage
