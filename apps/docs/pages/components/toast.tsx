import { Page, icons, toast, Toaster, Toast } from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const IconsPage = () => {
  const hasLoaded = useHasLoaded()
  if (!hasLoaded) {
    return null
  }

  const toasts = [
    <Toast key={0} type="success" title="Account created.">
      We’ve created your account for you.
    </Toast>,
    <Toast key={1} type="error" title="Oops!">
      Something went wrong.
    </Toast>,
    <Toast key={2} title="Lil' Message?">
      Just something to think about.
    </Toast>,
  ]

  return (
    <Page>
      <NextTitle>Toast</NextTitle>

      <NextText color="Secondary">
        Show dynamic notifications and alerts to user, part of notifications
        system
      </NextText>

      <ShowcaseComponent background="transparent">
        <div>
          {toasts.map((notification, index) => {
            return (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  marginTop: index ? 16 : 0,
                }}
                onClick={() => {
                  toast(notification)
                }}
              >
                {notification}
              </div>
            )
          })}
        </div>
      </ShowcaseComponent>
      <div style={{ zIndex: 99 }}>
        <Toaster />
      </div>
    </Page>
  )
}

export default IconsPage
