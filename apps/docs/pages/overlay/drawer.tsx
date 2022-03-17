import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

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
      <ShowcaseHeader
        title="Drawer"
        description={`
          Drawer.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowDrawer />
      </ShowcaseComponent>
    </Page>
  )
}

export default DrawerPage
