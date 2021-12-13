import { styled } from '@aviato/ui'
import { RadioGroup, Radio, Column, Row } from '@aviato/ui'
import { NextTitle, NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const Spacer = styled('div', {
  width: 12,
  height: 12,
})

const CheckboxPage = () => {
  const ShowRadiogroup = () => {
    return (
      <>
        <Column>
          <Row>
            <RadioGroup>
              <Radio />
              <Radio />
              <Radio />
              <Radio />
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

export default CheckboxPage
