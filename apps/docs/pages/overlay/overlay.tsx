import { Page, Button, Text, useOverlay } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const OverlayPage = () => {
  const ShowSimpleOverlay = () => {
    const { open } = useOverlay()

    const openSimpleModal = () => {
      open(<Text>This is a simple modal.</Text>)
    }

    return <Button onClick={openSimpleModal}>Open Simple Modal</Button>
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
