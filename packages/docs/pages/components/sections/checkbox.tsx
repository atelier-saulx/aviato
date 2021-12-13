import { styled } from '@aviato/ui'
import { Checkbox, Text, Column, Row } from '@aviato/ui'
import { NextTitle, NextText } from '../../../components'

import { Page, ShowcaseComponent } from '../../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

const Spacer = styled('div', {
  width: 12,
  height: 12,
})

const capitalize = (input: string) => {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

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
