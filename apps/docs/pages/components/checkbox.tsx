import { styled, Page, Checkbox, Text, Column, Row } from '@aviato/ui'
import { log } from '@aviato/utils'
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
            <Checkbox
              label="Accept terms and conditions"
              onChange={(event) => {
                log.global.debug('Checkbox change: ', event)
              }}
            />
          </Row>

          <BigSpacer />

          <Row>
            <Checkbox
              label="Show content IDs"
              description="See the unique ID for each content type to refer to or link them to a pull request."
            />
          </Row>

          <BigSpacer />

          <Row>
            <Checkbox label="Indeterminate checkbox" indeterminate checked />
          </Row>

          <BigSpacer />

          <Row>
            <Column>
              <Text>Medium size</Text>
              <Row>
                <Checkbox size="medium" />
                <Spacer />
                <Checkbox size="medium" checked />
                <Spacer />
                <Checkbox size="medium" disabled />
                <Spacer />
                <Checkbox size="medium" disabled checked />
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
      <NextTitle>Checkbox</NextTitle>

      <NextText color="Secondary">
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
