import {
  Page,
  useToast,
  ToastProvider,
  Toast,
  Button,
  IconClose,
  useHasLoaded,
} from '@aviato/ui'

import { ShowcaseHeader, ShowcaseComponent } from '../../components'

const Notification = ({ children }) => {
  const toast = useToast()

  return (
    <div
      style={{
        cursor: 'pointer',
        marginBottom: 16,
      }}
      onClick={() => toast.add(children)}
    >
      {children}
    </div>
  )
}

const CloseAllButton = () => {
  const toast = useToast()
  const amount = toast.useCount()

  return (
    <>
      <Button
        disabled={!amount}
        leftIcon={<IconClose />}
        onClick={() => toast.close()}
      >
        Close All Toasts ({amount})
      </Button>
    </>
  )
}

const ToastPage = () => {
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
      <ShowcaseHeader
        title="Toast"
        description={`
          Show dynamic notifications and alerts to user, part of notifications
          system.
        `}
      />

      <ShowcaseComponent background="transparent">
        <ToastProvider>
          <div>
            {toasts.map((notification, index) => {
              return <Notification key={index}>{notification}</Notification>
            })}
            <CloseAllButton />
          </div>
        </ToastProvider>
      </ShowcaseComponent>
    </Page>
  )
}

export default ToastPage
