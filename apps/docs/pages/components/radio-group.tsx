import { Page, RadioGroup, Radio, Column, Row } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const RadioGroupPage = () => {
  const ShowRadiogroup = () => {
    return (
      <>
        <Column>
          <Row>
            <RadioGroup>
              <Radio value="Test 1" />
              <Radio value="Test 2" />
              <Radio value="Test 3" />
              <Radio value="Test 4" />
            </RadioGroup>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Radio Group
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        A control that allows the user to toggle selection within a small set of
        options.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowRadiogroup />
      </ShowcaseComponent>
    </Page>
  )
}

export default RadioGroupPage
