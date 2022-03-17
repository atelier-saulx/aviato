import { Page, Alert, IconCheck, useHasLoaded } from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const AlertPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  return (
    <Page>
      <ShowcaseHeader
        title="Alert"
        description={`
          Attract user attention with important static message.
        `}
      />

      <ShowcaseComponent background="transparent">
        <div>
          <Alert title="Error!">
            This is an error alert, because your computer is obviously broken.
            Thanks!
          </Alert>

          <br />

          <Alert title="Custom icon" icon={<IconCheck />}>
            This is an error alert, because your computer is obviously broken.
            Thanks!
          </Alert>

          <br />

          <Alert
            title="Custom CSS"
            css={{
              backgroundColor: 'rgba(0,0,0,0.1)',
            }}
          >
            This is an error alert, because your computer is obviously broken.
            Thanks!
          </Alert>
        </div>
      </ShowcaseComponent>
    </Page>
  )
}

export default AlertPage
