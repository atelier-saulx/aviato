import { Column, Row, Switch } from '@aviato/ui'
import { NextTitle, NextText, Page, ShowcaseComponent } from '../../components'

const CheckboxPage = () => {
  const ShowSwitch = () => {
    return (
      <>
        <Column>
          <Row>
            <Switch />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Switch
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        Capture boolean input from user.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowSwitch />
      </ShowcaseComponent>
    </Page>
  )
}

export default CheckboxPage
