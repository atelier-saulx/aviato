import { styled } from '@aviato/ui'
import { Checkbox, Text, Column, Row } from '@aviato/ui'
import { NextTitle, NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const Spacer = styled('div', {
  width: 12,
  height: 12,
})

const CheckboxPage = () => {
  const ShowCheckboxes = () => {
    return (
      <>
        <Column>
          <Row>
            <Checkbox />
            <Spacer />
            <Text>Accept the terms and conditions</Text>
          </Row>
        </Column>
      </>
    )
  }

  return (
    <Page>
      <NextTitle weight="Bold" size="ExtraLarge">
        Checkbox
      </NextTitle>

      <NextText size="Medium" color="Secondary">
        A control that allows the user to toggle between checked and not
        checked.
      </NextText>

      <ShowcaseComponent background="transparent">
        <ShowCheckboxes />
      </ShowcaseComponent>
    </Page>
  )
}

export default CheckboxPage
