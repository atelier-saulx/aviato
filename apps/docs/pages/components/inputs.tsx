import { Column, Row, TextField, Page } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const TextFieldPage = () => {
  const ShowTextField = () => {
    return (
      <>
        <Column>
          <Row>
            <TextField />
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
        <ShowTextField />
      </ShowcaseComponent>
    </Page>
  )
}

export default TextFieldPage
