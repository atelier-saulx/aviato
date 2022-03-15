import { Page, Checkbox, Text, Column, Row } from '@aviato/ui'
import { log } from '@aviato/utils'

import {
  ShowcaseHeader,
  ShowcaseComponent,
  BigSpacer,
  Spacer,
} from '../../components'

const CheckboxPage = () => {
  const ShowCheckboxes = () => {
    return (
      <>
        <Column>
          <Row>
            <Checkbox
              label="Accept terms and conditions"
              onChange={(value, payload) => {
                log.global.debug('Checkbox change: ', { value, payload })
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
      <ShowcaseHeader
        title="Checkbox"
        description={`
          A control that allows the user to toggle between checked and not checked.
        `}
        code={`
type CheckboxSize = 'small' | 'medium'

interface CheckboxProps {
  size?: CheckboxSize
  checked?: boolean
  disabled?: boolean
  indeterminate?: boolean
  label?: string
  description?: string
  index?: number
  onChange?: (value: boolean, payload: OnCheckboxChange) => void
}
      `}
      />

      <ShowcaseComponent
        background="transparent"
        codeBlock={`
import { Checkbox } from '@aviato/ui'

<Checkbox
  label="Accept terms and conditions"
  onChange={(value, payload) => {
    console.log('Checkbox change: ', { value, payload })
  }}
/>
        `}
      >
        <ShowCheckboxes />
      </ShowcaseComponent>
    </Page>
  )
}

export default CheckboxPage
