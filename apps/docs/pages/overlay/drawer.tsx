import { Column, Row, Page } from '@aviato/ui'

import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const DrawerPage = () => {
  const ShowDrawer = () => {
    return (
      <>
        <Column>
          <Row>Drawer</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Drawer</NextTitle>

      <NextText color="Secondary">Drawer.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowDrawer />
      </ShowcaseComponent>
    </Page>
  )
}

export default DrawerPage
