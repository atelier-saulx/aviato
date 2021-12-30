import { Column, Row, Input, Page } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const InputPage = () => {
  const ShowInput = () => {
    return (
      <>
        <Column>
          <Row>
            <Input />
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Text Field
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        Capture string input from user
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowInput />
      </ShowcaseComponent>
    </Page>
  )
}

export default InputPage
