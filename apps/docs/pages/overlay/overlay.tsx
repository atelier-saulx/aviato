import { Page, Button } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const OverlayPage = () => {
  const ShowSimpleOverlay = () => {
    const openSimpleOverlay = () => {}

    return <Button onClick={openSimpleOverlay}>Open Simple Overlay</Button>
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
        <ShowSimpleOverlay />
      </ShowcaseComponent>
    </Page>
  )
}

export default OverlayPage
