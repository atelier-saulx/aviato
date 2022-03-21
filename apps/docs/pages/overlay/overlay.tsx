import { Column, Row, Page } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const OverlayPage = () => {
  const ShowOverlay = () => {
    return (
      <>
        <Column>
          <Row>Overlay</Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Overlay"
        description={`
          Overlay.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ShowOverlay />
      </ShowcaseComponent>
    </Page>
  )
}

export default OverlayPage
