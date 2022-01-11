import {
  Page,
  useDialog,
  DialogProvider,
  Dialog,
  Button,
  IconClose,
} from '@aviato/ui'
import { useHasLoaded } from '@aviato/hooks'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const DialogButton = ({ level = 1 }) => {
  const { confirm, alert, prompt } = useDialog()

  return (
    <>
      <Button
        onClick={async () => {
          const ok = await confirm('Confirm please')
          console.log({ ok })
        }}
      >
        Confirm #{level}
      </Button>
      <br />
      <Button
        onClick={async () => {
          await alert('Alert please')
        }}
      >
        Alert #{level}
      </Button>
      <br />
      <Button
        onClick={async () => {
          const name = await prompt('What is your name')
          console.log({ name })
        }}
      >
        Prompt #{level}
      </Button>
    </>
  )
}

const DialogButtonAndClose = () => {
  const dialog = useDialog()
  return (
    <Button
      onClick={() => {
        dialog(<Dialog title="I will dissappear!">Oh noooo!</Dialog>)
      }}
    >
      Open Dialog and close after 3 seconds
    </Button>
  )
}

const DialogPage = () => {
  const hasLoaded = useHasLoaded()

  if (!hasLoaded) {
    return null
  }

  return (
    <Page>
      <DialogProvider portal={document.body}>
        <NextTitle>Dialog</NextTitle>
        <NextText color="Secondary">
          Show dynamic notifications and alerts to user, part of notifications
          system
        </NextText>
        <ShowcaseComponent background="transparent">
          <div>
            <DialogButton />
            <br />
            <DialogButtonAndClose />
          </div>
        </ShowcaseComponent>
      </DialogProvider>
    </Page>
  )
}

export default DialogPage
