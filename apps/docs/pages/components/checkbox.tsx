import { styled, Page, Checkbox, Text, Column, Row } from '@aviato/ui'
import { NextTitle, NextText, ShowcaseComponent } from '../../components'

const BigSpacer = styled('div', {
  width: '100%',
  height: 20,
})

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

          <BigSpacer />

          <Row>
            <Column>
              <Text>Big size</Text>
              <Row>
                <Checkbox />
                <Spacer />
                <Checkbox checked />
                <Spacer />
                <Checkbox disabled />
                <Spacer />
                <Checkbox disabled checked />
              </Row>
            </Column>
          </Row>

          <BigSpacer />

          <Row>
            <Column>
              <Text>Small size</Text>
              <Row>
                <Checkbox size="small" />
                <Spacer />
                <Checkbox size="small" checked />
                <Spacer />
                <Checkbox size="small" disabled />
                <Spacer />
                <Checkbox size="small" disabled checked />
              </Row>
            </Column>
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