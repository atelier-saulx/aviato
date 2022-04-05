import { Page, Button, Text, useOverlay } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const OverlayPage = () => {
  const ShowSimpleOverlay = () => {
    // @ts-ignore // TODO: Fix TS issue
    const { open } = useOverlay()

    const openSimpleOverlay = () => {
      open(<Text>This is a simple overlay.</Text>)
    }

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
