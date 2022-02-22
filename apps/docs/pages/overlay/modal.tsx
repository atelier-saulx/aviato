import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const ModalPage = () => {
  const ShowModal = () => {
    return (
      <>
        <Column>
          <Row>Modal</Row>
        </Column>
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
