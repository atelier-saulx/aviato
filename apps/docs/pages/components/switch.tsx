import { log } from '@aviato/utils'
import { Column, Row, Switch, SwitchSize, Page } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const SwitchPage = () => {
  const ShowSwitch = ({ size }: { size: SwitchSize }) => {
    return (
      <>
        <Column>
          <Row>
            <Switch
              label="This is a switch"
              description="With a description"
              text="This text is beside the switch"
              size={size}
              onChange={(event) => {
                log.global.debug('Switch change: ', event)
              }}
            />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle>Switch</NextTitle>

      <NextText color="Secondary">Capture boolean input from user.</NextText>

      <ShowcaseComponent background="transparent">
        <ShowSwitch size="normal" />
      </ShowcaseComponent>
    </Page>
  )
}

export default SwitchPage
