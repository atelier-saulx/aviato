import { Page, Alert, IconCheck } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const AlertPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  return (
    <Page>
      <NextTitle>Alert</NextTitle>

      <NextText color="Secondary">
        Attract user attention with important static message
      </NextText>

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
            title="Custom css"
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
